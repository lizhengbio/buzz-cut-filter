import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/utils/supabase/service-role";

/**
 * 清理重复的customer记录，只保留每个user_id最新的记录
 * 注意：这是一个管理员端点，在生产环境中应该添加认证保护
 */
export async function POST() {
  const supabase = createServiceRoleClient();
  
  console.log('🧹 开始清理重复的customer记录...');
  
  try {
    // 查找所有customer记录
    const { data: allCustomers, error: fetchError } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) throw fetchError;

    if (!allCustomers || allCustomers.length === 0) {
      return NextResponse.json({
        success: true,
        message: '没有找到customer记录',
        stats: { total: 0, duplicates: 0, deleted: 0 }
      });
    }

    // 统计每个user_id的记录
    const userIdGroups = allCustomers.reduce((acc, customer) => {
      if (!acc[customer.user_id]) {
        acc[customer.user_id] = [];
      }
      acc[customer.user_id].push(customer);
      return acc;
    }, {} as Record<string, typeof allCustomers>);

    const stats = {
      total: allCustomers.length,
      unique_users: Object.keys(userIdGroups).length,
      duplicates: 0,
      deleted: 0
    };

    const duplicateUsers = Object.keys(userIdGroups).filter(userId => 
      userIdGroups[userId].length > 1
    );

    stats.duplicates = duplicateUsers.length;

    console.log('📊 统计结果:', {
      total_customers: stats.total,
      unique_users: stats.unique_users,
      duplicate_users: stats.duplicates
    });

    const cleanupResults = [];

    // 为每个有重复记录的user_id清理
    for (const userId of duplicateUsers) {
      const userRecords = userIdGroups[userId];
      
      // 保留最新的记录（已经按created_at降序排序）
      const latestRecord = userRecords[0];
      const recordsToDelete = userRecords.slice(1);

      console.log(`🔍 处理用户 ${userId}:`, {
        total_records: userRecords.length,
        keeping: latestRecord.id,
        deleting: recordsToDelete.map(r => r.id),
        latest_credits: latestRecord.credits
      });

      const deletedIds = [];

      // 删除旧记录
      for (const record of recordsToDelete) {
        const { error: deleteError } = await supabase
          .from('customers')
          .delete()
          .eq('id', record.id);

        if (deleteError) {
          console.error(`❌ 删除记录 ${record.id} 失败:`, deleteError);
        } else {
          console.log(`✅ 已删除记录 ${record.id}`);
          deletedIds.push(record.id);
          stats.deleted++;
        }
      }

      cleanupResults.push({
        user_id: userId,
        email: latestRecord.email,
        kept_record: latestRecord.id,
        deleted_records: deletedIds,
        kept_credits: latestRecord.credits
      });
    }

    console.log('🎉 清理完成！');

    return NextResponse.json({
      success: true,
      message: '清理完成',
      stats,
      cleanup_results: cleanupResults
    });

  } catch (error) {
    console.error('❌ 清理过程中发生错误:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/utils/supabase/service-role";
import { grantMonthlyCredits } from "@/utils/credits";
import { SUBSCRIPTION_TIERS } from "@/config/subscriptions";

/**
 * 手动修复订阅状态的管理员端点
 * 当webhook没有正常工作时，可以手动创建订阅记录并授予积分
 */
export async function POST(request: Request) {
  try {
    const { 
      user_id, 
      email, 
      subscription_id, 
      product_id, 
      customer_id: creem_customer_id 
    } = await request.json();

    if (!user_id || !email || !subscription_id || !product_id) {
      return NextResponse.json({
        error: "Missing required parameters: user_id, email, subscription_id, product_id"
      }, { status: 400 });
    }

    const supabase = createServiceRoleClient();

    console.log('🛠️ Manual subscription fix started:', {
      user_id,
      email,
      subscription_id,
      product_id,
      creem_customer_id
    });

    // 查找订阅层级配置
    const subscriptionTier = SUBSCRIPTION_TIERS.find(tier => tier.productId === product_id);
    if (!subscriptionTier) {
      return NextResponse.json({
        error: `Unknown product_id: ${product_id}`,
        available_products: SUBSCRIPTION_TIERS.map(t => ({ id: t.productId, name: t.name }))
      }, { status: 400 });
    }

    // 1. 获取或创建customer记录
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('id, creem_customer_id')
      .eq('user_id', user_id)
      .single();

    if (customerError) {
      return NextResponse.json({
        error: "Customer not found for user_id",
        details: customerError
      }, { status: 404 });
    }

    // 2. 更新customer的creem_customer_id（如果提供了且当前是free类型）
    if (creem_customer_id && customer.creem_customer_id.startsWith('free_')) {
      const { error: updateCustomerError } = await supabase
        .from('customers')
        .update({ 
          creem_customer_id: creem_customer_id,
          updated_at: new Date().toISOString()
        })
        .eq('id', customer.id);

      if (updateCustomerError) {
        console.error('⚠️ Failed to update customer creem_customer_id:', updateCustomerError);
      } else {
        console.log('✅ Updated customer creem_customer_id:', creem_customer_id);
      }
    }

    // 3. 检查是否已存在订阅记录
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('customer_id', customer.id)
      .eq('creem_subscription_id', subscription_id)
      .single();

    let subscriptionRecord;

    if (existingSubscription) {
      console.log('ℹ️ Subscription already exists:', existingSubscription.id);
      subscriptionRecord = existingSubscription;
    } else {
      // 4. 创建订阅记录
      const currentDate = new Date();
      const periodStart = currentDate.toISOString();
      const periodEnd = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30天后

      const { data: newSubscription, error: subscriptionError } = await supabase
        .from('subscriptions')
        .insert({
          customer_id: customer.id,
          creem_subscription_id: subscription_id,
          creem_product_id: product_id,
          status: 'active',
          current_period_start: periodStart,
          current_period_end: periodEnd,
          metadata: {
            manual_fix: true,
            fixed_at: new Date().toISOString(),
            user_id,
            email
          }
        })
        .select()
        .single();

      if (subscriptionError) {
        return NextResponse.json({
          error: "Failed to create subscription record",
          details: subscriptionError
        }, { status: 500 });
      }

      subscriptionRecord = newSubscription;
      console.log('✅ Created subscription record:', newSubscription.id);
    }

    // 5. 授予月度积分
    let creditGrantResult;
    try {
      creditGrantResult = await grantMonthlyCredits(user_id, email);
      console.log('💰 Monthly credits grant result:', creditGrantResult);
    } catch (creditError) {
      console.error('❌ Failed to grant monthly credits:', creditError);
      creditGrantResult = { error: creditError.message };
    }

    // 6. 获取最终状态
    const { data: finalCustomer } = await supabase
      .from('customers')
      .select(`
        *,
        subscriptions (*),
        credits_history (
          amount,
          type,
          description,
          created_at
        )
      `)
      .eq('id', customer.id)
      .single();

    return NextResponse.json({
      success: true,
      message: 'Manual subscription fix completed',
      results: {
        subscription_tier: subscriptionTier.name,
        monthly_credits: subscriptionTier.monthlyCredits,
        subscription_created: !existingSubscription,
        subscription_id: subscriptionRecord.id,
        credits_granted: creditGrantResult,
        final_customer_state: finalCustomer
      }
    });

  } catch (error) {
    console.error('❌ Manual subscription fix error:', error);
    return NextResponse.json({
      error: "Internal server error",
      details: error.message
    }, { status: 500 });
  }
}
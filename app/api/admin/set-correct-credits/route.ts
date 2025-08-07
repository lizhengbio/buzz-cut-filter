import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/utils/supabase/service-role";
import { SUBSCRIPTION_TIERS } from "@/config/subscriptions";

/**
 * 直接设置正确的积分数量
 */
export async function POST(request: Request) {
  try {
    const { user_id, email } = await request.json();

    if (!user_id || !email) {
      return NextResponse.json({
        error: "Missing required parameters: user_id, email"
      }, { status: 400 });
    }

    const supabase = createServiceRoleClient();

    console.log('🔧 Setting correct credits for user:', { user_id, email });

    // 获取用户的customer记录
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select(`
        *,
        subscriptions (
          creem_product_id,
          status
        ),
        credits_history (
          amount,
          type,
          description,
          created_at
        )
      `)
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (customerError) {
      return NextResponse.json({
        error: "Customer not found",
        details: customerError
      }, { status: 404 });
    }

    // 检查是否有活跃订阅
    const activeSubscription = customer.subscriptions?.find(sub => 
      ['active', 'trialing'].includes(sub.status)
    );

    if (!activeSubscription) {
      return NextResponse.json({
        error: "No active subscription found"
      }, { status: 400 });
    }

    // 找到订阅层级
    const subscriptionTier = SUBSCRIPTION_TIERS.find(tier => 
      tier.productId === activeSubscription.creem_product_id
    );

    if (!subscriptionTier) {
      return NextResponse.json({
        error: "Unknown subscription tier"
      }, { status: 400 });
    }

    // 计算正确的积分数
    const welcomeBonusEntries = customer.credits_history?.filter(entry => 
      entry.type === 'add' && 
      entry.description?.includes('Welcome bonus')
    ) || [];

    const correctCredits = 
      (welcomeBonusEntries.length > 0 ? 10 : 0) + // 欢迎奖励
      subscriptionTier.monthlyCredits; // 一次月度积分

    // 直接设置正确的积分数
    const { error: updateError } = await supabase
      .from('customers')
      .update({ 
        credits: correctCredits,
        updated_at: new Date().toISOString()
      })
      .eq('id', customer.id);

    if (updateError) {
      return NextResponse.json({
        error: "Failed to update credits",
        details: updateError
      }, { status: 500 });
    }

    // 记录修复操作
    const creditsChange = correctCredits - customer.credits;
    const { error: historyError } = await supabase
      .from('credits_history')
      .insert({
        customer_id: customer.id,
        amount: Math.abs(creditsChange),
        type: creditsChange > 0 ? 'add' : 'subtract',
        description: `Admin Fix: Set correct credits to ${correctCredits} (${subscriptionTier.name}: 10 welcome + ${subscriptionTier.monthlyCredits} monthly)`,
        metadata: {
          fix_date: new Date().toISOString(),
          original_credits: customer.credits,
          corrected_credits: correctCredits,
          credits_change: creditsChange,
          subscription_tier: subscriptionTier.name
        }
      });

    if (historyError) {
      console.error('Failed to record fix history:', historyError);
    }

    return NextResponse.json({
      success: true,
      message: 'Credits set to correct value',
      fix_details: {
        user_email: email,
        subscription_tier: subscriptionTier.name,
        original_credits: customer.credits,
        corrected_credits: correctCredits,
        credits_change: creditsChange,
        calculation: {
          welcome_bonus: welcomeBonusEntries.length > 0 ? 10 : 0,
          monthly_credits: subscriptionTier.monthlyCredits,
          total: correctCredits
        }
      }
    });

  } catch (error) {
    console.error('❌ Error setting correct credits:', error);
    return NextResponse.json({
      error: "Internal server error",
      details: error.message
    }, { status: 500 });
  }
}
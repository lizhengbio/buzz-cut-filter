import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/utils/supabase/service-role";
import { SUBSCRIPTION_TIERS } from "@/config/subscriptions";

/**
 * 修复重复授予的月度积分
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

    console.log('🔧 Fixing duplicate credits for user:', { user_id, email });

    // 获取用户的customer记录和积分历史
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
    const activeSubscription = customer.subscriptions?.find(
      (sub: { status: string; creem_product_id: string }) =>
        ['active', 'trialing'].includes(sub.status)
    );

    if (!activeSubscription) {
      return NextResponse.json({
        error: "No active subscription found"
      }, { status: 400 });
    }

    // 找到订阅层级
    const subscriptionTier = SUBSCRIPTION_TIERS.find((tier) => 
      tier.productId === activeSubscription.creem_product_id
    );

    if (!subscriptionTier) {
      return NextResponse.json({
        error: "Unknown subscription tier"
      }, { status: 400 });
    }

    // 分析积分历史
    const monthlyCreditsEntries =
      customer.credits_history?.filter(
        (entry: { amount: number; type: string; description?: string | null }) =>
          entry.type === 'add' && entry.description?.includes('Monthly credits')
      ) || [];

    const welcomeBonusEntries =
      customer.credits_history?.filter(
        (entry: { amount: number; type: string; description?: string | null }) =>
          entry.type === 'add' && entry.description?.includes('Welcome bonus')
      ) || [];

    const monthlyCredits = subscriptionTier.monthlyCredits ?? 0;
    const correctCredits = 
      (welcomeBonusEntries.length > 0 ? 10 : 0) + // 欢迎奖励
      monthlyCredits; // 一次月度积分

    const actualMonthlyCreditsGranted = monthlyCreditsEntries.reduce(
      (sum: number, entry: { amount: number }) => sum + entry.amount,
      0
    );

    const excessCredits = actualMonthlyCreditsGranted - monthlyCredits;

    if (excessCredits <= 0) {
      return NextResponse.json({
        message: "No duplicate credits found",
        analysis: {
          current_credits: customer.credits,
          expected_credits: correctCredits,
          monthly_credits_granted: actualMonthlyCreditsGranted,
          expected_monthly_credits: monthlyCredits,
          excess_credits: excessCredits
        }
      });
    }

    // 修复积分余额
    const correctedCredits = customer.credits - excessCredits;

    const { error: updateError } = await supabase
      .from('customers')
      .update({ 
        credits: correctedCredits,
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
    const { error: historyError } = await supabase
      .from('credits_history')
      .insert({
        customer_id: customer.id,
        amount: excessCredits,
        type: 'subtract',
        description: `Fix: Removed duplicate monthly credits (${monthlyCreditsEntries.length} grants instead of 1)`,
        metadata: {
          fix_date: new Date().toISOString(),
          original_credits: customer.credits,
          corrected_credits: correctedCredits,
          excess_removed: excessCredits,
          duplicate_grants: monthlyCreditsEntries.length
        }
      });

    if (historyError) {
      console.error('Failed to record fix history:', historyError);
    }

    return NextResponse.json({
      success: true,
      message: 'Duplicate credits fixed',
      fix_details: {
        user_email: email,
        subscription_tier: subscriptionTier.name,
        original_credits: customer.credits,
        corrected_credits: correctedCredits,
        excess_credits_removed: excessCredits,
        duplicate_grants_found: monthlyCreditsEntries.length,
        expected_grants: 1
      }
    });

  } catch (error) {
    console.error('❌ Error fixing duplicate credits:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      error: "Internal server error",
      details: message
    }, { status: 500 });
  }
}
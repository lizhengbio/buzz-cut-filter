import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/utils/supabase/service-role";
import { grantMonthlyCredits } from "@/utils/credits";
import { SUBSCRIPTION_TIERS } from "@/config/subscriptions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id');
  const email = searchParams.get('email');

  if (!userId || !email) {
    return NextResponse.json({ 
      error: "Missing user_id or email parameters" 
    }, { status: 400 });
  }

  const supabase = createServiceRoleClient();

  try {
    // Get customer data with subscriptions
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select(`
        *,
        subscriptions (
          *
        ),
        credits_history (
          amount,
          type,
          description,
          created_at
        )
      `)
      .eq('user_id', userId)
      .single();

    if (customerError) {
      return NextResponse.json({ 
        error: "Customer not found or error fetching data",
        details: customerError
      }, { status: 404 });
    }

    const subscription = customer.subscriptions?.[0];
    const subscriptionTier = subscription ? 
      SUBSCRIPTION_TIERS.find((tier) => tier.productId === subscription.creem_product_id) : null;

    // ⚠️ 已禁用：不在调试端点中实际授予积分，只检查资格
    let creditGrantResult = null;
    if (subscription && ['active', 'trialing'].includes(subscription.status)) {
      creditGrantResult = { 
        eligible: true, 
        note: "Credit grant disabled in debug endpoint to prevent accidental grants" 
      };
    } else {
      creditGrantResult = { 
        eligible: false, 
        reason: "No active subscription" 
      };
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      customer: {
        id: customer.id,
        user_id: customer.user_id,
        email: customer.email,
        credits: customer.credits,
        last_credit_grant_date: customer.last_credit_grant_date,
        last_monthly_credit_grant_date: customer.last_monthly_credit_grant_date,
        monthly_credits_granted: customer.monthly_credits_granted
      },
      subscription: subscription ? {
        id: subscription.id,
        status: subscription.status,
        creem_product_id: subscription.creem_product_id,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        tier_info: subscriptionTier ? {
          name: subscriptionTier.name,
          monthly_credits: subscriptionTier.monthlyCredits
        } : 'Unknown tier'
      } : null,
      credit_grant_test: creditGrantResult,
      recent_credit_history: customer.credits_history?.slice(0, 5),
      available_subscription_tiers: SUBSCRIPTION_TIERS.map(tier => ({
        product_id: tier.productId,
        name: tier.name,
        monthly_credits: tier.monthlyCredits
      }))
    });

  } catch (error) {
    return NextResponse.json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
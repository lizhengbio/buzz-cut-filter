import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        authError: authError?.message 
      }, { status: 401 });
    }

    // Get customer data
    const { data: customerData, error: customerError } = await supabase
      .from("customers")
      .select(`
        *,
        subscriptions (
          status,
          current_period_end,
          creem_product_id
        ),
        credits_history (
          amount,
          type,
          description,
          created_at
        )
      `)
      .eq("user_id", user.id)
      .single();

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at
      },
      customer: customerData,
      customerError: customerError?.message,
      hasCustomer: !!customerData,
      credits: customerData?.credits || 0,
      lastCreditGrant: customerData?.last_credit_grant_date,
      subscriptions: customerData?.subscriptions || [],
      recentHistory: customerData?.credits_history?.slice(0, 5) || []
    });

  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch debug info', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
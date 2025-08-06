import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createServiceRoleClient } from "@/utils/supabase/service-role";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const serviceSupabase = createServiceRoleClient();
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    console.log(`🔍 Debugging subscription data for user: ${user.email} (${user.id})`);
    
    // Get all customer records for this user
    const { data: customers, error: customerError } = await serviceSupabase
      .from('customers')
      .select('*')
      .eq('user_id', user.id);

    console.log('👤 Customers:', customers);

    // Get all subscriptions for this user
    const { data: subscriptions, error: subscriptionError } = await serviceSupabase
      .from('subscriptions')
      .select('*')
      .in('customer_id', customers?.map(c => c.id) || []);

    console.log('📋 Subscriptions:', subscriptions);

    // Get recent credit history
    const { data: creditHistory, error: historyError } = await serviceSupabase
      .from('credits_history')
      .select('*')
      .in('customer_id', customers?.map(c => c.id) || [])
      .order('created_at', { ascending: false })
      .limit(10);

    console.log('💳 Recent Credit History:', creditHistory);

    return NextResponse.json({ 
      user: {
        id: user.id,
        email: user.email
      },
      customers: customers || [],
      subscriptions: subscriptions || [],
      creditHistory: creditHistory || [],
      errors: {
        customer: customerError?.message,
        subscription: subscriptionError?.message,
        history: historyError?.message
      }
    });
  } catch (error) {
    console.error("Error debugging subscription:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to debug subscription" },
      { status: 500 }
    );
  }
}
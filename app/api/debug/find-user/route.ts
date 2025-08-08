import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/utils/supabase/service-role";

/**
 * 通过邮箱查找用户
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ 
      error: "Missing email parameter" 
    }, { status: 400 });
  }

  const supabase = createServiceRoleClient();

  try {
    // 1. 从auth.users表查找用户
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      return NextResponse.json({ 
        error: "Failed to fetch auth users",
        details: authError
      }, { status: 500 });
    }

    const matchingUser = authUsers.users.find(user => 
      user.email?.toLowerCase() === email.toLowerCase()
    );

    if (!matchingUser) {
      return NextResponse.json({
        found: false,
        message: `No user found with email: ${email}`,
        search_email: email
      });
    }

    // 2. 查找对应的customer记录
    const { data: customers, error: customerError } = await supabase
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
      .eq('user_id', matchingUser.id);

    if (customerError) {
      console.error('Error fetching customers:', customerError);
    }

    return NextResponse.json({
      found: true,
      auth_user: {
        id: matchingUser.id,
        email: matchingUser.email,
        created_at: matchingUser.created_at,
        email_confirmed_at: matchingUser.email_confirmed_at
      },
      customers: customers || [],
      customer_count: customers?.length || 0,
      debug_url: `http://localhost:3000/api/debug/subscription-and-credits?user_id=${matchingUser.id}&email=${email}`
    });

  } catch (error) {
    return NextResponse.json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
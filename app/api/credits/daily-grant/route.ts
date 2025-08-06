import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { grantDailyCredits } from "@/utils/credits";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    console.log(`🎯 Attempting to grant daily credits for user: ${user.email} (${user.id})`);

    // Grant daily credits
    const granted = await grantDailyCredits(user.id, user.email!, user.user_metadata?.full_name || user.user_metadata?.name);

    if (granted) {
      console.log(`✅ Successfully granted daily credits to: ${user.email}`);
    } else {
      console.log(`ℹ️ Daily credits not granted (already given today or user has subscription): ${user.email}`);
    }

    return NextResponse.json({ 
      success: true, 
      granted,
      message: granted ? 'Daily credits granted successfully!' : 'Credits already granted today or user has subscription',
      user_email: user.email
    });

  } catch (error) {
    console.error('❌ Error granting daily credits:', error);
    return NextResponse.json(
      { error: 'Failed to grant daily credits', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
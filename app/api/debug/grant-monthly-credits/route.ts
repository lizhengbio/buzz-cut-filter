import { NextRequest, NextResponse } from "next/server";
import { grantMonthlyCredits } from "@/utils/credits";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    console.log(`🧪 Manual monthly credit grant test for user: ${user.email} (${user.id})`);
    
    // Force grant monthly credits (bypass date checks for testing)
    const granted = await grantMonthlyCredits(user.id, user.email || '');
    
    return NextResponse.json({ 
      success: true,
      user: user.email,
      granted,
      message: granted 
        ? "Monthly credits granted successfully (test)!" 
        : "No monthly credits granted - check subscription status and billing period"
    });
  } catch (error) {
    console.error("Error in manual monthly credit grant:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to grant monthly credits" },
      { status: 500 }
    );
  }
}
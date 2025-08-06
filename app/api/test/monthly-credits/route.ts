import { NextRequest, NextResponse } from "next/server";
import { grantMonthlyCredits } from "@/utils/credits";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    console.log(`Testing monthly credit grant for user: ${user.email}`);
    
    // Test granting monthly credits to current user
    const granted = await grantMonthlyCredits(user.id, user.email || '');
    
    return NextResponse.json({ 
      success: true,
      user: user.email,
      granted,
      message: granted 
        ? "Monthly credits granted successfully!" 
        : "No monthly credits to grant (either not subscribed, already granted, or no credits configured)"
    });
  } catch (error) {
    console.error("Error testing monthly credits:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to test monthly credits" },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import { grantMonthlyCredits, grantMonthlyCreditsToAllSubscribers } from "@/utils/credits";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get the current user (for single user grant) or use service account for bulk
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    const body = await request.json();
    const { userId, email, bulk = false } = body;

    if (bulk) {
      // Grant monthly credits to all subscribers (admin function)
      // This should be protected by additional authentication in production
      const result = await grantMonthlyCreditsToAllSubscribers();
      
      return NextResponse.json({ 
        success: true,
        message: `Processed ${result.processed} subscribers, granted credits to ${result.granted} users`,
        details: result
      });
    } else {
      // Grant monthly credits to a specific user
      if (!userId || !email) {
        return NextResponse.json({ error: "userId and email are required" }, { status: 400 });
      }

      const granted = await grantMonthlyCredits(userId, email);
      
      return NextResponse.json({ 
        success: true,
        granted,
        message: granted ? "Monthly credits granted successfully" : "No monthly credits to grant"
      });
    }
  } catch (error) {
    console.error("Error granting monthly credits:", error);
    return NextResponse.json(
      { error: "Failed to grant monthly credits" },
      { status: 500 }
    );
  }
}
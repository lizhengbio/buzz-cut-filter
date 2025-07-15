import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { image, guard, color } = await request.json();
    
    // Validate input
    if (!image || !guard || !color) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }
    
    // Validate guard length
    if (guard < 1 || guard > 12) {
      return NextResponse.json(
        { error: "Guard length must be between 1 and 12" },
        { status: 400 }
      );
    }
    
    // Validate color
    const validColors = ['natural', 'black', 'brown', 'blonde', 'gray'];
    if (!validColors.includes(color)) {
      return NextResponse.json(
        { error: "Invalid hair color" },
        { status: 400 }
      );
    }
    
    // Return processing instructions for client-side processing
    // Client will handle the actual image processing
    const result = {
      task_id: `task_${Date.now()}`,
      status: "ready_for_processing",
      guard_length: guard,
      hair_color: color,
      processing_time: "client_side",
      instructions: {
        process_client_side: true,
        guard_length: guard,
        hair_color: color
      }
    };
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error processing buzz cut:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
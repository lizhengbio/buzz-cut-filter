import { NextRequest, NextResponse } from "next/server";
import { fluxAPI } from "@/utils/flux-api";

export async function POST(request: NextRequest) {
  try {
    const { image_base64, color } = await request.json();

    // Parameter validation
    if (!image_base64) {
      return NextResponse.json(
        { error: "Image data is required" },
        { status: 400 }
      );
    }

    if (!color) {
      return NextResponse.json(
        { error: "Color parameter is required" },
        { status: 400 }
      );
    }

    // Call Flux API to generate buzz cut
    const prediction = await fluxAPI.generateBuzzCut(image_base64, color);

    // Return task ID for frontend polling
    return NextResponse.json({
      task_id: prediction.id,
      status: "queued"
    });

  } catch (error) {
    console.error("Failed to create generation task:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to create generation task",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import { kieImageAPI } from "@/utils/kie-api";
import { faceProtectedGenerator } from "@/utils/face-protection";
import { fluxKontextAPI } from "@/utils/flux-kontext-api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image_base64, color, tier, retry_count = 0 } = body;

    if (!image_base64) {
      return NextResponse.json(
        { error: "Image base64 data is required" },
        { status: 400 }
      );
    }

    console.log("🚀 Generating buzz cut with Flux Kontext Pro");
    console.log("🎨 Color:", color);
    console.log("📊 Base64 size:", image_base64.length);
    console.log("📸 Base64 preview (first 100 chars):", image_base64.substring(0, 100));
    console.log("🔍 Base64 starts with data URL?", image_base64.startsWith('data:image/'));
    
    // Validate image data
    if (image_base64.length === 0) {
      console.error("❌ Empty image data in generate endpoint");
      return NextResponse.json(
        { error: "Empty image data received" },
        { status: 400 }
      );
    }
    console.log("✅ Image data received in generate endpoint");

    // Use Flux Kontext Pro only (no fallbacks for debugging)
    console.log("🎯 Starting Flux Kontext Pro generation...");
    
    // Generate hair mask for targeted editing
    const hairMask = await fluxKontextAPI.generateHairMask(image_base64);
    
    // Generate with face ID control
    const prediction = await fluxKontextAPI.generateBuzzCutWithFaceID(
      image_base64,
      color,
      {
        safetyTolerance: 2,
        promptUpsampling: false
      }
    );

    console.log("✅ Flux generation started:", prediction.id);

    // Return Flux-compatible response
    return NextResponse.json({
      task_id: prediction.id, // Use prediction ID as task ID
      prediction_id: prediction.id,
      status: "queued",
      model: "flux-kontext-pro",
      metadata: {
        prediction_id: prediction.id,
        color: color,
        tier: tier,
        retry_count: retry_count,
        timestamp: new Date().toISOString(),
        model: "flux-kontext-pro"
      }
    });

  } catch (error) {
    console.error("Error creating generation task:", error);
    
    // Provide more detailed error information
    let errorMessage = "Failed to create generation task";
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error("Error details:", error.stack);
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
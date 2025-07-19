import { NextRequest, NextResponse } from "next/server";
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
    console.log("📊 Image size:", image_base64.length);

    // Step 1: Generate hair mask (optional)
    const hairMask = await fluxKontextAPI.generateHairMask(image_base64);
    
    // Step 2: Generate buzz cut with face ID control
    const prediction = await fluxKontextAPI.generateBuzzCutWithFaceID(
      image_base64,
      color,
      {
        safetyTolerance: 2,
        promptUpsampling: false
      }
    );

    console.log("✅ Flux prediction created:", prediction.id);

    // Store generation metadata
    const generationMetadata = {
      prediction_id: prediction.id,
      color: color,
      tier: tier,
      retry_count: retry_count,
      timestamp: new Date().toISOString(),
      model: "flux-kontext-pro"
    };

    return NextResponse.json({
      prediction_id: prediction.id,
      status: "queued",
      metadata: generationMetadata,
      replicate_urls: prediction.urls
    });

  } catch (error) {
    console.error("❌ Error creating Flux generation:", error);
    
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
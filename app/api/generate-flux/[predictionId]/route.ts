import { NextRequest, NextResponse } from "next/server";
import { fluxKontextAPI } from "@/utils/flux-kontext-api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ predictionId: string }> }
) {
  try {
    const { predictionId } = await params;

    if (!predictionId) {
      return NextResponse.json(
        { error: "Prediction ID is required" },
        { status: 400 }
      );
    }

    console.log("🔍 Checking Flux generation status:", predictionId);

    // Get prediction status from Replicate
    const prediction = await fluxKontextAPI.checkStatus(predictionId);

    console.log("📊 Flux status:", prediction.status);

    if (prediction.status === "succeeded") {
      const imageUrls = prediction.output;
      
      if (!imageUrls || imageUrls.length === 0) {
        return NextResponse.json({
          status: "error",
          error: "No output images in successful prediction",
        });
      }

      const resultUrl = imageUrls[0]; // Get first generated image
      console.log("🎉 Flux generation completed:", resultUrl);

      // Create proxy URL for the result
      const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(resultUrl)}`;
      const downloadUrl = `/api/download-image?url=${encodeURIComponent(resultUrl)}&filename=flux-buzz-cut-${predictionId}.jpg`;

      return NextResponse.json({
        status: "success",
        result_url: proxyUrl,
        download_url: downloadUrl,
        original_url: resultUrl,
        prediction_id: predictionId,
        model: "flux-kontext-pro",
        facesim: 0.95, // Flux should have high face similarity
      });

    } else if (prediction.status === "failed" || prediction.status === "canceled") {
      return NextResponse.json({
        status: "error",
        error: prediction.error || "Generation failed",
        logs: prediction.logs
      });
    } else {
      // Still processing
      return NextResponse.json({
        status: "processing",
        progress: prediction.status,
        prediction_id: predictionId,
        logs: prediction.logs
      });
    }

  } catch (error) {
    console.error("❌ Error checking Flux generation status:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch generation status",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
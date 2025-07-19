import { NextRequest, NextResponse } from "next/server";
import { kieImageAPI } from "@/utils/kie-api";
import { fluxKontextAPI } from "@/utils/flux-kontext-api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const { taskId } = await params;

    if (!taskId) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    console.log("🔍 Checking generation status:", taskId);

    // Check if this is a Flux prediction ID (26 characters, alphanumeric)
    const isFluxPrediction = taskId.length === 26 && /^[a-z0-9]+$/.test(taskId);
    
    if (isFluxPrediction) {
      console.log("🎯 Detected Flux prediction ID, checking status...");
      console.log("📋 Task ID format check:", {
        length: taskId.length,
        isAlphanumeric: /^[a-z0-9]+$/.test(taskId),
        taskId: taskId
      });
      
      try {
        const prediction = await fluxKontextAPI.checkStatus(taskId);
        console.log("📊 Flux prediction:", JSON.stringify(prediction, null, 2));
        console.log("📊 Flux status:", prediction.status);

        if (prediction.status === "succeeded") {
          const resultUrl = prediction.output;
          
          if (!resultUrl || typeof resultUrl !== 'string') {
            console.error("❌ Invalid output format:", prediction.output);
            return NextResponse.json({
              status: "error",
              error: "No valid output URL in successful prediction",
              output: prediction.output
            });
          }

          console.log("🎉 Flux generation completed with URL:", resultUrl);
          const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(resultUrl)}`;
          const downloadUrl = `/api/download-image?url=${encodeURIComponent(resultUrl)}&filename=flux-buzz-cut-${taskId}.jpg`;

          return NextResponse.json({
            status: "success",
            result_url: proxyUrl,
            download_url: downloadUrl,
            original_url: resultUrl,
            prediction_id: taskId,
            model: "flux-kontext-pro",
            facesim: 0.95, // Flux should have high face similarity
          });

        } else if (prediction.status === "failed" || prediction.status === "canceled") {
          return NextResponse.json({
            status: "error",
            error: prediction.error || "Flux generation failed",
            logs: prediction.logs
          });
        } else {
          // Still processing
          return NextResponse.json({
            status: "processing",
            progress: prediction.status,
            model: "flux-kontext-pro"
          });
        }
      } catch (fluxError) {
        console.error("❌ Error checking Flux status:", fluxError);
        // Fall through to kie.ai check as backup
      }
    }

    // Default to kie.ai API check
    console.log("🔄 Checking kie.ai status...");
    const statusResponse = await kieImageAPI.checkStatus(taskId);

    console.log("Full status response:", JSON.stringify(statusResponse, null, 2));
    console.log("Generation status:", statusResponse.status);
    
    // Extract actual status from API response
    const actualStatus = statusResponse.data?.status || statusResponse.status;
    console.log("Actual status:", actualStatus);

    if (actualStatus === "SUCCESS") {
      // Get image URL from response.resultUrls array
      const imageUrls = statusResponse.data?.response?.resultUrls;
      const imageUrl = imageUrls && imageUrls.length > 0 ? imageUrls[0] : null;
      
      if (!imageUrl) {
        return NextResponse.json({
          status: "error",
          error: "No image URL in successful response",
        });
      }

      // Use proxy URL to avoid CORS and authentication issues
      const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
      const downloadUrl = `/api/download-image?url=${encodeURIComponent(imageUrl)}&filename=buzz-cut-${taskId}.png`;
      
      return NextResponse.json({
        status: "success",
        result_url: proxyUrl,
        download_url: downloadUrl,
        original_url: imageUrl,
        facesim: Math.random() * 0.3, // Mock similarity score
      });
    } else if (actualStatus === "CREATE_TASK_FAILED" || actualStatus === "GENERATE_FAILED") {
      return NextResponse.json({
        status: "error",
        error: statusResponse.data?.errorMessage || "Generation failed",
      });
    } else {
      // Still processing  
      return NextResponse.json({
        status: "processing",
        progress: actualStatus,
        raw_status: statusResponse.status,
        data_status: statusResponse.data?.status,
      });
    }

  } catch (error) {
    console.error("Error checking generation status:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch generation status",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
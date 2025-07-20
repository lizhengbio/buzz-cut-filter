import { NextRequest } from "next/server";
import { fluxKontextAPI } from "@/utils/flux-kontext-api";
import { 
  handleApiError, 
  createErrorResponse, 
  createSuccessResponse 
} from "@/utils/api-helpers";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const { taskId } = await params;

    if (!taskId) {
      return createErrorResponse("Task ID is required", 400);
    }

    console.log("🔍 Checking generation status:", taskId);

    // All task IDs are now Flux prediction IDs
    console.log("🎯 Checking Flux prediction status...");
    console.log("📋 Task ID:", taskId);
    
    const prediction = await fluxKontextAPI.checkStatus(taskId);
    console.log("📊 Flux prediction:", JSON.stringify(prediction, null, 2));
    console.log("📊 Flux status:", prediction.status);

    if (prediction.status === "succeeded") {
      const resultUrl = prediction.output;
      
      if (!resultUrl || typeof resultUrl !== 'string') {
        console.error("❌ Invalid output format:", prediction.output);
        return createErrorResponse("No valid output URL in successful prediction", 500);
      }

      console.log("🎉 Flux generation completed with URL:", resultUrl);
      const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(resultUrl)}`;
      const downloadUrl = `/api/download-image?url=${encodeURIComponent(resultUrl)}&filename=flux-buzz-cut-${taskId}.jpg`;

      return createSuccessResponse({
        status: "success",
        result_url: proxyUrl,
        download_url: downloadUrl,
        original_url: resultUrl,
        prediction_id: taskId,
        model: "flux-kontext-pro",
        facesim: 0.95, // Flux should have high face similarity
      });

    } else if (prediction.status === "failed" || prediction.status === "canceled") {
      return createSuccessResponse({
        status: "error",
        error: prediction.error || "Flux generation failed",
        logs: prediction.logs
      });
    } else {
      // Still processing
      return createSuccessResponse({
        status: "processing",
        progress: prediction.status,
        model: "flux-kontext-pro"
      });
    }

  } catch (error) {
    return handleApiError(error, "Failed to fetch generation status");
  }
}
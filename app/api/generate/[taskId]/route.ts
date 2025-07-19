import { NextRequest, NextResponse } from "next/server";
import { fluxAPI } from "@/utils/flux-api";

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

    // Check Flux prediction status
    const prediction = await fluxAPI.checkStatus(taskId);

    // Return appropriate result based on status
    switch (prediction.status) {
      case "succeeded":
        if (!prediction.output) {
          return NextResponse.json({
            status: "error",
            error: "Generation succeeded but no output image"
          });
        }

        // Create proxy URL to avoid CORS issues
        const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(prediction.output)}`;
        const downloadUrl = `/api/download-image?url=${encodeURIComponent(prediction.output)}&filename=buzz-cut-${taskId}.png`;

        return NextResponse.json({
          status: "success",
          result_url: proxyUrl,
          download_url: downloadUrl,
          original_url: prediction.output
        });

      case "failed":
      case "canceled":
        return NextResponse.json({
          status: "error",
          error: prediction.error || "Generation failed"
        });

      default:
        // Still processing
        return NextResponse.json({
          status: "processing",
          progress: prediction.status
        });
    }

  } catch (error) {
    console.error("Status check failed:", error);
    return NextResponse.json(
      { 
        error: "Status check failed",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
import { NextRequest } from "next/server";
import { fluxKontextAPI } from "@/utils/flux-kontext-api";
import { 
  handleApiError, 
  createErrorResponse, 
  createSuccessResponse,
  validateImageData,
  validateRequiredEnvVars 
} from "@/utils/api-helpers";

export async function POST(request: NextRequest) {
  try {
    // Validate environment
    validateRequiredEnvVars(["REPLICATE_API_TOKEN"]);
    
    const body = await request.json();
    const { image_base64, color, tier, retry_count = 0 } = body;

    // Validate input
    validateImageData(image_base64);
    
    if (!color) {
      return createErrorResponse("Color parameter is required", 400);
    }

    console.log("🚀 Generating buzz cut with Flux Kontext Pro");
    console.log("🎨 Color:", color);
    console.log("📊 Base64 size:", image_base64.length);
    
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

    // Return standardized response
    return createSuccessResponse({
      task_id: prediction.id,
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
    return handleApiError(error, "Failed to create generation task");
  }
}
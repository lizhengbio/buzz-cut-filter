import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { fluxKontextAPI } from "@/utils/flux-kontext-api";
import { deductCredits, canGenerate } from "@/utils/credits";
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
    
    const supabase = await createClient();
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return createErrorResponse("Authentication required. Please sign in to generate images.", 401);
    }
    
    const body = await request.json();
    const { image_base64, color, tier, retry_count = 0 } = body;

    // Validate input
    validateImageData(image_base64);
    
    if (!color) {
      return createErrorResponse("Color parameter is required", 400);
    }

    // Check if user can generate (has sufficient credits or subscription)
    const { canGenerate: canGen, credits, isSubscribed } = await canGenerate(user.id);
    
    if (!canGen) {
      return createErrorResponse(
        `Insufficient credits. You have ${credits} credits but need 5 credits to generate. ${
          credits === 0 ? "Sign in daily to receive 10 free credits!" : ""
        }`, 
        402 // Payment Required
      );
    }

    console.log("🚀 Generating buzz cut with Flux Kontext Pro");
    console.log("🎨 Color:", color);
    console.log("📊 Base64 size:", image_base64.length);
    console.log(`👤 User: ${user.id} (Subscribed: ${isSubscribed}, Credits: ${credits})`);
    
    // For free users, deduct 5 credits before generation
    if (!isSubscribed) {
      const deducted = await deductCredits(
        user.id, 
        5, 
        "Buzz cut generation", 
        { 
          color,
          generation_type: "buzz_cut",
          user_email: user.email 
        }
      );
      
      if (!deducted) {
        return createErrorResponse("Failed to deduct credits. Please try again.", 500);
      }
      
      console.log(`💳 Deducted 5 credits from user ${user.id}`);
    }
    
    try {
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
          model: "flux-kontext-pro",
          user_id: user.id,
          credits_deducted: !isSubscribed ? 5 : 0
        }
      });
    } catch (generationError) {
      // If generation fails, refund credits for free users
      if (!isSubscribed) {
        try {
          // Note: We would need to create a refundCredits function
          // For now, we'll log this case
          console.error(`❌ Generation failed for user ${user.id}, should refund 5 credits`);
        } catch (refundError) {
          console.error("Failed to refund credits:", refundError);
        }
      }
      throw generationError;
    }

  } catch (error) {
    return handleApiError(error, "Failed to create generation task");
  }
}
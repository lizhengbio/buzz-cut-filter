/**
 * Flux Kontext Pro API Integration
 * 
 * This module provides functions to interact with black-forest-labs/flux-kontext-pro
 * for generating buzz cut images with face preservation.
 */

const MODEL_VERSION = "4e8d527dd58f382067616cd3ce85e6d9ff4d5ce512cc055f2cb78300ad21e27a";
const REPLICATE_API_BASE = "https://api.replicate.com/v1";

interface FluxKontextRequest {
  prompt: string;
  input_image: string;
  aspect_ratio?: string;
  output_format?: string;
  safety_tolerance?: number;
  prompt_upsampling?: boolean;
  seed?: number;
}

interface FluxKontextResponse {
  id: string;
  status: "starting" | "processing" | "succeeded" | "failed" | "canceled";
  output?: string;
  error?: string;
  logs?: string;
}

/**
 * Generate buzz cut with face preservation using Flux Kontext Pro
 */
export async function generateBuzzCutWithFaceID(
  imageDataUrl: string,
  color: string,
  options: {
    safetyTolerance?: number;
    promptUpsampling?: boolean;
    seed?: number;
  } = {}
): Promise<FluxKontextResponse> {
  const apiToken = process.env.REPLICATE_API_TOKEN;
  if (!apiToken) {
    throw new Error("REPLICATE_API_TOKEN is required");
  }

  console.log("🚀 Starting Flux Kontext Pro generation...");
  console.log("🎨 Color:", color);

  const prompt = `Change the hairstyle to a buzz cut with ${color}. Keep the person's face, facial features, and expression exactly the same. The new hairstyle should look natural and realistic, blending seamlessly with the original lighting and photo style. IMPORTANT: Only modify the hair, preserve all facial features, skin tone, and identity.`;

  const requestBody: FluxKontextRequest = {
    prompt: prompt,
    input_image: imageDataUrl,
    aspect_ratio: "match_input_image",
    output_format: "png",
    safety_tolerance: options.safetyTolerance || 2,
    prompt_upsampling: options.promptUpsampling || false,
    seed: options.seed || Math.floor(Math.random() * 1000000)
  };

  console.log("📝 Prompt:", prompt);

  try {
    const response = await fetch(`${REPLICATE_API_BASE}/predictions`, {
      method: "POST",
      headers: {
        "Authorization": `Token ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: MODEL_VERSION,
        input: requestBody
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Flux API Error:", errorText);
      throw new Error(`Flux API request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ Flux prediction created:", data.id);
    
    return data;
  } catch (error) {
    console.error("💥 Error generating with Flux:", error);
    throw error;
  }
}

/**
 * Check the status of a Flux generation
 */
export async function checkStatus(predictionId: string): Promise<FluxKontextResponse> {
  const apiToken = process.env.REPLICATE_API_TOKEN;
  if (!apiToken) {
    throw new Error("REPLICATE_API_TOKEN is required");
  }

  console.log("🔍 Checking Flux status:", predictionId);
  
  try {
    const response = await fetch(`${REPLICATE_API_BASE}/predictions/${predictionId}`, {
      method: "GET",
      headers: {
        "Authorization": `Token ${apiToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Flux status check error:", errorText);
      throw new Error(`Flux status check failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log("📊 Flux status:", data.status);
    
    return data;
  } catch (error) {
    console.error("💥 Error checking Flux status:", error);
    throw error;
  }
}

/**
 * Generate hair mask (placeholder for future implementation)
 */
export async function generateHairMask(imageDataUrl: string): Promise<string | null> {
  console.log("✂️ Hair segmentation not implemented, proceeding without mask");
  return null; // No mask available, will use full image editing
}

// Legacy export for backward compatibility
export const fluxKontextAPI = {
  generateBuzzCutWithFaceID,
  checkStatus,
  generateHairMask
};
/**
 * Flux Kontext Pro API Integration
 * 
 * This module provides functions to interact with black-forest-labs/flux-kontext-pro
 * for generating buzz cut images with face preservation using advanced techniques.
 */

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const REPLICATE_API_BASE = "https://api.replicate.com/v1";

interface FluxKontextRequest {
  prompt: string; // Required: text description
  input_image: string; // Image to use as reference
  aspect_ratio?: string; // Default: "match_input_image"
  output_format?: string; // Default: "png"
  safety_tolerance?: number; // Default: 2 (0-6)
  prompt_upsampling?: boolean; // Default: false
  seed?: number; // Optional seed for reproducibility
}

interface FluxKontextResponse {
  id: string;
  status: "starting" | "processing" | "succeeded" | "failed" | "canceled";
  urls?: {
    get: string;
    cancel: string;
  };
  output?: string[]; // Array of generated image URLs
  error?: string;
  logs?: string;
}

export class FluxKontextAPI {
  private apiToken: string;
  
  constructor(apiToken?: string) {
    const token = apiToken || REPLICATE_API_TOKEN;
    if (!token) {
      throw new Error("REPLICATE_API_TOKEN is required for FluxKontextAPI");
    }
    this.apiToken = token;
  }

  /**
   * Generate buzz cut with face preservation using Flux Kontext Pro
   */
  async generateBuzzCutWithFaceID(
    imageDataUrl: string,
    color: string,
    options: {
      seed?: number;
      safetyTolerance?: number;
      promptUpsampling?: boolean;
    } = {}
  ): Promise<FluxKontextResponse> {
    console.log("🚀 Starting Flux Kontext Pro generation...");
    console.log("🎨 Color:", color);
    console.log("📊 Image data size:", imageDataUrl.length);

    // Generate enhanced prompt based on BYLO AI template
    const prompt = `Change the hairstyle to a buzz cut with ${color}. Keep the person's face, facial features, and expression exactly the same. The new hairstyle should look natural and realistic, blending seamlessly with the original lighting and photo style.`;

    const requestBody: FluxKontextRequest = {
      prompt: prompt,
      input_image: imageDataUrl, // Use data URL directly
      aspect_ratio: "match_input_image",
      output_format: "png",
      safety_tolerance: options.safetyTolerance || 2,
      prompt_upsampling: options.promptUpsampling || false,
      seed: options.seed || Math.floor(Math.random() * 1000000)
    };

    console.log("📝 Final prompt:", prompt);
    console.log("🔧 Parameters:", {
      aspect_ratio: requestBody.aspect_ratio,
      output_format: requestBody.output_format,
      safety_tolerance: requestBody.safety_tolerance,
      seed: requestBody.seed
    });

    try {
      console.log("📡 Sending request to Replicate API...");
      console.log("🔑 API Token (first 10 chars):", this.apiToken.substring(0, 10) + "...");
      
      const requestPayload = {
        version: "4e8d527dd58f382067616cd3ce85e6d9ff4d5ce512cc055f2cb78300ad21e27a",
        input: requestBody,
      };
      
      console.log("📦 Request payload:", JSON.stringify({...requestPayload, input: {...requestPayload.input, input_image: "[BASE64_DATA]"}}, null, 2));
      
      const response = await fetch(`${REPLICATE_API_BASE}/predictions`, {
        method: "POST",
        headers: {
          "Authorization": `Token ${this.apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Flux API Error:", errorText);
        throw new Error(`Flux API request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log("✅ Flux generation started:", data);
      return data;

    } catch (error) {
      console.error("💥 Error with Flux Kontext Pro:", error);
      throw error;
    }
  }


  /**
   * Check prediction status
   */
  async checkStatus(predictionId: string): Promise<FluxKontextResponse> {
    console.log("🔍 Checking Flux prediction status:", predictionId);
    
    try {
      const response = await fetch(`${REPLICATE_API_BASE}/predictions/${predictionId}`, {
        headers: {
          "Authorization": `Token ${this.apiToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Status check error:", errorText);
        throw new Error(`Status check failed: ${response.status} ${response.statusText} - ${errorText}`);
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
   * Wait for prediction to complete
   */
  async waitForCompletion(predictionId: string, maxAttempts: number = 60): Promise<FluxKontextResponse> {
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const status = await this.checkStatus(predictionId);
      
      if (status.status === "succeeded") {
        console.log("✅ Flux generation completed successfully!");
        return status;
      } else if (status.status === "failed" || status.status === "canceled") {
        throw new Error(`Flux generation failed: ${status.error || "Unknown error"}`);
      }
      
      // Wait 2 seconds before next check
      await new Promise(resolve => setTimeout(resolve, 2000));
      attempts++;
      
      console.log(`⏳ Flux generation in progress... (${attempts}/${maxAttempts})`);
    }
    
    throw new Error("Flux generation timeout - maximum attempts reached");
  }

  /**
   * Generate hair mask using segmentation
   */
  async generateHairMask(imageDataUrl: string): Promise<string | null> {
    console.log("✂️ Generating hair segmentation mask...");
    
    try {
      // This would typically use a hair segmentation model
      // For now, return null to indicate no mask available
      // You could integrate with MediaPipe or another segmentation service here
      
      return null; // No mask available, will use full image editing
    } catch (error) {
      console.log("Hair segmentation not available, proceeding without mask");
      return null;
    }
  }
}

// Export singleton instance
export const fluxKontextAPI = new FluxKontextAPI();
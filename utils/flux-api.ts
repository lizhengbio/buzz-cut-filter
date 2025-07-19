/**
 * Flux Kontext Pro API - Simplified version
 * Specialized for buzz cut image generation
 */

// Environment configuration
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const REPLICATE_API_BASE = "https://api.replicate.com/v1";
const FLUX_MODEL_VERSION = "4e8d527dd58f382067616cd3ce85e6d9ff4d5ce512cc055f2cb78300ad21e27a";

// Type definitions
interface FluxPrediction {
  id: string;
  status: "starting" | "processing" | "succeeded" | "failed" | "canceled";
  output?: string; // Generated image URL
  error?: string;
  logs?: string;
}

interface GenerateOptions {
  safetyTolerance?: number;
  seed?: number;
}

class FluxAPI {
  private apiToken: string;
  
  constructor() {
    if (!REPLICATE_API_TOKEN) {
      throw new Error("REPLICATE_API_TOKEN environment variable not configured");
    }
    this.apiToken = REPLICATE_API_TOKEN;
  }

  /**
   * Generate buzz cut hairstyle effect
   */
  async generateBuzzCut(
    imageDataUrl: string,
    color: string,
    options: GenerateOptions = {}
  ): Promise<FluxPrediction> {
    // Build prompt
    const prompt = `Change the hairstyle to a buzz cut with ${color} hair. Keep the person's face, facial features, and expression exactly the same. The new hairstyle should look natural and realistic.`;

    // Request parameters
    const requestBody = {
      version: FLUX_MODEL_VERSION,
      input: {
        prompt,
        input_image: imageDataUrl,
        aspect_ratio: "match_input_image",
        output_format: "png",
        safety_tolerance: options.safetyTolerance || 2,
        prompt_upsampling: false,
        seed: options.seed || Math.floor(Math.random() * 1000000)
      }
    };

    // Send request
    const response = await fetch(`${REPLICATE_API_BASE}/predictions`, {
      method: "POST",
      headers: {
        "Authorization": `Token ${this.apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Flux API request failed: ${response.status} - ${errorText}`);
    }

    return await response.json();
  }

  /**
   * Check generation status
   */
  async checkStatus(predictionId: string): Promise<FluxPrediction> {
    const response = await fetch(`${REPLICATE_API_BASE}/predictions/${predictionId}`, {
      headers: {
        "Authorization": `Token ${this.apiToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Status check failed: ${response.status} - ${errorText}`);
    }

    return await response.json();
  }
}

// Export singleton
export const fluxAPI = new FluxAPI(); 
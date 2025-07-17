/**
 * Face Protection and Hair Segmentation Utilities
 * 
 * This module provides utilities for protecting face features while editing hair
 * using advanced inpainting and ControlNet techniques.
 */

export interface FaceProtectionConfig {
  preserveFace: boolean;
  useHairMask: boolean;
  faceIdStrength: number;
  maskFeather: number;
}

export interface HairSegmentationResult {
  hairMask: string; // Base64 mask image
  faceMask: string; // Base64 face protection mask
  originalImage: string;
}

/**
 * Enhanced buzz cut generation with face protection
 */
export class FaceProtectedBuzzCutGenerator {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string = "https://api.kie.ai") {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  /**
   * Generate buzz cut with face ID control and hair masking
   */
  async generateWithFaceProtection(
    imageBase64: string,
    color: string,
    config: FaceProtectionConfig = {
      preserveFace: true,
      useHairMask: true,
      faceIdStrength: 0.8,
      maskFeather: 10
    }
  ): Promise<any> {
    console.log("🛡️ Starting face-protected buzz cut generation...");

    try {
      // Step 1: Generate hair segmentation mask
      const segmentation = await this.generateHairMask(imageBase64);
      
      // Step 2: Extract face embedding for ID control
      const faceEmbedding = await this.extractFaceEmbedding(imageBase64);
      
      // Step 3: Generate buzz cut with ControlNet + IP-Adapter
      const result = await this.generateWithControlNet(
        imageBase64,
        segmentation.hairMask,
        faceEmbedding,
        color,
        config
      );
      
      return result;
    } catch (error) {
      console.error("❌ Face-protected generation failed:", error);
      
      // Fallback to simple generation
      console.log("🔄 Falling back to simple generation...");
      return this.generateSimpleBuzzCut(imageBase64, color);
    }
  }

  /**
   * Generate hair segmentation mask using MediaPipe or similar
   */
  private async generateHairMask(imageBase64: string): Promise<HairSegmentationResult> {
    console.log("✂️ Generating hair segmentation mask...");
    
    // For now, we'll use a simple approach - in production you'd use MediaPipe Hair Segmentation
    // or a dedicated hair segmentation API
    
    try {
      // Try to use a hair segmentation service
      const response = await fetch(`${this.baseUrl}/api/v1/segmentation/hair`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageBase64,
          type: "hair_mask"
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return {
          hairMask: data.mask,
          faceMask: data.face_mask || "",
          originalImage: imageBase64
        };
      }
    } catch (error) {
      console.log("Hair segmentation service not available, using fallback");
    }

    // Fallback: create a simple mask (placeholder)
    return {
      hairMask: "", // Empty mask means full image editing
      faceMask: "",
      originalImage: imageBase64
    };
  }

  /**
   * Extract face embedding for ID preservation
   */
  private async extractFaceEmbedding(imageBase64: string): Promise<string | null> {
    console.log("👤 Extracting face embedding...");
    
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/face/embedding`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageBase64
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.embedding;
      }
    } catch (error) {
      console.log("Face embedding service not available");
    }

    return null;
  }

  /**
   * Generate with ControlNet and IP-Adapter for face preservation
   */
  private async generateWithControlNet(
    originalImage: string,
    hairMask: string,
    faceEmbedding: string | null,
    color: string,
    config: FaceProtectionConfig
  ): Promise<any> {
    console.log("🎨 Generating with ControlNet + IP-Adapter...");

    const prompt = `Change the hairstyle to a buzz cut with ${color}. Keep the person's face, facial features, and expression exactly the same. The new hairstyle should look natural and realistic, blending seamlessly with the original lighting and photo style. IMPORTANT: Only modify the hair, preserve all facial features, skin tone, and identity.`;

    const requestBody: any = {
      image: originalImage,
      prompt: prompt,
      width: 1024,
      height: 1024,
      style: "realistic",
      // Enhanced parameters for face preservation
      controlnet_type: "inpaint",
      mask_image: hairMask,
      face_id_strength: config.faceIdStrength,
      preserve_face: config.preserveFace,
      mask_feather: config.maskFeather
    };

    // Add face embedding if available
    if (faceEmbedding && config.preserveFace) {
      requestBody.face_embedding = faceEmbedding;
      requestBody.ip_adapter_strength = 0.7;
    }

    const response = await fetch(`${this.baseUrl}/api/v1/gpt4o-image/generate-advanced`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`ControlNet generation failed: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Fallback simple generation
   */
  private async generateSimpleBuzzCut(imageBase64: string, color: string): Promise<any> {
    console.log("🔄 Using simple buzz cut generation...");

    const prompt = `Change the hairstyle to a buzz cut with ${color}. Keep the person's face, facial features, and expression exactly the same. The new hairstyle should look natural and realistic, blending seamlessly with the original lighting and photo style. IMPORTANT: Only modify the hair, preserve all facial features, skin tone, and identity.`;

    // Ensure image format
    let processedImage = imageBase64;
    if (!imageBase64.startsWith('data:image/')) {
      processedImage = `data:image/png;base64,${imageBase64}`;
    }

    const requestBody = {
      image: processedImage,
      prompt: prompt,
      width: 1024,
      height: 1024,
      style: "realistic",
    };

    const response = await fetch(`${this.baseUrl}/api/v1/gpt4o-image/generate`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Simple generation failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("📊 Fallback generation response:", data);

    // Check for API error in response
    if (data.code && data.code !== 200) {
      throw new Error(`API Error ${data.code}: ${data.msg || 'Unknown error'}`);
    }

    // Extract task_id from response - normalize the format
    let taskId = null;
    if (data.data?.taskId) {
      taskId = data.data.taskId;
    } else if (data.task_id) {
      taskId = data.task_id;
    }

    if (!taskId) {
      throw new Error(`No task ID in fallback response: ${JSON.stringify(data)}`);
    }

    // Return normalized response with task_id
    return {
      ...data,
      task_id: taskId
    };
  }
}

// Export singleton instance
export const faceProtectedGenerator = new FaceProtectedBuzzCutGenerator(
  process.env.KIE_API_KEY || ""
);
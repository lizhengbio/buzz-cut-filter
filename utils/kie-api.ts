/**
 * Kie.ai 4O Image API Integration
 * 
 * This module provides functions to interact with the kie.ai 4O Image API
 * for generating buzz cut images with face preservation.
 */

const KIE_API_BASE_URL = process.env.KIE_API_BASE_URL || "https://api.kie.ai";
const KIE_API_KEY = process.env.KIE_API_KEY;

interface KieImageGenerateRequest {
  image: string; // Base64 encoded image
  prompt: string;
  callback_url?: string;
  width?: number;
  height?: number;
  style?: string;
}

interface KieImageGenerateResponse {
  task_id?: string;
  status?: string;
  message?: string;
  code?: number;
  msg?: string;
  data?: any;
}

interface KieImageStatusResponse {
  code: number;
  msg: string;
  data?: {
    taskId: string;
    status: "GENERATING" | "SUCCESS" | "CREATE_TASK_FAILED" | "GENERATE_FAILED";
    response?: {
      resultUrls: string[];
    };
    successFlag: number;
    errorCode?: string;
    errorMessage?: string;
    progress: string;
    completeTime?: number;
    createTime?: number;
  };
  // Legacy fields for backward compatibility
  task_id?: string;
  status?: string;
  result?: {
    image_url: string;
    created_at: string;
  };
  error?: string;
}

interface KieDownloadUrlResponse {
  download_url: string;
  expires_at: string;
}

export class KieImageAPI {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string = KIE_API_KEY, baseUrl: string = KIE_API_BASE_URL) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  /**
   * Generate buzz cut image
   */
  async generateBuzzCut(
    imageBase64: string,
    color: string,
    style: string = "realistic"
  ): Promise<KieImageGenerateResponse> {
    console.log("🚀 Starting buzz cut generation...");
    console.log("📊 Image data size:", imageBase64.length);
    console.log("🎨 Color:", color);
    console.log("🎭 Style:", style);
    
    // Ensure image is in correct format for kie.ai API
    let processedImage = imageBase64;
    if (!imageBase64.startsWith('data:image/')) {
      // Add data URL prefix if not present - try to detect format
      const isJPEG = imageBase64.startsWith('/9j/') || imageBase64.startsWith('iVBORw0KGgo');
      const mimeType = isJPEG ? 'image/jpeg' : 'image/png';
      processedImage = `data:${mimeType};base64,${imageBase64}`;
      console.log("📸 Added data URL prefix:", mimeType, "new size:", processedImage.length);
    } else {
      console.log("📸 Image already has data URL prefix");
    }
    
    console.log("📸 Final image format check:", {
      isDataUrl: processedImage.startsWith('data:image/'),
      length: processedImage.length,
      preview: processedImage.substring(0, 50) + "..."
    });

    // Check image size limit (kie.ai might have size restrictions)
    const maxSize = 10 * 1024 * 1024; // 10MB limit
    if (processedImage.length > maxSize) {
      throw new Error(`Image too large: ${(processedImage.length / 1024 / 1024).toFixed(2)}MB. Maximum allowed: 10MB`);
    }

    const colorPrompts = {
      black: "very short black hair",
      brown: "very short brown hair",
      blonde: "very short blonde hair",
      gray: "very short gray hair",
    };

    const colorPrompt = colorPrompts[color as keyof typeof colorPrompts] || "very short black hair";

    const prompt = `Change the hairstyle to a buzz cut with ${color}. Keep the person's face, facial features, and expression exactly the same. The new hairstyle should look natural and realistic, blending seamlessly with the original lighting and photo style. IMPORTANT: Only modify the hair, preserve all facial features, skin tone, and identity.`;

    const requestBody: KieImageGenerateRequest = {
      image: processedImage,
      prompt: prompt,
      width: 1024,
      height: 1024,
      style: style,
    };

    console.log("📝 Final prompt:", prompt);
    console.log("🖼️ Processed image preview:", processedImage.substring(0, 100) + "...");
    console.log("🌐 API URL:", `${this.baseUrl}/api/v1/gpt4o-image/generate`);
    console.log("🔑 API Key (first 10 chars):", this.apiKey.substring(0, 10) + "...");

    try {
      console.log("📡 Sending request to kie.ai...");
      console.log("📊 Request body size:", JSON.stringify(requestBody).length);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
      
      const response = await fetch(`${this.baseUrl}/api/v1/gpt4o-image/generate`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      console.log("📨 Response status:", response.status);
      console.log("📨 Response headers:", Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ API Error Response:", errorText);
        throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log("✅ Generation response:", data);
      
      // Check for API error in response
      if (data.code && data.code !== 200) {
        throw new Error(`API Error ${data.code}: ${data.msg || 'Unknown error'}`);
      }
      
      // Extract task_id from response - it's in data.data.taskId
      let taskId = null;
      if (data.data?.taskId) {
        taskId = data.data.taskId;
      } else if (data.task_id) {
        taskId = data.task_id;
      }
      
      if (!taskId) {
        throw new Error(`No task ID in API response: ${JSON.stringify(data)}`);
      }
      
      // Return normalized response with task_id
      return {
        ...data,
        task_id: taskId
      };
    } catch (error) {
      console.error("💥 Error generating buzz cut:", error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error("Request timeout - the image processing took too long. Please try with a smaller image.");
        } else if (error.message.includes('fetch failed')) {
          throw new Error("Network connection failed. Please check your internet connection and try again.");
        } else if (error.message.includes('ECONNRESET') || error.message.includes('ENOTFOUND')) {
          throw new Error("Unable to connect to kie.ai API. Please try again later.");
        }
      }
      
      throw error;
    }
  }

  /**
   * Check generation status
   */
  async checkStatus(taskId: string): Promise<KieImageStatusResponse> {
    console.log("🔍 Checking status for task:", taskId);
    
    try {
      const statusUrl = `${this.baseUrl}/api/v1/gpt4o-image/record-info?taskId=${taskId}`;
      console.log("🌐 Status URL:", statusUrl);
      
      const response = await fetch(statusUrl, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
        },
      });

      console.log("📨 Status response:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Status check error:", errorText);
        throw new Error(`Status check failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log("📊 Raw Status Response:", JSON.stringify(data, null, 2));
      console.log("📊 Status field value:", data.status);
      console.log("📊 All response keys:", Object.keys(data));
      
      // Check if data has different structure
      if (data.data) {
        console.log("📊 Data.data content:", JSON.stringify(data.data, null, 2));
      }
      
      return data;
    } catch (error) {
      console.error("💥 Error checking status:", error);
      throw error;
    }
  }

  /**
   * Get download URL
   */
  async getDownloadUrl(imageUrl: string): Promise<KieDownloadUrlResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/gpt4o-image/download-url`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image_url: imageUrl }),
      });

      if (!response.ok) {
        throw new Error(`Download URL request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error getting download URL:", error);
      throw error;
    }
  }

  /**
   * Wait for generation to complete
   */
  async waitForCompletion(taskId: string, maxAttempts: number = 30): Promise<KieImageStatusResponse> {
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const status = await this.checkStatus(taskId);
      
      if (status.status === "SUCCESS") {
        return status;
      } else if (status.status === "CREATE_TASK_FAILED" || status.status === "GENERATE_FAILED") {
        throw new Error(`Generation failed: ${status.error || "Unknown error"}`);
      }
      
      // Wait 2 seconds before next check
      await new Promise(resolve => setTimeout(resolve, 2000));
      attempts++;
    }
    
    throw new Error("Generation timeout - maximum attempts reached");
  }
}

// Export singleton instance
export const kieImageAPI = new KieImageAPI();
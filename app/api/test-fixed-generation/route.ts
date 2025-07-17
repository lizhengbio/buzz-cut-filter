import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image_base64, color = "black" } = body;

    if (!image_base64) {
      return NextResponse.json(
        { error: "Image base64 data is required" },
        { status: 400 }
      );
    }

    console.log("🧪 Testing fixed generation...");
    console.log("Original image data:", {
      length: image_base64.length,
      isDataUrl: image_base64.startsWith('data:image/'),
      preview: image_base64.substring(0, 50) + "..."
    });

    // Ensure proper data URL format
    let processedImage = image_base64;
    if (!image_base64.startsWith('data:image/')) {
      // Detect image format from base64 signature
      const isJPEG = image_base64.startsWith('/9j/');
      const isPNG = image_base64.startsWith('iVBORw0KGgo');
      const mimeType = isJPEG ? 'image/jpeg' : isPNG ? 'image/png' : 'image/png';
      processedImage = `data:${mimeType};base64,${image_base64}`;
      console.log("📸 Fixed image format:", mimeType);
    }

    console.log("Processed image data:", {
      length: processedImage.length,
      isDataUrl: processedImage.startsWith('data:image/'),
      preview: processedImage.substring(0, 50) + "..."
    });

    // Test the actual API call
    const apiKey = process.env.KIE_API_KEY;
    const baseUrl = process.env.KIE_API_BASE_URL || "https://api.kie.ai";
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "KIE_API_KEY environment variable is not configured" },
        { status: 500 }
      );
    }
    
    const prompt = `Change the hairstyle to a buzz cut with ${color}. Keep the person's face, facial features, and expression exactly the same. The new hairstyle should look natural and realistic, blending seamlessly with the original lighting and photo style. IMPORTANT: Only modify the hair, preserve all facial features, skin tone, and identity.`;
    
    console.log("🎯 Using prompt:", prompt);

    const requestBody = {
      image: processedImage,
      prompt: prompt,
      width: 1024,
      height: 1024,
      style: "realistic",
    };

    console.log("📡 Sending test request to kie.ai...");
    const response = await fetch(`${baseUrl}/api/v1/gpt4o-image/generate`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("📨 API Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", errorText);
      return NextResponse.json({
        success: false,
        error: errorText,
        status: response.status,
        processedImagePreview: processedImage.substring(0, 100) + "..."
      });
    }

    const data = await response.json();
    console.log("✅ API Success:", data);

    // Extract task_id
    let taskId = null;
    if (data.data?.taskId) {
      taskId = data.data.taskId;
    } else if (data.task_id) {
      taskId = data.task_id;
    }

    return NextResponse.json({
      success: true,
      taskId: taskId,
      apiResponse: data,
      processedImageInfo: {
        length: processedImage.length,
        isDataUrl: processedImage.startsWith('data:image/'),
        format: processedImage.split(';')[0]?.split(':')[1] || 'unknown'
      }
    });

  } catch (error) {
    console.error("Test generation error:", error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
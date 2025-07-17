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

    console.log("🧪 Testing Flux API directly...");
    
    const apiToken = process.env.REPLICATE_API_TOKEN;
    if (!apiToken) {
      return NextResponse.json(
        { error: "REPLICATE_API_TOKEN environment variable is not configured" },
        { status: 500 }
      );
    }
    console.log("🔑 API Token (first 10 chars):", apiToken.substring(0, 10) + "...");

    const prompt = `Change the hairstyle to a buzz cut with ${color}. Keep the person's face, facial features, and expression exactly the same. The new hairstyle should look natural and realistic, blending seamlessly with the original lighting and photo style.`;

    const requestPayload = {
      version: "4e8d527dd58f382067616cd3ce85e6d9ff4d5ce512cc055f2cb78300ad21e27a",
      input: {
        prompt: prompt,
        input_image: image_base64,
        aspect_ratio: "match_input_image",
        output_format: "png",
        safety_tolerance: 2,
        prompt_upsampling: false,
        seed: Math.floor(Math.random() * 1000000)
      }
    };

    console.log("📝 Prompt:", prompt);
    console.log("📊 Image size:", image_base64.length);
    console.log("🔧 Parameters:", {
      version: requestPayload.version,
      aspect_ratio: requestPayload.input.aspect_ratio,
      output_format: requestPayload.input.output_format,
      safety_tolerance: requestPayload.input.safety_tolerance,
      seed: requestPayload.input.seed
    });

    console.log("📡 Sending request to Replicate...");
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    });

    console.log("📨 Response status:", response.status);
    console.log("📨 Response headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Replicate API Error:", errorText);
      return NextResponse.json({
        success: false,
        status: response.status,
        error: errorText,
        headers: Object.fromEntries(response.headers.entries())
      });
    }

    const data = await response.json();
    console.log("✅ Replicate response:", data);

    return NextResponse.json({
      success: true,
      prediction: data,
      prompt: prompt,
      imageSize: image_base64.length
    });

  } catch (error) {
    console.error("Direct Flux test error:", error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import { kieImageAPI } from "@/utils/kie-api";

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

    console.log("Testing simple prompt generation...");

    // Try a very simple, direct prompt
    const simplePrompt = `Transform this person to have a buzz cut with ${color} hair. Keep the same face.`;
    
    console.log("Simple prompt:", simplePrompt);

    const apiKey = process.env.KIE_API_KEY;
    const baseUrl = process.env.KIE_API_BASE_URL || "https://api.kie.ai";
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "KIE_API_KEY environment variable is not configured" },
        { status: 500 }
      );
    }
    
    // Ensure image format
    let processedImage = image_base64;
    if (!image_base64.startsWith('data:image/')) {
      processedImage = `data:image/png;base64,${image_base64}`;
    }

    const requestBody = {
      image: processedImage,
      prompt: simplePrompt,
      width: 1024,
      height: 1024,
      style: "realistic",
    };

    const response = await fetch(`${baseUrl}/api/v1/gpt4o-image/generate`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("Simple test response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Simple test error:", errorText);
      return NextResponse.json({
        success: false,
        error: errorText,
      });
    }

    const data = await response.json();
    console.log("Simple test response:", data);

    // Extract task_id
    let taskId = null;
    if (data.data?.taskId) {
      taskId = data.data.taskId;
    }

    return NextResponse.json({
      success: true,
      taskId: taskId,
      prompt: simplePrompt,
      response: data,
    });

  } catch (error) {
    console.error("Simple prompt test error:", error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
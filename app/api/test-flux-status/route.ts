import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const predictionId = url.searchParams.get('id');
    
    if (!predictionId) {
      return NextResponse.json(
        { error: "id parameter is required" },
        { status: 400 }
      );
    }
    
    console.log("🔍 Testing Flux status check for:", predictionId);
    
    const apiToken = process.env.REPLICATE_API_TOKEN;
    if (!apiToken) {
      return NextResponse.json(
        { error: "REPLICATE_API_TOKEN environment variable is not configured" },
        { status: 500 }
      );
    }
    console.log("🔑 API Token (first 10 chars):", apiToken.substring(0, 10) + "...");

    console.log("📡 Checking status...");
    const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      headers: {
        "Authorization": `Token ${apiToken}`,
      },
    });

    console.log("📨 Status response:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Status check error:", errorText);
      return NextResponse.json({
        success: false,
        status: response.status,
        error: errorText,
      });
    }

    const data = await response.json();
    console.log("📊 Status data:", JSON.stringify(data, null, 2));

    return NextResponse.json({
      success: true,
      prediction: data,
      predictionId: predictionId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Status check test error:", error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
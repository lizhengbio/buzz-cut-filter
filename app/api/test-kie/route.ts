import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("Testing kie.ai API connection...");
    
    const apiKey = process.env.KIE_API_KEY;
    const baseUrl = process.env.KIE_API_BASE_URL || "https://api.kie.ai";
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "KIE_API_KEY environment variable is not configured" },
        { status: 500 }
      );
    }
    
    console.log("API Key:", apiKey.substring(0, 10) + "...");
    console.log("Base URL:", baseUrl);
    
    // Test a simple API call - we'll create a minimal test request
    const testResponse = await fetch(`${baseUrl}/api/v1/gpt4o-image/generate`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==", // 1x1 pixel PNG
        prompt: "test image",
        width: 1024,
        height: 1024,
      }),
    });

    console.log("Test response status:", testResponse.status);
    console.log("Test response headers:", Object.fromEntries(testResponse.headers.entries()));

    if (!testResponse.ok) {
      const errorText = await testResponse.text();
      console.error("API Error Response:", errorText);
      return NextResponse.json({
        success: false,
        status: testResponse.status,
        statusText: testResponse.statusText,
        error: errorText,
        apiKey: apiKey.substring(0, 10) + "...",
        baseUrl: baseUrl,
      });
    }

    const responseData = await testResponse.json();
    console.log("Test API Response:", responseData);

    return NextResponse.json({
      success: true,
      status: testResponse.status,
      data: responseData,
      apiKey: apiKey.substring(0, 10) + "...",
      baseUrl: baseUrl,
    });

  } catch (error) {
    console.error("kie.ai API test error:", error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : String(error),
        details: "Failed to connect to kie.ai API"
      },
      { status: 500 }
    );
  }
}
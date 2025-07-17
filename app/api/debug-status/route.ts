import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const taskId = url.searchParams.get('taskId');
    
    if (!taskId) {
      return NextResponse.json(
        { error: "taskId parameter is required" },
        { status: 400 }
      );
    }
    
    console.log("Debug: Checking status for task:", taskId);
    
    const apiKey = process.env.KIE_API_KEY;
    const baseUrl = process.env.KIE_API_BASE_URL || "https://api.kie.ai";
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "KIE_API_KEY environment variable is not configured" },
        { status: 500 }
      );
    }
    
    const statusUrl = `${baseUrl}/api/v1/gpt4o-image/record-info?taskId=${taskId}`;
    console.log("Debug: Status URL:", statusUrl);
    
    const response = await fetch(statusUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
    });

    console.log("Debug: Response status:", response.status);
    console.log("Debug: Response headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Debug: Error response:", errorText);
      return NextResponse.json({
        success: false,
        status: response.status,
        error: errorText,
      });
    }

    const data = await response.json();
    console.log("Debug: Full API Response:", JSON.stringify(data, null, 2));

    return NextResponse.json({
      success: true,
      taskId: taskId,
      rawResponse: data,
      statusField: data.status,
      allKeys: Object.keys(data),
      hasData: !!data.data,
      dataContent: data.data || null,
    });

  } catch (error) {
    console.error("Debug status error:", error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
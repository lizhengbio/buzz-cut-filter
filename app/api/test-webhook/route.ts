import { NextResponse } from "next/server";
import { headers } from "next/headers";

/**
 * 测试webhook端点，用于验证webhook配置是否正确
 */
export async function POST(request: Request) {
  try {
    const body = await request.text();
    const headersList = headers();
    
    const allHeaders = {} as Record<string, string>;
    for (const [key, value] of (await headersList).entries()) {
      allHeaders[key] = value;
    }

    console.log('🔔 Test webhook received:', {
      timestamp: new Date().toISOString(),
      method: request.method,
      url: request.url,
      headers: allHeaders,
      body: body ? JSON.parse(body) : 'No body',
      bodyLength: body.length
    });

    return NextResponse.json({
      success: true,
      message: 'Test webhook received successfully',
      timestamp: new Date().toISOString(),
      received_headers: allHeaders,
      body_length: body.length,
      parsed_body: body ? JSON.parse(body) : null
    });

  } catch (error) {
    console.error('❌ Test webhook error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Test webhook endpoint is working',
    timestamp: new Date().toISOString(),
    endpoint: '/api/test-webhook'
  });
}
import { headers } from "next/headers";
import { NextResponse } from "next/server";

/**
 * 调试版webhook端点 - 记录所有请求详情，不验证签名
 */
export async function POST(request: Request) {
  try {
    const body = await request.text();
    const headersList = headers();
    
    const allHeaders = {} as Record<string, string>;
    for (const [key, value] of (await headersList).entries()) {
      allHeaders[key] = value;
    }

    const timestamp = new Date().toISOString();
    
    console.log('🔍 DEBUG WEBHOOK - Received request:', {
      timestamp,
      method: request.method,
      url: request.url,
      headers: allHeaders,
      bodyLength: body.length,
      body: body ? JSON.parse(body) : null
    });

    // 记录到内存日志
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/webhook-logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'debug_webhook_received',
          data: {
            timestamp,
            headers: allHeaders,
            bodyLength: body.length,
            body: body ? JSON.parse(body) : null
          }
        })
      });
    } catch (logError) {
      console.error('Failed to log debug webhook:', logError);
    }

    return NextResponse.json({
      success: true,
      message: 'Debug webhook received',
      timestamp,
      debug_info: {
        headers: allHeaders,
        body_length: body.length,
        parsed_body: body ? JSON.parse(body) : null
      }
    });

  } catch (error) {
    console.error('❌ Debug webhook error:', error);
    
    // 即使出错也要记录
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/webhook-logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'debug_webhook_error',
          data: {
            timestamp: new Date().toISOString(),
            error: error.message
          }
        })
      });
    } catch (logError) {
      console.error('Failed to log debug webhook error:', logError);
    }

    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 200 }); // 返回200以避免Creem重试
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Debug webhook endpoint is working',
    timestamp: new Date().toISOString(),
    endpoint: '/api/debug-webhook',
    instructions: {
      main_webhook: '/api/webhooks/creem',
      debug_webhook: '/api/debug-webhook (no signature verification)',
      test_webhook: '/api/test-webhook'
    }
  });
}
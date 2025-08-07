import { NextResponse } from "next/server";

/**
 * 测试webhook配置的调试端点
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const testUrl = url.searchParams.get('test_url');

  try {
    // 1. 检查环境变量
    const envCheck = {
      CREEM_WEBHOOK_SECRET: !!process.env.CREEM_WEBHOOK_SECRET,
      CREEM_API_KEY: !!process.env.CREEM_API_KEY,
      CREEM_API_URL: process.env.CREEM_API_URL,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL
    };

    // 2. 检查本地webhook端点是否可访问
    const localWebhookTest = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/test-webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: 'local webhook test' })
    }).then(res => res.json()).catch(err => ({ error: err.message }));

    let externalTest = null;
    if (testUrl) {
      // 3. 如果提供了外部URL，测试外部访问
      try {
        externalTest = await fetch(`${testUrl}/api/test-webhook`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ test: 'external webhook test' })
        }).then(res => res.json());
      } catch (err) {
        externalTest = { error: err.message };
      }
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      environment_check: envCheck,
      local_webhook_test: localWebhookTest,
      external_webhook_test: externalTest,
      webhook_endpoints: {
        main: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/webhooks/creem`,
        test: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/test-webhook`
      },
      instructions: {
        localhost_issue: testUrl ? null : "如果使用localhost，Creem无法访问。请使用ngrok等工具暴露端点。",
        how_to_test: "使用 ?test_url=https://your-ngrok-url.ngrok.io 参数测试外部访问",
        creem_config: "确保在Creem dashboard中配置了正确的webhook URL"
      }
    });

  } catch (error) {
    return NextResponse.json({
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
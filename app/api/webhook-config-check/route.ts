import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 获取当前ngrok URL
    let ngrokUrl = null;
    try {
      const ngrokResponse = await fetch('http://localhost:4040/api/tunnels');
      const ngrokData = await ngrokResponse.json();
      ngrokUrl = ngrokData.tunnels?.[0]?.public_url;
    } catch (error) {
      console.error('Failed to get ngrok URL:', error);
    }

    const webhookEndpoints = {
      main: ngrokUrl ? `${ngrokUrl}/api/webhooks/creem` : 'ngrok not available',
      debug: ngrokUrl ? `${ngrokUrl}/api/debug-webhook` : 'ngrok not available',
      test: ngrokUrl ? `${ngrokUrl}/api/test-webhook` : 'ngrok not available'
    };

    // 测试本地端点
    const testResults = [];
    
    for (const [name, url] of Object.entries(webhookEndpoints)) {
      if (url.includes('ngrok not available')) continue;
      
      try {
        const testResponse = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ test: `${name} endpoint test` })
        });
        
        testResults.push({
          endpoint: name,
          url,
          status: testResponse.status,
          success: testResponse.ok
        });
      } catch (error) {
        testResults.push({
          endpoint: name,
          url,
          status: 'error',
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      ngrok_status: {
        running: !!ngrokUrl,
        url: ngrokUrl,
        web_interface: 'http://localhost:4040'
      },
      webhook_endpoints: webhookEndpoints,
      endpoint_tests: testResults,
      creem_configuration: {
        recommended_webhook_url: webhookEndpoints.main,
        backup_debug_url: webhookEndpoints.debug,
        environment: {
          CREEM_WEBHOOK_SECRET: !!process.env.CREEM_WEBHOOK_SECRET,
          CREEM_API_KEY: !!process.env.CREEM_API_KEY,
          CREEM_API_URL: process.env.CREEM_API_URL
        }
      },
      troubleshooting: {
        steps: [
          "1. 确认Creem Dashboard中webhook URL设置为: " + webhookEndpoints.main,
          "2. 确认webhook状态为'Active'",
          "3. 确认已选择正确的事件类型 (checkout.completed, subscription.active等)",
          "4. 测试支付后检查Creem Dashboard中的webhook日志",
          "5. 如果Creem显示webhook失败，可以临时使用debug端点: " + webhookEndpoints.debug
        ]
      }
    });

  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
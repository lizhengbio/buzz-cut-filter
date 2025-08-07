import { NextResponse } from "next/server";

// 简单的内存日志存储（仅用于调试）
let webhookLogs: Array<{
  timestamp: string;
  type: string;
  data: any;
}> = [];

export async function GET() {
  return NextResponse.json({
    logs: webhookLogs.slice(-20), // 返回最近20条日志
    total: webhookLogs.length
  });
}

export async function POST(request: Request) {
  try {
    const { type, data } = await request.json();
    
    webhookLogs.push({
      timestamp: new Date().toISOString(),
      type,
      data
    });

    // 只保留最近100条日志
    if (webhookLogs.length > 100) {
      webhookLogs = webhookLogs.slice(-100);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE() {
  webhookLogs = [];
  return NextResponse.json({ success: true, message: 'Logs cleared' });
}
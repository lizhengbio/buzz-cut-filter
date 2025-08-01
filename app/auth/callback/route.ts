import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // 创建一个临时页面来处理客户端重定向
  const targetUrl = redirectTo ? `${origin}${redirectTo}` : `${origin}/dashboard`;
  
  // 返回一个HTML页面，使用JavaScript强制完全刷新
  return new NextResponse(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Redirecting...</title>
        <script>
          // 强制完全刷新页面，清除所有缓存
          window.location.href = "${targetUrl}";
        </script>
      </head>
      <body>
        <p>Redirecting...</p>
      </body>
    </html>
  `, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}

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

  if (redirectTo) {
    // 添加查询参数强制刷新客户端状态
    const redirectUrl = new URL(`${origin}${redirectTo}`);
    redirectUrl.searchParams.set('auth_callback', 'true');
    return NextResponse.redirect(redirectUrl);
  }

  // URL to redirect to after sign up process completes
  // 添加查询参数强制刷新客户端状态
  const dashboardUrl = new URL(`${origin}/dashboard`);
  dashboardUrl.searchParams.set('auth_callback', 'true');
  return NextResponse.redirect(dashboardUrl);
}

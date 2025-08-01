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

  console.log("🔍 Auth Callback Debug:");
  console.log("Full URL:", request.url);
  console.log("Code:", code);
  console.log("Origin:", origin);
  console.log("Redirect To:", redirectTo);

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // 强制所有 OAuth 登录都跳转到 dashboard
  const dashboardUrl = `${origin}/dashboard`;
  console.log("Force redirect to dashboard:", dashboardUrl);
  return NextResponse.redirect(dashboardUrl);
}

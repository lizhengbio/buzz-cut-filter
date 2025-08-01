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

  if (redirectTo) {
    const finalUrl = `${origin}${redirectTo}`;
    console.log("Redirecting to:", finalUrl);
    return NextResponse.redirect(finalUrl);
  }

  // URL to redirect to after sign up process completes
  const defaultUrl = `${origin}/dashboard`;
  console.log("Default redirect to:", defaultUrl);
  return NextResponse.redirect(defaultUrl);
}

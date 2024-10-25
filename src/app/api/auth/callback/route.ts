// Google認証からのリダイレクトを管理するAPI
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  // クエリパラメータからアクセストークンを取得
  const code = requestUrl.searchParams.get("code");

  // アクセストークンが存在する場合にcookieを使用してSupabaseクライアントを初期化し、セッションを交換
  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    // SupabaseにOAuth認証コードを渡してセッション情報を取得
    await supabase.auth.exchangeCodeForSession(code);
  }

  // 認証処理が完了後、元のページまたはトップページにリダイレクト
  return NextResponse.redirect(requestUrl.origin);
}

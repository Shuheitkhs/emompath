import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // 認証が必要なパスを定義
  const protectedPaths = ["/emoms", "/auth/mypage"];

  // リクエストのパスが認証が必要な場合
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    const accessToken = req.cookies.get("supabase-auth-token")?.value;

    if (!accessToken) {
      // 認証されていない場合は、サインインページにリダイレクト
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    // アクセストークンを使用してユーザー情報を取得
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      // トークンが無効な場合は、サインインページにリダイレクト
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
  }

  return res;
}

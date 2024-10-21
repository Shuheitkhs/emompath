import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  // 認証が必要なパスを定義
  const protectedPaths = ["/emoms", "/auth/mypage"];

  // リクエストのパスが認証が必要な場合
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    // アクセストークンを使用してユーザー情報を取得
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      // トークンが無効な場合は、サインインページにリダイレクト
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
  }

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession();

  return res;
}

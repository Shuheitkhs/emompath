// サインイン用のAPI
// 認証はデータのCRUD操作とは別に管理し、役割を明確に分離する
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // リクエストのボディをJSONとして解析し、emailとpasswordとして取得
  const { email, password } = await request.json();

  // メールアドレスかパスワードがfalseの場合エラー表示。
  if (!email || !password) {
    return NextResponse.json(
      { error: "メールアドレスとパスワードが必要です。" },
      { status: 400 }
    );
  }
  // サインインへのリクエストの返答をdataかエラーに格納
  const supabase = createRouteHandlerClient({ cookies: () => cookies() });
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  // エラーかセッション取得できなかった場合のハンドリング
  if (error || !data.session) {
    return NextResponse.json(
      { error: error?.message || "Failed to sign in" },
      { status: 401 }
    );
  }

  // サインインに成功した場合、セッション情報をクッキーに保存
  const response = NextResponse.json({ message: "Signed in successfully" });
  response.headers.set(
    "Set-Cookie",
    `supabase-auth-token=${data.session.access_token}; Path=/; HttpOnly; Secure; SameSite=Strict;`
  );

  // 認証テスト
  return response;
}

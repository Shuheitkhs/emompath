import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    // リクエストのボディをJSONとして解析
    const { email, password } = await request.json();

    // バリデーション: メールアドレスとパスワードが存在するか確認
    if (!email || !password) {
      return NextResponse.json(
        { error: "メールアドレスとパスワードが必要です。" },
        { status: 400 }
      );
    }

    // Supabaseクライアントの初期化
    const supabase = createRouteHandlerClient({ cookies: () => cookies() });

    // サインイン処理
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // エラーハンドリング
    if (error || !data.session) {
      return NextResponse.json(
        { error: error?.message || "サインインに失敗しました。" },
        { status: 401 }
      );
    }

    // サインイン成功時、セッション情報はクッキーに自動的に保存されます

    // リダイレクトURLを指定（必要に応じて変更）
    const redirectUrl = "/emoms";

    // 成功レスポンスとリダイレクト
    return NextResponse.json(
      { message: "サインインに成功しました。" },
      { status: 200, headers: { Location: redirectUrl } }
    );
  } catch (err) {
    console.error("サインインAPIエラー:", err);
    return NextResponse.json(
      { error: "予期せぬエラーが発生しました。" },
      { status: 500 }
    );
  }
}

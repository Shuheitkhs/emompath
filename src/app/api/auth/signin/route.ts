// src/app/api/auth/signin/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// サーバーサイド専用のSupabaseクライアントを作成
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // バリデーション
    if (!email || !password) {
      return NextResponse.json(
        { error: "メールアドレスとパスワードが必要です。" },
        { status: 400 }
      );
    }

    // サインイン処理
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // エラーハンドリング
    if (error || !data.session) {
      return NextResponse.json(
        { error: error?.message || "Failed to sign in" },
        { status: 401 }
      );
    }

    // セッション情報をクッキーに保存
    const response = NextResponse.json({ message: "Signed in successfully" });
    response.cookies.set("supabase-auth-token", data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("サインインAPIエラー:", err);
    return NextResponse.json(
      { error: "予期せぬエラーが発生しました。" },
      { status: 500 }
    );
  }
}

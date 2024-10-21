import supabaseAdmin from "@/lib/supabaseAdminClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 入力バリデーション
    if (!email || !password) {
      return NextResponse.json(
        { error: "メールアドレスとパスワードが必要です。" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "メールアドレスの形式ではありません。" },
        { status: 400 }
      );
    }

    if (password.length < 8 || password.length > 20) {
      return NextResponse.json(
        { error: "パスワードは8文字以上、20文字以下で入力してください。" },
        { status: 400 }
      );
    }

    // ユーザー作成
    const { data, error } = await supabaseAdmin.auth.signUp({
      email,
      password,
      // email_confirm: false,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "User created successfully", user: data.user },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "サインアップ中にエラーが発生しました。" },
        { status: 500 }
      );
    }
  }
}

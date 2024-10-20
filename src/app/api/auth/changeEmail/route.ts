import { NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabaseAdminClient";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function PATCH(request: Request) {
  try {
    const { email: newEmail } = await request.json();

    // 入力バリデーション
    if (!newEmail) {
      return NextResponse.json(
        { error: "新しいメールアドレスが必要です。" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      return NextResponse.json(
        { error: "有効なメールアドレスを入力してください。" },
        { status: 400 }
      );
    }

    // クライアントサイドからセッション情報を取得
    const supabase = createRouteHandlerClient({ cookies: () => cookies() });

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: "認証されていません。" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // メールアドレスの更新（管理者クライアントを使用）
    const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      email: newEmail,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        message:
          "メールアドレスが正常に更新されました。再度ログインしてください。",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating email:", error);
    if (error instanceof Error)
      return NextResponse.json(
        { error: "メールアドレスの更新中にエラーが発生しました。" },
        { status: 500 }
      );
  }
}

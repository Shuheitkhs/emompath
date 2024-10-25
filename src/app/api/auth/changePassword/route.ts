import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import supabaseAdmin from "@/lib/supabaseAdminClient";
import { z } from "zod";

// バリデーションスキーマ
const schema = z.object({
  newPassword: z
    .string()
    .min(8, { message: "新しいパスワードは8文字以上で入力してください。" }),
});

// auth.usersの一部を変更するのでPATCHメソッド
export async function PATCH(request: Request) {
  try {
    // リクエストボディから現在のパスワードと新しいパスワードを取得
    const { currentPassword, newPassword } = await request.json();

    // 入力バリデーション
    const result = schema.safeParse({ newPassword });
    if (!result.success) {
      const fieldErrors: { newPassword?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path.includes("newPassword")) {
          fieldErrors.newPassword = err.message;
        }
      });

      return NextResponse.json({ errors: fieldErrors }, { status: 400 });
    }

    // Supabaseクライアントの初期化
    const supabase = createRouteHandlerClient({ cookies: () => cookies() });

    // セッション情報の取得
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

    // 現在のパスワードで再認証: パスワード変更前に確認
    const { error: reAuthError } = await supabase.auth.signInWithPassword({
      email: session.user.email!,
      password: currentPassword,
    });

    if (reAuthError) {
      return NextResponse.json(
        { error: "現在のパスワードが正しくありません。" },
        { status: 400 }
      );
    }

    // パスワードの更新（管理者クライアントを使用）
    const { error: updateError } =
      await supabaseAdmin.auth.admin.updateUserById(userId, {
        password: newPassword,
      });

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        message:
          "パスワードが正常に変更されました。新しいパスワードでログインしてください。",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error changing password:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "パスワードの変更中にエラーが発生しました。" },
        { status: 500 }
      );
    }
  }
}

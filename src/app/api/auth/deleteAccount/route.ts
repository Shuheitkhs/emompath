import { NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabaseAdminClient";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function DELETE() {
  try {
    // ユーザーのセッションを取得
    const supabase = createRouteHandlerClient({ cookies });

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session || !session.user) {
      return NextResponse.json(
        { error: "認証されていません。" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // ユーザーの削除
    const { error: deleteUserError } =
      await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteUserError) {
      throw new Error(deleteUserError.message);
    }

    return NextResponse.json(
      { message: "アカウントが正常に削除されました。" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting account:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "アカウント削除中にエラーが発生しました。" },
        { status: 500 }
      );
    }
  }
}

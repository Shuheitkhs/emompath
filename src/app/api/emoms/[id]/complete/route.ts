// emom完了後のemomとexerciseの更新用API
// 複雑な処理のため、別のAPIに切り出し

import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const emomId = params.id; // 更新するEMOMのIDを取得

  const supabase = createRouteHandlerClient({ cookies: () => cookies() }); // Supabaseクライアントを作成し、クッキーを使って認証情報を保持

  // セッションからユーザーIDを取得
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  // ユーザーが認証されていない場合はエラーレスポンスを返す
  if (sessionError || !sessionData?.session) {
    console.error("Error fetching session:", sessionError?.message);
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const user = sessionData.session.user; // 認証されたユーザー情報を取得

  // リクエストボディから更新データを取得
  const { sets, exercises } = await req.json(); // 更新するセット数とエクササイズの情報を取得

  // EMOMがユーザー所有か確認
  const { data: emomData, error: emomError } = await supabase
    .from("emoms")
    .select("*")
    .eq("id", emomId) // 更新対象のEMOMをIDで検索
    .eq("user_id", user.id) // ユーザーIDが一致するか確認
    .single(); // 結果を一つに絞る

  // EMOMが見つからない、またはユーザーが所有していない場合はエラーレスポンスを返す
  if (emomError || !emomData) {
    return NextResponse.json(
      { error: "EMOM not found or you do not have permission to update it." },
      { status: 404 }
    );
  }

  // トランザクション（一連の操作が全て成功するか全て失敗することを保証するもの）を使用してEMOMと関連するエクササイズを更新
  // Supabaseではトランザクションがネイティブにサポートされていないため、順番に実行

  // 1. EMOMのセット数を更新
  const { error: updateError } = await supabase
    .from("emoms")
    .update({ sets }) // セット数を更新
    .eq("id", emomId); // 更新するEMOMのIDを指定

  // 更新が失敗した場合はエラーレスポンスを返す
  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 400 });
  }

  // 2. 既存のエクササイズを更新
  for (const ex of exercises) {
    // 既存のエクササイズをIDで更新
    const { error: updateExerciseError } = await supabase
      .from("exercises")
      .update({ reps: ex.reps }) // エクササイズのレップ数のみを更新
      .eq("id", ex.id) // エクササイズのIDを指定
      .eq("emom_id", emomId); // EMOMのIDが一致することを確認

    if (updateExerciseError) {
      return NextResponse.json(
        { error: updateExerciseError.message },
        { status: 400 }
      );
    }
  }

  // 3. 更新されたEMOMとエクササイズを取得して返す
  const { data, error: fetchError } = await supabase
    .from("emoms")
    .select("*, exercises(*)") // EMOMと関連するエクササイズを取得
    .eq("id", emomId) // 更新したEMOMのIDを指定
    .single(); // 結果を一つに絞る

  // データの取得が失敗した場合はエラーレスポンスを返す
  if (fetchError || !data) {
    return NextResponse.json(
      { error: fetchError?.message || "Failed to fetch updated EMOM." },
      { status: 400 }
    );
  }

  // 更新されたデータをクライアントに返す
  // 更新が成功した場合、EMOMとその関連エクササイズの最新情報をクライアントに返却
  return NextResponse.json(data, { status: 200 });
}

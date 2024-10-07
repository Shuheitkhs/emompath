import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// GET: 特定のemom_idを持つexerciseに関連するexercise_historiesを取得・/emoms/[id]で使用
export async function GET(req: NextRequest) {
  // クエリパラメータからemom_idを取得
  const { searchParams } = new URL(req.url);
  const emomId = searchParams.get("emom_id");

  // emom_idが指定されていない場合は400エラーレスポンス
  if (!emomId) {
    return NextResponse.json({ error: "emom_id is required" }, { status: 400 });
  }

  // emom_idを持つexercisesを取得
  const supabase = createRouteHandlerClient({ cookies: () => cookies() });
  const { data: exercises, error: exerciseError } = await supabase
    .from("exercises")
    .select("id")
    .eq("emom_id", emomId); //emomidはかならずひとつなので、eqで対応

  if (exerciseError || !exercises || exercises.length === 0) {
    return NextResponse.json(
      { error: exerciseError?.message || "No exercises found" },
      { status: 400 }
    );
  }

  // 取得したexercisesのidのリストを作成
  const exerciseIds = exercises.map((exercise) => exercise.id);

  // 2. 取得したexercise_idを持つexercise_historiesを取得
  const { data: exerciseHistories, error: historyError } = await supabase
    .from("exercise_histories")
    .select("*")
    .in("exercise_id", exerciseIds); //exerciseは複数ありえるのでinで対応

  if (historyError) {
    return NextResponse.json({ error: historyError.message }, { status: 400 });
  }

  return NextResponse.json(exerciseHistories, { status: 200 });
}

import { NextResponse, NextRequest } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// exercise-historiesテーブルの型
export interface ExerciseHistory {
  exercise_id: string; // エクササイズのID
  volume: number; // ボリューム（セット数 × レップ数）
  completed_at: string; // トレーニング完了時刻
}

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies: () => cookies() });

  // セッションからユーザー情報を取得
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError || !sessionData?.session) {
    console.error("Error fetching session:", sessionError?.message);
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const user = sessionData.session.user;

  // リクエストボディからデータを取得
  const { exerciseHistories } = await req.json(); // 複数の履歴を受け取る

  // バリデーション
  if (
    !exerciseHistories ||
    !Array.isArray(exerciseHistories) ||
    exerciseHistories.length === 0
  ) {
    return NextResponse.json(
      { error: "Exercise histories data is required." },
      { status: 400 }
    );
  }

  // 各エクササイズのバリデーション
  for (const history of exerciseHistories) {
    if (!history.exercise_id || typeof history.exercise_id !== "string") {
      return NextResponse.json(
        { error: "Each exercise history must have a valid exercise_id." },
        { status: 400 }
      );
    }
    if (
      !history.volume ||
      typeof history.volume !== "number" ||
      history.volume < 1
    ) {
      return NextResponse.json(
        { error: "Each exercise history must have a valid volume." },
        { status: 400 }
      );
    }
    if (!history.completed_at || typeof history.completed_at !== "string") {
      return NextResponse.json(
        {
          error:
            "Each exercise history must have a valid completed_at timestamp.",
        },
        { status: 400 }
      );
    }
  }

  // ExerciseHistoriesテーブルに挿入
  const { data, error } = await supabase
    .from("exercise-histories")
    .insert(exerciseHistories);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(
    { message: "Exercise histories recorded successfully.", data },
    { status: 200 }
  );
}

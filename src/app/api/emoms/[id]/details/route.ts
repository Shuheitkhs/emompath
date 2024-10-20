import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import supabaseAdmin from "@/lib/supabaseAdminClient";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const emomId = params.id;

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

    // EMOMの詳細情報を取得
    const { data: emom, error: emomError } = await supabaseAdmin
      .from("emoms")
      .select("*")
      .eq("id", emomId)
      .single();

    if (emomError || !emom) {
      return NextResponse.json(
        { error: "EMOMの取得に失敗しました。" },
        { status: 404 }
      );
    }

    if (emom.user_id !== userId) {
      return NextResponse.json(
        { error: "このEMOMにアクセスする権限がありません。" },
        { status: 403 }
      );
    }

    // EMOMに関連するエクササイズを取得
    const { data: exercises, error: exercisesError } = await supabaseAdmin
      .from("exercises")
      .select("*")
      .eq("emom_id", emomId);

    if (exercisesError) {
      return NextResponse.json(
        { error: "エクササイズの取得に失敗しました。" },
        { status: 500 }
      );
    }

    const exerciseIds = exercises.map((ex) => ex.id);

    // 各エクササイズの最新15件の履歴を取得
    const { data: histories, error: historiesError } = await supabaseAdmin
      .from("exercise-histories")
      .select("*")
      .in("exercise_id", exerciseIds)
      .order("completed_at", { ascending: true })
      .limit(15);

    if (historiesError) {
      return NextResponse.json(
        { error: "エクササイズ履歴の取得に失敗しました。" },
        { status: 500 }
      );
    }

    // エクササイズごとに履歴をグループ化
    const historiesByExercise: Record<string, typeof histories> = {};
    exerciseIds.forEach((id) => {
      historiesByExercise[id] = [];
    });
    histories.forEach((history) => {
      if (historiesByExercise[history.exercise_id]) {
        historiesByExercise[history.exercise_id].push(history);
      }
    });

    const responseData = {
      emom,
      exercises: exercises.map((ex) => ({
        ...ex,
        histories: historiesByExercise[ex.id] || [],
      })),
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (err: any) {
    console.error("Error fetching EMOM details:", err);
    return NextResponse.json(
      { error: "詳細情報の取得中にエラーが発生しました。" },
      { status: 500 }
    );
  }
}

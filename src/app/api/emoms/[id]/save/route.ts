import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const emomId = params.id;

  const supabase = createRouteHandlerClient({ cookies: () => cookies() });

  // 認証済みか確認
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

  // リクエストボディの取得
  const { name, sets, ready, exercises } = await request.json();

  // EMOMの存在と所有権の確認
  const { data: emomData, error: emomError } = await supabase
    .from("emoms")
    .select("*")
    .eq("id", emomId)
    .eq("user_id", user.id)
    .single();

  if (emomError || !emomData) {
    return NextResponse.json(
      { error: "EMOM not found or you do not have permission to update it." },
      { status: 404 }
    );
  }

  // EMOMの更新
  const { error: updateError } = await supabase
    .from("emoms")
    .update({ name, sets, ready })
    .eq("id", emomId);
  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 400 });
  }

  // エクササイズの更新・追加
  for (const ex of exercises) {
    if (ex.id) {
      // 既存エクササイズの更新
      const { error: updateExerciseError } = await supabase
        .from("exercises")
        .update({ reps: ex.reps, name: ex.name })
        .eq("id", ex.id)
        .eq("emom_id", emomId);

      if (updateExerciseError) {
        return NextResponse.json(
          { error: updateExerciseError.message },
          { status: 400 }
        );
      }
    }
  }

  // 更新されたデータを返す
  const { data: updatedData, error: fetchUpdatedError } = await supabase
    .from("emoms")
    .select("*, exercises(*)")
    .eq("id", emomId)
    .single();

  if (fetchUpdatedError) {
    return NextResponse.json(
      { error: fetchUpdatedError.message },
      { status: 400 }
    );
  }

  return NextResponse.json(updatedData, { status: 200 });
}

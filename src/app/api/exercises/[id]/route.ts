import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// PUT: exerciseの更新・/emoms/[id]で使用
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies: () => cookies() });
  const exerciseId = params.id;
  const { name, reps } = await req.json();

  // バリデーション
  if (!name || typeof name !== "string") {
    return NextResponse.json(
      { error: "Invalid exercise name." },
      { status: 400 }
    );
  }
  if (!reps || typeof reps !== "number" || reps < 1) {
    return NextResponse.json({ error: "Invalid reps value." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("exercises")
    .update({ name, reps })
    .eq("id", exerciseId)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}

// DELETE: 特定のexerciseを削除・/emoms/[id]で使用
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies: () => cookies() });
  const exerciseId = params.id;

  const { data, error } = await supabase
    .from("exercises")
    .delete()
    .eq("id", exerciseId)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(
    { message: "Exercise deleted successfully.", data },
    { status: 200 }
  );
}

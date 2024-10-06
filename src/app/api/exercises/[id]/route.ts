import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// PUT: exerciseの更新・/emoms/[id]で使用
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const exerciseId = params.id;
  const { emom_id, name, reps } = await req.json();

  // 更新データを指定して全てのフィールドを置き換え
  const { data, error } = await supabase
    .from("exercises")
    .upsert({ id: exerciseId, emom_id, name, reps });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}

// DELETE: 特定のexerciseを削除・/emoms/[id]で使用
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const exerciseId = params.id;

  // 特定のidを持つexerciseを削除
  const { data, error } = await supabase
    .from("exercises")
    .delete()
    .eq("id", exerciseId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}

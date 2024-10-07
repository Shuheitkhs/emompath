import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// GET: 特定のemom_idを持つexercisesを取得・/emoms/[id]で使用
export async function GET(req: NextRequest) {
  // クエリパラメータからemom_idを取得
  const { searchParams } = new URL(req.url);
  const emomId = searchParams.get("emom_id");

  // emom_idが指定されていない場合は400エラーレスポンス
  if (!emomId) {
    return NextResponse.json({ error: "emom_id is required" }, { status: 400 });
  }

  // 特定のemom_idを持つexercisesを取得
  const supabase = createRouteHandlerClient({ cookies: () => cookies() });
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("emom_id", emomId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}
// POST: 新しいexercisesを作成・/emoms/createと/emoms/[id]で使用
export async function POST(req: NextRequest) {
  const { emom_id, name, reps } = await req.json();

  const supabase = createRouteHandlerClient({ cookies: () => cookies() });
  const { data, error } = await supabase
    .from("exercises")
    .insert([{ emom_id, name, reps }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}

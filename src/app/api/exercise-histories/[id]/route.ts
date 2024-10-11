import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// GET: 特定のemom_idを持つexerciseに関連するexercise_historiesを取得・/emoms/[id]で使用
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies: () => cookies() });
  const { id } = params;
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit")!, 10)
    : 15;

  const { data, error } = await supabase
    .from("exercise-histories")
    .select("*")
    .eq("exercise_id", id)
    .order("completed_at", { ascending: false })
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}

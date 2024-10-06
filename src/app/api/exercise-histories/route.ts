import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// POST: 新しいexercise_historyを作成
export async function POST(req: NextRequest) {
  const { exercise_id, volume, completed_at } = await req.json();

  const { data, error } = await supabase
    .from("exercise_histories")
    .insert([{ exercise_id, volume, completed_at }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}

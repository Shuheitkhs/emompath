import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// POST: 新しいexercise_historyを作成
export async function POST(req: NextRequest) {
  const { exercise_id, volume, completed_at } = await req.json();

  const supabase = createRouteHandlerClient({ cookies: () => cookies() });
  const { data, error } = await supabase
    .from("exercise_histories")
    .insert([{ exercise_id, volume, completed_at }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}

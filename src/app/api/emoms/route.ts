// emomsを操作するAPI
// 一覧取得と新規作成
import { createClient } from "@/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

// GET: 全てのemomsを取得
export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase.from("emoms").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}

// POST: 新しいemomを作成
export async function POST(req: NextRequest) {
  const supabase = createClient();
  // セッションからユーザーIDを取得
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

  // リクエストボディから新しいemomのデータを取得
  const { name, ready, sets } = await req.json();

  // user.idをuser_idとして新しいemomを作成
  const { data, error } = await supabase
    .from("emoms")
    .insert([{ user_id: user.id, name, ready, sets }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}

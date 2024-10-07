// ログアウトのAPI

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  // supabaseのサインアウト
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  // エラーハンドリング
  if (error) {
    console.error("Error signing out:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 成功したら200ステータスで返す
  return NextResponse.json(
    { message: "Successfully signed out" },
    { status: 200 }
  );
}

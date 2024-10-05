import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST() {
  // supabaseのサインアウト
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

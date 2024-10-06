// app/api/users/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";

// ユーザー一覧の取得（GET）
export async function GET(request: Request) {
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// 新規ユーザーの作成（POST）
export async function POST(request: Request) {
  const { email, password } = await request.json();

  // 入力バリデーション
  if (!email || !password) {
    return NextResponse.json(
      { error: "email and password are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("users")
    .insert({ email: password });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  //   return NextResponse.json(data[0], { status: 201 });
}

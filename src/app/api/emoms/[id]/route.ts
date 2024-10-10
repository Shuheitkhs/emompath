// 特定のemomの取得・更新・削除を行うAPI

import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// GET: 特定のemomsの詳細を取得・/emoms/[id]と/emoms/[id]/timer、completeで使用
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const emomId = params.id;

  const supabase = createRouteHandlerClient({ cookies: () => cookies() });

  // emoms と関連する exercises を取得
  const { data, error } = await supabase
    .from("emoms")
    .select("*, exercises(*)") // 関連する exercises を含めて取得
    .eq("id", emomId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}
// PUT: emomsの更新・/emoms/[id]とcompleteで使用
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const emomId = params.id;
  const { name, ready, set } = await req.json();

  // 更新データを指定して全てのフィールドを置き換え
  const supabase = createRouteHandlerClient({ cookies: () => cookies() });
  const { data, error } = await supabase
    .from("emoms")
    .upsert({ id: emomId, name, ready, set });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}

// DELETE: 特定のemomsを削除・/emoms/[id]で使用
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const emomId = params.id;

  const supabase = createRouteHandlerClient({ cookies: () => cookies() });
  const { data, error } = await supabase
    .from("emoms")
    .delete()
    .eq("id", emomId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}

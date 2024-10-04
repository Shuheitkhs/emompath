// サインアップ用のAPI
// 認証はデータのCRUD操作とは別に管理し、役割を明確に分離する
import { NextResponse } from "next/server"; //サーバーサイドAPIを扱うため
import { supabaseServerClient } from "@/lib/supabaseServerClient";

export async function POST(request: Request) {
  // リクエストのボディをJSONとして解析し、emailとpasswordとして取得
  const { email, password } = await request.json();

  // 入力バリデーション・クライアントサイドだけでなく、サーバーサイドでも実装
  // 開発者ツールなどでバリデーションを突破されるのを防ぐため
  if (!email || !password) {
    return NextResponse.json(
      { error: "メールアドレスとパスワードが必要です。" },
      { status: 400 }
    );
  }

  // メールアドレスの形式チェック
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "メールアドレスの形式ではありません。" },
      { status: 400 }
    );
  }

  // パスワードの強度チェック
  // 8文字以上20文字以下
  if (password.length < 8 || password.length > 20) {
    return NextResponse.json(
      { error: "パスワードは8文字以上、20文字以下で入力してください。" },
      { status: 400 }
    );
  }
  // Supabaseの管理APIを使用して新しいユーザーを作成
  const { data, error } = await supabaseServerClient.auth.admin.createUser({
    email,
    password,
    email_confirm: false, // ユーザーがメールで確認する前にアカウントが有効であるか=>false
  });
  // エラーハンドリング
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  // ユーザーが正常に作成された場合のハンドリング
  return NextResponse.json(
    { message: "User created successfully", user: data.user },
    { status: 201 }
  );
}

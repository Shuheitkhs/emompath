// Google認証する場合のAPI
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
// import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const cookiesStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookiesStore });

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      // TODO: 公式リファレンスでは独自実装したRoute Handlerのエンドポイントを指定している
      // https://supabase.com/docs/guides/auth/social-login/auth-google
      redirectTo: `http://localhost:3000/api/auth/callback`,
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ redirect_url: data.url }, { status: 200 });

  // TIPS: Route Handler内でリダイレクトできない理由は、Googleのコンソール上の設定でリダイレクト元のURLとしてlocalhostが設定されていないからかもしれない
  // OAuth認証の場合、リダイレクトURLが返される
  // return NextResponse.redirect(data.url);
}

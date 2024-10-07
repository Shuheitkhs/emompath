// Google認証する場合のAPI
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
// import { supabase } from "@/lib/supabaseClient";

export async function POST() {
  const supabase = createRouteHandlerClient({ cookies: () => cookies() });
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL,
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // OAuth認証の場合、リダイレクトURLが返される
  return NextResponse.redirect(data.url);
}

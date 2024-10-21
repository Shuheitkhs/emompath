/** サーバーサイドの実装後に着手
 * セッションが取得できれば/emomsに、
 * 取得できなければ/auth/signinにリダイレクト。
 */

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js"; // Session 型をインポート
import { supabase } from "@/lib/supabaseClient";

const HomePage = () => {
  const [sessionChecked, setSessionChecked] = useState(false); // セッションチェックが完了したか

  const [session, setSession] = useState<Session | null>(null); // 型を指定
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      // エラーがある場合のみログを出力
      if (error) {
        console.error("Error fetching session:", error.message);
      }

      if (error || !data.session) {
        // セッションが取得できなかった場合
        router.push("/auth/signin");
      } else {
        // セッションが取得できた場合
        setSession(data.session);
        router.push("/emoms");
      }

      setSessionChecked(true); // セッションのチェック完了
    };

    fetchSession();
  }, [router]);

  if (!sessionChecked) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">ようこそ EMOM Pathへ</h1>
      {session ? (
        <div>
          <p className="mb-4">こんにちは!!</p> {/* userが存在する場合 */}
          <button
            className="bg-primary text-white px-4 py-2 rounded m-2"
            onClick={() => router.push("/emoms")}
          >
            EMOM一覧を見る
          </button>
          <button
            className="bg-secondary text-white px-4 py-2 rounded m-2"
            onClick={() => router.push("/emoms/create")}
          >
            新しいEMOMを作成
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-4">EMOMの管理にはログインが必要です。</p>
          <button
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={() => router.push("/auth/signin")}
          >
            ログイン
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;

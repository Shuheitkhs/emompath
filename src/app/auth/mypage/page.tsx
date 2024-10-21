/** mypage
 * 登録情報の変更と、アカウントの削除
 */

"use client";
import AlertDialog from "@/components/AlertDialog";
import Button from "@/components/atoms/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MypagePage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // ログアウトのハンドラー関数
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });

      if (res.ok) {
        // ログアウト成功時にサインインページにリダイレクト
        router.push("/auth/signin");
      } else {
        // エラーメッセージの表示
        const errorData = await res.json();
        console.error("Error logging out:", errorData.error);
      }
    } catch (error) {
      console.error("Unexpected error logging out:", error);
    }
  };

  const handleDeleteAccount = async () => {
    setError(null);
    try {
      const res = await fetch("/api/auth/deleteAccount", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        alert(
          "アカウントが正常に削除されました。サインインページにリダイレクトします。"
        );
        router.push("/auth/signin");
      } else {
        const errorData = await res.json();
        setError(errorData.error || "アカウント削除中にエラーが発生しました。");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError("予期せぬエラーが発生しました。");
        console.error("Error deleting account:", error);
      }
    }
  };

  return (
    <div className="flex flex-col my-5">
      <div className="space-y-4">
        <Link href="/emoms">
          <Button size="large" color="secondary">
            EMOM List
          </Button>
        </Link>
        <Button size="large" color="danger" onClick={handleLogout}>
          Logout
        </Button>
        <Link href="/auth/mypage/email">
          <Button size="large" color="danger">
            Change Email
          </Button>
        </Link>
        <Link href="/auth/mypage/password">
          <Button size="large" color="danger">
            Change Password
          </Button>
        </Link>
      </div>
      <div>
        <div className="my-5">
          <AlertDialog
            trigger={
              <p className=" inline-block text-blue-500 border-b  border-blue-500 hover:text-blue-700 hover:border-blue-700">
                Delete Account?
              </p>
            }
            title="Delete your account?"
            content="Previous logs will also be lost."
            agreeText="Yes"
            disagreeText="No"
            onAgree={handleDeleteAccount}
            onDisagree={() => {}}
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default MypagePage;

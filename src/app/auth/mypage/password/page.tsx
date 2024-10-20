// src/pages/auth/mypage/password.tsx

"use client";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import BorderLabel from "@/components/atoms/BorderLabel";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

// パスワードのバリデーションスキーマ
const schema = z.object({
  newPassword: z
    .string()
    .min(8, { message: "新しいパスワードは8文字以上で入力してください。" }),
});

const PasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    general?: string;
  }>({});
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = async () => {
    // バリデーション
    const result = schema.safeParse({
      newPassword: newPassword,
    });

    if (!result.success) {
      // エラーメッセージを設定
      const fieldErrors: { currentPassword?: string; newPassword?: string } =
        {};
      result.error.errors.forEach((err) => {
        if (err.path.includes("currentPassword")) {
          fieldErrors.currentPassword = err.message;
        }
        if (err.path.includes("newPassword")) {
          fieldErrors.newPassword = err.message;
        }
      });
      setErrors(fieldErrors);
      setMessage("");
      return;
    } else {
      setErrors({});
    }

    setLoading(true);
    setMessage("");

    try {
      // APIエンドポイントにリクエストを送信
      const res = await fetch("/api/auth/changePassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        alert("パスワードが正常に変更されました。再度ログインしてください。");
        router.push("/auth/signin");
      } else {
        // APIからのエラーメッセージを表示
        setErrors({
          general: data.error || "パスワードの変更に失敗しました。",
        });
      }
    } catch (error: any) {
      setErrors({ general: "予期せぬエラーが発生しました。" });
      console.error("Error changing password:", error);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="my-5">
      <div className="flex flex-col space-y-2 border-b-2 py-2">
        <h3 className="text-start text-2xl">Change Your Password</h3>

        <Label className="text-start">Current Password:</Label>
        <Input
          size="large"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="現在のパスワード"
        />
        {errors.currentPassword && (
          <p className="text-red-500">{errors.currentPassword}</p>
        )}

        <Label className="text-start">New Password:</Label>
        <Input
          size="large"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="新しいパスワード"
        />
        {errors.newPassword && (
          <p className="text-red-500">{errors.newPassword}</p>
        )}

        {errors.general && <p className="text-red-500">{errors.general}</p>}
        {message && <p className="text-green-500">{message}</p>}

        <Button
          size="small"
          color="secondary"
          onClick={handleChange}
          disabled={loading}
        >
          <BorderColorIcon className="mr-2" />
          {loading ? "Processing..." : "CHANGE"}
        </Button>
        <div className="flex justify-start">
          <BorderLabel href="/auth/mypage">Back to My Page</BorderLabel>
        </div>
      </div>
    </div>
  );
};

export default PasswordPage;

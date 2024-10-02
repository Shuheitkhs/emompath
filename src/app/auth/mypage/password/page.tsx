/** 登録したパスワードの変更フォーム */

"use client";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import BorderLabel from "@/components/atoms/BorderLabel";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  currentPassword: z
    .string()
    .min(6, {
      message: "Current password must be at least 6 characters long.",
    }),
  newPassword: z
    .string()
    .min(6, { message: "New password must be at least 6 characters long." }),
});

const PasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
  }>({});

  const inputCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const inputNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const onSubmit = () => {
    // バリデーション
    const result = schema.safeParse({
      currentPassword: currentPassword,
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
    } else {
      setErrors({});
      // パスワード変更処理をここに追加します
      alert("パスワードが変更されました");
      // 例: APIを呼び出してパスワードを更新する
    }
  };

  return (
    <div className="my-5 ">
      <div className="flex flex-col space-y-2 border-b-2 py-2">
        <h3 className="text-start text-2xl ">Change Your Password</h3>
        <Label className="text-start">Current Password:</Label>
        <Input
          size="large"
          type="password"
          value={currentPassword}
          onChange={inputCurrentPassword}
        />
        {errors.currentPassword && (
          <p className="text-red-500">{errors.currentPassword}</p>
        )}

        <Label className="text-start">New Password:</Label>
        <Input
          size="large"
          type="password"
          value={newPassword}
          onChange={inputNewPassword}
        />
        {errors.newPassword && (
          <p className="text-red-500">{errors.newPassword}</p>
        )}

        <Button size="small" color="secondary" onClick={onSubmit}>
          <BorderColorIcon className="mr-2" />
          CHANGE
        </Button>
        <div className="flex justify-start">
          <BorderLabel href="/auth/mypage">Back to My Page</BorderLabel>
        </div>
      </div>
    </div>
  );
};

export default PasswordPage;

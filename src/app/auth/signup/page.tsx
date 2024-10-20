// src/pages/auth/signup.tsx

"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import BorderLabel from "@/components/atoms/BorderLabel";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { z } from "zod";
import { supabaseClient } from "@/lib/supabaseClient"; // Supabaseクライアントのインポート
import { useRouter } from "next/navigation";

// フロントエンド側でのメールアドレスとパスワードのバリデーション
const schema = z.object({
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください。" }),
  password: z
    .string()
    .min(8, {
      message: "パスワードは8文字以上で入力してください。",
    })
    .max(20, {
      message: "パスワードは20文字以下で入力してください。",
    }),
});

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    apiError?: string;
  }>({});
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    // バリデーション
    const result = schema.safeParse({ email, password });
    if (!result.success) {
      // エラーメッセージを設定
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path.includes("email")) {
          fieldErrors.email = err.message;
        }
        if (err.path.includes("password")) {
          fieldErrors.password = err.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      try {
        const { error } = await supabaseClient.auth.signUp({
          email,
          password,
        });

        if (error) {
          setErrors({ apiError: error.message });
        } else {
          alert("サインアップに成功しました！メールをご確認ください。");
          router.push("/auth/signin");
        }
      } catch (error) {
        setErrors({ apiError: "予期せぬエラーが発生しました。" });
      }
    }
  };

  return (
    <div className="flex flex-col space-y-2 border-b-2 py-2 my-5">
      <h3 className="text-start text-2xl ">Sign Up</h3>
      <Label className="text-start">Email:</Label>
      <Input
        size="large"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your.email@example.com"
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}

      <Label className="text-start">Password:</Label>
      <Input
        size="large"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="********"
      />
      {errors.password && <p className="text-red-500">{errors.password}</p>}

      <Button size="small" color="secondary" onClick={handleSignUp}>
        <BorderColorIcon className="mr-2" />
        SIGN UP
      </Button>

      {errors.apiError && <p className="text-red-500">{errors.apiError}</p>}

      <div className="flex justify-start">
        <BorderLabel href="/auth/signin">Back to Sign In</BorderLabel>
      </div>
    </div>
  );
};

export default SignUpPage;

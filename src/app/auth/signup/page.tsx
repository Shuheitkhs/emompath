/** メールアドレスによるユーザー登録のページ */

"use client";
import { useState } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import BorderLabel from "@/components/atoms/BorderLabel";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { z } from "zod";

// フロントエンド側でのメールアドレスとパスワードのバリデーション
const schema = z.object({
  email: z
    .string()
    .email({ message: "It is not in the form of an email address." }),
  password: z
    .string()
    .min(8, {
      message: "The password must be between 8 and 20 characters long.",
    })
    .max(20, {
      message: "The password must be between 8 and 20 characters long.",
    }),
});

const SignUpPage = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    apiError?: string;
  }>({});

  const inputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    // バリデーション
    const result = schema.safeParse({ email: Email, password: Password });
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
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: Email, password: Password }),
        });

        if (res.ok) {
          // サインアップ成功
          alert("SignUp Success! check your Email");
          window.location.href = "/auth/signin";
        } else {
          const errorData = await res.json();
          setErrors({ apiError: errorData.error });
        }
      } catch (error) {
        setErrors({ apiError: "An unexpected error occurred." });
      }
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-2 border-b-2 py-2 my-5">
        <h3 className="text-start text-2xl ">Sign Up</h3>
        <Label className="text-start">Email:</Label>
        <Input
          size="large"
          type="email"
          value={Email}
          onChange={inputEmail}
        ></Input>
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <Label className="text-start">Password:</Label>
        <Input
          size="large"
          type="password"
          value={Password}
          onChange={inputPassword}
        ></Input>
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        <Button size="small" color="secondary" onClick={handleSignUp}>
          <BorderColorIcon className="mr-2" />
          SIGN UP
        </Button>
        <div>
          <p>
            {errors.apiError && (
              <p className="text-red-500">{errors.apiError}</p>
            )}
          </p>
        </div>
        <div className="flex justify-start">
          <BorderLabel href="/auth/signin">Back to Sign In</BorderLabel>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;

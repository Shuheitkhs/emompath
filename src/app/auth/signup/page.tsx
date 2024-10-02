/** メールアドレスによるユーザー登録のページ */

"use client";
import { useState } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import BorderLabel from "@/components/atoms/BorderLabel";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { z } from "zod";

const schema = z.object({
  email: z
    .string()
    .email({ message: "It is not in the form of an email address." }),
  password: z
    .string()
    .min(6, { message: "The password must be at least 6 characters long." }),
});

const SignUpPage = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const inputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = () => {
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
      // 認証処理
      alert("サインインしました");
      // APIを呼び出して認証
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
        {errors.email && <p className="text-red-500">{errors.password}</p>}

        <Button size="small" color="secondary" onClick={onSubmit}>
          <BorderColorIcon className="mr-2" />
          SIGN UP
        </Button>
        <div className="flex justify-start">
          <BorderLabel href="/auth/signin">Back to Sign In</BorderLabel>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;

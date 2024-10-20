/** 登録したEmailの変更フォーム */

"use client";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import BorderLabel from "@/components/atoms/BorderLabel";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  email: z
    .string()
    .email({ message: "It is not in the form of an email address" }),
});

const EmailPage = () => {
  const router = useRouter();
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/user");
        if (res.ok) {
          const data = await res.json();
          setCurrentEmail(data.user.email);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUser();
  }, []);

  const inputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handleChange = async () => {
    const result = schema.safeParse({ email: newEmail });
    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      setError("");
      try {
        const res = await fetch("/api/auth/changeEmail", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: newEmail }),
        });

        if (res.ok) {
          // メールアドレス変更時にサインインページにリダイレクト
          alert(
            "メールアドレスの変更に成功しました。メールを確認してください。"
          );
          router.push("/auth/signin");
        } else {
          const errorData = await res.json();
          setError(errorData.error || "メールアドレスの変更に失敗しました。");
        }
      } catch (err) {
        setError("予期せぬエラーが発生しました。");
      }
    }
  };

  return (
    <div className="my-5 ">
      <div className="flex flex-col space-y-2 border-b-2 py-2">
        <h3 className="text-start text-2xl ">Change Your Email</h3>
        <Label className="text-start">Current Email:</Label>
        <Label className="text-start text-2xl">{currentEmail}</Label>

        <Label className="text-start">New Email:</Label>
        <Input
          size="large"
          type="email"
          onChange={inputEmail}
          value={newEmail}
        ></Input>
        {error && <p className="text-red-500">{error}</p>}

        <Button size="small" color="secondary" onClick={handleChange}>
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

export default EmailPage;

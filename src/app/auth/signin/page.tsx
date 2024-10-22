/** セッション情報のないユーザーが着地するページ
 *  サービスの簡単な紹介と、各種サインイン
 */
"use client";
import { useState } from "react";
import Chart from "@/components/atoms/Chart";
import Button from "@/components/atoms/Button";
import GoogleIcon from "@mui/icons-material/Google";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import LoginIcon from "@mui/icons-material/Login";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Link from "next/link";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

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

// デモ用のトレーニングデータ
const sData = [150, 165, 180, 200, 240, 260, 300, 330, 350, 385];
const cData = [30, 33, 40, 45, 50, 55, 70, 80, 100, 110];
const pData = [100, 110, 120, 135, 150, 170, 200, 220, 240, 300];
const xLabels = [
  "Day 1",
  "Day 2",
  "Day 3",
  "Day 4",
  "Day 5",
  "Day 6",
  "Day 7",
  "Day 8",
  "Day 9",
  "Day 10",
];

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  // エラーを種類によって出し分け
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    apiError?: string;
  }>({});
  const router = useRouter();

  // デモデータのラベル設定
  const seriesData = [
    { data: pData, label: "Pushup" },
    { data: sData, label: "Squat" },
    { data: cData, label: "Chining" },
  ];

  // メールアドレスインプットのハンドリング
  const inputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  // パスワードインプットのハンドリング
  const inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // サインインのハンドリング
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    // バリデーション
    const result = schema.safeParse({ email: email, password: Password });
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
      // 以降API
      try {
        const res = await fetch("/api/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: Password }),
        });

        if (res.ok) {
          // サインイン成功
          console.log("サインイン成功");
          router.push("/emoms"); // EMOM Listにリダイレクト
        } else {
          // サインイン失敗
          const errorData = await res.json();
          setErrors({ apiError: errorData.error });
        }
      } catch (error) {
        setErrors({ apiError: "An unexpected error occurred." }); //エラー表示
      }
    }
  };

  const signinWithGoogle = async () => {
    // Googleサインインの処理・クライアントサイドで処理
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL,
      },
    });
    if (error) {
      console.error("Error signing in with Google:", error.message);
    }
    // 307エラーが出るので、一旦API経由せずに実装
    // try {
    //   const res = await fetch("/api/auth/signin-google", {
    //     method: "GET",
    //   });
    //   const data = await res.json();
    //   if (res.ok) {
    //     window.location.href = data.redirect_url;
    //   } else {
    //     setErrors({ apiError: data.error });
    //   }
    // } catch (error) {
    //   setErrors({ apiError: "An unexpected error occurred." });
    // }
  };

  return (
    <div className="w-full text-text space-y-4 my-5">
      <div>
        <h2 className="text-3xl">
          Unlock Your Fitness Potential with{" "}
          <span className="text-primary">EMOM Path</span>
        </h2>
      </div>
      <div className="flex justify-center">
        <div className="w-[85%]">
          <p className="text-start text-xl leading-[2]">
            Track your progress, push your limits, and take control of your
            workouts with personalized EMOM routines. Whether you&apos;re a
            beginner or a seasoned athlete,{" "}
            <span className="text-primary">EMOM Path</span> adapts to your
            goals, guiding you every step of the way. Visualize your growth
            through detailed graphs and get tailored workout recommendations for
            the next challenge.
          </p>
          <p className="font-bold text-start text-primary">
            Start your fitness journey today and achieve your best self—one rep
            at a time!
          </p>
        </div>
      </div>
      {/* グラフを中央寄せする */}
      <div className="flex justify-center">
        <div className="relative w-[90%] min-h-[100px]">
          <h2 className="text-2xl text-center">Exercise Volume Chart</h2>
          <Chart seriesData={seriesData} xLabels={xLabels} />
        </div>
      </div>
      {/* サインイン用 */}
      <div className="space-y-3 justify-center ">
        <div>
          <Button size="large" onClick={signinWithGoogle}>
            <GoogleIcon className="mr-2" />
            SIGN IN WITH GOOGLE
          </Button>
        </div>

        <div className="flex flex-col space-y-2 border-b-2 py-2">
          <h2 className="text-start text-3xl ">Sign In</h2>
          <Label className="text-start">Email:</Label>
          <Input
            size="large"
            type="email"
            onChange={inputEmail}
            value={email}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <Label className="text-start">Password:</Label>
          <Input
            size="large"
            type="password"
            onChange={inputPassword}
            value={Password}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <Button size="small" color="secondary" onClick={handleSignIn}>
            <LoginIcon className="mr-2" />
            SIGN IN
          </Button>
          <div>
            <p>
              {errors.apiError && (
                <p className="text-red-500">{errors.apiError}</p>
              )}
            </p>
          </div>
        </div>
        <div className="space-y-2 flex flex-col justify-start border-b-2 py-2">
          <h2 className="text-start text-2xl">New User</h2>
          <Link href="/auth/signup" className="text-start">
            <Button size="small" color="secondary">
              <BorderColorIcon className="mr-2" />
              SIGN UP
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

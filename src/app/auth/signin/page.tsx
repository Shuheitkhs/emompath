"use client";
import React from "react";
import Chart from "@/components/atoms/Chart"; // コンポーネントのパスを適切に変更
import Button from "@/components/atoms/Button";
import GoogleIcon from "@mui/icons-material/Google";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import BorderLabel from "@/components/atoms/BorderLabel";
import LoginIcon from "@mui/icons-material/Login";

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

const page = () => {
  const seriesData = [
    { data: pData, label: "Pushup" },
    { data: sData, label: "Squat" },
    { data: cData, label: "Chining" },
  ];

  const signinWithGoogle = () => {
    alert("サインイン");
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
            workouts with personalized EMOM routines. Whether you're a beginner
            or a seasoned athlete,{" "}
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
            <span className="px-2">
              <GoogleIcon />
            </span>
            Sign In With Google
          </Button>
        </div>

        <div className="flex flex-col space-y-2 border-b-2 py-2">
          <h3 className="text-start text-2xl ">Sign In</h3>
          <Label className="text-start">Email:</Label>
          <Input size="large" type="email" onChange={signinWithGoogle}></Input>
          <Label className="text-start">Password:</Label>
          <Input
            size="large"
            type="password"
            onChange={signinWithGoogle}
          ></Input>
          <Button size="small" color="secondary" onClick={signinWithGoogle}>
            <span className="px-2">
              <LoginIcon />
            </span>
            SIGN IN
          </Button>
          <div className="flex justify-start">
            <BorderLabel href="">Forgot Password?</BorderLabel>
          </div>
        </div>
        <div className="space-y-2 flex flex-col justify-start border-b-2 py-2">
          <h3 className="text-start text-2xl">New User</h3>
          <Button size="small" color="secondary" onClick={signinWithGoogle}>
            SIGN UP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;

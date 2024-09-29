"use client";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import React, { use, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Counter from "@/components/molecules/Counter";
import Link from "next/link";

function Page() {
  const [ready, setReady] = useState(10);
  const [sets, setSets] = useState(10);
  const [reps, setReps] = useState(10);
  const [exercise, setExercise] = useState("");

  //   Ready用の関数
  const minus1 = () => {
    setReady((prevReady) => prevReady - 1);
  };
  const plus1 = () => {
    setReady((prevReady) => prevReady + 1);
  };

  const minus1r = () => {
    setReps((prevReps) => prevReps - 1); // ここで状態を更新
  };

  const plus1r = () => {
    setReps((prevReps) => prevReps + 1); // ここで状態を更新
  };

  const minus1s = () => {
    setSets((prevSets) => prevSets - 1); // ここで状態を更新
  };

  const plus1s = () => {
    setSets((prevSets) => prevSets + 1); // ここで状態を更新
  };

  const handleExerciseChange = (e) => {
    setExercise(e.target.value);
  };

  const handleNewExercise = () => {};

  const onChange = () => {
    alert("onChange!");
  };

  const volume = sets * reps;

  return (
    <div className="my-5">
      <div>
        {/* EMOMの持つ情報 */}
        <div>
          <div>
            <Input
              size="large"
              type="text"
              onChange={onChange}
              placeholder="Input your EMOM Name"
            />
          </div>
          <Counter
            title="Ready"
            number={ready}
            plus1={plus1}
            minus1={minus1}
          ></Counter>
          <Counter
            title="Sets"
            number={sets}
            plus1={plus1s}
            minus1={minus1s}
          ></Counter>
        </div>
        {/* exerciseの持つ情報・デフォルトで1つ設置 */}
        <div className="my-5">
          <Input
            size="large"
            type="text"
            onChange={handleExerciseChange}
            placeholder="Input Your Exercise Name"
          />
          <Counter
            title="Reps"
            number={reps}
            plus1={plus1r}
            minus1={minus1r}
          ></Counter>
          <p className="inline-block text-2xl font-bold border-b-2 my-2">
            {exercise} -Volume- <span className="text-primary">{volume}</span>
          </p>
        </div>

        {/* exerciseの持つ情報2 add new exerciseで増える*/}
        <div className="my-5">
          <div className="flex justify-center">
            <Input
              size="with-button"
              type="text"
              onChange={handleExerciseChange}
              placeholder="Input Your Exercise Name"
            />
            <Button size="extra-small" color="danger">
              <ClearIcon />
            </Button>
          </div>
          <Counter
            title="Reps"
            number={reps}
            plus1={plus1r}
            minus1={minus1r}
          ></Counter>
          <p className="inline-block text-2xl font-bold border-b-2 my-2">
            {exercise} -Volume- <span className="text-primary">{volume}</span>
          </p>
        </div>
        {/* ボタンの配置 */}
        <div className="flex justify-center space-x-3">
          <Button size="small" color="danger">
            <Link href="/emoms">Back to EMOM List</Link>
          </Button>
          <Button size="small" color="secondary" onClick={handleNewExercise}>
            Add New Exercise
          </Button>
          <Button size="small" color="primary">
            <Link href="/emoms">Start EMOM</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;

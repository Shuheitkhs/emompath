"use client";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Counter from "@/components/molecules/Counter";
import Link from "next/link";
import Exercise from "@/components/organisums/exercise";

interface ExerciseState {
  name: string;
  reps: number;
}

function Page() {
  // EMOM用の状態管理
  const [ready, setReady] = useState<number>(10);
  const [sets, setSets] = useState<number>(10);
  // デフォルトのexercise用の状態管理
  const [exercise, setExercise] = useState<string>("");
  const [reps, setReps] = useState<number>(10);

  // 2つ目以降のエクササイズを管理
  const [exercises, setExercises] = useState<ExerciseState[]>([]);

  // Readyのカウント用関数
  const minus1 = () => setReady((prevReady) => Math.max(prevReady - 1, 0));
  const plus1 = () => setReady((prevReady) => prevReady + 1);

  // Setsのカウント用関数
  const minus1s = () => setSets((prevSets) => Math.max(prevSets - 1, 0));
  const plus1s = () => setSets((prevSets) => prevSets + 1);

  // 初期エクササイズの名前変更用関数
  const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExercise(e.target.value);
  };
  // Repsのカウント用関数
  const minus1r = () => setReps((prevReps) => Math.max(prevReps - 1, 0));
  const plus1r = () => setReps((prevReps) => prevReps + 1);

  // 新しいエクササイズを追加
  const handleNewExercise = () => {
    if (exercises.length < 2) {
      setExercises([...exercises, { name: "", reps: 10 }]);
    }
  };

  // エクササイズ名の変更用
  const handleExercisesChange = (index: number, newValue: string) => {
    const updatedExercises = exercises.map((exercise, i) =>
      index === i ? { ...exercise, name: newValue } : exercise
    );
    setExercises(updatedExercises);
  };

  // Repsの変更用
  const handleRepsChange = (index: number, newReps: number) => {
    const updatedExercises = exercises.map((exercise, i) =>
      index === i ? { ...exercise, reps: newReps } : exercise
    );
    setExercises(updatedExercises);
  };

  // エクササイズの削除用
  const handleRemoveExercise = (index: number) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

  const volume = sets * reps;

  return (
    <div className="my-5">
      <div>
        {/* EMOM全体の情報 */}
        <div>
          <Input
            size="large"
            type="text"
            onChange={() => {}}
            placeholder="Input your EMOM Name"
          />
          <Counter title="Ready" number={ready} plus1={plus1} minus1={minus1} />
          <Counter title="Sets" number={sets} plus1={plus1s} minus1={minus1s} />
        </div>

        {/* 最初のエクササイズ情報 */}
        <div className="my-5">
          <Input
            size="large"
            type="text"
            onChange={handleExerciseChange}
            placeholder="Input Your Exercise Name"
          />
          <Counter title="Reps" number={reps} plus1={plus1r} minus1={minus1r} />
          <p className="inline-block text-2xl font-bold border-b-2 my-2">
            {exercise} -Volume- <span className="text-primary">{volume}</span>
          </p>
        </div>

        {/* 二番目以降のexercise */}
        {exercises.map((exercise, index) => (
          <Exercise
            key={index}
            exercise={exercise}
            onExerciseChange={(newValue) =>
              handleExercisesChange(index, newValue)
            }
            onRepsChange={(newReps) => handleRepsChange(index, newReps)}
            onRemove={() => handleRemoveExercise(index)}
            sets={sets}
          />
        ))}

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

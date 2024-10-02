/** EMOMの作成ページ
 *  あとで、バリデーションを入れて最低セット数、最大セット数を決める
 */

"use client";
import Button from "@/components/atoms/Button";
import React, { use, useState } from "react";
import Link from "next/link";
import Exercise from "@/components/organisms/Exercise";
import EMOMEdit from "@/components/organisms/EmomEdit";
import FirstExercise from "@/components/organisms/FirstExercise";

interface ExerciseState {
  name: string;
  reps: number;
}

const CreatePage = () => {
  // EMOM用の状態管理
  const [emomName, setEmomName] = useState("");

  const [ready, setReady] = useState(10);
  const [sets, setSets] = useState(10);
  // デフォルトのexercise用の状態管理

  // 2つ目以降のエクササイズを管理
  const [exercises, setExercises] = useState<ExerciseState[]>([]);

  // エクササイズ数のバリデーション用
  const [exercisesError, setExercisesError] = useState<string | null>(null);

  // 新しいエクササイズを追加
  const handleNewExercise = () => {
    if (exercises.length < 2) {
      setExercises([...exercises, { name: "", reps: 10 }]);
    } else {
      setExercisesError("Exercises should be at most 3");
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

  return (
    <div className="my-5">
      <div>
        {/* EMOM全体の情報 */}
        <div>
          <EMOMEdit
            emomName={emomName}
            onNameChange={setEmomName}
            ready={ready}
            setReady={setReady}
            sets={sets}
            setSets={setSets}
          />
        </div>
        {/* 最初のエクササイズ情報 */}
        <FirstExercise sets={sets} />
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
        <div>
          <p className="text-red-500">{exercisesError}</p>
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
};

export default CreatePage;

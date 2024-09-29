"use client";
import Link from "next/link";

import Button from "@/components/atoms/Button";
import Chart from "@/components/atoms/Chart";
import React, { useState } from "react";
import EMOMEdit from "@/components/organisms/EmomEdit";
import Exercise from "@/components/organisms/Exercise";
import FirstExercise from "@/components/organisms/FirstExercise";
import BorderLabel from "@/components/atoms/BorderLabel";
import AlertDialog from "@/components/AlertDialog";

interface ExerciseState {
  name: string;
  reps: number;
}

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
  const [ready, setReady] = useState<number>(10);
  const [sets, setSets] = useState<number>(10);
  const [emomName, setEmomName] = useState<string>("");

  const [exercises, setExercises] = useState<ExerciseState[]>([]);

  const seriesData = [
    { data: pData, label: "Pushup" },
    { data: sData, label: "Squat" },
    { data: cData, label: "Chining" },
  ];

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
  // Dialog用の関数
  const handleAgree = () => {
    alert("Agreed!");
  };

  const handleDisagree = () => {
    alert("Disagreed!");
  };

  return (
    <div className="my-5">
      <div className="flex justify-center space-x-2 mb-5">
        <Button size="medium" color="danger">
          <Link href="/emoms">Back to EMOM List</Link>
        </Button>
        <Button size="medium" color="primary">
          <Link href="/emoms/create">Create New EMOM</Link>
        </Button>
      </div>
      <div>
        <div className="flex justify-center">
          <div className="relative w-[90%] min-h-[100px]">
            <h2 className="text-2xl text-center">Exercise Volume Chart</h2>
            <Chart seriesData={seriesData} xLabels={xLabels} />
          </div>
        </div>
      </div>
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
      <div>
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
      </div>
      <div className="flex justify-center space-x-2">
        <Button size="medium" color="secondary" onClick={handleNewExercise}>
          Add New Exercise
        </Button>
        <Button size="medium" color="primary" onClick={handleNewExercise}>
          Add New Exercise
        </Button>
      </div>
      <div className="my-5">
        <AlertDialog
          trigger={
            <p className=" inline-block text-blue-500 border-b  border-blue-500 hover:text-blue-700 hover:border-blue-700">
              Delete EMOM?
            </p>
          }
          title="Delete your EMOM?"
          content="Previous logs will also be lost."
          agreeText="Yes"
          disagreeText="No"
          onAgree={handleAgree}
          onDisagree={handleDisagree}
        />
      </div>
    </div>
  );
};

export default page;

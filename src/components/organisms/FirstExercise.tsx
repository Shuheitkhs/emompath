/** 削除機能を持たないデフォルトのエクササイズコンポーネント */

import React, { useState } from "react";
import Input from "@/components/atoms/Input";
import Counter from "@/components/molecules/Counter";

const FirstExercise = ({ sets }: { sets: number }) => {
  const [exercise, setExercise] = useState("");
  const [reps, setReps] = useState(10);
  const [repsError, setRepsError] = useState<string | null>(null);

  const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExercise(e.target.value);
  };
  // Repsのカウント用関数
  const handleRepsChange = (newReps: number) => {
    if (newReps === 1) {
      setRepsError("Reps should be at least 1");
    } else {
      setRepsError(null);
    }
    setReps(newReps);
  };

  const volume = sets * reps;
  return (
    <div>
      <div className="my-5">
        <Input
          size="large"
          type="text"
          onChange={handleExerciseChange}
          placeholder="Input Your Exercise Name"
          default="Exercise"
        />
        <Counter
          title="Reps"
          number={reps}
          plus1={() => handleRepsChange(reps + 1)}
          minus1={() => handleRepsChange(Math.max(reps - 1, 1))}
        />
        <div>{repsError && <p className="text-red-500">{repsError}</p>}</div>
        <p className="inline-block text-2xl font-bold border-b-2 my-2">
          {exercise} -Volume-{" "}
          <span className="text-primary text-3xl">{volume}</span>
        </p>
      </div>
    </div>
  );
};

export default FirstExercise;

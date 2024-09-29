import React, { useState } from "react";
import Input from "@/components/atoms/Input";
import Counter from "@/components/molecules/Counter";

const FirstExercise = ({ sets }: { sets: number }) => {
  const [exercise, setExercise] = useState<string>("");
  const [reps, setReps] = useState<number>(10);
  const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExercise(e.target.value);
  };
  // Repsのカウント用関数
  const minus1r = () => setReps((prevReps) => Math.max(prevReps - 1, 0));
  const plus1r = () => setReps((prevReps) => prevReps + 1);

  const volume = sets * reps;
  return (
    <div>
      <div className="my-5">
        <Input
          size="large"
          type="text"
          onChange={handleExerciseChange}
          placeholder="Input Your Exercise Name"
        />
        <Counter title="Reps" number={reps} plus1={plus1r} minus1={minus1r} />
        <p className="inline-block text-2xl font-bold border-b-2 my-2">
          {exercise} -Volume-{" "}
          <span className="text-primary text-3xl">{volume}</span>
        </p>
      </div>
    </div>
  );
};

export default FirstExercise;

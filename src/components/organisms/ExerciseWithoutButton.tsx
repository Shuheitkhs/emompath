/** add exerciseで追加される削除ボタン付きのエクササイズコンポーネント */

import { useState } from "react";
import Input from "@/components/atoms/Input";
import Counter from "@/components/molecules/Counter";

interface ExerciseProps {
  exercise: { name: string; reps: number };
  onExerciseChange: (newValue: string) => void;
  onRepsChange: (newReps: number) => void;
  sets: number;
}

const ExerciseWithoutButton: React.FC<ExerciseProps> = ({
  exercise,
  onExerciseChange,
  onRepsChange,
  sets,
}) => {
  const [repsError, setRepsError] = useState<string | null>(null);

  const { name, reps } = exercise;
  const volume = sets * reps;

  const handleRepsChange = (newReps: number) => {
    if (newReps === 1) {
      setRepsError("Reps should be at least 1");
    } else {
      setRepsError(null);
    }
    onRepsChange(newReps);
  };

  return (
    <div className="my-5">
      <div className="flex justify-center items-center space-x-1">
        <Input
          size="large"
          type="text"
          value={name}
          onChange={(e) => onExerciseChange(e.target.value)}
          placeholder="Input Your Exercise Name"
          default="Exercise"
        />
      </div>

      <Counter
        title="Reps"
        number={reps}
        plus1={() => handleRepsChange(reps + 1)}
        minus1={() => handleRepsChange(Math.max(reps - 1, 1))}
      />
      <div>{repsError && <p className="text-red-500">{repsError}</p>}</div>

      <p className="inline-block text-2xl font-bold border-b-2 my-2">
        {name} -Volume- <span className="text-primary">{volume}</span>
      </p>
    </div>
  );
};

export default ExerciseWithoutButton;

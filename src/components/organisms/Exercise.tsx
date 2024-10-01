/** add exerciseで追加される削除ボタン付きのエクササイズコンポーネント */

import React from "react";
import Input from "@/components/atoms/Input";
import Counter from "@/components/molecules/Counter";
import Button from "@/components/atoms/Button";
import ClearIcon from "@mui/icons-material/Clear";

interface ExerciseProps {
  exercise: { name: string; reps: number };
  onExerciseChange: (newValue: string) => void;
  onRepsChange: (newReps: number) => void;
  onRemove: () => void;
  sets: number;
}

const Exercise: React.FC<ExerciseProps> = ({
  exercise,
  onExerciseChange,
  onRepsChange,
  onRemove,
  sets,
}) => {
  const { name, reps } = exercise;
  const volume = sets * reps;

  return (
    <div className="my-5">
      <div className="flex justify-center">
        <Input
          size="with-button"
          type="text"
          value={name}
          onChange={(e) => onExerciseChange(e.target.value)}
          placeholder="Input Your Exercise Name"
        />
        <Button size="extra-small" color="danger" onClick={onRemove}>
          <ClearIcon />
        </Button>
      </div>
      <Counter
        title="Reps"
        number={reps}
        plus1={() => onRepsChange(reps + 1)}
        minus1={() => onRepsChange(Math.max(reps - 1, 0))}
      />
      <p className="inline-block text-2xl font-bold border-b-2 my-2">
        {name} -Volume- <span className="text-primary">{volume}</span>
      </p>
    </div>
  );
};

export default Exercise;

/** add exerciseで追加される削除ボタン付きのエクササイズコンポーネント */

import { useState } from "react";
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
  canRemove: boolean;
}

const Exercise: React.FC<ExerciseProps> = ({
  exercise,
  onExerciseChange,
  onRepsChange,
  onRemove,
  sets,
  canRemove,
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
      <div className="flex justify-center">
        <Input
          size="with-button"
          type="text"
          value={name}
          onChange={(e) => onExerciseChange(e.target.value)}
          placeholder="Input Your Exercise Name"
          default="Exercise"
        />
        <Button size="extra-small" color="danger" onClick={onRemove}>
          <ClearIcon />
        </Button>
      </div>
      {!canRemove && (
        <span className="text-red-500 text-sm">
          最低1つのエクササイズが必要です。
        </span>
      )}
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

export default Exercise;

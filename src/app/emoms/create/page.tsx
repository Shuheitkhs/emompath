/** EMOMの作成ページ
 */

"use client";
import Button from "@/components/atoms/Button";
import { useState } from "react";
import Link from "next/link";
import Exercise from "@/components/organisms/Exercise";
import EMOMEdit from "@/components/organisms/EmomEdit";
import FirstExercise from "@/components/organisms/FirstExercise";
import { createEmom } from "@/lib/api";
import { useRouter } from "next/navigation";

interface ExerciseState {
  name: string;
  reps: number;
}

const CreatePage = () => {
  const router = useRouter();

  // EMOM用の状態管理
  const [emomName, setEmomName] = useState("");
  const [ready, setReady] = useState(10);
  const [sets, setSets] = useState(10);
  // デフォルトのexercise用の状態管理

  // 2つ目以降のエクササイズを管理
  const [exercises, setExercises] = useState<ExerciseState[]>([]);

  // エクササイズ数のバリデーション用
  const [exercisesError, setExercisesError] = useState<string | null>(null);

  // API呼び出しの際の状態管理
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // 新しいエクササイズを追加
  const handleNewExercise = () => {
    if (exercises.length < 2) {
      setExercises([...exercises, { name: "", reps: 10 }]);
      setExercisesError(null);
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

  // フォームの送信
  const handleSubmit = async () => {
    // フロントエンドでの追加バリデーション
    if (!emomName.trim()) {
      setSubmitError("EMOM name is required.");
      return;
    }

    if (sets < 5) {
      setSubmitError("Sets must be at least 5.");
      return;
    }

    if (exercises.some((ex) => !ex.name.trim())) {
      setSubmitError("All exercise names are required.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const emomData = {
        name: emomName,
        ready,
        sets,
        exercises,
      };

      console.log("Request payload:", emomData);

      const createdEmom = await createEmom(emomData);
      router.push(`/emoms/${createdEmom.id}/timer`);
    } catch (error: any) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
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
          <Button size="small" color="primary" onClick={handleSubmit}>
            Start EMOM
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

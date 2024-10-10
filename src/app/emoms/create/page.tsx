/** EMOMの作成ページ
 */

"use client";
import Button from "@/components/atoms/Button";
import { useState } from "react";
import Link from "next/link";
import Exercise from "@/components/organisms/Exercise";
import EMOMEdit from "@/components/organisms/EmomEdit";
import { useRouter } from "next/navigation";
import Input from "@/components/atoms/Input";
import Counter from "@/components/molecules/Counter";

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
  const [firstExerciseName, setFirstExerciseName] = useState("");
  const [firstExerciseReps, setFirstExerciseReps] = useState(10);
  const [firstExerciseError, setFirstExerciseError] = useState<string | null>(
    null
  );

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

  // firstExerciseの変更用関数
  const handleFirstExerciseRepsChange = (newReps: number) => {
    if (newReps === 1) {
      setFirstExerciseError("Reps should be at least 1");
    } else {
      setFirstExerciseError(null);
    }
    setFirstExerciseReps(newReps);
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
    setExercisesError(null);
  };

  // フォームの送信
  const handleSubmit = async () => {
    // バリデーション
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
        sets: sets, // "set" カラム名に合わせて送信
      };

      console.log("Request payload:", emomData);

      // `fetch` を使ってAPIにPOSTリクエスト
      const response = await fetch("/api/emoms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emomData),
      });

      // レスポンスのチェック
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create emom");
      }

      const createdEmom = await response.json();

      // emomのIDを使ってリダイレクト
      router.push(`/emoms/${createdEmom[0].id}/timer`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("'An unknown error occurred'");
      }
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
        <div>
          <div className="my-5">
            <Input
              size="large"
              type="text"
              onChange={(e) => setFirstExerciseName(e.target.value)}
              placeholder="Input Your Exercise Name"
              default="Exercise"
            />
            <Counter
              title="Reps"
              number={firstExerciseReps}
              plus1={() => handleFirstExerciseRepsChange(firstExerciseReps + 1)}
              minus1={() =>
                handleFirstExerciseRepsChange(
                  Math.max(firstExerciseReps - 1, 1)
                )
              }
            />
            <div>
              {firstExerciseError && (
                <p className="text-red-500">{firstExerciseError}</p>
              )}
            </div>
            <p className="inline-block text-2xl font-bold border-b-2 my-2">
              {firstExerciseName} -Volume-{" "}
              <span className="text-primary text-3xl">
                {sets * firstExerciseReps}
              </span>
            </p>
          </div>
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
        <div>
          <p className="text-red-500">{exercisesError}</p>
          <p className="text-red-500">{submitError}</p>
        </div>
        {/* ボタンの配置 */}
        <div className="flex justify-center space-x-3">
          <Button size="small" color="danger">
            <Link href="/emoms">Back to EMOM List</Link>
          </Button>
          <Button size="small" color="secondary" onClick={handleNewExercise}>
            Add New Exercise
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmitting} // 送信中はボタンを無効化
          >
            {isSubmitting ? "Submitting..." : "Start EMOM"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

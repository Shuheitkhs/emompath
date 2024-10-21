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

  // API呼び出しの状態管理
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 各種バリデーション
    // emom名の要求
    if (!emomName.trim()) {
      setSubmitError("EMOM name is required.");
      return;
    }
    // 最低セット数の設定
    if (sets < 5) {
      setSubmitError("Sets must be at least 5.");
      return;
    }
    // 最低readyの設定
    if (ready < 5 || ready > 60) {
      setSubmitError("Ready time must be between 0 and 60 seconds.");
      return;
    }
    // デフォルトのエクササイズの名前の要求
    if (!firstExerciseName.trim()) {
      setFirstExerciseError("First exercise name is required.");
      return;
    }
    //　デフォルトのエクササイズの最低レップ数の設定
    if (firstExerciseReps < 1) {
      setFirstExerciseError("Reps for first exercise must be at least 1.");
      return;
    }
    //　追加エクササイズの名前の要求
    if (exercises.some((ex) => !ex.name.trim())) {
      setSubmitError("All exercise names are required.");
      return;
    }
    //  追加エクササイズの最低レップ数の設定
    if (exercises.some((ex) => ex.reps < 1)) {
      setFirstExerciseError("Reps for all exercise must be at least 1.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setFirstExerciseError(null);
    setExercisesError(null);

    try {
      // emomの作成
      const emomData = {
        name: emomName,
        ready,
        sets,
      };

      console.log("Request payload (emom):", emomData);

      // `fetch` を使ってAPIにPOSTリクエスト
      const emomResponse = await fetch("/api/emoms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emomData),
      });

      // レスポンスのチェック
      if (!emomResponse.ok) {
        const errorData = await emomResponse.json();
        throw new Error(errorData.error || "Failed to create emom");
      }

      const createdEmom = await emomResponse.json();
      const emomId = createdEmom.id;

      if (!emomId) {
        throw new Error("EMOM ID is missing.");
      }

      console.log("Created EMOM ID:", emomId);

      // デフォルトのエクササイズの作成
      const firstExerciseData = {
        emom_id: emomId,
        name: firstExerciseName,
        reps: firstExerciseReps,
      };

      console.log("Request payload (first exercise):", firstExerciseData);

      const firstExerciseResponse = await fetch("/api/exercises", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(firstExerciseData),
      });

      if (!firstExerciseResponse.ok) {
        const errorData = await firstExerciseResponse.json();
        throw new Error(errorData.error || "Failed to create first exercise");
      }

      console.log(
        "Created First Exercise:",
        await firstExerciseResponse.json()
      );

      // 2個目以降のexerciseの作成
      for (const exercise of exercises) {
        const exerciseData = {
          emom_id: emomId,
          name: exercise.name,
          reps: exercise.reps,
        };

        console.log("Request payload (exercise):", exerciseData);

        const exerciseResponse = await fetch("/api/exercises", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(exerciseData),
        });

        if (!exerciseResponse.ok) {
          const errorData = await exerciseResponse.json();
          throw new Error(errorData.error || "Failed to create exercise");
        }

        console.log("Created Exercise:", await exerciseResponse.json());
      }

      // emomのIDを使ってリダイレクト
      router.push(`/emoms/${emomId}/timer`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("An unknown error occurred");
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
          <Link href="/emoms">
            <Button size="small" color="danger">
              Back to EMOM List
            </Button>
          </Link>

          <Button size="small" color="secondary" onClick={handleNewExercise}>
            Add New Exercise
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Start EMOM"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

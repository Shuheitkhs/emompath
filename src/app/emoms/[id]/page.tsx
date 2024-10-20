/**　EMOMの詳細ページ
 *   トレーニングのチャート確認と、編集が可能
 *   あとで、バリデーションを入れて最低セット数、最大セット数を決める→完成
 */
"use client";
import Button from "@/components/atoms/Button";
import Chart from "@/components/atoms/Chart";
import EMOMEdit from "@/components/organisms/EmomEdit";
import Exercise from "@/components/organisms/Exercise";
import AlertDialog from "@/components/AlertDialog";
import Input from "@/components/atoms/Input";
import Counter from "@/components/molecules/Counter";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

// 型定義
// chart表示のために必要な型
interface ResponseData {
  emom: EMOM;
  exercises: Exercise[];
}

interface EMOM {
  id: string;
  name: string;
  user_id: string;
}

interface Exercise {
  id: string;
  emom_id: string;
  name: string;
  reps: number;
  histories: ExerciseHistory[];
}

interface ExerciseHistory {
  id: string;
  exercise_id: string;
  volume: number;
  completed_at: string;
}

// exerciseの更新に必要な型
interface NewExerciseState {
  name: string;
  reps: number;
}

const EmomEditPage = () => {
  // chartデータ表示のための状態管理
  const params = useParams();
  const emomId = params?.id as string;
  const router = useRouter();
  const [emomName, setEmomName] = useState<string>("");
  const [emom, setEmom] = useState<EMOM | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // EMOM更新のための状態管理
  const [ready, setReady] = useState<number>(10);
  const [sets, setSets] = useState<number>(10);

  // デフォルトのexercise用の状態管理
  const [firstExerciseName, setFirstExerciseName] = useState("");
  const [firstExerciseReps, setFirstExerciseReps] = useState(10);
  const [firstExerciseError, setFirstExerciseError] = useState<string | null>(
    null
  );
  //追加のexercise用の状態管理
  const [newExercises, setNewExercises] = useState<NewExerciseState[]>([]);

  // エクササイズ数のバリデーション用
  const [newExercisesError, setNewExercisesError] = useState<string | null>(
    null
  );

  const [error, setError] = useState<string>("");

  // useEffectでレンダリング時にデータ取得
  useEffect(() => {
    const fetchEmomDetails = async () => {
      try {
        const res = await fetch(`/api/emoms/${emomId}/details`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data: ResponseData = await res.json();
          setEmom(data.emom);
          setExercises(data.exercises);
        } else {
          const errorData = await res.json();
          setError(errorData.error || "データの取得に失敗しました。");
        }
      } catch (err: any) {
        setError("予期せぬエラーが発生しました。");
        console.error("Error fetching EMOM details:", err);
      }
    };

    if (emomId) {
      fetchEmomDetails();
    }
  }, [emomId]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!emom) {
    return <p>EMOM not found.</p>;
  }

  // チャートデータの準備
  const seriesData = exercises.map((ex) => ({
    data: ex.histories.map((history) => history.volume),
    label: ex.name,
  }));

  const xLabels =
    exercises.length > 0
      ? exercises[0].histories.map((history) => {
          const date = new Date(history.completed_at);
          return `${date.getMonth() + 1}/${date.getDate()}`;
        })
      : [];

  // 新しいエクササイズを追加
  const handleNewExercise = () => {
    if (newExercises.length < 2) {
      setNewExercises([...newExercises, { name: "", reps: 10 }]);
    } else {
      setNewExercisesError("Exercises should be at most 3");
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
    if (exercises.length <= 1) {
      setNewExercisesError("最低1つのエクササイズが必要です。");
      return;
    }
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
    //エラー文の削除
    setNewExercisesError(null);
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
            canRemove={exercises.length > 1}
          />
        ))}
      </div>
      <div>
        <p className="text-red-500">{newExercisesError}</p>
      </div>
      <div className="flex justify-center space-x-2">
        <Button size="medium" color="secondary" onClick={handleNewExercise}>
          Add New Exercise
        </Button>
        <Button size="medium" color="primary" onClick={handleNewExercise}>
          Start EMOM
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

export default EmomEditPage;

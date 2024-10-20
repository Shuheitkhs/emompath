/** EMOMの詳細ページ
 * トレーニングのチャート確認と、編集が可能
 * あとで、バリデーションを入れて最低セット数、最大セット数を決める→完成
 */
"use client";
import Button from "@/components/atoms/Button";
import Chart from "@/components/atoms/Chart";
import EMOMEdit from "@/components/organisms/EmomEdit";
import ExerciseWithAlert from "@/components/organisms/ExerciseWithAlert";
import AlertDialog from "@/components/AlertDialog";
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
  sets: number;
  ready: number;
}

interface Exercise {
  id?: string;
  emom_id: string;
  name: string;
  reps: number;
  histories?: ExerciseHistory[];
}

interface ExerciseHistory {
  id: string;
  exercise_id: string;
  volume: number;
  completed_at: string;
}

const EmomEditPage = () => {
  // ルーターとパラメータの取得
  const params = useParams();
  const emomId = params?.id as string;
  const router = useRouter();

  // ステートの定義
  const [emomName, setEmomName] = useState<string>("");
  const [emom, setEmom] = useState<EMOM | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // EMOM更新のための状態管理
  const [ready, setReady] = useState<number>(10);
  const [sets, setSets] = useState<number>(10);

  // エクササイズ数のバリデーション用
  const [newExercisesError, setNewExercisesError] = useState<string | null>(
    null
  );
  // その他エラー用
  const [error, setError] = useState<string | null>("");

  // ローディングの表示
  const [loading, setLoading] = useState<boolean>(true);

  // ローディングの管理（ボタンの無効化など）
  const [isSaving, setIsSaving] = useState<boolean>(false);

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
          setEmomName(data.emom.name);
          setReady(data.emom.ready);
          setSets(data.emom.sets);
          setExercises(data.exercises);
        } else {
          const errorData = await res.json();
          setError(errorData.error || "データの取得に失敗しました。");
        }
      } catch (err: any) {
        setError("予期せぬエラーが発生しました。");
        console.error("Error fetching EMOM details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (emomId) {
      fetchEmomDetails();
    }
  }, [emomId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!emom) {
    return <p>EMOM not found.</p>;
  }

  // チャートデータの準備
  const seriesData = exercises.map((ex) => ({
    data: ex.histories ? ex.histories.map((history) => history.volume) : [],
    label: ex.name,
  }));

  const xLabels =
    exercises.length > 0 && exercises[0].histories
      ? exercises[0].histories.map((history) => {
          const date = new Date(history.completed_at);
          return `${date.getMonth() + 1}/${date.getDate()}`;
        })
      : [];

  // 新しいエクササイズを追加
  const handleNewExercise = () => {
    if (exercises.length < 3) {
      setExercises([
        ...exercises,
        {
          id: `temp-${Date.now()}`, // 一時的なID
          emom_id: emomId,
          name: "",
          reps: 10,
          histories: [], // 空の履歴
        },
      ]);
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

  // Repsの変更用
  const handleRepsChange = (index: number, newReps: number) => {
    const updatedExercises = exercises.map((exercise, i) =>
      index === i ? { ...exercise, reps: newReps } : exercise
    );
    setExercises(updatedExercises);
  };

  // エクササイズの削除用
  const handleRemoveExercise = async (index: number) => {
    if (exercises.length <= 1) {
      setNewExercisesError("Exercises should be at least 1");
      return;
    }

    const exerciseToDelete = exercises[index];

    try {
      if (exerciseToDelete.id) {
        // 既存のエクササイズを削除
        const res = await fetch(`/api/exercises/${exerciseToDelete.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data.message);
        } else {
          const errorData = await res.json();
          setNewExercisesError(
            errorData.error || "エクササイズの削除に失敗しました。"
          );
          return;
        }
      }

      // エクササイズをステートから削除
      const updatedExercises = exercises.filter((_, i) => i !== index);
      setExercises(updatedExercises);
      // エラー文の削除
      setNewExercisesError(null);
    } catch (error: any) {
      setNewExercisesError("予期せぬエラーが発生しました。");
      console.error("Error deleting exercise:", error);
    }
  };

  // EMOMの削除用
  const handleDeleteEmom = async () => {
    setError(null);
    try {
      const res = await fetch(`/api/emoms/${emomId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        alert(
          "EMOMが正常に削除されました。EMOM listページにリダイレクトします。"
        );
        router.push("/emoms");
      } else {
        const errorData = await res.json();
        setError(errorData.error || "EMOM削除中にエラーが発生しました。");
      }
    } catch (error: any) {
      setError("予期せぬエラーが発生しました。");
      console.error("Error deleting EMOM:", error);
    }
  };

  // EMOMの保存処理
  const handleSaveEmom = async () => {
    // エラーメッセージのリセット
    setNewExercisesError(null);
    setError(null);

    // フロントエンドのバリデーション
    if (emomName.trim() === "") {
      setNewExercisesError("EMOM name cannot be empty.");
      return;
    }

    for (const exercise of exercises) {
      if (exercise.name.trim() === "") {
        setNewExercisesError("All exercises must have a name.");
        return;
      }
      if (exercise.reps < 1) {
        setNewExercisesError("Reps must be at least 1.");
        return;
      }
    }

    setIsSaving(true);
    try {
      const res = await fetch(`/api/emoms/${emomId}`, {
        // エンドポイントを修正
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: emomName, // 正しい名前を送信
          sets,
          ready,
          exercises,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        alert("EMOMが正常に保存されました！");
        router.push("/emoms");
      } else {
        const errorData = await res.json();
        alert(errorData.error || "EMOMの保存に失敗しました。");
      }
    } catch (err: any) {
      console.error("Error saving EMOM:", err);
      alert("予期せぬエラーが発生しました。");
    } finally {
      setIsSaving(false);
    }
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
        {exercises.map((exercise, index) => (
          <ExerciseWithAlert
            key={exercise.id || `new-${index}`} // 一意のIDを使用。新規の場合は一時的なキー
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
      <div>
        <p className="text-red-500">{newExercisesError}</p>
      </div>
      <div className="flex justify-center space-x-2">
        <Button size="medium" color="secondary" onClick={handleNewExercise}>
          Add New Exercise
        </Button>
        <Button
          size="medium"
          color="primary"
          onClick={handleSaveEmom}
          disabled={isSaving} // ローディング状態でボタンを無効化
        >
          {isSaving ? "Saving..." : "Save EMOM"}
        </Button>
      </div>
      <div className="my-5">
        <AlertDialog
          trigger={
            <p className="inline-block text-blue-500 border-b border-blue-500 hover:text-blue-700 hover:border-blue-700">
              Delete EMOM?
            </p>
          }
          title="Delete your EMOM?"
          content="Previous logs will also be lost."
          agreeText="Yes"
          disagreeText="No"
          onAgree={handleDeleteEmom}
          onDisagree={() => {}}
        />
      </div>
    </div>
  );
};

export default EmomEditPage;

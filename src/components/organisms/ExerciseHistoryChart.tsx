"use client";

import React, { useEffect, useState } from "react";
import Chart from "@/components/atoms/Chart";

// エクササイズの履歴データの型
interface ExerciseHistory {
  id: string; // 履歴のID
  exercise_id: string; // エクササイズのID
  volume: number; // エクササイズのボリューム（総負荷量）
  completed_at: string; // エクササイズが完了した日時
}

// コンポーネントのプロパティの型
interface ExerciseHistoryChartProps {
  exerciseId: string; // エクササイズのID
  exerciseName: string; // エクササイズの名前
}

// エクササイズの履歴を表示するチャートコンポーネント
const ExerciseHistoryChart: React.FC<ExerciseHistoryChartProps> = ({
  exerciseId,
  exerciseName,
}) => {
  // 履歴データの状態を管理
  const [histories, setHistories] = useState<ExerciseHistory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // ローディング状態を管理
  const [error, setError] = useState<string | null>(null); // エラーメッセージを管理

  // エクササイズの履歴データを取得する
  useEffect(() => {
    const fetchHistories = async () => {
      setIsLoading(true); // ローディング開始
      setError(null); // エラーメッセージをリセット
      try {
        // APIから履歴データを取得
        const response = await fetch(
          `/api/exercises/${exerciseId}/histories?limit=15`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // レスポンスが正常でない場合はエラーメッセージをスロー
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Failed to fetch exercise histories."
          );
        }

        // レスポンスデータを取得し、状態にセット
        const data: ExerciseHistory[] = await response.json();
        setHistories(data);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err); // エラーをコンソールに表示
          setError(err.message || "An unknown error occurred.");
        } // エラーメッセージを設定
      } finally {
        setIsLoading(false); // ローディング終了
      }
    };

    fetchHistories(); // コンポーネントのマウント時にデータを取得
  }, [exerciseId]);

  // ローディング中の表示
  if (isLoading) return <div>Loading chart...</div>;
  // エラーが発生した場合の表示
  if (error) return <div>Error: {error}</div>;
  // 履歴が存在しない場合の表示
  if (histories.length === 0)
    return <div>No history available for this exercise.</div>;

  // データを最新順にソート
  const sortedHistories = [...histories].sort(
    (a, b) =>
      new Date(a.completed_at).getTime() - new Date(b.completed_at).getTime()
  );

  // チャートに表示するデータを準備
  const seriesData = [
    {
      data: sortedHistories.map((history) => history.volume), // 各履歴のボリュームデータ
      label: `${exerciseName} Volume`, // チャートのラベル
      lineStyle: { stroke: "#3f51b5" }, // 線の色をカスタマイズ
    },
  ];

  // チャートのX軸のラベル（日時）を準備
  const xLabels = sortedHistories.map((history) => {
    const date = new Date(history.completed_at);
    return `${date.getMonth() + 1}/${date.getDate()}`; // "MM/DD"形式で表示
  });

  return (
    <div className="my-5">
      {/* チャートコンポーネントにデータを渡して表示 */}
      <Chart seriesData={seriesData} xLabels={xLabels} />
    </div>
  );
};

export default ExerciseHistoryChart;

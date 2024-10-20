"use client";

import Button from "@/components/atoms/Button";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
// タイマー
import { CountdownCircleTimer } from "react-countdown-circle-timer";
// 完了後のポップアップ
import CompleteDialog from "@/components/CompleteDialog";
import Countdown3sec from "@/components/Countdown3sec";
import { WorkoutPlan } from "@/utils/workout";

interface Exercise {
  id: string;
  name: string;
  reps: number;
}

interface EMOM {
  id: string;
  name: string;
  ready: number;
  sets: number;
  exercises: Exercise[];
}

const TimerPage = () => {
  const params = useParams();
  const emomId = params.id; // ルートからemom_idを取得
  // EMOMの状態管理
  const [emom, setEmom] = useState<EMOM | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  // タイマーの状態管理
  const [isRunning, setIsRunning] = useState(false); // 本番タイマーの再生状態
  const [isReadyPhase, setIsReadyPhase] = useState(true); // 準備時間かどうか
  const [isReadyRunning, setIsReadyRunning] = useState(false); // 準備タイマーの再生状態
  const [completedSets, setCompletedSets] = useState(0); //完了したセット数の表示

  const [isComplete, setIsComplete] = useState(false); // トレーニング完了かどうか

  // keyを0で固定
  const key = 0;

  // サウンドを再生する関数
  const playSound = (soundFile: string) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  // 準備タイマーのスタート・ポーズ関数
  const handleReadyPose = () => {
    setIsReadyRunning(false);
    playSound("/stop.mp3");
  };
  const handleReadyStart = () => {
    setIsReadyRunning(true);
    playSound("/gong.mp3");
  };

  // 本番タイマーのポーズ・リスタート関数
  const handlePose = () => {
    setIsRunning(false);
    playSound("/stop.mp3");
  };

  const handleRestart = () => {
    // タイマーをリセットせず、一時停止したところから再開
    if (isReadyPhase) {
      setIsReadyRunning(true); // 準備タイマーを再開
      playSound("/gong.mp3");
    } else {
      setIsRunning(true); // 本番タイマーを再開
      playSound("/gong.mp3");
    }
  };

  // EMOMデータをget
  useEffect(() => {
    const fetchEMOM = async () => {
      setIsLoading(true);
      setFetchError(null);
      // GETメソッド
      try {
        const response = await fetch(`/api/emoms/${emomId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        // エラーハンドリング
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch EMOM");
        }

        const data: EMOM = await response.json();
        setEmom(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setFetchError(error.message);
        } else {
          setFetchError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (emomId) {
      fetchEMOM();
    } else {
      setFetchError("EMOM ID is missing in the route.");
      setIsLoading(false);
    }
  }, [emomId]);

  // EMOM更新関数
  const updateEMOM = async (plan: WorkoutPlan) => {
    if (!emom) return;

    // 各エクササイズのレップ数を更新
    const updatedExercises = emom.exercises.map((exercise) => ({
      ...exercise,
      reps:
        plan.exercises.find((ex) => ex.id === exercise.id)?.reps ||
        exercise.reps,
    }));

    // 新しいセット数と更新されたエクササイズを送信
    const updatedEMOM = {
      sets: plan.sets,
      exercises: updatedExercises,
    };

    try {
      const response = await fetch(`/api/emoms/${emomId}/complete`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEMOM),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update EMOM");
      }

      const data: EMOM = await response.json();
      setEmom(data); // 更新されたEMOMデータを設定
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unknown error occurred while updating EMOM.");
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (fetchError || !emom) {
    return <div>Error: {fetchError || "EMOM not found"}</div>;
  }

  const { name, ready, sets, exercises } = emom;

  return (
    <div className="my-5">
      <div>
        <Button size="large" color="danger">
          <Link href="/emoms">STOP</Link>
        </Button>
      </div>
      <div>
        <div className="flex justify-center my-5">
          {/* 事前にReadyでトレーニング開始までの時間を設ける
          key:タイマーが正常に作動するように必要
          color:colorTimeとの組み合わせで色を設定できる
          duration:タイマーの時間を設定
          onComplete:タイマー完了後の動きを設定
          */}
          {isReadyPhase ? (
            <CountdownCircleTimer
              key={`ready-${emomId}`}
              isPlaying={isReadyRunning}
              colors={["#FFF700", "#FF2603"]}
              colorsTime={[ready, 0]}
              duration={ready}
              onComplete={() => {
                setIsReadyPhase(false); // 三項演算子で準備時間が終了したら本番タイマーに移行
                setIsRunning(true); // 本番タイマーを開始
                return { shouldRepeat: false }; //falseにして本番タイマーを表示
              }}
            >
              {({ remainingTime }) => {
                return (
                  // 残り3秒でサウンド再生
                  <Countdown3sec
                    remainingTime={remainingTime}
                    isReady={isReadyPhase}
                    completedSets={completedSets}
                  />
                );
              }}
            </CountdownCircleTimer>
          ) : (
            // 本番のタイマー
            <CountdownCircleTimer
              key={`main-${key}`}
              isPlaying={isRunning}
              duration={60} //本番は60秒固定
              colors={["#4666FF", "#00FEFC", "#FFF700", "#FF2603"]}
              colorsTime={[45, 30, 15, 0]}
              onComplete={() => {
                let shouldRepeat = true;

                setCompletedSets((prevCompletedSets) => {
                  const nextCompletedSets = prevCompletedSets + 1;
                  // 表示する完了セットを更新しつつ、設定したsetsより多くなったら終了
                  if (nextCompletedSets >= sets) {
                    setIsRunning(false);
                    shouldRepeat = false;
                    setIsComplete(true); // トレーニング完了を設定
                  }

                  return nextCompletedSets;
                });

                return { shouldRepeat };
              }}
            >
              {({ remainingTime }) => {
                return (
                  // 残り3秒でサウンド再生
                  <Countdown3sec
                    remainingTime={remainingTime}
                    isReady={isReadyPhase}
                    completedSets={completedSets}
                  />
                );
              }}
            </CountdownCircleTimer>
          )}
        </div>
      </div>
      {/* EMOMの情報表示 */}
      <div className="mx-[10%] my-5">
        <div className="grid grid-cols-2 grid-rows-4 gap-5 text-2xl">
          <div>{name}</div>
          <div>{sets} sets</div>
          {/* 動的にエクササイズを表示 */}
          {exercises.map((exercise) => (
            <React.Fragment key={exercise.id}>
              <div>{exercise.name}</div>
              <div>{exercise.reps} reps</div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex justify-center space-x-3">
        {/* Readyの場合のボタン */}
        {isReadyPhase ? (
          isReadyRunning ? (
            <Button size="large" color="secondary" onClick={handleReadyPose}>
              POSE
            </Button>
          ) : (
            <Button size="large" color="primary" onClick={handleReadyStart}>
              START
            </Button>
          )
        ) : // Readyでない場合のボタン
        isRunning ? (
          <Button size="large" color="secondary" onClick={handlePose}>
            POSE
          </Button>
        ) : (
          <Button size="large" color="primary" onClick={handleRestart}>
            RESTART
          </Button>
        )}
      </div>
      <div>
        {isComplete && <CompleteDialog emom={emom} onUpdate={updateEMOM} />}
      </div>
    </div>
  );
};

export default TimerPage;

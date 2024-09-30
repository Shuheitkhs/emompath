"use client";

import Button from "@/components/atoms/Button";
import Link from "next/link";
import React, { useState, useEffect } from "react";
// タイマー
import { CountdownCircleTimer } from "react-countdown-circle-timer";
// 完了後のポップアップ
import CompleteDialog from "@/components/CompleteDialog";

const page = () => {
  // ステートの定義
  const [isRunning, setIsRunning] = useState(false); // 本番タイマーの再生状態
  const [isReadyPhase, setIsReadyPhase] = useState(true); // 準備時間かどうか
  const [isReadyRunning, setIsReadyRunning] = useState(false); // 準備タイマーの再生状態
  const [completedSets, setCompletedSets] = useState(0); //完了したセット数の表示
  const [key, setKey] = useState(0); // タイマーのリセット用
  const [isComplete, setIsComplete] = useState(false); // トレーニング完了かどうか

  // 仮のセット数
  const sets = 1;

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
              key={`ready-${key}`}
              isPlaying={isReadyRunning}
              colors={["#FFF700", "#FF2603"]}
              colorsTime={[5, 0]}
              duration={10} // 仮で準備時間を10秒に設定
              onComplete={() => {
                setIsReadyPhase(false); // 三項演算子で準備時間が終了したら本番タイマーに移行
                setIsRunning(true); // 本番タイマーを開始
                return { shouldRepeat: false }; //falseにして本番タイマーを表示
              }}
            >
              {({ remainingTime }) => {
                // 残り3秒でサウンド再生
                useEffect(() => {
                  if (remainingTime === 3) {
                    playSound("/3sec_countdown.mp3");
                  }
                }, [remainingTime]);

                return (
                  <div className="flex flex-col">
                    <div className="text-2xl font-bold">Ready</div>
                    <div className="text-3xl font-bold text-primary">
                      {remainingTime} sec
                    </div>
                  </div>
                );
              }}
            </CountdownCircleTimer>
          ) : (
            // 本番のタイマー
            <CountdownCircleTimer
              key={`main-${key}`}
              isPlaying={isRunning}
              duration={3} //本番は60秒固定
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
                // 残り3秒でサウンド再生
                useEffect(() => {
                  if (remainingTime === 3) {
                    playSound("/3sec_countdown.mp3");
                  }
                }, [remainingTime]);
                return (
                  <div className="flex flex-col">
                    <div className="text-2xl font-bold">
                      {remainingTime} sec
                    </div>
                    <div className="text-primary text-xl font-bold">
                      Current {completedSets + 1} sets
                    </div>
                  </div>
                );
              }}
            </CountdownCircleTimer>
          )}
        </div>
      </div>
      {/* 仮のEMOM情報 */}
      <div className="mx-[30%] my-5">
        <div className="grid grid-cols-2 grid-rows-4 gap-5 text-2xl ">
          <div>EMOM Name</div>
          <div>{sets} sets</div>
          <div>Exercise A</div>
          <div>20 reps</div>
          <div>Exercise B</div>
          <div>20 reps</div>
          <div>Exercise C</div>
          <div>20 reps</div>
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
      <div> {isComplete && <CompleteDialog />}</div>
    </div>
  );
};

export default page;

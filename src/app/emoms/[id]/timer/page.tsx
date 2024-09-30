"use client";

import Button from "@/components/atoms/Button";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
// タイマー
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const page = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [isReadyPhase, setIsReadyPhase] = useState(true); // 準備時間かどうか
  const [sets, setSets] = useState(3);
  const [elapsedSets, setElapsedSets] = useState(0);
  const elapsedSetsRef = useRef(elapsedSets);
  const [key, setKey] = useState(0); // タイマーのリセット用

  useEffect(() => {
    elapsedSetsRef.current = elapsedSets;
  }, [elapsedSets]);

  // サウンドを再生する関数
  const playSound = (soundFile: string) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  const handlePose = () => {
    setIsRunning(false);
  };

  const handleRestart = () => {
    setIsRunning(true);
    // 準備タイマーから再開する場合は以下をコメントアウト
    // setIsReadyPhase(true);
    // setElapsedSets(0);
    // setKey((prevKey) => prevKey + 1);
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
          {isReadyPhase ? (
            <CountdownCircleTimer
              key={`ready-${key}`}
              isPlaying={isRunning}
              colors={["#FFF700", "#FF2603"]}
              colorsTime={[5, 0]}
              duration={10} // 準備時間を10秒に設定
              onComplete={() => {
                setIsReadyPhase(false); // 準備時間が終了したら本番タイマーに移行
                return { shouldRepeat: false };
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
            <CountdownCircleTimer
              key={`main-${key}`}
              isPlaying={isRunning}
              duration={10}
              colors={["#4666FF", "#00FEFC", "#FFF700", "#FF2603"]}
              colorsTime={[45, 30, 15, 0]}
              onComplete={() => {
                const nextElapsedSets = elapsedSetsRef.current + 1;
                setElapsedSets(nextElapsedSets);
                elapsedSetsRef.current = nextElapsedSets;

                if (nextElapsedSets >= sets) {
                  setIsRunning(false);
                  return { shouldRepeat: false };
                }
                return { shouldRepeat: true };
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
                      Current {elapsedSets + 1} sets
                    </div>
                  </div>
                );
              }}
            </CountdownCircleTimer>
          )}
        </div>
      </div>
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
        {isRunning ? (
          <Button size="large" color="secondary" onClick={handlePose}>
            POSE
          </Button>
        ) : (
          <Button size="large" color="primary" onClick={handleRestart}>
            RESTART
          </Button>
        )}
      </div>
    </div>
  );
};

export default page;

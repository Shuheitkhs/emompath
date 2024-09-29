"use client";

import Button from "@/components/atoms/Button";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const page = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [sets, setSets] = useState(20);
  const [elapsedSets, setElapsedSets] = useState(0);
  const elapsedSetsRef = useRef(elapsedSets);

  useEffect(() => {
    elapsedSetsRef.current = elapsedSets;
  }, [elapsedSets]);

  const handlePose = () => {
    setIsRunning(false);
  };

  const handleRestart = () => {
    setIsRunning(true);
    // リセットは行わない
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
          <CountdownCircleTimer
            size={300}
            isPlaying={isRunning}
            duration={60}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
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
            {({ remainingTime }) => (
              <div className="flex flex-col">
                <div className="text-2xl font-bold">{remainingTime} sec</div>
                <div className="text-primary text-xl font-bold">
                  {sets - elapsedSets} sets remaining
                </div>
              </div>
            )}
          </CountdownCircleTimer>
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

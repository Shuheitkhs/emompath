/**  3秒の時点でカウントダウンを鳴らすコンポーネント */

import { useEffect } from "react";

interface Countdown3secProps {
  remainingTime: number;
  isReady: boolean;
  completedSets: number;
}

const Countdown3sec: React.FC<Countdown3secProps> = ({
  remainingTime,
  isReady,
  completedSets,
}) => {
  // 残り3秒でサウンド再生
  useEffect(() => {
    if (remainingTime === 3) {
      const playSound = (soundFile: string) => {
        const audio = new Audio(soundFile);
        audio.play();
      };
      playSound("/3sec_countdown.mp3");
    }
  }, [remainingTime]);

  console.log("start countdown");

  return (
    <div className="flex flex-col">
      {isReady ? (
        <>
          <div className="text-2xl font-bold">Ready</div>
          <div className="text-3xl font-bold text-primary">
            {remainingTime} sec
          </div>
        </>
      ) : (
        <>
          <div className="text-2xl font-bold">{remainingTime} sec</div>
          <div className="text-primary text-xl font-bold">
            Current {completedSets + 1} set
          </div>
        </>
      )}
    </div>
  );
};

export default Countdown3sec;

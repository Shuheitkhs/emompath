/** インプットとカウンターを組み合わせたコンポーネント */
import { useState } from "react";
import Input from "@/components/atoms/Input";
import Counter from "@/components/molecules/Counter";

interface EMOMEditProps {
  emomName: string;
  onNameChange: (name: string) => void;
  ready: number;
  setReady: (value: number) => void;
  sets: number;
  setSets: (value: number) => void;
}

const EMOMEdit: React.FC<EMOMEditProps> = ({
  emomName,
  onNameChange,
  ready,
  setReady,
  sets,
  setSets,
}) => {
  const [setsError, setSetsError] = useState<string | null>(null);
  const [readyError, setReadyError] = useState<string | null>(null);

  // Ready変更用のハンドラー・アルタイムでバリデーションができるように最大値・最低値で警告表示
  const handleReadyChange = (newReady: number) => {
    if (newReady === 5) {
      setReadyError("Ready should be at least 5");
    } else if (newReady === 60) {
      setReadyError("Ready should be at most 60");
    } else {
      setReadyError(null);
    }
    setReady(newReady);
  };

  // Sets変更用のハンドラー・リアルタイムでバリデーションができるように最大値・最低値で警告表示
  const handleSetsChange = (newSets: number) => {
    if (newSets === 5) {
      setSetsError("Ready should be at least 5");
    } else if (newSets === 30) {
      setSetsError("Ready should be at most 30");
    } else {
      setSetsError(null);
    }
    setSets(newSets);
  };

  return (
    <div className="">
      <Input
        size="large"
        type="text"
        value={emomName}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Input your EMOM Name"
        default="EMOM"
      />
      <Counter
        title="Ready"
        number={ready}
        plus1={() => handleReadyChange(Math.min(ready + 1, 60))}
        minus1={() => handleReadyChange(Math.max(ready - 1, 5))}
      />
      <div>{readyError && <p className="text-red-500">{readyError}</p>}</div>
      <Counter
        title="Sets"
        number={sets}
        plus1={() => handleSetsChange(Math.min(sets + 1, 30))}
        minus1={() => handleSetsChange(Math.max(sets - 1, 5))}
      />
      <div> {setsError && <p className="text-red-500">{setsError}</p>}</div>
    </div>
  );
};

export default EMOMEdit;

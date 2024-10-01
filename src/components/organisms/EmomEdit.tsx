/** インプットとカウンターを組み合わせたコンポーネント */

import React from "react";
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
  return (
    <div>
      <Input
        size="large"
        type="text"
        value={emomName}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Input your EMOM Name"
      />
      <Counter
        title="Ready"
        number={ready}
        plus1={() => setReady(ready + 1)}
        minus1={() => setReady(Math.max(ready - 1, 0))}
      />
      <Counter
        title="Sets"
        number={sets}
        plus1={() => setSets(sets + 1)}
        minus1={() => setSets(Math.max(sets - 1, 0))}
      />
    </div>
  );
};

export default EMOMEdit;

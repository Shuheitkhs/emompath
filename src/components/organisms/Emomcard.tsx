import Button from "@/components/atoms/Button";
import Link from "next/link";
import React from "react";

// ExerciseGrid コンポーネント
interface Exercise {
  emomName: string;
  sets: number;
  exercises: { name: string; reps: number }[];
}

const ExerciseGrid: React.FC<{ exerciseData: Exercise }> = ({
  exerciseData,
}) => {
  // ボリュームを各エクササイズごとに計算
  const totalVolume = exerciseData.exercises.reduce(
    (acc, exercise) => acc + exercise.reps * exerciseData.sets,
    0
  );

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-5 border rounded text-xl p-3 my-3 font-bold">
      <div className="col-span-2">{exerciseData.emomName}</div>
      <div>{exerciseData.sets} sets</div>
      {exerciseData.exercises.map((exercise, index) => (
        <React.Fragment key={index}>
          <div className={`row-start-${index + 2} col-span-2`}>
            {exercise.name}
          </div>
          <div className={`row-start-${index + 2}`}>{exercise.reps} reps</div>
        </React.Fragment>
      ))}
      <div className="row-start-3 col-span-2">
        Total Volume: {totalVolume} {/* 総ボリュームを表示 */}
      </div>
      <div className="row-start-3 bg-secondary rounded flex items-center justify-center">
        Edit
      </div>
      <div className="row-start-3 bg-primary rounded flex items-center justify-center">
        Start EMOM
      </div>
    </div>
  );
};

function Page() {
  // EMOMデータを定義
  const emomList: Exercise[] = [
    {
      emomName: "EMOM 1",
      sets: 10,
      exercises: [
        { name: "Exercise Name 1", reps: 10 },
        { name: "Exercise Name 2", reps: 10 },
      ],
    },
    {
      emomName: "EMOM 2",
      sets: 15,
      exercises: [
        { name: "Exercise Name A", reps: 10 },
        { name: "Exercise Name B", reps: 20 },
      ],
    },
    {
      emomName: "EMOM 3",
      sets: 20,
      exercises: [
        { name: "Exercise Name C", reps: 15 },
        { name: "Exercise Name D", reps: 25 },
      ],
    },
  ];

  return (
    <div>
      <div>
        <h2 className="text-3xl my-5">EMOM List</h2>
      </div>
      <div className="mb-5">
        <Button size="large" color="secondary">
          <Link href="/emoms/create">Create New EMOM</Link>
        </Button>
      </div>
      <div>
        {emomList.map((exerciseData, index) => (
          <ExerciseGrid key={index} exerciseData={exerciseData} />
        ))}
      </div>
    </div>
  );
}

export default Page;

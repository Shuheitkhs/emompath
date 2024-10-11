// 次回のトレーニングを計算するロジック
// 使用例を下部に記載

// 次回のトレーニングを計算するロジック
// 使用例を下部に記載

// EMOMの型
export interface EMOM {
  id: string; // EMOMのID
  name: string; // EMOMの名前
  ready: number; // 準備時間（秒）
  sets: number; // セット数
  exercises: Exercise[]; // 含まれるエクササイズのリスト
}

// exerciseの型
export interface Exercise {
  id: string; // エクササイズのID
  name: string; // エクササイズの名前
  reps: number; // エクササイズのレップ数（1セットあたりの回数）
}

// 次回のプランの型
export interface WorkoutPlan {
  volumeIncrease: string; // ボリュームの増加率
  exercises: {
    id: string; // エクササイズのID
    name: string; // エクササイズの名前
    reps: number; // 次回のレップ数
    volume: number; // 次回のボリューム（レップ数 × セット数）
  }[];
  sets: number; // 次回のセット数
}

// 次回のワークアウトを計算する関数
export function calculateNextWorkout(currentEMOM: EMOM): WorkoutPlan[] {
  const increases = [1.1, 1.2, 1.3]; // ボリュームの増加率（10%、20%、30%）
  const volumeIncreases = ["10%", "20%", "30%"];
  const minSets = Math.max(5, currentEMOM.sets - 1); // 現在のセット数-1から最低5セットを維持
  const maxSets = Math.min(30, currentEMOM.sets + 2); // 前回セットの+2から最大30セットを維持

  // 各増加率に対して次回のワークアウトプランを計算
  const usedSets = new Map<number, number>(); // 使用済みのセット数を追跡するためのマップ（セット数と出現回数）

  return increases.map((increaseFactor, index) => {
    let updatedSets = currentEMOM.sets; // 初期のセット数（仮）は前回のセット数と同じに設定

    // 各エクササイズごとに新しいボリュームを計算
    const updatedExercises = currentEMOM.exercises.map((ex) => {
      const currentVolume = ex.reps * currentEMOM.sets; // 現在のエクササイズのボリュームを計算
      const increasedVolume = Math.ceil(currentVolume * increaseFactor); // 増加後のボリュームを計算
      const minReps = Math.max(1, ex.reps - 3); // レップ数の最小値を設定（前回レップ数から最大-3）
      const maxReps = ex.reps + 3; // レップ数の最大値を設定（前回レップ数から最大+3）
      let reps = Math.ceil(increasedVolume / updatedSets); // 新しいレップ数を計算

      // レップ数が最小値と最大値の範囲内に収まるように調整
      if (reps < minReps) {
        reps = minReps;
      } else if (reps > maxReps) {
        reps = maxReps;
      }

      return {
        ...ex,
        reps,
        volume: reps * updatedSets, // 新しいボリュームを計算
      };
    });

    // 各エクササイズのボリュームに基づいてセット数を再計算
    const totalIncreasedVolume = updatedExercises.reduce(
      (acc, ex) => acc + ex.volume,
      0
    );
    updatedSets = Math.ceil(totalIncreasedVolume / currentEMOM.sets);

    // セット数が最小値と最大値の範囲内に収まるように調整
    if (updatedSets < minSets) {
      updatedSets = minSets;
    } else if (updatedSets > maxSets) {
      updatedSets = maxSets;
    }

    // 使用済みのセット数と重ならないように調整。ただし、同じセット数は1つまで許容する
    const currentCount = usedSets.get(updatedSets) || 0;
    if (currentCount >= 1) {
      while (usedSets.has(updatedSets) && usedSets.get(updatedSets)! >= 1) {
        updatedSets += 1;
        if (updatedSets > maxSets) {
          updatedSets = minSets;
        }
      }
    }
    usedSets.set(updatedSets, (usedSets.get(updatedSets) || 0) + 1);

    // 新しいセット数に基づいてレップ数を再計算
    const finalExercises = updatedExercises.map((ex) => {
      let reps = Math.ceil(ex.volume / updatedSets);

      // レップ数が最小値と最大値の範囲内に収まるように再調整
      const minReps = Math.max(1, ex.reps - 3);
      const maxReps = ex.reps + 3;
      if (reps < minReps) {
        reps = minReps;
      } else if (reps > maxReps) {
        reps = maxReps;
      }

      return {
        ...ex,
        reps,
        volume: reps * updatedSets, // 最終的なボリュームを計算
      };
    });

    return {
      volumeIncrease: volumeIncreases[index], // ボリュームの増加率を設定
      exercises: finalExercises, // 最終的なエクササイズのリスト
      sets: updatedSets, // 最終的なセット数
    };
  });
}

// const currentEMOM: EMOM = {
//     id: 'emom1',
//     name: 'Full Body Workout',
//     ready: 60,
//     sets: 10,
//     exercises: [
//       { id: 'ex1', name: 'Push Ups', reps: 10 },
//       { id: 'ex2', name: 'Squats', reps: 15 },
//       { id: 'ex3', name: 'Pull Ups', reps: 5 },
//     ],
// のように数値を渡すと、以下のように返ってくる
// [
//   {
//     "volumeIncrease": "10%",
//     "exercises": [
//       { "id": "ex1", "name": "Push Ups", "reps": 11, "volume": 110 },
//       { "id": "ex2", "name": "Squats", "reps": 17, "volume": 170 },
//       { "id": "ex3", "name": "Pull Ups", "reps": 6, "volume": 60 }
//     ],
//     "sets": 10
//   },
//   {
//     "volumeIncrease": "20%",
//     "exercises": [
//       { "id": "ex1", "name": "Push Ups", "reps": 12, "volume": 120 },
//       { "id": "ex2", "name": "Squats", "reps": 18, "volume": 180 },
//       { "id": "ex3", "name": "Pull Ups", "reps": 6, "volume": 60 }
//     ],
//     "sets": 11
//   },
//   {
//     "volumeIncrease": "30%",
//     "exercises": [
//       { "id": "ex1", "name": "Push Ups", "reps": 13, "volume": 130 },
//       { "id": "ex2", "name": "Squats", "reps": 20, "volume": 200 },
//       { "id": "ex3", "name": "Pull Ups", "reps": 7, "volume": 70 }
//     ],
//     "sets": 11
//   }
// ]

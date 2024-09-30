// utils/calculateNextWorkout.ts

export interface WorkoutPlan {
  volumeIncrease: string;
  reps: number;
  sets: number;
  totalVolume: number;
}

export function calculateNextWorkout(
  currentReps: number,
  currentSets: number
): WorkoutPlan[] {
  const volume = currentReps * currentSets;
  const targetVolumes = [volume * 1.1, volume * 1.2, volume * 1.3];
  const minSets = Math.max(5, currentSets - 5); // 前回セットの-5から最低5セットを維持
  const maxSets = Math.min(30, currentSets + 5); // 前回セットの+5から最大30セットを維持

  const results = targetVolumes.map((targetVolume) => {
    const idealReps = targetVolume / currentSets;
    const roundedReps = Math.ceil(idealReps);
    let neededSets = Math.ceil(targetVolume / roundedReps);

    let sets;
    if (neededSets < minSets) {
      sets = minSets;
    } else if (neededSets > maxSets) {
      sets = maxSets;
    } else {
      sets = neededSets;
    }

    const finalReps = Math.ceil(targetVolume / sets);
    const actualVolume = finalReps * sets;
    const volumeIncrease = (((actualVolume - volume) / volume) * 100).toFixed(
      1
    );

    return {
      volumeIncrease: `${volumeIncrease}%`,
      reps: finalReps,
      sets: sets,
      totalVolume: actualVolume,
    };
  });

  return results;
}

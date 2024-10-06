import { supabase } from "@/lib/supabaseClient";

interface EmomData {
  name: string;
  ready: number;
  sets: number;
  exercises: { name: string; reps: number }[];
}

export const createEmom = async (emomData: EmomData) => {
  // Supabaseクライアントでセッション情報を取得してみる
  const { data: session, error } = await supabase.auth.getSession();

  console.log("Session:", session);
  console.log("Error:", error);

  // 1. EMOMを作成
  const { data: emom, error: emomError } = await supabase
    .from("emoms")
    .insert([
      { name: emomData.name, ready: emomData.ready, set: emomData.sets },
    ])
    .select("id") // 作成されたemomのIDを取得
    .single();

  if (emomError) {
    throw new Error(emomError.message);
  }

  // 2. EMOMのIDを利用してexercisesを作成
  const exercisesToInsert = emomData.exercises.map((exercise) => ({
    emom_id: emom.id,
    name: exercise.name,
    reps: exercise.reps,
  }));

  const { error: exerciseError } = await supabase
    .from("exercises")
    .insert(exercisesToInsert);

  if (exerciseError) {
    throw new Error(exerciseError.message);
  }

  return emom;
};

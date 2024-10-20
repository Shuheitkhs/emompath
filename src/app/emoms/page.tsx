"use client";

import Button from "@/components/atoms/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import Exercise from "@/components/organisms/Exercise";

// EMOMのデータ型を定義
interface Exercise {
  id: string;
  name: string;
  reps: number;
}

interface Emom {
  id: string;
  name: string;
  sets: number;
  exercises: Exercise[];
}

const EmomListPage = () => {
  const [emoms, setEmoms] = useState<Emom[]>([]); // EMOMデータを格納するstate
  const [loading, setLoading] = useState(true); // ローディング状態を管理
  const [error, setError] = useState<string | null>(null); // エラーメッセージを管理

  // 初回レンダリング時にEMOMデータを取得・後でServerComponentに
  useEffect(() => {
    const fetchEmoms = async () => {
      try {
        const res = await fetch("/api/emoms"); // APIにGETリクエスト
        if (!res.ok) throw new Error("Failed to fetch emoms");
        const data = await res.json();
        setEmoms(data); // データをセット
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmoms(); // 定義したfetchEmomsを呼び出す
  }, []); // 空の依存配列で初回レンダリング時のみ実行

  if (loading) return <p>Loading...</p>; // ローディング中の表示
  if (error) return <p>Error: {error}</p>; // エラー時の表示

  return (
    <div>
      <div>
        <h2 className="text-3xl my-5">EMOM List</h2>
      </div>
      <div className="mb-5 flex justify-center">
        <Button size="large" color="secondary">
          <Link href="/emoms/create">Create New EMOM</Link>
        </Button>
      </div>

      {/* EMOMリストを動的に生成 */}
      {emoms.map((emom) => {
        return (
          <div
            key={emom.id}
            className="grid grid-cols-3 gap-5 border rounded text-xl p-3 my-3 font-bold"
          >
            {/* EMOM名とセット数の表示 */}
            <div className="col-span-2">
              {emom.name}
              {/* 各Exerciseの表示 */}
              {emom.exercises.map((exercise, index) => (
                <div
                  key={exercise.id}
                  className={`col-span-2 row-start-${index + 2}`}
                >
                  {exercise.name}
                </div>
              ))}
            </div>
            <div className="col-span-1">
              {emom.sets} sets
              {emom.exercises.map((exercise, index) => (
                <div
                  key={exercise.id}
                  className={`col-span-1 row-start-${index + 2}`}
                >
                  {exercise.reps} reps
                </div>
              ))}
            </div>

            <div className="col-span-1">
              {/* 各exercisesのvolumeの表示 */}
              {emom.exercises.map((exercise) => (
                <div key={exercise.id}>
                  {exercise.name} Volume {emom.sets * exercise.reps}
                </div>
              ))}
            </div>

            {/* Editボタン */}
            <div
              className={`row-span-${emom.exercises.length} col-span-1 flex items-center justify-center bg-secondary rounded cursor-pointer hover:scale-105 transition-transform duration-100 active:scale-95`}
            >
              <Link href={`/emoms/${emom.id}`}>Edit</Link>
            </div>

            {/* Start EMOMボタン */}
            <div
              className={`row-span-${emom.exercises.length} col-span-1 flex items-center justify-center bg-primary rounded cursor-pointer hover:scale-105 transition-transform duration-100 active:scale-95`}
            >
              <Link href={`/emoms/${emom.id}/timer`}>Start EMOM</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmomListPage;

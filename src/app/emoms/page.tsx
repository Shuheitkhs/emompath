import Button from "@/components/atoms/Button";
import Link from "next/link";
import React from "react";
import { supabase } from "@/lib/supabaseClient";

const EmomListPage = async () => {
  const { data: sessionData } = await supabase.auth.getSession();
  console.log(sessionData?.session?.access_token);

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
      <div>
        <div className="grid grid-cols-3 grid-rows-3 gap-5 border rounded text-xl p-3 my-3 font-bold">
          <div className="col-span-2">EMOM Name</div>
          <div>10sets</div>
          <div className="row-start-2 col-span-2">Exercise Name</div>
          <div className="row-start-2">10reps</div>
          <div className="row-start-3">Exercise Volume 100</div>
          <div className="row-start-3 flex items-center justify-center bg-secondary rounded">
            Edit
          </div>
          <div className="row-start-3 flex items-center justify-center bg-primary rounded">
            Start EMOM
          </div>
        </div>
        {/* 第二のグリッド */}

        <div className="grid grid-cols-3 grid-rows-3 gap-5 border rounded text-xl p-3 my-3 font-bold">
          <div className="col-span-2">EMOM Name</div>
          <div>15sets</div>
          <div className="row-start-2 col-span-2">Exercise NameA</div>
          <div className="row-start-2">10reps</div>
          <div className="row-start-3 col-span-2">Exercise NameB</div>
          <div className="row-start-3">20reps</div>
          <div className="row-start-4">ExerciseA Volume 150</div>
          <div className="row-start-4 row-span-2 flex items-center justify-center bg-secondary rounded">
            Edit
          </div>
          <div className="row-start-4 row-span-2 flex items-center justify-center bg-primary rounded">
            Start EMOM
          </div>
          <div className="row-start-5">ExerciseB Volume 300</div>
        </div>
        {/* 第三のグリッド */}
        <div className="grid grid-cols-3 grid-rows-3 gap-5 border rounded text-xl p-3 my-3 font-bold">
          <div className="col-span-2">EMOM Name</div>
          <div>15sets</div>
          <div className="row-start-2 col-span-2">Exercise NameA</div>
          <div className="row-start-2">10reps</div>
          <div className="row-start-3 col-span-2">Exercise NameB</div>
          <div className="row-start-3">20reps</div>
          <div className="row-start-4 col-span-2">Exercise NameC</div>
          <div className="row-start-4">20reps</div>
          <div className="row-start-5">ExerciseA Volume 150</div>
          <div className="row-start-5 row-span-3 flex items-center justify-center bg-secondary rounded">
            Edit
          </div>
          <div className="row-start-5 row-span-3 flex items-center justify-center bg-primary rounded">
            Start EMOM
          </div>
          <div className="row-start-6">ExerciseB Volume 300</div>
          <div className="row-start-7">ExerciseC Volume 300</div>
        </div>
      </div>
    </div>
  );
};

export default EmomListPage;

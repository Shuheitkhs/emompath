/** timer完了後のダイアログ */

"use client";

import React, { useState } from "react";
import AlertDialog from "./AlertDialog";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { WorkoutPlan, EMOM, calculateNextWorkout } from "@/utils/workout";
import UpdateDialog from "./UpdateDialog";

interface CompleteDialogProps {
  emom: EMOM;
  onUpdate: (plan: WorkoutPlan) => void;
}

const CompleteDialog: React.FC<CompleteDialogProps> = ({ emom, onUpdate }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const workoutPlans: WorkoutPlan[] = calculateNextWorkout(emom);

  const handleAgree = (plan: WorkoutPlan) => {
    onUpdate(plan);

    setShowConfirmation(true);
  };

  const handleDisagree = () => {};

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const icons = [
    <DirectionsRunIcon fontSize="large" key="icon-10" />,
    <TwoWheelerIcon fontSize="large" key="icon-20" />,
    <FlightTakeoffIcon fontSize="large" key="icon-30" />,
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-danger p-5 rounded shadow-lg">
        <h3 className="text-primary font-bold text-5xl mb-4">
          Congratulations!!
        </h3>
        <p className="text-xl font-bold mb-4">
          Now get ready for your next training session!
        </p>
        {workoutPlans.map((plan, index) => (
          <AlertDialog
            key={index}
            trigger={
              <div className="bg-black rounded-lg cursor-pointer text-2xl shadow-xl hover:scale-105 transition-transform duration-100 active:scale-95 p-4 mb-4">
                <div>{icons[index]}</div>
                <div className="text-3xl">
                  Volume{" "}
                  <span className="text-primary">{plan.volumeIncrease}</span> up
                </div>
                <div className="grid grid-cols-2 gap-5 text-2xl py-2 my-2">
                  <div className="">{emom.name}</div>
                  <div>{plan.sets} sets</div>
                  {plan.exercises.map((exercise, exIndex) => (
                    <React.Fragment key={exercise.id}>
                      <div>{exercise.name}</div>
                      <div>{exercise.reps} reps</div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            }
            title={`Update with ${plan.volumeIncrease} increase?`}
            content={
              <div className="grid grid-cols-2 gap-5 text-2xl text-center">
                <div>{emom.name}</div>
                <div>{plan.sets} sets</div>
                {plan.exercises.map((exercise, exIndex) => (
                  <React.Fragment key={exercise.id}>
                    <div>{exercise.name}</div>
                    <div>{exercise.reps} reps</div>
                  </React.Fragment>
                ))}
              </div>
            }
            agreeText="Yes"
            disagreeText="No"
            onAgree={() => handleAgree(plan)}
            onDisagree={handleDisagree}
          />
        ))}
        {showConfirmation && <UpdateDialog onClose={handleCloseConfirmation} />}
      </div>
    </div>
  );
};

export default CompleteDialog;

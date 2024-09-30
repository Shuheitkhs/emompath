// CompleteDialog.tsx
import React from "react";
import AlertDialog from "./AlertDialog";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

const CompleteDialog = () => {
  const handleAgree = () => {
    alert("Agreed!");
  };

  const handleDisagree = () => {
    alert("Disagreed!");
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-danger p-5 rounded shadow-lg">
        <h3 className="text-primary font-bold text-5xl mb-4">
          Congratulations!!
        </h3>
        <p className="text-xl font-bold mb-4">
          Now get ready for your next training session!
        </p>
        <AlertDialog
          trigger={
            <div className=" bg-black rounded-lg cursor-pointer text-2xl shadow-xl hover:scale-105 transition-transform duration-100 active:scale-95">
              <div>
                <DirectionsRunIcon fontSize="large" />
              </div>
              <div className="text-3xl">
                Volume <span className="text-primary">10%</span>up
              </div>
              <div className=" grid grid-cols-2 grid-rows-2 gap-5 text-2xl py-2 my-2">
                <div>EMOM Name</div>
                <div>10 sets</div>
                <div>Exercise A</div>
                <div>20 reps</div>
              </div>
            </div>
          }
          title="Update with 10% increase?"
          content={
            <div className=" grid grid-cols-2 grid-rows-4 gap-5 text-2xl ">
              <div>EMOM Name</div>
              <div>10 sets</div>
              <div>Exercise A</div>
              <div>20 reps</div>
              <div>Exercise B</div>
              <div>20 reps</div>
              <div>Exercise C</div>
              <div>20 reps</div>
            </div>
          }
          agreeText="Yes"
          disagreeText="No"
          onAgree={handleAgree}
          onDisagree={handleDisagree}
        />
        <AlertDialog
          trigger={
            <div className=" bg-black rounded-lg cursor-pointer text-2xl shadow-xl hover:scale-105 transition-transform duration-100 active:scale-95">
              <div>
                <TwoWheelerIcon fontSize="large" />
              </div>
              <div className="text-3xl">
                Volume <span className="text-primary">20%</span>up
              </div>
              <div className=" grid grid-cols-2 grid-rows-2 gap-5 text-2xl py-2 my-2">
                <div>EMOM Name</div>
                <div>10 sets</div>
                <div>Exercise A</div>
                <div>20 reps</div>
              </div>
            </div>
          }
          title="Update with 20% increase?"
          content={
            <div className=" grid grid-cols-2 grid-rows-4 gap-5 text-2xl ">
              <div>EMOM Name</div>
              <div>10 sets</div>
              <div>Exercise A</div>
              <div>20 reps</div>
              <div>Exercise B</div>
              <div>20 reps</div>
              <div>Exercise C</div>
              <div>20 reps</div>
            </div>
          }
          agreeText="Yes"
          disagreeText="No"
          onAgree={handleAgree}
          onDisagree={handleDisagree}
        />
        <AlertDialog
          trigger={
            <div className=" bg-black rounded-lg cursor-pointer text-2xl shadow-xl hover:scale-105 transition-transform duration-100 active:scale-95">
              <div>
                <FlightTakeoffIcon fontSize="large" />
              </div>
              <div className="text-3xl">
                Volume <span className="text-primary">30%</span>up
              </div>
              <div className=" grid grid-cols-2 grid-rows-2 gap-5 text-2xl py-2 my-2">
                <div>EMOM Name</div>
                <div>10 sets</div>
                <div>Exercise A</div>
                <div>20 reps</div>
              </div>
            </div>
          }
          title="Update with 30% increase?"
          content={
            <div className=" grid grid-cols-2 grid-rows-4 gap-5 text-2xl ">
              <div>EMOM Name</div>
              <div>10 sets</div>
              <div>Exercise A</div>
              <div>20 reps</div>
              <div>Exercise B</div>
              <div>20 reps</div>
              <div>Exercise C</div>
              <div>20 reps</div>
            </div>
          }
          agreeText="Yes"
          disagreeText="No"
          onAgree={handleAgree}
          onDisagree={handleDisagree}
        />
      </div>
    </div>
  );
};

export default CompleteDialog;

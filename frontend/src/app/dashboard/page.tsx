"use client";
import React from "react";
import WorkoutCardComponent from "@/components/WorkoutCards/WorkoutCardsComponent";

const Dashboard = () => {

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-screen overflow-x-auto overflow-hidden p-4">
          <WorkoutCardComponent />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

"use client";
import React from "react";
import { MultiStepLoader } from "../ui/multi-step-loader"; 
import { IconSquareRoundedX } from "@tabler/icons-react";

const loadingStates = [
  { text: "Buying a condo" },
  { text: "Travelling in a flight" },
  { text: "Meeting Tyler Durden" },
  { text: "He makes soap" },
  { text: "We go to a bar" },
  { text: "Start a fight" },
  { text: "We like it" },
  { text: "Welcome to F**** C***" },
];


interface FormSubmissionLoaderProps {
  loading: boolean;
  onClose: () => void;
}


const FormSubmissionLoader: React.FC<FormSubmissionLoaderProps> = ({ loading, onClose }) => {
  return (
    <div className="w-full h-[60vh] flex items-center justify-center relative">
      <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={2000} />

      {loading && (
        <button
          className="fixed top-4 right-4 text-black dark:text-white z-[120]"
          onClick={onClose}
        >
          <IconSquareRoundedX className="h-10 w-10" />
        </button>
      )}
    </div>
  );
};
export default FormSubmissionLoader;

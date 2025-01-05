"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";

const ApplicantProgress = ({ currentStepIndex }) => {
  const steps = ["In Review", "Coding", "Interview", "Offer"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (currentStepIndex > 0 && currentStepIndex <= steps.length) {
      setCurrentStep(currentStepIndex);
    }
  }, [currentStepIndex]);
  return (
    <>
      <div className="flex">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`relative flex flex-col justify-center items-center w-20 step-items ${
              currentStep === i + 1 && "active"
            } ${(i + 1 < currentStep || complete) && "complete"}`}
          >
            <div
              className={`w-5 h-5 text-[10px] flex z-10 relative bg-black rounded-full items-center justify-center font-semibold text-white step`}
            >
              {i + 1 < currentStep || complete ? (
                <span className="border border-green-500 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center">
                  <Check size={16} />
                </span>
              ) : (
                i + 1
              )}
            </div>
            <p className="text-gray-500 text-[10px]">{step}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ApplicantProgress;

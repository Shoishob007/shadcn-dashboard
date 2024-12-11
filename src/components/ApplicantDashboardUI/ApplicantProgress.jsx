"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";

const ApplicantProgress = ({ currentStepIndex }) => {
  const steps = ["Applied", "In Review", "Coding Test", "Interview", "Offer"];
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
            className={`relative flex flex-col justify-center items-center w-36 step-items ${
              currentStep === i + 1 && "active"
            } ${(i + 1 < currentStep || complete) && "complete"}`}
          >
            <div
              className={`w-7 h-7 text-sm flex z-10 relative bg-black rounded-full items-center justify-center font-semibold text-white step`}
            >
              {i + 1 < currentStep || complete ? (
                <span className="border border-green-500 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center">
                  <Check size={16} />
                </span>
              ) : (
                i + 1
              )}
            </div>
            <p className="text-gray-500 text-[12px]">{step}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ApplicantProgress;

"use client";

import { useState } from "react";

const Progress = () => {
  const steps = ["Applied", "In Review", "Interview", "Offer"];
  const [currentStep, setCurrentStep] = useState(4);
  const [complete, setComplete] = useState(false);
  return (
    <>
      <div className="flex w-[600px] mx-auto mt-20">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`relative flex flex-col justify-center items-center w-36 step-items ${currentStep === i + 1 && 'active'} ${(i + 1 < currentStep || complete) && 'complete'}`}
          >
            <div className={`w-7 h-7 text-sm flex z-10 relative bg-slate-700 rounded-full items-center justify-center font-semibold text-white step`}>
              {i + 1}
            </div>
            <p className="text-gray-500 text-[12px]">{step}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Progress;
 
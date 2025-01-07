import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const steps = [
    "screening test",
    "aptitude test", 
    "technical test",
    "hr interview",
    "technical interview",
    "final interview"
  ];
  
  export const getStepIndex = (step) => {
    return steps.indexOf(step?.toLowerCase());
  };
  
  export const isStepDisabled = (currentStep, stepToCheck) => {
    const currentIndex = getStepIndex(currentStep?.toLowerCase());
    const checkIndex = getStepIndex(stepToCheck?.toLowerCase());
    
    if (!currentStep || currentIndex === -1) {
      return checkIndex !== 0;
    }
  
    return checkIndex !== currentIndex && checkIndex !== currentIndex + 1;
  };
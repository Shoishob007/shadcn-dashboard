import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const steps = [
    "Screening Test",
    "Aptitude Test",
    "Technical Test",
    "Interview",
];

export const getStepIndex = (step) => {
    return steps.indexOf(step);
};

export const isStepDisabled = (currentStep, targetStep) => {
    const currentIndex = getStepIndex(currentStep);
    const targetIndex = getStepIndex(targetStep);
    return targetIndex < currentIndex || targetIndex > currentIndex + 1;
};
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { steps, isStepDisabled, getStepIndex, cn } from "@/app/utils/steps";


export function StepSelector({ selectedStep, onStepChange }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          size="xs"
          className="border border-blue-600 bg-blue-100 text-blue-600 hover:bg-blue-200 shadow-none dark:border-gray-600 dark:bg-gray-100 dark:text-gray-600 dark:hover:bg-gray-200"
        >
          Change Step
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {steps.map((step) => {
          const disabled = isStepDisabled(selectedStep, step);
          
          return (
            <DropdownMenuItem
              key={step}
              className={cn(
                "!text-xs flex justify-between items-center",
                disabled && "opacity-50 cursor-not-allowed"
              )}
              disabled={disabled}
              onClick={() => !disabled && onStepChange(step)}
            >
              <span>{step}</span>
              {selectedStep === step && (
                <span className="text-green-500 ml-2">✔</span>
              )}
              {disabled && (
                <span className="text-gray-700 ml-2 text-[10px]">
                  {getStepIndex(step) < getStepIndex(selectedStep)
                    ? "Completed"
                    : "Locked"}
                </span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
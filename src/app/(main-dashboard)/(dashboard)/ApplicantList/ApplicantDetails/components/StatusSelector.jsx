"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/app/utils/steps";

export default function StatusSelector({
  selectedStep,
  onStepChange,
  onReject,
  hiringStages,
}) {
  const currentStageOrder = selectedStep?.order || 0;

  return (
    <div className="flex gap-2 justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            size="xs"
            className="border border-blue-600 bg-blue-100 dark:bg-blue-200 text-blue-600 hover:bg-blue-200 shadow-none dark:border-blue-600 dark:text-blue-700 dark:hover:bg-blue-300"
          >
            Change Status
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          {hiringStages.map((stage) => {
            const disabled = stage.order <= currentStageOrder;
            const isSelected = selectedStep?.id === stage.id;

            return (
              <DropdownMenuItem
                key={stage.id}
                className={cn(
                  "!text-xs flex justify-between items-center",
                  disabled && "opacity-50 cursor-not-allowed",
                  isSelected && "bg-blue-50 dark:bg-gray-800"
                )}
                disabled={disabled}
                onClick={() => !disabled && onStepChange(stage)}
              >
                <span style={{ textTransform: "capitalize" }}>
                  {stage.title}
                </span>
                {isSelected ? (
                  <span className="text-green-500 ml-2">✔</span>
                ) : disabled ? (
                  <span className="text-gray-700 ml-2 text-[10px]">
                    {stage.order < currentStageOrder ? "Completed" : "Locked"}
                  </span>
                ) : null}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Reject Button */}
      <Button
        variant="destructive"
        size="xs"
        className="border border-red-600 bg-red-100 dark:bg-red-200 text-red-600 hover:bg-red-200 shadow-none dark:border-red-600 dark:text-red-700 dark:hover:bg-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onReject}
      >
        Reject Applicant
      </Button>
    </div>
  );
}

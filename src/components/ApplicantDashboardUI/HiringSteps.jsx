"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function HiringSteps({ dataStore }) {
  const [currentStep, setCurrentStep] = useState(2); // You can update this based on the current step
  const [hiringStages, setHiringStages] = useState([]);

  // Map the dataStore to get hiringOrder and stageTitle
  const steps = dataStore.map((step) => {
    return {
      hiringOrder: step?.hiringStage?.order,
      stageTitle: step?.hiringStage?.title,
    };
  });

  // Find the maximum hiringOrder to determine the number of dots
  const maxHiringOrder = Math.max(...steps.map((step) => step.hiringOrder));

  const { data: session, status } = useSession();
  const accessToken = session?.access_token;

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center w-full p-6">
        <div className="flex items-center gap-2">
          {/* Render dots based on maxHiringOrder */}
          {Array.from({ length: maxHiringOrder }, (_, index) => (
            <div key={index} className="relative flex flex-col items-center">
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      index < currentStep ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                </TooltipTrigger>
                {/* Show the stage title if it exists for this index */}
                <TooltipContent>
                  {steps[index]?.stageTitle || `Step ${index + 1}`}
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}

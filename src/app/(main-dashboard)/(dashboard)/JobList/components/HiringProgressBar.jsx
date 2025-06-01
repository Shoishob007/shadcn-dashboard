import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertCircle, Check, Clock, HelpCircle } from "lucide-react";

const HiringProgress = ({ currentStage, stages, status }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case "hired":
          return "bg-emerald-500";
        case "shortlisted":
          return "bg-yellow-500";
        case "rejected":
          return "bg-red-500";
        case "applied":
          return "bg-blue-500";
        default:
          return "bg-gray-500";
      }
    };

    // Get icon based on the stage status
    const getStageIcon = (status) => {
      switch (status) {
        case "hired":
          return <Check className="h-3 w-3 text-white" />;
        case "shortlisted":
          return <Clock className="h-3 w-3 text-white" />;
        case "rejected":
          return <AlertCircle className="h-3 w-3 text-white" />;
        case "applied":
          return <HelpCircle className="h-3 w-3 text-white" />;
        default:
          return <HelpCircle className="h-3 w-3 text-white" />;
      }
    };
  return (
    <div className="flex items-center space-x-2">
      {/* Progress Dots */}
      <div className="flex items-center space-x-2">
        {stages.map((stage, index) => {
          const isCompleted = index < currentStage - 1;
          const isCurrent = index === currentStage - 1;
          const isUpcoming = index > currentStage - 1;

          return (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center transition-all duration-300 transform
              ${
                isCompleted
                  ? "bg-emerald-400"
                  : isCurrent
                  ? getStatusColor(status)
                  : "bg-gray-300"
              }
            `}
                  >
                    {/* Icon inside the dot */}
                    {isCompleted ? (
                      <Check className="h-3 w-3 text-white" />
                    ) : isCurrent ? (
                      getStageIcon(status)
                    ) : (
                      <HelpCircle className="h-3 w-3 text-gray-500" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-xs font-medium">{stage.title}</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
};

export default HiringProgress;

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Clock, AlertCircle, HelpCircle } from "lucide-react";

const HiringProgress = ({ currentStage, totalStages, stages, status }) => {
  // Get status color based on the stage status
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
      case "applied":
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
    <div className="w-full px-2 py-4">
      {/* Current stage info */}
      <div className="flex justify-between items-center mb-6">
        <span
          className={`hidden md:block text-sm font-medium ${getStatusColor(
            status
          ).replace("bg-", "text-")}`}
        >
          {stages[currentStage]?.title || stages[0]?.title}
        </span>
        {/* <span className="text-xs text-gray-500">
          Stage {currentStage ?? + 1 } of {stages.length}
        </span> */}
      </div>

      {/* Progress bar with integrated steps */}
      <div className="relative">
        {/* Base progress track */}
        <div className="absolute w-full h-[2px] bg-gray-200" />

        {/* Completed progress */}
        <div
          className="absolute h-[2px] bg-emerald-500 transition-all duration-300"
          style={{
            width: `${((currentStage - 1) / (stages.length - 1)) * 100}%`,
          }}
        />

        {/* Steps container - positioned relative to allow absolute positioning of steps */}
        <div className="relative flex justify-between">
          {stages.map((stage, index) => {
            const isCompleted = index < currentStage - 1;
            const isCurrent = index === currentStage - 1;
            // const stageStatus = isCurrent
            //   ? status
            //   : isCompleted
            //   ? "hired"
            //   : "shortlisted";

            return (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`
                        w-6 h-6 rounded-full 
                        flex items-center justify-center 
                        border-2 transition-all duration-300
                        transform -translate-y-[10px]
                        hover:scale-110
                        ${
                          isCompleted
                            ? "bg-emerald-500 border-emerald-500"
                            : isCurrent
                            ? `${getStatusColor(status)} border-${
                                getStatusColor(status).split("-")[1]
                              }`
                            : "bg-gray-200 border-gray-300"
                        }
                      `}
                    >
                      {isCompleted ? (
                        <Check className="h-3 w-3 text-white" />
                      ) : isCurrent ? (
                        getStageIcon(status)
                      ) : (
                        getStageIcon(status)
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
    </div>
  );
};

export default HiringProgress;

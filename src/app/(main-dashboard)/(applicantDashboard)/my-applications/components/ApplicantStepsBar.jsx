"use client";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Import Tooltip components
import { useState } from "react";

export default function ApplicantStepsBar() {
  const max = 5;
  const skipInterval = 1;
  const ticks = [...Array(max + 1)].map((_, i) => i);

  const [sliderValue, setSliderValue] = useState([4]);

  return (
    <TooltipProvider>
      <div className="">
        <div className="relative top-3 w-full h-3 bg-gray-300 rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-200 to-green-500 rounded-full"
            style={{ width: `${(sliderValue[0] / max) * 100}%` }}
          ></div>
        </div>

        <div className="relative flex justify-between items-center text-xs font-medium text-muted-foreground">
          {ticks.map((_, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center justify-center gap-1">
                
                  <div
                    className={cn(
                      "w-1 h-3 ",
                      sliderValue[0] >= i
                        ? i < sliderValue[0]
                          ? "bg-gradient-to-r from-green-200 to-green-500"
                          : i === sliderValue[0]
                          ? "bg-blue-500"
                          : "bg-gray-300"
                        : "bg-gray-400"
                    )}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                Step {i + 1} of {max + 1}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}

"use client";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils"; // Ensure cn utility is correctly defined
import { useState } from "react";

export default function ApplicantStepsBar() {
  const max = 5; // Total steps (1 to 5)
  const skipInterval = 1; // Display tick marks every 1 step
  const ticks = [...Array(max + 1)].map((_, i) => i); // Create tick marks for steps

  const [sliderValue, setSliderValue] = useState([5]); // Default to the last step (completed)

  return (
    <div className="space-y-4">
      {/* Steps Slider */}
      <div>
        <Slider
          value={sliderValue}
          onValueChange={setSliderValue}
          defaultValue={[5]} // Set initial slider value
          max={max}
          aria-label="Slider for application steps"
        />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between items-center text-xs font-medium text-muted-foreground">
        {ticks.map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-1"
          >
            {/* Step circle indicator */}
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-white",
                sliderValue[0] >= i
                  ? i < sliderValue[0]
                    ? "bg-green-500"
                    : i === sliderValue[0]
                    ? "bg-blue-500"
                    : "bg-gray-300"
                  : "bg-gray-300"
              )}
            >
              {i + 1}
            </div>

            {/* Step label */}
            <div
              className={cn(
                "mt-2",
                sliderValue[0] >= i
                  ? "text-green-500"
                  : sliderValue[0] === i
                  ? "text-blue-500"
                  : "text-gray-500"
              )}
            >
              {`Step ${i + 1}`}
            </div>
          </div>
        ))}
      </div>

      {/* Display current step */}
      <div className="text-center text-sm font-medium text-gray-700">
        {`Step ${sliderValue[0]} of ${max}`}
      </div>
    </div>
  );
}

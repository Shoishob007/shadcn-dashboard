import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export default function ApplicantStepsBar() {
  const max = 5;
  const skipInterval = 2;
  const ticks = [...Array(max + 1)].map((_, i) => i);

  const [sliderValue, setSliderValue] = useState([5]);

  return (
    <div className=" space-y-2">
      <div>
        <Slider
          value={sliderValue}
          onValueChange={setSliderValue}
          defaultValue={[5]}
          max={max}
          aria-label="Slider with ticks"
        />
        
        {/* 
        
          <span
          className="mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium text-muted-foreground"
          aria-hidden="true"
        >
          {ticks.map((_, i) => (
            <span key={i} className="flex w-0 flex-col items-center justify-center gap-2">
              <span
                className={cn(
                  "h-1 w-px bg-muted-foreground/70",
                  i % skipInterval !== 0 && "h-0.5",
                  sliderValue[0] >= i && "bg-primary" // Highlight steps that are reached
                )}
              />
            </span>
          ))}
        </span>
        
        */}
      
      </div>

      {/* Display the current step */}
      <div className="text-center text-sm font-medium">
        Step {sliderValue[0]} of {max}
      </div>
    </div>
  );
}

import React from "react";

export const ApplicationStepper = ({ steps, currentStep }) => {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="flex items-start space-x-4"
        >
          {/* Step Indicator */}
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
              step.status === "completed"
                ? "bg-green-500"
                : step.status === "current"
                ? "bg-blue-500 animate-pulse"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </div>
          
          {/* Step Content */}
          <div className="flex-1">
            <h3
              className={`text-sm font-semibold ${
                step.status === "completed"
                  ? "text-green-600"
                  : step.status === "current"
                  ? "text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {step.label}
            </h3>
            <p
              className={`text-xs ${
                step.status === "completed"
                  ? "text-green-500"
                  : step.status === "current"
                  ? "text-blue-500"
                  : "text-gray-400"
              }`}
            >
              {step.description}
            </p>
          </div>

          {/* Decorative Line */}
          {index < steps.length - 1 && (
            <div
              className={`w-1 h-12 bg-gray-300 mx-auto ${
                currentStep > step.id ? "bg-green-500" : ""
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

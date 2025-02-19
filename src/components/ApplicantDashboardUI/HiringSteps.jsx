import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const HiringSteps = ({ applicationStatus }) => {
  if (!applicationStatus?.docs?.length) {
    return <p>No hiring steps available.</p>;
  }

  const steps = applicationStatus?.docs?.map((doc) => doc?.hiringStage);
  steps.sort((a, b) => a.order - b.order);

  return (
    <TooltipProvider>
      {/* w-full p-6 bg-white shadow-md rounded-lg */}
      <div className="">
        {/* <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
          Hiring Process
        </h2> */}

        <div className="relative flex flex-col gap-6">
          {steps.map((step, index) => {
            const isCompleted =
              index < steps.findIndex((s) => s.id === applicationStatus.id);
            const isCurrent = step.id === applicationStatus.id;

            return (
              <div key={step.id} className="flex items-center relative">
                {/* Step Indicator with Tooltip */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-white font-bold cursor-pointer transition-all duration-300 ${
                        isCompleted
                          ? "bg-green-500 border-green-500"
                          : isCurrent
                          ? "bg-blue-500 border-blue-500 animate-pulse"
                          : "bg-gray-300 border-gray-400"
                      }`}
                    >
                      {isCompleted ? "✓" : index + 1}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold text-gray-200">{step.title}</p>
                    <p className="text-sm text-gray-400">{step.description}</p>
                  </TooltipContent>
                </Tooltip>

                {/* Step Connector Line */}
                {index !== steps.length - 1 && (
                  <div
                    className={`absolute left-5 top-10 h-10 w-1 ${
                      isCompleted ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                )}

                {/* Step Details */}
                {/* <div className="ml-4">
                  <h3
                    className={`text-lg font-medium ${
                      isCurrent ? "text-blue-600" : "text-gray-800"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default HiringSteps;

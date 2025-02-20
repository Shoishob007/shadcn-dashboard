import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const HiringSteps = ({ applicationStatus }) => {
  console.log("application status: ", applicationStatus)
    if (!applicationStatus?.docs?.length) {
    return <p>No hiring steps available.</p>;
  }

  const steps = applicationStatus?.docs?.map((doc) => doc?.hiringStage);
  steps.sort((a, b) => a.order - b.order);

  return (
    <TooltipProvider>
      {/* bg-white shadow-md rounded-lg w-full p-4 */}
      <div className=" ">
        {/* <h2 className="text-lg font-semibold mb-4">Hiring Process</h2> */}
        <div className="relative flex flex-col gap-4">
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
                      className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-white font-bold cursor-pointer ${
                        isCompleted
                          ? "bg-green-500 border-green-500"
                          : isCurrent
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-300 border-gray-400"
                      }`}
                    >
                      {isCompleted ? "✓" : index + 3}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">{step.title}</p>
                    <p className="text-sm">{step.description}</p>
                  </TooltipContent>
                </Tooltip>

                {/* Step Details */}
                {/* <div className="ml-4">
                  <h3
                    className={`font-medium ${
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

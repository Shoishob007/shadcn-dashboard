import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function StepSelector({
  selectedStep,
  onStepChange,
  onReject,
  onHire,
  hiringStages,
  applicationId,
  applicationStatus,
}) {
  const [isLastStage, setIsLastStage] = useState(false);

  useEffect(() => {
    const lastStageIndex = hiringStages.length - 1;
    setIsLastStage(selectedStep?.order === lastStageIndex + 1);
  }, [selectedStep, hiringStages]);

  const isRejectedOrHired =
    applicationStatus === "rejected" || applicationStatus === "hired";

  return (
    <div className="flex flex-col gap-2 items-center">
      {isLastStage && !isRejectedOrHired ? (
        <Button
          variant="default"
          size="sm"
          className="border border-green-600 bg-green-100 text-green-600 hover:bg-green-200"
          onClick={onHire}
        >
          Hire
        </Button>
      ) : !applicationId ? (
        <Button
          variant="default"
          size="sm"
          className="border border-yellow-600 bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
          onClick={() => onStepChange(hiringStages[0])}
          disabled={isRejectedOrHired}
        >
          Shortlist
        </Button>
      ) : (
        <Button
          variant="default"
          size="sm"
          className="border border-blue-600 bg-blue-100 text-blue-600 hover:bg-blue-200"
          onClick={() => onStepChange()}
          disabled={isRejectedOrHired}
        >
          Schedule
        </Button>
      )}

      <Button
        variant="destructive"
        size="sm"
        className="border border-red-600 bg-red-100 text-red-600 hover:bg-red-200"
        onClick={onReject}
        disabled={isRejectedOrHired}
      >
        Reject
      </Button>
    </div>
  );
}

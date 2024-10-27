import React from "react";
import InterviewUpcoming from "./upcoming/page";
import InterviewSchedule from "./schedule/page";

const Interviews = () => {
  return (
    <div className="flex flex-col justify-start h-full">
      <InterviewUpcoming />
      <InterviewSchedule />
    </div>
  );
};

export default Interviews;

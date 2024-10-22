import React from "react";
import InterviewUpcoming from "./upcoming/page";
import InterviewSchedule from "./schedule/page";

const Interviews = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center h-full items-center text-center gap-12 md:gap-20 p-10">
      <InterviewUpcoming />
      <InterviewSchedule />
    </div>
  );
};

export default Interviews;

import React from "react";
import InterviewUpcoming from "../upcoming/page";
import InterviewSchedule from "../schedule/page";

const Interviews = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-full justify-center items-center text-center gap-14 md:gap-20 p-10">
      <InterviewUpcoming />
      <InterviewSchedule />
    </div>
  );
};

export default Interviews;

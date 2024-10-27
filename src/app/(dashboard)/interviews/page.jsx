"use client";

import React from "react";
import InterviewUpcoming from "./upcoming/page";
import InterviewSchedule from "./schedule/page";
import { useSession } from "next-auth/react";

const Interviews = () => {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center h-full">
        Please sign in to access your calendar to see interviews
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start h-full">
      <InterviewUpcoming />
      <InterviewSchedule />
    </div>
  );
};

export default Interviews;

"use client";

import React, { useState } from "react";
import ShortListedApplicants from "../../applicants/shortlisted/page";

const InterviewSchedule = () => {
  return (
    <div className="bg-white pt-4 rounded-lg shadow-md">
      <h2 className="text-center text-lg md:text-xl font-semibold">
        Scheduled Interviews
      </h2>
      <ShortListedApplicants />
    </div>
  );
};

export default InterviewSchedule;

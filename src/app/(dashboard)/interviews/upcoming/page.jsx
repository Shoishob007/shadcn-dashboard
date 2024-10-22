"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

const InterviewUpcoming = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="h-full flex items-center justify-center">
      <div className="rounded-lg flex flex-col gap-4 items-center justify-center bg-white shadow-md p-8 max-w-md mx-auto">
        <h1 className="text-xl">Upcoming Interviews</h1>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default InterviewUpcoming;

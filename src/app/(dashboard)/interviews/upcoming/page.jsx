"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

const InterviewUpcoming = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="rounded-lg flex flex-col gap-5 items-center h-full justify-center">
      <h1 className="text-xl">Upcoming Interviews</h1>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border bg-white shadow-md"
      />
    </div>
  );
};

export default InterviewUpcoming;

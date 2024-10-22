"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const InterviewUpcoming = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [newEvent, setNewEvent] = useState("");

  const handleAddEvent = () => {
    if (newEvent.trim()) {
      const formattedDate = date.toDateString();
      setEvents((prevEvents) => ({
        ...prevEvents,
        [formattedDate]: [...(prevEvents[formattedDate] || []), newEvent],
      }));
      setNewEvent("");
    }
  };

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2 justify-start gap-10 p-10">
      <div className="rounded-lg flex flex-col gap-4 items-center justify-center bg-white shadow-md m-6 p-2 md:p-4">
        <h2 className=" text-lg md:text-xl font-semibold">Upcoming Interviews</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg text-sm"
        />
        <div className="flex gap-2">
          <Input
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="Add event"
          />
          <Button onClick={handleAddEvent}>Add</Button>
        </div>
      </div>

      <div className="bg-white shadow-md p-4 rounded-lg m-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">
          Events on {date.toDateString()}
        </h2>
        <ul className="list-disc ml-8">
          {(events[date.toDateString()] || []).length > 0 ? (
            events[date.toDateString()].map((event, index) => (
              <li key={index}>{event}</li>
            ))
          ) : (
            <p className="text-center">No events for this date.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default InterviewUpcoming;

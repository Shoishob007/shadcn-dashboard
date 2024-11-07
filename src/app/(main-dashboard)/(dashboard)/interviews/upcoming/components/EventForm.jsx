import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EventForm = ({
  title,
  setTitle,
  description,
  setDescription,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  onSubmit,
  isEditing = false,
}) => {
  useEffect(() => {
    if (!isEditing) {
      setTitle("");
      setDescription("");
      setStartTime("");
      setEndTime("");
    }
  }, [isEditing, setTitle, setDescription, setStartTime, setEndTime]);

  return (
    <div className="space-y-2 sm:space-y-4 py-2 sm:py-4 dark:bg-gray-800">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Interview with Candidate"
        />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Interview details..."
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Start Time</Label>
          <Input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>End Time</Label>
          <Input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>
      <Button onClick={onSubmit} className="w-full">
        {isEditing ? "Update Event" : "Create Interview"}
      </Button>
    </div>
  );
};

export default EventForm;

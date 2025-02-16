import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function ScheduleModal({
  isOpen,
  onClose,
  onSchedule,
  step,
  hiringStages,
}) {
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedStage, setSelectedStage] = useState(step);

  useEffect(() => {
    if (isOpen) {
      // Reset the state when the modal is opened
      setSelectedDate(null);
      setSelectedTime(null);
      setSelectedStage(step);
    }
  }, [isOpen, step]);

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime || !selectedStage) {
      alert("Please select date, time, and hiring stage");
      return;
    }

    onSchedule(selectedDate, selectedTime, selectedStage);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule {selectedStage?.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border mx-auto"
            disabled={(date) =>
              date < new Date() || date.getDay() === 0 || date.getDay() === 6
            }
          />
          <Select onValueChange={setSelectedTime}>
            <SelectTrigger>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedStage?.id}
            onValueChange={(value) =>
              setSelectedStage(hiringStages.find((stage) => stage.id === value))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select hiring stage" />
            </SelectTrigger>
            <SelectContent>
              {hiringStages.map((stage) => (
                <SelectItem key={stage.id} value={stage.id}>
                  {stage.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSchedule}
            disabled={!selectedDate || !selectedTime || !selectedStage}
          >
            Schedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

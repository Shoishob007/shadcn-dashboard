"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function ScheduleModal({ isOpen, onClose, step, onSchedule }) {
  const [selectedDate, setSelectedDate] = React.useState();
  const [selectedTime, setSelectedTime] = React.useState();

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
    if (selectedDate && selectedTime) {
      onSchedule(selectedDate, selectedTime);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center">Schedule {step}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border dark:border-gray-500 mx-auto"
            disabled={(date) =>
              date < new Date() || date.getDay() === 0 || date.getDay() === 6
            }
          />
          <Select onValueChange={setSelectedTime}>
            <SelectTrigger className="dark:border-gray-500">
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
          <Button
            onClick={handleSchedule}
            disabled={!selectedDate || !selectedTime}
          >
            Proceed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

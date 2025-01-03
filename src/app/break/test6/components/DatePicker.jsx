"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export default function DatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Select a Date</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {selectedDate ? (
              format(selectedDate, "PPP")
            ) : (
              <span className="text-gray-400">Pick a date</span>
            )}
            <CalendarIcon className="w-4 h-4 text-gray-500 ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="hidden">
                Open Calendar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div className="flex flex-col items-center p-4">
                {/* Replace this with a Calendar Component */}
                <p className="text-center">Calendar Component Coming Soon</p>
              </div>
            </DialogContent>
          </Dialog>
        </PopoverContent>
      </Popover>
    </div>
  );
}

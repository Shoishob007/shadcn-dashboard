import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";

const ScheduleModal = ({
  isOpen,
  onClose,
  onSchedule,
  applicantId,
  applicationId,
  accessToken,
}) => {
  const { data: session } = useSession();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSchedule = async () => {
    if (!date || !time) {
      alert("Please select a date and time.");
      return;
    }

    const timestamp = new Date(`${date}T${time}`).toISOString();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicant-status/${applicationId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            jobApplication: applicantId,
            timeStamp: timestamp,
          }),
        }
      );

      if (response.ok) {
        alert("Schedule updated successfully!");
        onSchedule(date, time); // Update state in parent component
        onClose(); // Close the modal
      } else {
        alert("Failed to update schedule.");
      }
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Schedule</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSchedule}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleModal;

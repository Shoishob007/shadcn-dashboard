import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const EventEditor = ({ props, hiringStages, accessToken, onClose }) => {
  const { toast } = useToast();

  const [selectedHiringStage, setSelectedHiringStage] = useState(
    props.applicationData?.applicationStatus?.docs[0]?.hiringStage?.id || ""
  );
  const [dateTime, setDateTime] = useState(
    props.StartTime
      ? format(new Date(props.StartTime), "yyyy-MM-dd'T'HH:mm")
      : ""
  );

  const handleScheduleHire = async () => {
    const statusId = props.applicationData?.applicationStatus?.docs[0]?.id;
    const jobApplicationId = props.applicationData?.id;
    const status =
      props.applicationData?.applicationStatus?.docs[0]?.hiringStage?.order ===
      5
        ? "hired"
        : "shortlisted";

    const requestBody = {
      jobApplication: jobApplicationId,
      hiringStage: selectedHiringStage,
      status: status,
      timeStamp: dateTime,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicant-status/${statusId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        toast({
          title: "Success!",
          description: `Applicant has been ${
            status === "hired" ? "hired" : "scheduled"
          }.`,
          variant: "ourSuccess",
        });
        onClose();
      } else {
        toast({
          title: "Error!",
          description: "Failed to update the applicant status.",
          variant: "ourDestructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "An error occurred while updating the applicant status.",
        variant: "ourDestructive",
      });
    }
  };

  const handleReject = async () => {
    const statusId = props.applicationData?.applicationStatus?.docs[0]?.id;
    const jobApplicationId = props.applicationData?.id;

    const requestBody = {
      jobApplication: jobApplicationId,
      status: "rejected",
      timeStamp: dateTime,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicant-status/${statusId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Applicant has been rejected.",
          variant: "ourSuccess",
        });
        onClose();
      } else {
        toast({
          title: "Error!",
          description: "Failed to reject the applicant.",
          variant: "ourDestructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "An error occurred while rejecting the applicant.",
        variant: "ourDestructive",
      });
    }
  };

  return (
    <div className="custom-event-editor p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Title
        </label>
        <input
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          type="text"
          name="Subject"
          defaultValue={props.Subject || ""}
          readOnly
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          name="Description"
          defaultValue={props.Description || ""}
          readOnly
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Location
        </label>
        <input
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          type="text"
          name="Location"
          defaultValue={props.Location || ""}
          readOnly
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Date & Time
        </label>
        <input
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Hiring Stage
        </label>
        <select
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          name="hiringStage"
          value={selectedHiringStage}
          onChange={(e) => setSelectedHiringStage(e.target.value)}
        >
          {hiringStages.map((stage) => (
            <option key={stage.id} value={stage.id}>
              {stage.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button type="button" variant="destructive" onClick={handleReject}>
          Reject
        </Button>
        <Button type="button" variant="default" onClick={handleScheduleHire}>
          {props.applicationData?.applicationStatus?.docs[0]?.hiringStage
            ?.order === 5
            ? "Hire"
            : "Schedule"}
        </Button>
      </div>
    </div>
  );
};

export default EventEditor;

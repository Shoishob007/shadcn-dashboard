import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { useSession } from "next-auth/react";

export default function StatusModal ({
  isOpen,
  onClose,
  applicantId,
  applicationId,
  currentStatus,
  onUpdateStatus,
}) {
  const { data: session } = useSession();
  const [selectedStatus, setSelectedStatus] = useState(currentStatus || "");

  const handleStatusChange = async () => {
    if (!selectedStatus) {
      alert("Please select a status.");
      return;
    }

    console.log("Selected Status:", selectedStatus);
    console.log("Applicant ID:", applicantId);
    console.log("Application ID:", applicationId);

    try {
      const method = applicationId ? "PATCH" : "POST"; // PATCH if applicationId exists, else POST
      const url = applicationId
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/applicant-status/${applicationId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/applicant-status`;

      const requestBody = applicationId
        ? { jobApplication: applicantId, status: selectedStatus } // PATCH request body
        : {
            jobApplication: applicantId,
            hiringStage: hiringStages, // Replace with actual hiring stage ID
            status: selectedStatus,
          }; // POST request body

      console.log("Request Body:", requestBody);
      console.log("Request URL:", url);
      console.log("Request Method:", method);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Response Status:", response.status);
      console.log("Response OK:", response.ok);

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response Data:", responseData);
        alert("Status updated successfully!");
        onUpdateStatus(applicantId, selectedStatus); // Update state in parent component
        onClose(); // Close the modal
      } else {
        const errorData = await response.json();
        console.error("Failed to update status. Error:", errorData);
        alert("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Applicant Status</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <label className="block text-sm font-medium mb-2">
            Select Status
          </label>
          <Select
            onValueChange={(value) => setSelectedStatus(value)}
            value={selectedStatus}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shortlisted">Shortlisted</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleStatusChange}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

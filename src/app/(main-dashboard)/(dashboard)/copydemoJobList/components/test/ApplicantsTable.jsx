import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import PricingDialogue from "../pricingDialogue";
import HiringProgress from "../HiringProgressBar";
import { useSession } from "next-auth/react";
import StepSelector from "../../../demoAppList/demoAppDetails/components/StepSelector";
import ScheduleModal from "../../../demoAppList/demoAppDetails/components/ScheduleModal";
import { Button } from "@/components/ui/button";
import StatusModal from "../../../demoAppList/demoAppDetails/components/StatusModal";
import { useToast } from "@/hooks/use-toast";

const ApplicantsTable = ({
  applications,
  onUpdateApplicant,
  viewCount,
  setViewCount,
  maxViews,
  hiringStages,
}) => {
  const { data: session } = useSession();
  const accessToken = session?.access_token;
  const { toast } = useToast();
  const [scheduleModal, setScheduleModal] = useState({
    isOpen: false,
    applicantId: null,
    applicationId: null,
    step: null,
  });
  const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false);

  const handleStepChange = async (applicantId, applicationId, newStage) => {
    const applicant = applications.find((a) => a.id === applicantId);

    if (!applicationId) {
      // Shortlist: Make a POST request
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/applicant-status`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              jobApplication: applicantId,
              hiringStage: hiringStages.docs[0].id,
              status: "shortlisted",
              timeStamp: new Date().toISOString(),
            }),
          }
        );

        if (response.ok) {
          // Update the applicant's hiring stage in the state
          const updatedApplicant = {
            ...applicant,
            applicationStatus: "shortlisted",
            hiringStep: hiringStages.docs[0],
          };
          onUpdateApplicant(updatedApplicant);
          toast({
            title: "Success",
            description: "Applicant shortlisted successfully.",
            variant: "success",
          });
        } else {
          throw new Error("Failed to shortlist applicant");
        }
      } catch (error) {
        console.error("Error updating applicant status:", error);
        toast({
          title: "Error",
          description: "Failed to shortlist applicant. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      // Open the schedule modal for updating the hiring stage and timestamp
      setScheduleModal({
        isOpen: true,
        applicantId,
        applicationId,
        step: newStage, // Pass the selected hiring stage to the modal
      });
    }
  };

  const handleSchedule = async (date, time, selectedStage) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error("Invalid date value");
      toast({
        title: "Error",
        description: "Invalid date selected.",
        variant: "destructive",
      });
      return;
    }

    // Convert 12-hour format to 24-hour format
    const convertTo24Hour = (time) => {
      const match = time.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
      if (!match) return null;

      let [_, hours, minutes, period] = match;
      hours = parseInt(hours, 10);
      if (period.toUpperCase() === "PM" && hours !== 12) {
        hours += 12;
      } else if (period.toUpperCase() === "AM" && hours === 12) {
        hours = 0;
      }
      return `${String(hours).padStart(2, "0")}:${minutes}:00`;
    };

    const formattedTime = convertTo24Hour(time);
    if (!formattedTime) {
      console.error("Invalid time format");
      toast({
        title: "Error",
        description: "Invalid time format. Please use HH:MM AM/PM.",
        variant: "destructive",
      });
      return;
    }

    // Create timestamp
    const timestamp = new Date(
      `${date.toISOString().split("T")[0]}T${formattedTime}Z`
    ).toISOString();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicant-status/${scheduleModal.applicationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            jobApplication: scheduleModal.applicantId,
            hiringStage: selectedStage.id,
            timeStamp: timestamp,
          }),
        }
      );

      if (response.ok) {
        // Update the applicant's hiring stage in the state
        const updatedApplicant = applications.find(
          (app) => app.id === scheduleModal.applicantId
        );
        updatedApplicant.hiringStep = selectedStage;
        updatedApplicant.applicationStatus = "scheduled";

        onUpdateApplicant(updatedApplicant); // Update the parent state
        toast({
          title: "Success",
          description: "Applicant schedule updated successfully.",
          variant: "success",
        });

        // Reset the schedule modal state
        setScheduleModal({
          isOpen: false,
          applicantId: null,
          applicationId: null,
          step: null,
        });
      } else {
        throw new Error("Failed to update hiring stage");
      }
    } catch (error) {
      console.error("Error updating applicant status:", error);
      toast({
        title: "Error",
        description: "Failed to update hiring stage. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (applicantId, applicationId) => {
    const applicant = applications.find((a) => a.id === applicantId);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicant-status/${applicationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            jobApplication: applicantId,
            status: "rejected",
          }),
        }
      );

      if (response.ok) {
        // Update the applicant's status to rejected in the state
        const updatedApplicant = {
          ...applicant,
          applicationStatus: "rejected",
        };
        onUpdateApplicant(updatedApplicant); // Update the parent state
        toast({
          title: "Success",
          description: "Applicant rejected successfully.",
          variant: "success",
        });
      } else {
        throw new Error("Failed to reject applicant");
      }
    } catch (error) {
      console.error("Error updating applicant status:", error);
      toast({
        title: "Error",
        description: "Failed to reject applicant. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleHire = async (applicantId, applicationId) => {
    const applicant = applications.find((a) => a.id === applicantId);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicant-status/${applicationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            jobApplication: applicantId,
            status: "hired",
          }),
        }
      );

      if (response.ok) {
        // Update the applicant's status to hired in the state
        const updatedApplicant = {
          ...applicant,
          applicationStatus: "hired",
        };
        onUpdateApplicant(updatedApplicant);
        toast({
          title: "Success",
          description: "Applicant hired successfully.",
          variant: "success",
        });
      } else {
        throw new Error("Failed to hire applicant");
      }
    } catch (error) {
      console.error("Error updating applicant status:", error);
      toast({
        title: "Error",
        description: "Failed to hire applicant. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderHiringStages = (applicant) => {
    const latestStageOrder = applicant.hiringStep?.order || 0;
    const latestStatus = applicant.applicationStatus || "applied";

    return (
      <HiringProgress
        currentStage={latestStageOrder}
        totalStages={hiringStages.docs.length}
        stages={hiringStages.docs}
        status={latestStatus}
      />
    );
  };

  return (
    <>
      <div className="overflow-x-auto shadow-md rounded-lg bg-white border border-gray-200 dark:border-gray-500">
        <table className="w-full text-sm text-left text-gray-700 dark:bg-gray-800 dark:text-gray-300">
          <thead className="bg-gray-800 dark:bg-gray-300 text-gray-200 dark:text-gray-800 border border-b-gray-500">
            <tr>
              <th className="pl-3 pr-2 py-3">Applicant</th>
              <th className="px-2 py-3">Education</th>
              <th className="px-2 py-3">Certifications</th>
              <th className="px-2 py-3 text-center">Hiring Progress</th>
              <th className="px-2 py-3 text-center">Action</th>
              <th className="pl-2 pr-3 py-3 text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr
                key={application.id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                {/* Name */}
                <td className="pl-3 pr-2 py-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={application?.applicant?.pictureUrl}
                        alt={application?.name}
                      />
                      <AvatarFallback className="bg-gray-300 text-xs font-bold text-gray-700">
                        {application.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-base text-gray-800 dark:text-gray-300">
                        {application.name}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {application?.experiences
                          ?.slice(-2)
                          .map((exp, index) => (
                            <span key={index}>
                              <span className="font-semibold">
                                {exp.position}
                              </span>{" "}
                              at {exp.companyName} (
                              {new Date(exp.startDate).getFullYear()} -{" "}
                              {new Date(exp.endDate).getFullYear()}) <br />
                            </span>
                          ))}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Education */}
                <td className="px-2 py-2">
                  {application?.education?.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      {application?.education?.slice(-2).map((edu, index) => (
                        <li key={index}>
                          <span className="font-semibold">{edu.degree}</span>{" "}
                          from {edu.institution}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "N/A"
                  )}
                </td>

                {/* Certifications */}
                <td className="px-2 py-2">
                  {application?.certifications?.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      {application?.certifications
                        ?.slice(-2)
                        .map((cert, index) => (
                          <li key={index}>
                            <span className="font-semibold">{cert.name}</span>{" "}
                            by <span>{cert.issuingOrganization}</span>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    "N/A"
                  )}
                </td>

                {/* Hiring Progress */}
                <td className="px-2 py-3 text-center">
                  {renderHiringStages(application)}
                </td>

                {/* Action */}
                <td className="px-2 py-3 text-center">
                  <StepSelector
                    selectedStep={application.hiringStep}
                    onStepChange={(newStage) =>
                      handleStepChange(
                        application.id,
                        application.applicationId,
                        newStage
                      )
                    }
                    onReject={() =>
                      handleReject(application.id, application.applicationId)
                    }
                    onHire={() =>
                      handleHire(application.id, application.applicationId)
                    }
                    hiringStages={hiringStages.docs}
                    applicationId={application.applicationId}
                    applicationStatus={application.applicationStatus}
                  />
                </td>

                {/* Details */}
                <td className="pl-2 pr-3 py-2 text-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={
                            viewCount < maxViews
                              ? `/demoAppList/demoAppDetails?id=${application.id}`
                              : "#"
                          }
                          className={`text-blue-500 hover:text-blue-700 inline-block ${
                            viewCount >= maxViews ? "cursor-pointer" : ""
                          }`}
                          onClick={(e) => {
                            if (viewCount >= maxViews) {
                              e.preventDefault();
                              setIsPricingDialogOpen(true);
                            } else {
                              setViewCount((prev) => prev + 1);
                            }
                          }}
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild className="ml-2">
                        <span
                          className={`cursor-pointer text-red-400 hover:text-red-500 inline-block ${
                            viewCount >= maxViews ? "cursor-pointer" : ""
                          }`}
                          onClick={() => {
                            if (viewCount >= maxViews) {
                              setIsPricingDialogOpen(true);
                            } else {
                              setViewCount((prev) => prev + 1);
                              if (application.CV) {
                                window.open(
                                  application?.CV,
                                  "_blank",
                                  "noopener,noreferrer"
                                );
                              } else {
                                alert("No CV available to download");
                              }
                            }
                          }}
                        >
                          <FileText className="w-5 h-5" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Resume</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={scheduleModal.isOpen}
        onClose={() =>
          setScheduleModal({
            isOpen: false,
            applicantId: null,
            applicationId: null,
            step: null,
          })
        }
        step={scheduleModal.step}
        onSchedule={handleSchedule}
        hiringStages={hiringStages.docs}
      />

      {isPricingDialogOpen && (
        <PricingDialogue onClose={() => setIsPricingDialogOpen(false)} />
      )}
    </>
  );
};

export default ApplicantsTable;

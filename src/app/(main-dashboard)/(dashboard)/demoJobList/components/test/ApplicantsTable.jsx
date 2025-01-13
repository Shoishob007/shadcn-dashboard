"use client";

import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, Edit3, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StepSelector } from "../../../demoAppList/demoAppDetails/components/StepSelector";
import { ScheduleModal } from "../../../demoAppList/demoAppDetails/components/ScheduleModal";
import Link from "next/link";
import PricingDialogue from "../pricingDialogue";

const ApplicantsTable = ({
  applicants,
  onUpdateApplicant,
  viewCount,
  setViewCount,
  maxViews,
}) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [scheduleModal, setScheduleModal] = useState({
    isOpen: false,
    applicantId: null,
    step: "",
  });
  const [applicantsState, setApplicantsState] = useState(applicants);
  const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false);

  useEffect(() => {
    const updatedApplicants = applicants.map((applicant) => ({
      ...applicant,
      step:
        applicant.status === "shortlisted"
          ? applicant.steps || applicant.step || "applied"
          : applicant.step || "applied",
    }));

    setApplicantsState(updatedApplicants);
  }, [applicants]);

  /*
  useEffect(() => {
    const fetchShortlistedSteps = async () => {
      const updatedApplicants = await Promise.all(
        applicants.map(async (applicant) => {
          if (applicant.status === "shortlisted") {
            try {
              const response = await fetch(`/api/applicants/${applicant.id}/steps`);
              const data = await response.json();
              return {
                ...applicant,
                step: data.currentStep || "Interview"
              };
            } catch (error) {
              console.error("Error fetching step:", error);
              return {
                ...applicant,
                step: "Interview" // Fallback value
              };
            }
          }
          return applicant;
        })
      );
      setApplicantsState(updatedApplicants);
    };

    fetchShortlistedSteps();
  }, [applicants]); */

  const toggleDropdown = (applicantId) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [applicantId]: !prevState[applicantId],
    }));
  };

  const handleStepChange = (applicantId, newStep) => {
    const updatedApplicants = applicantsState.map((applicant) => {
      if (applicant.id === applicantId) {
        return {
          ...applicant,
          status: "shortlisted",
          step: newStep,
          steps: newStep,
        };
      }
      return applicant;
    });

    setApplicantsState(updatedApplicants);
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [applicantId]: false,
    }));

    setScheduleModal({
      isOpen: true,
      applicantId,
      step: newStep,
    });

    // Notifying parent component of the update
    if (onUpdateApplicant) {
      onUpdateApplicant(updatedApplicants.find((a) => a.id === applicantId));
    }
  };

  // scheduling
  const handleSchedule = (date, time) => {
    const updatedApplicants = applicantsState.map((applicant) => {
      if (applicant.id === scheduleModal.applicantId) {
        return {
          ...applicant,
          schedule: { date, time },
        };
      }
      return applicant;
    });

    setApplicantsState(updatedApplicants);
    setScheduleModal({ isOpen: false, applicantId: null, step: "" });

    // Notifying parent component of the update
    if (onUpdateApplicant) {
      onUpdateApplicant(
        updatedApplicants.find((a) => a.id === scheduleModal.applicantId)
      );
    }
  };

  const handleRejectApplicant = (applicantId) => {
    const updatedApplicants = applicantsState.map((applicant) =>
      applicant.id === applicantId
        ? { ...applicant, status: "rejected", step: "" }
        : applicant
    );
    setApplicantsState(updatedApplicants);

    if (onUpdateApplicant) {
      onUpdateApplicant(updatedApplicants.find((a) => a.id === applicantId));
    }
  };

  return (
    <>
      <div className="overflow-x-auto shadow-md rounded-lg bg-white border border-gray-200 dark:border-gray-500">
        <table className="w-full text-sm text-left text-gray-700 dark:bg-gray-800 dark:text-gray-300">
          <thead className="bg-gray-800 dark:bg-gray-300 text-gray-200 dark:text-gray-800 border border-b-gray-500">
            <tr className="text-center">
              <th className="pl-3 pr-2 py-3">Applicant</th>
              <th className="px-2 py-3">Education</th>
              <th className="px-2 py-3">Certifications</th>
              <th className="px-2 py-3">Status</th>
              <th className="pl-2 pr-3 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicantsState.map((applicant) => (
              <tr
                key={applicant.id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                {/* Name */}
                <td className="pl-3 pr-2 py-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={applicant?.applicant?.pictureUrl}
                        alt={applicant?.name}
                      />
                      <AvatarFallback>
                        {applicant.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-base text-gray-800 dark:text-gray-300">
                        {applicant.name}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {applicant?.experiences?.slice(-2).map((exp, index) => (
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
                  {applicant?.education?.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      {applicant?.education?.slice(-2).map((edu, index) => (
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
                  {applicant?.certifications?.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      {applicant?.certifications
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

                {/* Status */}
                <td className="px-2 py-3 text-center">
                  {applicant.status === "rejected" ? (
                    <div className="text-[10px] px-1 py-1 rounded-md font-medium capitalize bg-red-100 dark:bg-red-200 text-red-600 border border-red-500">
                      Rejected
                    </div>
                  ) : applicant.status === "applied" ? (
                    <StepSelector
                      selectedStep={applicant.step}
                      onStepChange={(newStep) =>
                        handleStepChange(applicant.id, newStep)
                      }
                      onReject={() => handleRejectApplicant(applicant.id)}
                    />
                  ) : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`text-[10px] px-1 py-1 rounded-md font-medium cursor-pointer capitalize ${
                              applicant?.status === "shortlisted"
                                ? "bg-yellow-100 dark:bg-yellow-200 text-yellow-600 border border-yellow-500"
                                : applicant?.status === "hired"
                                ? "bg-emerald-100 dark:bg-emerald-200 text-emerald-600 border border-emerald-500"
                                : "bg-red-100 dark:bg-red-200 text-red-600 border border-red-500"
                            }`}
                            onClick={() => {
                              if (applicant?.status === "shortlisted") {
                                toggleDropdown(applicant.id);
                              }
                            }}
                          >
                            {applicant?.schedule?.date
                              ? `${applicant?.step}: ${new Date(
                                  applicant?.schedule.date
                                ).toLocaleDateString()} at ${
                                  applicant?.schedule.time
                                }`
                              : applicant?.status === "shortlisted"
                              ? `${applicant?.step || "Step not set"}`
                              : `${applicant?.status}`}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          {applicant?.status === "shortlisted" ? (
                            openDropdowns[applicant?.id] ? (
                              <p>Click to close</p>
                            ) : (
                              <p>Click to change schedule</p>
                            )
                          ) : (
                            <p>This applicant is {applicant?.status}</p>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {/* Step Selector (Dropdown) */}
                  {openDropdowns[applicant.id] &&
                    applicant?.status === "shortlisted" && (
                      <StepSelector
                        selectedStep={applicant?.steps || applicant?.step}
                        onStepChange={(newStep) =>
                          handleStepChange(applicant.id, newStep)
                        }
                        onReject={() => handleRejectApplicant(applicant.id)}
                      />
                    )}
                </td>

                {/* Actions */}
                <td className="pl-2 pr-3 py-2 text-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={
                            viewCount < maxViews
                              ? `/demoAppList/demoAppDetails?id=${applicant.id}`
                              : "#"
                          }
                          className={`text-blue-500 hover:text-blue-700 inline-block ${
                            viewCount >= maxViews ? "cursor-pointer" : ""}`}
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
                              if (applicant.CV) {
                                window.open(
                                  applicant?.CV,
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
          setScheduleModal({ isOpen: false, applicantId: null, step: "" })
        }
        step={scheduleModal.step}
        onSchedule={handleSchedule}
      />

      {isPricingDialogOpen && (
        <PricingDialogue onClose={() => setIsPricingDialogOpen(false)} />
      )}
    </>
  );
};

export default ApplicantsTable;

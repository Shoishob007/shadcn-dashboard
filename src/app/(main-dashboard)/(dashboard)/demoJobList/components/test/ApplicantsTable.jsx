import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StepSelector } from "../../../demoAppList/demoAppDetails/components/StepSelector";
import { ScheduleModal } from "../../../demoAppList/demoAppDetails/components/ScheduleModal";
import Link from "next/link";
import PricingDialogue from "../pricingDialogue";
import HiringProgress from "../HiringProgressBar";

const ApplicantsTable = ({
  applicants,
  onUpdateApplicant,
  viewCount,
  setViewCount,
  maxViews,
  hiringStages,
}) => {
  console.log("applicants :::::: ", applicants);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [scheduleModal, setScheduleModal] = useState({
    isOpen: false,
    applicantId: null,
    step: "",
  });
  const [applicantsState, setApplicantsState] = useState(applicants);
  const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false);

  // useEffect(() => {
  //   const updatedApplicants = applicants.map((applicant) => ({
  //     ...applicant,
  //     step: "applied"
  //       ? applicant.steps || applicant.step || "applied"
  //       : applicant.step || "applied",
  //   }));

  //   setApplicantsState(updatedApplicants);

  //   console.log("updatedApplicants :: ", updatedApplicants);
  // }, [applicants]);


  const handleStepChange = (applicantId, newStep) => {
    const updatedApplicants = applicantsState.map((applicant) => {
      if (applicant.id === applicantId) {
        return {
          ...applicant,
          applicationStatus: newStep,
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

    if (onUpdateApplicant) {
      onUpdateApplicant(updatedApplicants.find((a) => a.id === applicantId));
    }
  };

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

    if (onUpdateApplicant) {
      onUpdateApplicant(
        updatedApplicants.find((a) => a.id === scheduleModal.applicantId)
      );
    }
  };

  const handleRejectApplicant = (applicantId) => {
    const updatedApplicants = applicantsState.map((applicant) =>
      applicant.id === applicantId ? { ...applicant, step: "" } : applicant
    );
    setApplicantsState(updatedApplicants);

    if (onUpdateApplicant) {
      onUpdateApplicant(updatedApplicants.find((a) => a.id === applicantId));
    }
  };

  console.log("updatedApplicants :: ", applicantsState);

  const getLatestStatus = (applicationStatus) => {
    if (!applicationStatus?.docs || applicationStatus.docs.length === 0) {
      return "applied";
    }

    const sortedDocs = applicationStatus.docs.sort(
      (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
    );

    return sortedDocs[0].status;
  };

  const getLatestStageInfo = (applicant) => {
    const latestStatus = getLatestStatus(applicant.applicationStatus);
    const latestHiringStage = applicant.hiringStep?.title;
    const latestHiringStageOrder = applicant.hiringStep?.order;

    return {
      status: latestStatus,
      stage: latestHiringStage,
      order: latestHiringStageOrder,
    };
  };

  const renderHiringStages = (applicant) => {
    const {
      stage: latestStage,
      order: latestStageOrder,
      status: latestStatus,
    } = getLatestStageInfo(applicant);

    console.log("latest stage :: ", latestStage)

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
              {/* <th className="px-2 py-3 text-center">Status</th> */}
              <th className="px-2 py-3 text-center">Hiring Progress</th>
              <th className="px-2 py-3 text-center">Change Schedule</th>
              <th className="pl-2 pr-3 py-3 text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {applicantsState.map((applicant) => {
              return (
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
                        <AvatarFallback className="bg-gray-300 text-xs font-bold text-gray-700">
                          {applicant.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold text-base text-gray-800 dark:text-gray-300">
                          {applicant.name}
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {applicant?.experiences
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

                  {/* Latest Status */}
                  {/* <td className="px-2 py-3 text-center">
                    <div
                      className={`px-1 py-1 rounded-md font-medium capitalize ${textColor}`}
                    >
                      {currentStatus}
                    </div>
                  </td> */}

                  {/* Hiring Progress */}
                  <td className="px-2 py-3 text-center">
                    {renderHiringStages(applicant)}
                  </td>

                  {/* Change Schedule or reject */}
                  <td className="px-2 py-3 text-center">
                    <StepSelector
                      selectedStep={applicant.step}
                      onStepChange={(newStep) =>
                        handleStepChange(applicant.id, newStep)
                      }
                      onReject={() => handleRejectApplicant(applicant.id)}
                      className="justify-center"
                    />
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
              );
            })}
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

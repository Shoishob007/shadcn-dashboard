import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import PricingDialogue from "./pricingDialogue";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FileText,
} from "lucide-react";
import HiringProgress from "./HiringProgressBar";

const JobApplicantsCards = ({
  currentPaginatedApplicants,
  calculateTotalExperience,
  handleViewDetails,
  socialMediaIcons,
  viewCount,
  setViewCount,
  maxViews,
  hiringStages,
}) => {
  const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false);

  console.log("cuurenmt ::: ", currentPaginatedApplicants)

  // Get the latest stage and status for an applicant
  const getLatestStageInfo = (applicant) => {
    const latestStatus = applicant.applicationStatus;
    const latestHiringStage = applicant.hiringStep?.title;
    const latestHiringStageOrder = applicant.hiringStep?.order;

    return {
      status: latestStatus,
      stage: latestHiringStage,
      order: latestHiringStageOrder,
    };
  };

  // Render the hiring stages progress bar with circular indicators
  const renderHiringStages = (applicant) => {
    const {
      stage: latestStage,
      order: latestStageOrder,
      status: latestStatus,
    } = getLatestStageInfo(applicant);

    return (
      <HiringProgress
        currentStage={latestStageOrder}
        totalStages={hiringStages.docs.length}
        stages={hiringStages.docs}
        status={latestStatus}
      />
    );
  };
  const handleViewCV = (cvUrl) => {
    if (cvUrl) {
      window.open(cvUrl, "_blank");
    }
  };

  const getStatusBadgeProps = (status) => {
    switch (status) {
      case "applied":
        return { bgColor: "bg-blue-100", textColor: "text-blue-600" };
      case "shortlisted":
        return { bgColor: "bg-yellow-100", textColor: "text-yellow-600" };
      case "hired":
        return { bgColor: "bg-emerald-100", textColor: "text-emerald-600" };
      case "rejected":
        return { bgColor: "bg-red-100", textColor: "text-red-600" };
      default:
        return { bgColor: "bg-blue-100", textColor: "text-blue-600" };
    }
  };

  return (
    <>
      <div className="applicantsListGrid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPaginatedApplicants.map((applicant) => {
          const totalExperience = calculateTotalExperience(
            applicant.experiences
          );
          const latestStatus = applicant?.applicationStatus ?? "pending";
          const { bgColor, textColor } = getStatusBadgeProps(latestStatus);
          console.log("Applicant ::::: ", applicant)

          return (
            <Card
              key={applicant.id}
              className="flex flex-col justify-between p-6 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg bg-white dark:bg-gray-800"
            >
              <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
                <Avatar className="md:h-12 h-16 w-16 md:w-12 border border-emerald-500 text-sm">
                  <AvatarImage
                    src={applicant.applicant?.pictureUrl}
                    alt={applicant.name}
                  />
                  <AvatarFallback className="bg-gray-300 text-xs font-bold text-gray-700">
                    {applicant.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col w-full">
                  <div className="items-center flex gap-2 justify-between">
                    <h4 className="text-base font-semibold dark:text-white">
                      {applicant.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-4 w-full justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {applicant.experiences?.[0]?.position || "N/A"}
                    </p>
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`px-2 py-1 rounded-full text-[10px] font-semibold mx-auto ${bgColor} ${textColor}`}
                      >
                        {latestStatus
                          ? latestStatus.charAt(0).toUpperCase() +
                            latestStatus.slice(1)
                          : "applied"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Render hiring stages */}
              {renderHiringStages(applicant)}

              <div className="text-gray-700 text-sm dark:text-gray-300 mb-3">
                <div className="flex flex-col text-sm mb-3">
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    {applicant.education?.map((degree, index) => (
                      <li key={index} className="text-sm md:text-[12px]">
                        {degree.degree}
                      </li>
                    )) || <li>No education data</li>}
                  </ul>
                </div>
                <p>
                  Experience:<strong> {totalExperience}</strong>
                </p>
                <p>
                  Certifications:
                  <strong> {applicant.certifications?.length || 0}</strong>
                </p>
                <div className="flex gap-2 items-center">
                  <p>Resume:</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => handleViewCV(applicant.CV)}
                          className="p-2 rounded-full transition-colors border-none"
                          variant="outline"
                        >
                          <FileText className="h-5 w-5 text-gray-600" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View CV</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div className="flex justify-between items-center gap-4">
                <div className="flex gap-2">
                  {applicant.socialLinks?.map((link) => {
                    const Icon =
                      socialMediaIcons[link.socialMedia.title.toLowerCase()];
                    return (
                      Icon && (
                        <a
                          key={link.id}
                          href={link.socialMediaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-300 hover:scale-125 transition duration-200"
                        >
                          <Icon size={14} />
                        </a>
                      )
                    );
                  })}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-full border dark:border-gray-500 transition-colors ${
                    viewCount >= maxViews ? "cursor-pointer" : ""
                  }`}
                  onClick={() => {
                    if (viewCount >= maxViews) {
                      setIsPricingDialogOpen(true);
                    } else {
                      setViewCount((prev) => prev + 1);
                      handleViewDetails(applicant.applicantProfileID , applicant.id, applicant.applicationId);
                    }
                  }}
                >
                  View Details
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Rendering the Modal */}
      {isPricingDialogOpen && (
        <PricingDialogue onClose={() => setIsPricingDialogOpen(false)} />
      )}
    </>
  );
};

export default JobApplicantsCards;

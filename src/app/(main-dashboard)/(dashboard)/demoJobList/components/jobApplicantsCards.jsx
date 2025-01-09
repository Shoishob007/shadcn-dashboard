import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const JobApplicantsCards = ({
  currentPaginatedApplicants,
  calculateTotalExperience,
  handleViewDetails,
  socialMediaIcons,
  viewCount,
  setViewCount,
  maxViews,
}) => {
  return (
    <>
      <div className="applicantsListGrid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPaginatedApplicants.map((applicant) => {
          const totalExperience = calculateTotalExperience(
            applicant.experiences
          );
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
                    {applicant.name}
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
                    <div
                      className={`px-2 py-1 rounded-full text-[10px] font-semibold mx-auto ${
                        applicant.status === "shortlisted"
                          ? "bg-yellow-100 text-yellow-600"
                          : applicant.status === "hired"
                          ? "bg-emerald-100 text-emerald-600"
                          : applicant.status === "rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {applicant.status
                        ? applicant.status.charAt(0).toUpperCase() +
                          applicant.status.slice(1)
                        : "Applied"}
                    </div>
                  </div>
                </div>
              </div>

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
                <p>
                  CV Score:<strong> {applicant.CVScore || "N/A"}</strong>
                </p>
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
                    viewCount >= maxViews ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => {
                    if (viewCount >= maxViews) {
                      alert(
                        "View limit reached. Upgrade your subscription to continue."
                      );
                    } else {
                      setViewCount((prev) => prev + 1);
                      handleViewDetails(applicant.id);
                    }
                  }}
                  disabled={viewCount >= maxViews}
                >
                  View Details
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default JobApplicantsCards;

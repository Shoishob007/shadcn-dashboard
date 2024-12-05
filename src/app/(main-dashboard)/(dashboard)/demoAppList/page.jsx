"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { applicantsData } from "../applicants/components/applicantsData";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const socialMediaIcons = {
  linkedin: FaLinkedin,
  google: FaGoogle,
  facebook: FaFacebook,
};

const steps = [
  "Screening Test",
  "Aptitude Test",
  "Technical Test",
  "Interview",
];

const calculateTotalExperience = (experiences) => {
  const totalMonths = experiences.reduce((acc, exp) => {
    const start = new Date(exp.startDate);
    const end = new Date(exp.endDate);
    const duration =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    return acc + duration;
  }, 0);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return `${years} years ${months} months`;
};

const ApplicantsList = () => {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState("applied");
  const [selectedStep, setSelectedStep] = useState("All");

  // Filter logic
  const filteredApplicants = applicantsData.filter((applicant) => {
    const applicantStatus = applicant.status || "applied";

    if (selectedStatus === "applied") {
      return (
        applicantStatus === "applied" ||
        applicantStatus === "shortlisted" ||
        applicantStatus === "hired" ||
        !applicant.status
      );
    }

    if (selectedStatus === "shortlisted" && selectedStep === "All") {
      return applicantStatus === "shortlisted";
    }

    if (selectedStatus === "shortlisted" && selectedStep !== "All") {
      return (
        applicantStatus === "shortlisted" && applicant.steps === selectedStep
      );
    }

    return selectedStatus === applicantStatus;
  });

  const handleViewDetails = (id) => {
    router.push(`/demoAppList/demoAppDetails?id=${id}`);
  };

  return (
    <div className="relative flex">
      {/* Main Applicants List Section */}
      <div className="flex-1">
        <ToggleGroup
          className="flex gap-2 mb-4 justify-start bg-white dark:bg-gray-800 w-fit rounded-full"
          type="single"
          value={selectedStatus}
          onValueChange={(value) => value && setSelectedStatus(value)}
        >
          {/* Applied Toggle */}
          <ToggleGroupItem
            className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              selectedStatus === "applied"
                ? "!text-white dark:!text-blue-900 shadow-md !bg-gray-800 dark:!bg-blue-300"
                : "bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-100 dark:hover:!bg-gray-900 dark:text-gray-300"
            }`}
            value="applied"
          >
            Applied
          </ToggleGroupItem>

          {/* Shortlisted Toggle */}
          <ToggleGroupItem
            className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              selectedStatus === "shortlisted"
                ? "!text-white dark:!text-yellow-900 shadow-md !bg-gray-800 dark:!bg-yellow-300"
                : "bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-100 dark:hover:!bg-gray-900 dark:text-gray-300"
            }`}
            value="shortlisted"
          >
            <DropdownMenu className="min-w-40">
              <DropdownMenuTrigger className="flex items-center gap-2">
                Shortlisted
                <ChevronDown
                  className={`w-4 h-4 ${
                    selectedStatus === "shortlisted"
                      ? "text-white"
                      : "text-gray-700"
                  }`}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  key="All"
                  onSelect={() => setSelectedStep("All")}
                >
                  <div className="flex items-center justify-between w-full text-sm">
                    <div>All</div>
                    {selectedStep === "All" && "✔"}
                  </div>
                </DropdownMenuItem>
                {steps.map((step) => (
                  <DropdownMenuItem
                    key={step}
                    onSelect={() => setSelectedStep(step)}
                  >
                    <div className="flex items-center justify-between w-full gap-4 text-sm">
                      <div>{step}</div>
                      <div>{selectedStep === step && "✔"}</div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </ToggleGroupItem>

          {/* Hired Toggle */}
          <ToggleGroupItem
            className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              selectedStatus === "hired"
                ? "!text-white dark:!text-emerald-900 shadow-md !bg-gray-800 dark:!bg-emerald-300"
                : "bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-100 dark:hover:!bg-gray-900 dark:text-gray-300"
            }`}
            value="hired"
          >
            Hired
          </ToggleGroupItem>
        </ToggleGroup>

        {/* Applicants Grid */}
        <div className="applicantsListGrid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplicants.map((applicant) => {
            const totalExperience = calculateTotalExperience(
              applicant.experiences
            );
            return (
              <Card
                key={applicant.id}
                className="flex flex-col justify-between p-6 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg bg-white dark:bg-gray-800"
              >
                <div className="flex flex-col sm:flex-row gap-4 items-center mb-4 ">
                  <Avatar className="md:h-12 h-16 w-16 md:w-12 border border-emerald-500 text-sm">
                    <AvatarImage
                      src={applicant.applicantName}
                      alt={applicant.applicantName}
                    />
                    <AvatarFallback className="bg-gray-300 text-xs font-bold text-gray-700">
                      {applicant.applicantName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col w-full">
                    <div className="items-center flex gap-2 justify-between">
                      <h4 className="text-base font-semibold dark:text-white">
                        {applicant.applicantName}
                      </h4>
                    </div>

                    <div className="flex items-center gap-4 w-full justify-between">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {applicant.jobTitle}
                      </p>
                      <div
                        className={`px-2 py-1 rounded-full text-[10px] font-semibold mx-auto ${
                          applicant.status === "shortlisted"
                            ? "bg-yellow-100 text-yellow-600"
                            : `${
                                applicant.status === "hired"
                                  ? "bg-emerald-100 text-emerald-600"
                                  : "bg-red-100 text-red-600"
                              }`
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

                <div className=" text-gray-700 text-sm dark:text-gray-300 mb-3">
                  <div className="flex flex-col text-sm mb-3">
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                      {applicant.education.map((degree, index) => (
                        <li key={index} className="text-sm md:text-[12px]">
                          {degree.degree}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p>
                    Experience:<strong> {totalExperience}</strong>{" "}
                  </p>
                  <p>
                    Certifications:{" "}
                    <strong> {applicant.certifications.length}</strong>
                  </p>
                  <p>
                    CV Score:<strong> {applicant.CVScore}</strong>{" "}
                  </p>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <div className="flex gap-2">
                    {applicant.socialLinks &&
                    applicant.socialLinks.length > 0 ? (
                      applicant.socialLinks.map((link) => {
                        const Icon =
                          socialMediaIcons[
                            link.socialMedia.title.toLowerCase()
                          ];
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
                      })
                    ) : (
                      <span className="text-xs">N/A</span>
                    )}
                  </div>

                  {/* View Details Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full border dark:border-gray-200 transition-colors"
                    onClick={() => handleViewDetails(applicant.id)}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ApplicantsList;

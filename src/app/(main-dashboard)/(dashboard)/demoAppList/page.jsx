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
  "All",
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
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedStep, setSelectedStep] = useState("All");

  // Filtered logic
  const filteredApplicants = applicantsData.filter((applicant) => {
    if (selectedStatus === "shortlisted" && selectedStep === "All") {
      return applicant.status === "shortlisted";
    }

    if (selectedStatus === "shortlisted" && selectedStep !== "All") {
      return (
        applicant.status === "shortlisted" && applicant.steps === selectedStep
      );
    }

    return selectedStatus === "all" || applicant.status === selectedStatus;
  });

  const handleViewDetails = (id) => {
    router.push(`/demoAppList/demoAppDetails?id=${id}`);
  };

  return (
    <div className="relative flex">
      {/* Main Applicants List Section */}
      <div className="flex-1">
        <ToggleGroup
          className="flex gap-0 -space-x-px rounded-lg rtl:space-x-reverse mb-4 !p-0"
          type="single"
          variant="outline"
          value={selectedStatus}
          onValueChange={(value) => value && setSelectedStatus(value)}
        >
          {/* Existing toggle items */}
          <ToggleGroupItem
            className={`flex-1 h-7 !bg-blue-50 dark:!bg-blue-200 rounded-none border-b-2 shadow-none hover:text-gray-900 first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 ${
              selectedStatus === "all"
                ? "border-b-blue-400 !text-gray-900 !bg-blue-100"
                : "border-b-blue-50 text-gray-700"
            }`}
            value="all"
          >
            All
          </ToggleGroupItem>
          <ToggleGroupItem
            className={`flex-1 h-7 !bg-red-50 dark:!bg-red-200 rounded-none border-b-2 shadow-none hover:text-gray-900 first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 ${
              selectedStatus === "applied"
                ? "border-b-red-400 !text-gray-900 !bg-red-100"
                : "border-b-red-50 text-gray-700"
            }`}
            value="applied"
          >
            Applied
          </ToggleGroupItem>
          <ToggleGroupItem
            className={`flex-1 h-7 !bg-yellow-50 dark:!bg-yellow-200 rounded-none border-b-2 shadow-none hover:text-gray-900 first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 ${
              selectedStatus === "shortlisted"
                ? "border-b-yellow-400 !text-gray-900 !bg-yellow-100"
                : "border-b-yellow-50 text-gray-700"
            }`}
            value="shortlisted"
          >
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-4">
                Shortlisted{" "}
                <span>
                  {" "}
                  <ChevronDown className="w-5 h-5" />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {steps.map((step) => (
                  <DropdownMenuItem
                    key={step}
                    onSelect={() => setSelectedStep(step)}
                  >
                    {step}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </ToggleGroupItem>
          <ToggleGroupItem
            className={`flex-1 h-7 !bg-emerald-50 dark:!bg-emerald-200 rounded-none  border-b-2 shadow-none hover:text-gray-900 first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 ${
              selectedStatus === "hired"
                ? "border-b-emerald-400 !text-gray-900 !bg-emerald-100"
                : "border-b-emerald-50 text-gray-700"
            }`}
            value="hired"
          >
            Hired
          </ToggleGroupItem>
        </ToggleGroup>

        {/* Applicants Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredApplicants.map((applicant) => {
            const totalExperience = calculateTotalExperience(
              applicant.experiences
            );
            return (
              <Card
                key={applicant.id}
                className="flex flex-col justify-between p-5 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg bg-white dark:bg-gray-800"
              >
                <div className="flex flex-col sm:flex-row gap-4 items-center mb-4 ">
                  <Avatar className="h-12 w-12 border border-emerald-500 text-sm">
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
                      <h4 className="text-sm font-semibold dark:text-white">
                        {applicant.applicantName}
                      </h4>
                    </div>

                    <div className="flex items-center gap-4 w-full justify-between">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {applicant.jobTitle}
                      </p>
                      <div
                        className={`px-2 py-1 rounded-full text-[8px] font-semibold mx-auto ${
                          applicant.status === "shortlisted"
                            ? "bg-yellow-100 text-yellow-600"
                            : `${
                                applicant.status === "hired"
                                  ? "bg-emerald-100 text-emerald-600"
                                  : "bg-red-100 text-red-600"
                              }`
                        }`}
                      >
                        {applicant.status.charAt(0).toUpperCase() +
                          applicant.status.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" text-gray-700 text-xs dark:text-gray-300 mb-3">
                  <div className="flex flex-col text-xs items-center mb-3">
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                      {applicant.education.map((degree, index) => (
                        <li key={index} className="text-xs">
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

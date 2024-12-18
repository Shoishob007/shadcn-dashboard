/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { documents as jobApplicants } from "../demoJobList/components/jobApplicants";
import { documents as jobData } from "../demoJobList/components/jobData";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import OurPagination from "@/components/Pagination";
import { AppFilters } from "@/components/filters/JobFilters";
import { capitalizeText } from "@/components/Capitalize";

const socialMediaIcons = {
  linkedin: FaLinkedin,
  google: FaGoogle,
  facebook: FaFacebook,
};

const steps = [
  "screening test",
  "aptitude test",
  "technical test",
  "interview",
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

// unique job titles by matching IDs
const getJobTitles = () => {
  const jobTitles = new Set();
  jobApplicants.docs.forEach((applicantDoc) => {
    const jobId = applicantDoc.job.id;
    const matchingJob = jobData.docs.find((job) => job.job.id === jobId);
    if (matchingJob) {
      jobTitles.add(matchingJob.title);
    }
  });
  return Array.from(jobTitles);
};

const jobTitles = getJobTitles();
// console.log(jobTitles);

const ApplicantsList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const itemsPerPage = 9;
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const [filteredApplicantsList, setFilteredApplicantsList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("applied");
  const [selectedStep, setSelectedStep] = useState("");
  const [currentJob, setCurrentJob] = useState(null);
  const [filters, setFilters] = useState({
    searchQuery: "",
    selectedTitle: "all",
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      searchQuery: "",
      selectedTitle: "all",
    });
  };

  useEffect(() => {
    if (jobId) {
      const job = jobApplicants.docs.find((doc) => doc.job.id === jobId);
      if (job) {
        setCurrentJob(job.job);
      }
    }
  }, [jobId]);

  const allApplicants = jobApplicants.docs.flatMap((doc) =>
    doc.applicants.map((applicant) => ({
      ...applicant,
      job: doc.job,
    }))
  );

  // Filter logic
  const filteredApplicants = allApplicants.filter((applicant) => {
    const applicantStatus = applicant.status || "applied";
    const searchQuery = filters.searchQuery.toLowerCase();

    // Status filter
    const statusMatch =
      selectedStatus === "applied"
        ? applicantStatus === "applied" ||
          applicantStatus === "shortlisted" ||
          applicantStatus === "hired" ||
          applicantStatus === "rejected" ||
          !applicant.status
        : selectedStatus === "shortlisted" && selectedStep === "all"
        ? applicantStatus === "shortlisted"
        : selectedStatus === "shortlisted" && selectedStep !== "all"
        ? applicantStatus === "shortlisted" && applicant.steps === selectedStep
        : selectedStatus === applicantStatus;

    // Job title filter
    const jobTitleMatch =
    filters.selectedTitle === "all" ||
    !filters.selectedTitle ||
    (() => {
      const matchingJob = jobData.docs.find(
        (job) => job.job.id === applicant.job.id
      );
      return (
        matchingJob &&
        matchingJob.title.toLowerCase() ===
          filters.selectedTitle.toLowerCase()
      );
    })();

    // Search filter
    const searchMatch =
      !searchQuery ||
      applicant.name.toLowerCase().includes(searchQuery) ||
      applicant.job?.organization?.orgName
        ?.toLowerCase()
        .includes(searchQuery) ||
      applicant.education?.some((edu) =>
        edu.degree.toLowerCase().includes(searchQuery)
      ) ||
      applicant.experiences?.some(
        (exp) =>
          exp.title?.toLowerCase().includes(searchQuery) ||
          exp.company?.toLowerCase().includes(searchQuery)
      );

    return statusMatch && searchMatch && jobTitleMatch;
  });

  const handleViewDetails = (id) => {
    router.push(`/demoAppList/demoAppDetails?id=${id}`);
  };

  useEffect(() => {
    const applicants = filteredApplicants;
    setFilteredApplicantsList(applicants);
  }, [
    selectedStatus,
    selectedStep,
    filters.searchQuery,
    filters.selectedTitle,
  ]);

  const startIndex = (currentPaginationPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPaginatedApplicants = filteredApplicants.slice(
    startIndex,
    endIndex
  );

  const totalPaginationPages = Math.ceil(
    filteredApplicantsList.length / itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-1 justify-between">
          <ToggleGroup
            className="flex gap-0 justify-start bg-white dark:bg-gray-800 w-fit rounded-full shadow-sm h-7 md:h-9"
            type="single"
            value={selectedStatus}
            onValueChange={(value) => value && setSelectedStatus(value)}
          >
            <ToggleGroupItem
              className={`h-7 md:h-9 pr-2 pl-3 md:px-6 py-1 md:py-2 text-xs md:text-sm font-medium rounded-l-full transition-all duration-300 ${
                selectedStatus === "applied"
                  ? "!text-white dark:!text-blue-900 shadow-md !bg-gray-800 dark:!bg-blue-300"
                  : "bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-300 dark:hover:!bg-gray-700 dark:text-gray-300"
              }`}
              value="applied"
            >
              Applied
            </ToggleGroupItem>

            <ToggleGroupItem
              className={`h-7 md:h-9 px-2 md:px-6 py-1 md:py-2 text-xs md:text-sm font-medium rounded-none transition-all duration-300 ${
                selectedStatus === "shortlisted"
                  ? "!text-white dark:!text-yellow-900 shadow-md !bg-gray-800 dark:!bg-yellow-300"
                  : "bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-300 dark:hover:!bg-gray-700 dark:text-gray-300"
              }`}
              value="shortlisted"
            >
              <DropdownMenu className="min-w-40">
                <DropdownMenuTrigger className="flex items-center justify-between w-full">
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
                    key="all"
                    onSelect={() => setSelectedStep("all")}
                  >
                    <div className="flex items-center justify-between w-full text-sm">
                      <div>All</div>
                      {selectedStep === "all" && "✔"}
                    </div>
                  </DropdownMenuItem>
                  {steps.map((step) => (
                    <DropdownMenuItem
                      key={step}
                      onSelect={() => setSelectedStep(step)}
                    >
                      <div className="flex items-center justify-between w-full gap-4 text-sm">
                        <div>{capitalizeText(step)}</div>
                        <div>{selectedStep === step && "✔"}</div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </ToggleGroupItem>

            <ToggleGroupItem
              className={`h-7 md:h-9 px-2 md:px-6 py-1 md:py-2 text-xs md:text-sm font-medium rounded-none transition-all duration-300 ${
                selectedStatus === "hired"
                  ? "!text-white dark:!text-emerald-900 shadow-md !bg-gray-800 dark:!bg-emerald-300"
                  : "bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-300 dark:hover:!bg-gray-700 dark:text-gray-300"
              }`}
              value="hired"
            >
              Hired
            </ToggleGroupItem>
            <ToggleGroupItem
              className={`h-7 md:h-9 pr-3 pl-2 md:px-6 py-1 md:py-2 text-xs md:text-sm font-medium rounded-r-full transition-all duration-300 ${
                selectedStatus === "rejected"
                  ? "!text-white dark:!text-red-900 shadow-md !bg-gray-800 dark:!bg-red-300"
                  : "bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-300 dark:hover:!bg-gray-700 dark:text-gray-300"
              }`}
              value="rejected"
            >
              Rejected
            </ToggleGroupItem>
          </ToggleGroup>

          <div className="w-fit">
            <AppFilters
              applicants={jobApplicants.docs?.applicants}
              filters={filters}
              jobTitles={jobTitles}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
            />
          </div>
        </div>

        {currentPaginatedApplicants.length > 0 ? (
          <div className="applicantsListGrid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPaginatedApplicants.map((applicant) => {
              const totalExperience = calculateTotalExperience(
                applicant.experiences || []
              );

              return (
                <Card
                  key={applicant.id}
                  className="flex flex-col justify-between mt-4 p-6 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg bg-white dark:bg-gray-800"
                >
                  <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
                    <Avatar className="md:h-12 h-16 w-16 md:w-12 border border-emerald-500 text-sm">
                      <AvatarImage
                        src={applicant.applicant?.pictureUrl}
                        alt={applicant.name}
                      />
                      <AvatarFallback className="bg-gray-300 text-xs font-bold text-gray-700">
                        {applicant.name[0]}
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
                          {applicant.job?.organization?.orgName || "Job Title"}
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
                            : "applied"}
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
                        )) || <li>No education information available</li>}
                      </ul>
                    </div>
                    <p>
                      Experience: <strong>{totalExperience}</strong>
                    </p>
                    <p>
                      Certifications:
                      <strong>{applicant.certifications?.length || 0}</strong>
                    </p>
                    <p>
                      CV Score: <strong>{applicant.CVScore || "N/A"}</strong>
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
        ) : (
          <p className="text-center text-gray-500">No applicants found!</p>
        )}
      </div>

      <OurPagination
        totalPages={totalPaginationPages}
        currentPage={currentPaginationPage}
        onPageChange={(page) => setCurrentPaginationPage(page)}
      />
    </div>
  );
};

export default ApplicantsList;

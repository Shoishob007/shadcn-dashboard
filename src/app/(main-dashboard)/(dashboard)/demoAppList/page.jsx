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
import { ChevronDown, Grid2x2, List } from "lucide-react";
import OurPagination from "@/components/Pagination";
import { AppFilters } from "@/components/filters/JobFilters";
import { capitalizeText } from "@/components/Capitalize";
import ToggleGroupComponent from "../demoJobList/components/ToggleGroup";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import ApplicantsTable from "../demoJobList/components/test/ApplicantsTable";
import JobApplicantsCards from "../demoJobList/components/jobApplicantsCards";

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
  const totalMonths = experiences?.reduce((acc, exp) => {
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

const ApplicantsList = ({ limitToThree = false }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const itemsPerPage = limitToThree ? 3 : 9;
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const [filteredApplicantsList, setFilteredApplicantsList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("applied");
  const [selectedStep, setSelectedStep] = useState("");
  const [currentJob, setCurrentJob] = useState(null);
  const [filters, setFilters] = useState({
    searchQuery: "",
    selectedTitle: "all",
  });
  const [viewMode, setViewMode] = useState("card");

  const isListView = viewMode === "list";

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
        {!limitToThree && (
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-1 justify-between mb-4">
            <ToggleGroupComponent
              steps={steps}
              selectedStep={selectedStep}
              selectedStatus={selectedStatus}
              setSelectedStep={setSelectedStep}
              setSelectedStatus={setSelectedStatus}
            />

            <div className="flex items-center gap-4">
              <AppFilters
                applicants={jobApplicants.docs?.applicants}
                filters={filters}
                jobTitles={jobTitles}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
              />
                <div className="mr-2">
                  {/* Card View Icon */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="p-0 bg-transparent hover:bg-transparent"
                        >
                          <motion.button
                            onClick={() => setViewMode("card")}
                            className={`p-2 duration-300 ${
                              !isListView
                                ? "bg-gray-900 text-white dark:bg-gray-300 dark:text-gray-800"
                                : "bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Grid2x2 className="h-6 w-6" />
                          </motion.button>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Card View</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="p-0 bg-transparent hover:bg-transparent"
                        >
                          <motion.button
                            onClick={() => setViewMode("list")}
                            className={`p-2 duration-300 ${
                              isListView
                                ? "bg-gray-900 text-white dark:bg-gray-300 dark:text-gray-800"
                                : "bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <List className="h-6 w-6" />
                          </motion.button>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>List View</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
              </div>
            </div>
          </div>
        )}
        {currentPaginatedApplicants.length > 0 ? (
          isListView ? (
            <ApplicantsTable
              applicants={currentPaginatedApplicants}
              calculateTotalExperience={calculateTotalExperience}
              handleViewDetails={handleViewDetails}
            />
          ) : (
            <JobApplicantsCards
              currentPaginatedApplicants={currentPaginatedApplicants}
              calculateTotalExperience={calculateTotalExperience}
              handleViewDetails={handleViewDetails}
              socialMediaIcons={socialMediaIcons}
            />
          )
        ) : (
          <p className="text-center text-gray-500">No applicants found!</p>
        )}
      </div>

      {!limitToThree && (
        <OurPagination
          totalPages={totalPaginationPages}
          currentPage={currentPaginationPage}
          onPageChange={(page) => setCurrentPaginationPage(page)}
        />
      )}
    </div>
  );
};

export default ApplicantsList;

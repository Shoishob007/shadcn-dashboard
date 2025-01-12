/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { documents as jobApplicants } from "../demoJobList/components/jobApplicants";
import { documents as jobData } from "../demoJobList/components/jobData";
import { orgSettings } from "./components/org-settings";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import OurPagination from "@/components/Pagination";
import { AppFilters } from "@/components/filters/JobFilters";
import ToggleGroupComponent from "../demoJobList/components/ToggleGroup";
import ApplicantsTable from "../demoJobList/components/test/ApplicantsTable";
import JobApplicantsCards from "../demoJobList/components/jobApplicantsCards";
import GridListTooltip from "@/components/GridListTooltip";

const socialMediaIcons = {
  linkedin: FaLinkedin,
  google: FaGoogle,
  facebook: FaFacebook,
};

const steps = [
  "screening test",
  "aptitude test",
  "technical test",
  "hr interview",
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
  const [viewCount, setViewCount] = useState(2);
  const maxViews = orgSettings.docs[0]?.subscriptionId === 1 ? 3 : Infinity;

  const [filters, setFilters] = useState({
    searchQuery: "",
    selectedTitle: "all",
  });
  const [viewMode, setViewMode] = useState("card");
  console.log(viewCount, setViewCount, maxViews);

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
              <div className="mr-2 flex items-center shadow-md">
                {/* Card View Icon */}
                <GridListTooltip
                  setViewMode={setViewMode}
                  isListView={isListView}
                />
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
              viewCount={viewCount}
              setViewCount={setViewCount}
              maxViews={maxViews}
            />
          ) : (
            <JobApplicantsCards
              currentPaginatedApplicants={currentPaginatedApplicants}
              calculateTotalExperience={calculateTotalExperience}
              handleViewDetails={handleViewDetails}
              socialMediaIcons={socialMediaIcons}
              viewCount={viewCount}
              setViewCount={setViewCount}
              maxViews={maxViews}
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

      {limitToThree && (
        <Button
          onClick={() => router.push("/demoAppList")}
          className="!mt-4 float-right"
          size="sm"
        >
          See All Applicants
        </Button>
      )}
    </div>
  );
};

export default ApplicantsList;

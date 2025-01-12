/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import JobInfoCard from "../../demoAppList/components/JobInfoCard";
import { documents } from "../components/jobApplicants";
import { documents as jobDocuments } from "../components/jobData";
import OurPagination from "@/components/Pagination";
import ToggleGroupComponent from "../components/ToggleGroup";
import JobApplicantsCards from "../components/jobApplicantsCards";
import ApplicantsTable from "../components/test/ApplicantsTable";
import { orgSettings } from "../../demoAppList/components/org-settings";
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
  "interview",
];

const calculateTotalExperience = (experiences) => {
  if (!experiences) return "No Experience!";

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

const DemoApplicants = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const itemsPerPage = 9;
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const [filteredApplicantsList, setFilteredApplicantsList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("applied");
  const [selectedStep, setSelectedStep] = useState("");
  const [currentJob, setCurrentJob] = useState(null);
  const [currentJobInfo, setCurrentJobInfo] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [viewMode, setViewMode] = useState("card");
  const [viewCount, setViewCount] = useState(2);
  const maxViews = orgSettings.docs[0]?.subscriptionId === 1 ? 3 : Infinity;

  const isListView = viewMode === "list";
  console.log(viewCount, setViewCount, maxViews);

  useEffect(() => {
    if (jobId) {
      const matchedData = documents.docs.find((doc) => doc.job.id === jobId);
      if (matchedData) {
        setCurrentJob(matchedData.job);
        setApplicants(matchedData.applicants || []);
      }
    }

    if (jobId) {
      const matchedJobInfo = jobDocuments.docs.find(
        (doc) => doc.job.id === jobId
      );
      if (matchedJobInfo) {
        setCurrentJobInfo(matchedJobInfo);
      }
    }
  }, [jobId]);

  // Filtering logic
  const filteredApplicants = applicants.filter((applicant) => {
    const applicantStatus = applicant.status || "applied";

    if (selectedStatus === "applied") {
      return (
        applicantStatus === "applied" ||
        applicantStatus === "shortlisted" ||
        applicantStatus === "hired" ||
        applicantStatus === "rejected" ||
        !applicant.status
      );
    }

    if (selectedStatus === "shortlisted" && selectedStep === "all") {
      return applicantStatus === "shortlisted";
    }

    if (selectedStatus === "shortlisted" && selectedStep !== "all") {
      return (
        applicantStatus === "shortlisted" && applicant.steps === selectedStep
      );
    }

    return selectedStatus === applicantStatus;
  });

  const handleViewDetails = (id) => {
    router.push(`/demoAppList/demoAppDetails?id=${id}`);
  };

  useEffect(() => {
    const applicants = filteredApplicants;
    setFilteredApplicantsList(applicants);
  }, [selectedStatus, selectedStep]);

  const startIndex = (currentPaginationPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPaginatedApplicants = filteredApplicants.slice(
    startIndex,
    endIndex
  );

  const totalPaginationPages = Math.ceil(
    filteredApplicantsList.length / itemsPerPage
  );

  if (!currentJob) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <JobInfoCard
        applicants={applicants}
        job={currentJobInfo}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />

      {!isEditing && (
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <ToggleGroupComponent
              steps={steps}
              selectedStep={selectedStep}
              selectedStatus={selectedStatus}
              setSelectedStep={setSelectedStep}
              setSelectedStatus={setSelectedStatus}
            />
            {/* Floating Action Button */}
            <div className="mr-2">
              {/* Card View Icon */}
              <GridListTooltip setViewMode={setViewMode} isListView={isListView}/>
            </div>
          </div>
          {currentPaginatedApplicants.length > 0 ? (
            isListView ? (
              <ApplicantsTable
                applicants={applicants}
                calculateTotalExperience={calculateTotalExperience}
                handleViewDetails={handleViewDetails}
                viewCount={viewCount}
                setViewCount={setViewCount}
                maxViews={maxViews}
              />
            ) : (
              <JobApplicantsCards
                currentPaginatedApplicants={applicants}
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
      )}

      <OurPagination
        totalPages={totalPaginationPages}
        currentPage={currentPaginationPage}
        onPageChange={(page) => setCurrentPaginationPage(page)}
      />
    </div>
  );
};

export default DemoApplicants;

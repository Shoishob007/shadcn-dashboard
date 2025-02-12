/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import { useRouter } from "next/navigation";
import OurPagination from "@/components/Pagination";
import ToggleGroupComponent from "../demoJobList/components/ToggleGroup";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { House } from "lucide-react";
import { useSession } from "next-auth/react";
import ApplicantsTable from "../demoJobList/components/test/ApplicantsTable";
import GridListTooltip from "@/components/GridListTooltip";
import JobApplicantsCards from "../demoJobList/components/jobApplicantsCards";
import { ApplicantFilterSheet } from "@/components/filters/ApplicantFilterSheet";
import { getSafeValue } from "@/lib/helper";

const APPLICANTS_PER_PAGE = 6;

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

const DemoAppList = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const accessToken = session?.access_token;
  const orgId = session?.organizationId;

  // State for job applications and applicants
  const [jobApplications, setJobApplications] = useState([]);
  const [applicantProfiles, setApplicantProfiles] = useState({});
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(false);
  const [hasMoreApplicants, setHasMoreApplicants] = useState(true);

  // UI states
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("applied");
  const [selectedStep, setSelectedStep] = useState("");
  const [viewMode, setViewMode] = useState("card");
  const [viewCount, setViewCount] = useState(1);

  // Filter states
  const [filters, setFilters] = useState({
    searchQuery: "",
    selectedJobRole: "all",
    selectedTime: "all",
  });

  // Debugging: Log session, orgId, and accessToken
  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);
    console.log("orgId:", orgId);
    console.log("accessToken:", accessToken);
  }, [session, status, orgId, accessToken]);

  // Fetch job applications
  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        console.log("Fetching job applications...");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications?where[jobDetails.job.organization][equals]=${orgId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        console.log("Job applications data:", data);
        setJobApplications(data.docs || []);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    if (orgId && accessToken) {
      fetchJobApplications();
    } else {
      console.error(
        "orgId or accessToken is missing. Cannot fetch job applications."
      );
    }
  }, [orgId, accessToken]);

  // Function to fetch applicant profiles in chunks
  const fetchApplicantProfiles = async (applicantIds) => {
    setIsLoadingProfiles(true);
    try {
      const profiles = await Promise.all(
        applicantIds.map(async (id) => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/applicants/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const data = await response.json();
          return { id, profile: data };
        })
      );

      setApplicantProfiles((prev) => ({
        ...prev,
        ...Object.fromEntries(profiles.map(({ id, profile }) => [id, profile])),
      }));
    } catch (error) {
      console.error("Error fetching applicant profiles:", error);
    } finally {
      setIsLoadingProfiles(false);
    }
  };

  // Load more applicant profiles when scrolling or changing page
  useEffect(() => {
    const startIndex = (currentPage - 1) * APPLICANTS_PER_PAGE;
    const applicantIdsToFetch = jobApplications
      .slice(startIndex, startIndex + APPLICANTS_PER_PAGE)
      .map((app) => app.applicant)
      .filter((id) => !applicantProfiles[id]);

    if (applicantIdsToFetch.length > 0) {
      fetchApplicantProfiles(applicantIdsToFetch);
    }

    setHasMoreApplicants(
      startIndex + APPLICANTS_PER_PAGE < jobApplications.length
    );
  }, [currentPage, jobApplications]);

  // Transform applicant data to match the component's expected format
  const transformedApplicants = jobApplications
    .map((application) => {
      const profile = applicantProfiles[application.applicant];
      if (!profile) return null;

      return {
        id: application.applicant,
        name: getSafeValue(profile.name, "N/A"),
        status: getSafeValue(application.applicationStatus?.status, "applied"),
        steps: getSafeValue(application.applicationStatus?.currentStep),
        schedule: {
          date: getSafeValue(application.applicationStatus?.scheduleDate),
          time: getSafeValue(application.applicationStatus?.scheduleTime),
        },
        CVScore: getSafeValue(profile.CVScore, profile.cv ? 75 : 0),
        CV: getSafeValue(profile.cv),
        certifications: getSafeValue(profile.trainingAndCertifications, []),
        experiences: getSafeValue(profile.experiences, []),
        socialLinks: getSafeValue(profile.socialLinks, []),
        education: getSafeValue(profile.educations, []),
        skills: getSafeValue(profile.skills, []),
        contactInfo: {
          email: getSafeValue(profile.email),
          phone: getSafeValue(profile.phone),
          address: getSafeValue(profile.address),
        },
        applicant: {
          pictureUrl: getSafeValue(profile.img?.url),
          websiteUrl: getSafeValue(profile.applicantWebsiteUrl),
        },
        jobTitle: getSafeValue(application.jobDetails?.job?.title, "N/A"),
        jobRole: getSafeValue(
          application.jobDetails?.jobRole?.[0]?.title,
          "N/A"
        ),
        createdAt: getSafeValue(application.createdAt),
      };
    })
    .filter(Boolean);

  // Filter applicants based on selected filters
  const filteredApplicants = transformedApplicants.filter((applicant) => {
    const statusMatch = !selectedStatus || applicant.status === selectedStatus;
    const stepMatch = !selectedStep || applicant.steps === selectedStep;
    const jobRoleMatch =
      filters.selectedJobRole === "all" ||
      applicant.jobRole === filters.selectedJobRole;
    const timeMatch =
      filters.selectedTime === "all" ||
      (filters.selectedTime === "recent" &&
        new Date(applicant.createdAt) > new Date(Date.now() - 7 * 86400000)); // Last 7 days
    const searchMatch =
      !filters.searchQuery ||
      applicant.name
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase()) ||
      applicant.jobTitle
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());

    return statusMatch && stepMatch && jobRoleMatch && timeMatch && searchMatch;
  });

  // Pagination handling
  const currentPaginatedApplicants = filteredApplicants.slice(
    (currentPage - 1) * APPLICANTS_PER_PAGE,
    currentPage * APPLICANTS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredApplicants.length / APPLICANTS_PER_PAGE);

  const handleViewDetails = (id) => {
    router.push(`/demoAppList/demoAppDetails?id=${id}`);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      searchQuery: "",
      selectedJobRole: "all",
      selectedTime: "all",
    });
  };

  return (
    <>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <House className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/demoAppList">Applicants List</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-6">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <ToggleGroupComponent
              steps={steps}
              selectedStep={selectedStep}
              selectedStatus={selectedStatus}
              setSelectedStep={setSelectedStep}
              setSelectedStatus={setSelectedStatus}
            />
            <div className="flex items-center gap-2">
              <ApplicantFilterSheet
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
              />
              <div className="mr-2 flex items-center shadow-md">
                <GridListTooltip
                  setViewMode={setViewMode}
                  isListView={viewMode === "list"}
                />
              </div>
            </div>
          </div>

          {isLoadingProfiles && currentPaginatedApplicants.length === 0 ? (
            <div className="text-center p-8">Loading applicant profiles...</div>
          ) : currentPaginatedApplicants.length > 0 ? (
            viewMode === "list" ? (
              <ApplicantsTable
                applicants={currentPaginatedApplicants}
                calculateTotalExperience={calculateTotalExperience}
                handleViewDetails={handleViewDetails}
                viewCount={viewCount}
                setViewCount={setViewCount}
                maxViews={Infinity}
              />
            ) : (
              <JobApplicantsCards
                currentPaginatedApplicants={currentPaginatedApplicants}
                calculateTotalExperience={calculateTotalExperience}
                handleViewDetails={handleViewDetails}
                socialMediaIcons={socialMediaIcons}
                viewCount={viewCount}
                setViewCount={setViewCount}
                maxViews={Infinity}
              />
            )
          ) : (
            <p className="text-center text-gray-500">No applicants found!</p>
          )}
        </div>

        <OurPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default DemoAppList;

/* eslint-disable react-hooks/exhaustive-deps */
"use client"


// Issues in filtering

import React, { useEffect, useState, useRef, useCallback } from "react";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import { useRouter } from "next/navigation";
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

const ITEMS_PER_PAGE = 10;

const socialMediaIcons = {
  linkedin: FaLinkedin,
  google: FaGoogle,
  facebook: FaFacebook,
};

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
  const { data: session } = useSession();
  const accessToken = session?.access_token;
  const orgId = session?.organizationId;

  // Refs for infinite scrolling
  const observerRef = useRef(null);
  const loadingRef = useRef(null);

  // State for job applications and applicants
  const [jobApplications, setJobApplications] = useState([]);
  const [hiringStages, setHiringStages] = useState([]);
  const [applicantProfiles, setApplicantProfiles] = useState({});
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // UI states
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [selectedStep, setSelectedStep] = useState("");
  const [viewMode, setViewMode] = useState("card");
  const [viewCount, setViewCount] = useState(1);

  // Filter states
  const [filters, setFilters] = useState({
    searchQuery: "",
    selectedJobRole: "all",
    selectedTime: "all",
  });

  // Fetch job applications
  const fetchJobApplications = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications?where[jobDetails.job.organization][equals]=${orgId}&limit=${ITEMS_PER_PAGE}&page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();

      // Append new applications to existing ones
      setJobApplications((prev) => [...prev, ...(data.docs || [])]);
      setHasMore(data.hasNextPage || false);
    } catch (error) {
      console.error("Error fetching job applications:", error);
    }
  };

  // Function to fetch applicant profiles
  const fetchApplicantProfiles = async (applicantIds) => {
    const validIds = [];
    for (const id of applicantIds) {
      if (id === null) break;
      validIds.push(id);
    }

    if (validIds.length === 0) return;

    console.log("Valid applicantIds :: ", validIds);
    setIsLoadingProfiles(true);

    try {
      const profiles = await Promise.all(
        validIds.map(async (id) => {
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
          console.log("Data :: ", data);
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

  // Intersection Observer callback
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoadingProfiles) {
        setPage((prev) => prev + 1);
      }
    },
    [hasMore, isLoadingProfiles]
  );

  // Setup Intersection Observer
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    observerRef.current = new IntersectionObserver(handleObserver, option);

    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  // Fetch initial job applications
  useEffect(() => {
    if (orgId && accessToken) {
      fetchJobApplications();
    }
  }, [orgId, accessToken, page]);

  // Fetch applicant profiles for new applications
  useEffect(() => {
    const newApplicantIds = jobApplications
      .map((app) => app.applicant)
      .filter((id) => !applicantProfiles[id]);

    if (newApplicantIds.length > 0) {
      fetchApplicantProfiles(newApplicantIds);
    }
  }, [jobApplications]);

  // Fetch hiring stages for the company
  const fetchHiringStages = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hiring-stages?where[organization.id]=${orgId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setHiringStages(data);
      console.log("Hiring Stages :: ", data);
    } catch (error) {
      console.error("Error fetching hiring stages :", error);
    }
  };

  useEffect(() => {
    fetchHiringStages();
  }, [orgId, accessToken]);

  // Transform applicant data
  const transformedApplicants = jobApplications
    .map((application) => {
      const profile = applicantProfiles[application.applicant];
      if (!profile) return null;

      const latestStatus =
        application.applicationStatus?.docs?.[0]?.status || "pending";

      return {
        id: application.applicant,
        name: getSafeValue(profile.name, "N/A"),
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
        applicationStatus: latestStatus,
        hiringStep:
          application.applicationStatus?.docs[0]?.hiringStage?.title || "N/A",
        createdAt: getSafeValue(application.createdAt),
      };
    })
    .filter(Boolean);

  // Filter applicants
  const hiringSteps = hiringStages.docs
    ?.sort((a, b) => a.order - b.order)
    .map((stage) => stage.title);

  const filteredApplicants = transformedApplicants.filter((applicant) => {
    // Apply status and step filters
    if (selectedStatus === "pending") {
      if (applicant.applicationStatus !== "pending") return false;
    } else if (selectedStatus === "passed") {
      if (applicant.applicationStatus !== "passed") return false;
    } else if (selectedStatus === "in-processing") {
      if (applicant.applicationStatus !== "in-processing") return false;
      if (selectedStep !== "all" && applicant.hiringStep !== selectedStep)
        return false;
    }

    // Apply additional filters (search query, job role, time)
    if (
      filters.searchQuery &&
      !applicant.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.selectedJobRole !== "all" &&
      applicant.jobRole !== filters.selectedJobRole
    ) {
      return false;
    }
    if (filters.selectedTime !== "all") {
      const createdAt = new Date(applicant.createdAt);
      const now = new Date();
      const timeDiff = now - createdAt;

      if (
        filters.selectedTime === "last24h" &&
        timeDiff > 24 * 60 * 60 * 1000
      ) {
        return false;
      }
      if (
        filters.selectedTime === "last7d" &&
        timeDiff > 7 * 24 * 60 * 60 * 1000
      ) {
        return false;
      }
      if (
        filters.selectedTime === "last30d" &&
        timeDiff > 30 * 24 * 60 * 60 * 1000
      ) {
        return false;
      }
    }

    return true;
  });

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
              steps={hiringSteps}
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

          {isLoadingProfiles && transformedApplicants.length === 0 ? (
            <div className="text-center p-8">Loading applicant profiles...</div>
          ) : filteredApplicants.length > 0 ? (
            <div>
              {viewMode === "list" ? (
                <ApplicantsTable
                  applicants={filteredApplicants}
                  calculateTotalExperience={calculateTotalExperience}
                  handleViewDetails={handleViewDetails}
                  viewCount={viewCount}
                  setViewCount={setViewCount}
                  maxViews={Infinity}
                  hiringStages={hiringStages}
                />
              ) : (
                <JobApplicantsCards
                  currentPaginatedApplicants={filteredApplicants}
                  calculateTotalExperience={calculateTotalExperience}
                  handleViewDetails={handleViewDetails}
                  socialMediaIcons={socialMediaIcons}
                  viewCount={viewCount}
                  setViewCount={setViewCount}
                  maxViews={Infinity}
                  hiringStages={hiringStages}
                />
              )}

              {/* Loading indicator and observer target */}
              <div ref={loadingRef} className="h-10 w-full">
                {hasMore && (
                  <div className="text-center py-4">
                    Loading more applicants...
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">No applicants found!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DemoAppList;

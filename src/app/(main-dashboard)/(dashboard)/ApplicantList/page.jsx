/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ToggleGroupComponent from "../JobList/components/ToggleGroup";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { House } from "lucide-react";
import { useSession } from "next-auth/react";
import ApplicantsTable from "../JobList/components/test/ApplicantsTable";
import GridListTooltip from "@/components/GridListTooltip";
import JobApplicantsCards from "../JobList/components/jobApplicantsCards";
import { ApplicantFilterSheet } from "@/components/filters/ApplicantFilterSheet";
import ApplicantDetails from "./ApplicantDetails/page";
import { Button } from "@/components/ui/button";
import {
  fetchApplicantProfiles,
  fetchHiringStages,
  fetchJobApplications,
  filterApplicants,
  transformApplicantData,
} from "./actions/utils";

const HOME_PAGE_ITEMS = 6;

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

const DemoAppList = ({ inHome = false }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const accessToken = session?.access_token;
  const orgId = session?.organizationId;

  const observerRef = useRef(null);
  const loadingRef = useRef(null);
  const [jobApplications, setJobApplications] = useState([]);
  const [hiringStages, setHiringStages] = useState([]);
  const [applicantProfiles, setApplicantProfiles] = useState({});
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const [currentApplicant, setCurrentApplicant] = useState(null);
  const [selectedJobApplicationId, setSelectedJobApplicationId] =
    useState(null);
  const [selectedApplicationStatusId, setSelectedApplicationStatusId] =
    useState(null);
  const [selectedApplicationStatus, setSelectedApplicationStatus] =
    useState(null);
  const [selectedStatus, setSelectedStatus] = useState("applied");
  const [selectedStep, setSelectedStep] = useState("");
  const [viewMode, setViewMode] = useState("card");
  const [viewCount, setViewCount] = useState(1);
  const [filters, setFilters] = useState({
    searchQuery: "",
    selectedJobRole: "all",
    selectedTime: "all",
  });

  // job applications
  const getJobApplications = async () => {
    try {
      const data = await fetchJobApplications(orgId, accessToken, page);

      if (page === 1) {
        setJobApplications(data.docs || []);
      } else {
        setJobApplications((prev) => [...prev, ...(data.docs || [])]);
      }
      setHasMore(data.hasNextPage || false);

      if (inHome) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // applicant profiles
  const getApplicantProfiles = async (applicantIds) => {
    setIsLoadingProfiles(true);
    try {
      const profiles = await fetchApplicantProfiles(applicantIds, accessToken);
      setApplicantProfiles((prev) => ({
        ...prev,
        ...Object.fromEntries(profiles.map(({ id, profile }) => [id, profile])),
      }));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoadingProfiles(false);
    }
  };

  // hiring stages
  const getHiringStages = async () => {
    try {
      const data = await fetchHiringStages(orgId, accessToken);
      setHiringStages(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Intersection Observer
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoadingProfiles) {
        setPage((prev) => prev + 1);
      }
    },
    [hasMore, isLoadingProfiles]
  );

  useEffect(() => {
    if (inHome) return;

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

  // data fetching
  useEffect(() => {
    if (orgId && accessToken) {
      getJobApplications();
      getHiringStages();
    }
  }, [orgId, accessToken, page]);

  useEffect(() => {
    const newApplicantIds = jobApplications
      .map((app) => app?.applicant?.id)
      .filter((id) => !applicantProfiles[id]);

    if (newApplicantIds.length > 0) {
      getApplicantProfiles(newApplicantIds);
    }
  }, [jobApplications]);

  // applicants data
  const transformedApplicants = jobApplications
    .map((application) =>
      transformApplicantData(
        application,
        applicantProfiles[application?.applicant?.id],
        applicantProfiles
      )
    )
    .filter(Boolean);

  // filter applicants
  const hiringSteps = hiringStages.docs
    ?.sort((a, b) => a.order - b.order)
    .map((stage) => stage.title);

  const filteredApplicants = filterApplicants(
    transformedApplicants,
    filters,
    selectedStatus,
    selectedStep
  );

  console.log("Filtered applicants:: ", filteredApplicants);

  const handleViewDetails = (
    applicant,
    applicantProfileID,
    jobApplicationId,
    applicationStatusId,
    applicationStatus
  ) => {
    setCurrentApplicant(applicant);
    setSelectedApplicantId(applicantProfileID);
    setSelectedJobApplicationId(jobApplicationId);
    setSelectedApplicationStatusId(applicationStatusId);
    setSelectedApplicationStatus(applicationStatus);
  };

  console.log("Current applicant :: ", currentApplicant);

  if (
    selectedApplicantId ||
    selectedJobApplicationId ||
    selectedApplicationStatusId
  ) {
    // applicant-details
    return (
      <ApplicantDetails
        currentApplicant={currentApplicant}
        applicantId={selectedApplicantId}
        jobApplicationId={selectedJobApplicationId}
        applicationStatus={selectedApplicationStatus}
        applicationStatusId={selectedApplicationStatusId}
        hiringStages={hiringStages}
      />
    );
  }

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

  const handleUpdateApplication = (updatedApplication) => {
    setJobApplications((prevApplications) => {
      return prevApplications.map((application) => {
        if (application.applicant === updatedApplication.id) {
          return {
            ...application,
            applicationStatus: {
              ...application.applicationStatus,
              docs: [
                {
                  ...application.applicationStatus?.docs?.[0],
                  status: updatedApplication.applicationStatus,
                  hiringStage: updatedApplication.hiringStep.id,
                },
              ],
            },
          };
        }
        return application;
      });
    });
  };

  // console.log("filtered applicants :: ", filteredApplicants);
  // console.log("transformed Applicants :: ", transformedApplicants)

  return (
    <>
      {!inHome && (
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <House className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/ApplicantList">
                Applicants List
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}

      <div className="space-y-6">
        <div className="flex-1">
          {!inHome && (
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
          )}

          {isLoadingProfiles && transformedApplicants.length === 0 ? (
            <div className="text-center p-8">Loading applicant profiles...</div>
          ) : filteredApplicants.length > 0 ? (
            <div>
              {viewMode === "list" ? (
                <ApplicantsTable
                  applications={filteredApplicants}
                  onUpdateApplicant={handleUpdateApplication}
                  calculateTotalExperience={calculateTotalExperience}
                  handleViewDetails={handleViewDetails}
                  viewCount={viewCount}
                  setViewCount={setViewCount}
                  maxViews={Infinity}
                  hiringStages={hiringStages}
                />
              ) : (
                <>
                  <JobApplicantsCards
                    currentPaginatedApplicants={
                      inHome
                        ? filteredApplicants.slice(0, HOME_PAGE_ITEMS)
                        : filteredApplicants
                    }
                    calculateTotalExperience={calculateTotalExperience}
                    handleViewDetails={handleViewDetails}
                    socialMediaIcons={socialMediaIcons}
                    viewCount={viewCount}
                    setViewCount={setViewCount}
                    maxViews={Infinity}
                    hiringStages={hiringStages}
                    inHome={inHome}
                  />

                  {inHome && (
                    <Button
                      onClick={() => router.push("/ApplicantList")}
                      className="!mt-4 float-right"
                      size="sm"
                    >
                      See All Applications
                    </Button>
                  )}
                </>
              )}

              {/* loading and observer target */}
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

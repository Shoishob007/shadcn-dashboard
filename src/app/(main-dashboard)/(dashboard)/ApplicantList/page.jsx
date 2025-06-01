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
import { getSafeValue } from "@/lib/helper";
import ApplicantDetails from "./ApplicantDetails/page";
import { Button } from "@/components/ui/button";

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

  // Refs for infinite scrolling
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

  // job applications fetch
  const fetchJobApplications = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications?where[jobDetails.job.organization][equals]=${orgId}&page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();

      // new applications to existing
      if (page === 1) {
        setJobApplications(data.docs || []);
      } else {
        setJobApplications((prev) => [...prev, ...(data.docs || [])]);
      }
      setHasMore(data.hasNextPage || false);

      // If it's the home page, disabling infinite scroll after the first fetch
      if (inHome) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching job applications:", error);
    }
  };

  // applicant profiles
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

      // applicantProfiles state
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
    if (inHome) {
      return;
    }

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

  // initial job applications
  useEffect(() => {
    if (orgId && accessToken) {
      fetchJobApplications();
    }
  }, [orgId, accessToken, page]);

  // applicant profiles for new applications
  useEffect(() => {
    const newApplicantIds = jobApplications
      .map((app) => app?.applicant?.id)
      .filter((id) => !applicantProfiles[id]);

    if (newApplicantIds.length > 0) {
      fetchApplicantProfiles(newApplicantIds);
    }
  }, [jobApplications]);

  // hiring stages for the company
  const fetchHiringStages = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hiring-stages?where[organization.id][equals]=${orgId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setHiringStages(data);
      // console.log("Hiring Stages :: ", data);
    } catch (error) {
      console.error("Error fetching hiring stages :", error);
    }
  };

  useEffect(() => {
    fetchHiringStages();
  }, [orgId, accessToken]);

  // transforming applicant data
  const transformedApplicants = jobApplications
    .map((application) => {
      // console.log("applicatiosn :: ", application.applicant?.cv);
      const profile = applicantProfiles[application?.applicant?.id];
      if (!profile) return null;
      // console.log("profile  ::: ", profile);

      const latestStatus =
        application.applicationStatus?.docs?.[0]?.status || "applied";
      const applicationId = application.applicationStatus?.docs?.[0]?.id;
      const cvUrl = profile?.cv?.url
        ? `${process.env.NEXT_PUBLIC_API_URL}${profile?.cv?.url}`
        : null;
      const profilePicture = `${process.env.NEXT_PUBLIC_API_URL}${profile?.img?.url}`;

      return {
        id: application.id,
        applicantProfileID: getSafeValue(application?.applicant?.id),
        name: getSafeValue(profile.name, "N/A"),
        CVScore: getSafeValue(profile.CVScore, profile?.cv ? 75 : 0),
        CV: cvUrl,
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
          pictureUrl: getSafeValue(profilePicture),
          websiteUrl: getSafeValue(profile?.applicantWebsiteUrl),
        },
        jobTitle: getSafeValue(application.jobDetails?.job?.title, "N/A"),
        jobRole: getSafeValue(
          application.jobDetails?.jobRole?.[0]?.title,
          "N/A"
        ),
        applicationStatus: latestStatus,
        applicationId: applicationId,
        hiringStep: application.applicationStatus?.docs[0]?.hiringStage,
        createdAt: getSafeValue(application.createdAt),
      };
    })
    .filter(Boolean);

  // Filter applicants
  const hiringSteps = hiringStages.docs
    ?.sort((a, b) => a.order - b.order)
    .map((stage) => stage.title);

  // console.log("Transformed Apps :: ", transformedApplicants);

  const filteredApplicants = transformedApplicants.filter((applicant) => {
    // console.log("applicant in the filer logic :: ", applicant?.name);
    let statusMatch = false;

    if (!selectedStatus) {
      statusMatch =
        applicant.applicationStatus === "applied" ||
        applicant.applicationStatus === "hired" ||
        applicant.applicationStatus === "rejected" ||
        applicant.applicationStatus === "shortlisted";
    } else if (selectedStatus === "applied") {
      statusMatch =
        applicant.applicationStatus === "applied" ||
        applicant.applicationStatus === "hired" ||
        applicant.applicationStatus === "rejected" ||
        applicant.applicationStatus === "shortlisted";
    } else if (selectedStatus === "hired") {
      statusMatch = applicant.applicationStatus === "hired";
    } else if (selectedStatus === "rejected") {
      statusMatch = applicant.applicationStatus === "rejected";
    } else if (selectedStatus === "shortlisted") {
      if (selectedStep === "all") {
        statusMatch = applicant.applicationStatus === "shortlisted";
      } else {
        statusMatch =
          applicant.applicationStatus === "shortlisted" &&
          applicant.hiringStep?.title === selectedStep;
      }
    }

    if (!statusMatch) {
      return false;
    }

    // filters
    if (
      filters.searchQuery &&
      !applicant?.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
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

  if (
    selectedApplicantId ||
    selectedJobApplicationId ||
    selectedApplicationStatusId
  ) {
    // applicant-details component if an applicant is selected
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
    // Update the jobApplications state with the new applicant data
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

  console.log("filtered applicants :: ", filteredApplicants);
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

                  {/* Button to see all apps */}
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

              {/* loading indicator and observer target */}
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

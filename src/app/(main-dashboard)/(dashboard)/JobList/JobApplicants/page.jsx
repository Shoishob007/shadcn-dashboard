/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import JobInfoCard from "../../ApplicantList/components/JobInfoCard";
import ToggleGroupComponent from "../components/ToggleGroup";
import JobApplicantsCards from "../components/jobApplicantsCards";
import ApplicantsTable from "../components/test/ApplicantsTable";
import { orgSettings } from "../../ApplicantList/components/org-settings";
import GridListTooltip from "@/components/GridListTooltip";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { House } from "lucide-react";
import { useSession } from "next-auth/react";
import ApplicantDetails from "../../ApplicantList/ApplicantDetails/page";
import {
  calculateTotalExperience,
  fetchApplicantProfiles,
  fetchHiringStages,
  fetchJobApplications,
  transformApplications,
  transformJobInfo,
} from "./actions/page";

const APPLICANTS_PER_PAGE = 10;

const socialMediaIcons = {
  linkedin: FaLinkedin,
  google: FaGoogle,
  facebook: FaFacebook,
};

const DemoApplicants = () => {
  const [jobComponent, setJobComponent] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const { data: session } = useSession();
  const accessToken = session?.access_token;
  const organizationID = session?.organizationId;

  const [jobApplications, setJobApplications] = useState([]);
  const [hiringStages, setHiringStages] = useState([]);
  const [applicantProfiles, setApplicantProfiles] = useState({});
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(false);
  const [hasMoreApplicants, setHasMoreApplicants] = useState(true);
  const [page, setPage] = useState(1);

  const [organizationDetails, setOrganizationDetails] = useState(null);
  const [isLoadingOrg, setIsLoadingOrg] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState("applied");
  const [selectedStep, setSelectedStep] = useState("");
  const [currentJobInfo, setCurrentJobInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [viewMode, setViewMode] = useState("card");
  const [viewCount, setViewCount] = useState(
    orgSettings.docs[0]?.numberOfCvViewed
  );
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const [currentApplicant, setCurrentApplicant] = useState(null);
  const [selectedJobApplicationId, setSelectedJobApplicationId] =
    useState(null);
  const [selectedApplicationStatus, setSelectedApplicationStatus] =
    useState(null);
  const [selectedApplicationStatusId, setSelectedApplicationStatusId] =
    useState(null);
  const maxViews = orgSettings.docs[0]?.subscriptionId === 1 ? 3 : Infinity;

  // job applications
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJobApplications(jobId, accessToken, page);

        if (page === 1) {
          setJobApplications(data.docs || []);
        } else {
          setJobApplications((prev) => [...prev, ...(data.docs || [])]);
        }
        setCurrentJobInfo(data.docs[0]?.jobDetails);

        if (data.docs[0]?.jobDetails?.job?.organization) {
          const orgData = await fetchOrganizationDetails(
            data.docs[0].jobDetails.job.organization,
            accessToken
          );
          setOrganizationDetails(orgData);
        }

        setHasMoreApplicants(data.docs.length === APPLICANTS_PER_PAGE);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (jobId) {
      fetchData();
    }
  }, [jobId, accessToken, page]);

  // more applicant when scrolling
  useEffect(() => {
    const fetchProfiles = async () => {
      const startIndex = (page - 1) * APPLICANTS_PER_PAGE;
      const applicantIdsToFetch = jobApplications
        .slice(startIndex, startIndex + APPLICANTS_PER_PAGE)
        .map((app) => app.applicant.id)
        .filter((id) => !applicantProfiles[id]);

      if (applicantIdsToFetch.length > 0) {
        setIsLoadingProfiles(true);
        try {
          const profiles = await fetchApplicantProfiles(
            applicantIdsToFetch,
            accessToken
          );
          setApplicantProfiles((prev) => ({
            ...prev,
            ...Object.fromEntries(
              profiles.map(({ id, profile }) => [id, profile])
            ),
          }));
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setIsLoadingProfiles(false);
        }
      } else {
        setIsLoadingProfiles(false);
      }
    };

    fetchProfiles();
  }, [page, jobApplications]);

  // hiring stages
  useEffect(() => {
    const fetchStages = async () => {
      try {
        const data = await fetchHiringStages(organizationID, accessToken);
        setHiringStages(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (organizationID) {
      fetchStages();
    }
  }, [organizationID]);

  // Infinite scroll
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      hasMoreApplicants &&
      !isLoadingProfiles
    ) {
      setPage((prev) => prev + 1);
    }
  }, [hasMoreApplicants, isLoadingProfiles]);

  // Scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleViewDetails = (
    application,
    applicantProfileID,
    jobApplicationId,
    applicationStatusId,
    applicationStatus
  ) => {
    setCurrentApplicant(application);
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
    return (
      <ApplicantDetails
        currentApplicant={currentApplicant}
        applicantId={selectedApplicantId}
        jobApplicationId={selectedJobApplicationId}
        applicationStatus={selectedApplicationStatus}
        applicationStatusId={selectedApplicationStatusId}
        hiringStages={hiringStages}
        jobComponent={jobComponent}
      />
    );
  }

  if (isLoadingProfiles || isLoadingOrg) {
    return <div className="text-center p-8">Loading...</div>;
  }

  const hiringSteps = hiringStages?.docs
    ?.sort((a, b) => a.order - b.order)
    .map((stage) => stage.title);

  const transformedApplications = transformApplications(
    jobApplications,
    applicantProfiles
  );
  const transformedJobInfo = transformJobInfo(
    currentJobInfo,
    organizationDetails
  );

  const filteredApplications = transformedApplications.filter((application) => {
    if (!selectedStatus) {
      return (
        application.applicationStatus === "applied" ||
        application.applicationStatus === "hired" ||
        application.applicationStatus === "rejected" ||
        application.applicationStatus === "shortlisted"
      );
    } else if (selectedStatus === "applied") {
      return (
        application.applicationStatus === "applied" ||
        application.applicationStatus === "shortlisted" ||
        application.applicationStatus === "hired" ||
        application.applicationStatus === "rejected"
      );
    } else if (selectedStatus === "hired") {
      return application.applicationStatus === "hired";
    } else if (selectedStatus === "rejected") {
      return application.applicationStatus === "rejected";
    } else if (selectedStatus === "shortlisted") {
      if (selectedStep === "all") {
        return application.applicationStatus === "shortlisted";
      } else {
        return (
          application.applicationStatus === "shortlisted" &&
          application.hiringStep?.title === selectedStep
        );
      }
    }
    return false;
  });

  const handleUpdateApplication = (updatedApplication) => {
    setJobApplications((prevApplications) => {
      return prevApplications.map((application) => {
        if (application.applicant.id === updatedApplication.id) {
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
            <BreadcrumbLink href="/JobList">Job List</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/JobApplicants">
              Job Applicants
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-6">
        <JobInfoCard
          applicants={transformedApplications}
          job={transformedJobInfo}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />

        {!isEditing && (
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <ToggleGroupComponent
                steps={hiringSteps}
                selectedStep={selectedStep}
                selectedStatus={selectedStatus}
                setSelectedStep={setSelectedStep}
                setSelectedStatus={setSelectedStatus}
              />
              <div className="mr-2 flex items-center shadow-md">
                <GridListTooltip
                  setViewMode={setViewMode}
                  isListView={viewMode === "list"}
                />
              </div>
            </div>

            {isLoadingProfiles && transformedApplications.length === 0 ? (
              <div className="text-center p-8">
                Loading applicant profiles...
              </div>
            ) : filteredApplications.length > 0 ? (
              viewMode === "list" ? (
                <ApplicantsTable
                  applications={filteredApplications}
                  onUpdateApplicant={handleUpdateApplication}
                  calculateTotalExperience={calculateTotalExperience}
                  handleViewDetails={handleViewDetails}
                  viewCount={viewCount}
                  setViewCount={setViewCount}
                  maxViews={Infinity}
                  hiringStages={hiringStages}
                />
              ) : (
                <JobApplicantsCards
                  currentPaginatedApplicants={filteredApplications}
                  calculateTotalExperience={calculateTotalExperience}
                  handleViewDetails={handleViewDetails}
                  socialMediaIcons={socialMediaIcons}
                  viewCount={viewCount}
                  setViewCount={setViewCount}
                  maxViews={maxViews}
                  hiringStages={hiringStages}
                />
              )
            ) : (
              <p className="text-center text-gray-500">No applicants found!</p>
            )}

            {isLoadingProfiles && hasMoreApplicants && (
              <div className="text-center p-4">Loading more applicants...</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DemoApplicants;

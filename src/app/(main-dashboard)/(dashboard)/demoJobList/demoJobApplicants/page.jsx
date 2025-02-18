/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import JobInfoCard from "../../demoAppList/components/JobInfoCard";
import ToggleGroupComponent from "../components/ToggleGroup";
import JobApplicantsCards from "../components/jobApplicantsCards";
import ApplicantsTable from "../components/test/ApplicantsTable";
import { orgSettings } from "../../demoAppList/components/org-settings";
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

const APPLICANTS_PER_PAGE = 10;

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

const DemoApplicants = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const { data: session } = useSession();
  const accessToken = session?.access_token;
  const organizationID = session?.organizationId;

  // State for job applications and applicants
  const [jobApplications, setJobApplications] = useState([]);
  const [hiringStages, setHiringStages] = useState([]);
  const [applicantProfiles, setApplicantProfiles] = useState({});
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(false);
  const [hasMoreApplicants, setHasMoreApplicants] = useState(true);
  const [page, setPage] = useState(1);

  // State for organization details
  const [organizationDetails, setOrganizationDetails] = useState(null);
  const [isLoadingOrg, setIsLoadingOrg] = useState(false);

  // UI states
  const [selectedStatus, setSelectedStatus] = useState("applied");
  const [selectedStep, setSelectedStep] = useState("");
  const [currentJobInfo, setCurrentJobInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [viewMode, setViewMode] = useState("card");
  const [viewCount, setViewCount] = useState(
    orgSettings.docs[0]?.numberOfCvViewed
  );
  const maxViews = orgSettings.docs[0]?.subscriptionId === 1 ? 3 : Infinity;

  // Fetch job applications
  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications?where[jobDetails.job.id][equals]=${jobId}&limit=${APPLICANTS_PER_PAGE}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        // console.log("Data response for the job applications:", data);

        if (page === 1) {
          setJobApplications(data.docs || []);
        } else {
          setJobApplications((prev) => [...prev, ...(data.docs || [])]);
        }
        setCurrentJobInfo(data.docs[0]?.jobDetails);

        if (data.docs[0]?.jobDetails?.job?.organization) {
          fetchOrganizationDetails(data.docs[0].jobDetails.job.organization);
        }

        // Check if there are more applicants to load
        setHasMoreApplicants(data.docs.length === APPLICANTS_PER_PAGE);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    if (jobId) {
      fetchJobApplications();
    }
  }, [jobId, accessToken, page]);

  // Fetch organization details
  const fetchOrganizationDetails = async (orgId) => {
    setIsLoadingOrg(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${orgId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setOrganizationDetails(data);
    } catch (error) {
      console.error("Error fetching organization details:", error);
    } finally {
      setIsLoadingOrg(false);
    }
  };

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

  // more applicant profiles when scrolling or changing page
  useEffect(() => {
    const startIndex = (page - 1) * APPLICANTS_PER_PAGE;
    const applicantIdsToFetch = jobApplications
      .slice(startIndex, startIndex + APPLICANTS_PER_PAGE)
      .map((app) => app.applicant)
      .filter((id) => !applicantProfiles[id]);

    if (applicantIdsToFetch.length > 0) {
      fetchApplicantProfiles(applicantIdsToFetch);
    }
  }, [page, jobApplications]);

  console.log("job Applications :: ", jobApplications);

  // fetching hiring stages for the company
  const fetchHiringStages = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hiring-stages?where[organization.id]=${organizationID}`,
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
  }, [organizationID]);

  // Transforming applicant data to match the component's expected format
  const transformedApplications = jobApplications
    .map((application) => {
      const profile = applicantProfiles[application.applicant];
      if (!profile) return null;

      // console.log("profile :: ", profile);
      const latestStatus =
        application.applicationStatus?.docs?.[0]?.status || "applied";
      const applicationId = application.applicationStatus?.docs?.[0]?.id;
      console.log("jobApplication :: ", application.id);

      // console.log("latestStatus :: ", latestStatus);

      return {
        id: application.id,
        name: profile.name || "N/A",
        CVScore: profile.CVScore || (profile.cv ? 75 : 0),
        CV: profile.cv,
        certifications: profile.trainingAndCertifications || [],
        experiences: profile.experiences || [],
        socialLinks: profile.socialLinks || [],
        education: profile.educations || [],
        skills: profile.skills || [],
        contactInfo: {
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
        },
        applicant: {
          pictureUrl: profile.img?.url || null,
          websiteUrl: profile.applicantWebsiteUrl || null,
        },
        applicationStatus: latestStatus,
        applicationId: applicationId,
        hiringStep: application.applicationStatus?.docs[0]?.hiringStage,
      };
    })
    .filter(Boolean);

  // Infinite scroll handler
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      hasMoreApplicants &&
      !isLoadingProfiles
    ) {
      setPage((prev) => prev + 1); // Loading the next page
    }
  };

  // scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // job info
  const transformJobInfo = (jobDetails) => {
    if (!jobDetails) return null;

    console.log("job details ::: ", jobDetails)

    return {
      title: jobDetails.job.title,
      job: {
        id: jobDetails.job.id,
        organization: {
          id: jobDetails.job.organization,
          orgName: organizationDetails?.orgName || "Organization Name",
          orgTagline: organizationDetails?.orgTagline || "",
          orgAddress: organizationDetails?.orgAddress || "",
          orgEmail: organizationDetails?.orgEmail || "",
          orgPhone: organizationDetails?.orgPhone || "",
          orgWebsiteUrl: organizationDetails?.orgWebsiteUrl || "",
          img: organizationDetails?.img || null,
          socialLinks: organizationDetails?.socialLinks || [],
        },
      },
      jobType: jobDetails.jobType?.id || "",
      employeeType: jobDetails.employeeType?.id || "",
      jobTypeTitle: jobDetails.jobType?.title || "",
      employeeTypeTitle: jobDetails.employeeType?.title || "",
      jobRole: jobDetails.jobRole?.[0]?.title || "",
      designation: jobDetails.designation?.title || "",
      location: jobDetails.location || "",
      salary: jobDetails.salary || "",
      description: jobDetails.description || "",
      requirements: jobDetails.requirements || "",
      employeeBenefits: jobDetails.employeeBenefits || "",
      skills: jobDetails?.skills || [],
      degreeLevel: jobDetails?.degreeLevel || [],
      fieldOfStudy: jobDetails?.fieldOfStudy || [],
      deadline: jobDetails.deadline || "",
      createdAt: jobDetails.createdAt || "",
      industry:
        organizationDetails?.industryType
          ?.map((type) => type.title)
          .join(", ") || "",
      establishedYear: organizationDetails?.orgEstablishedYear || "",
    };
  };

  const handleViewDetails = (id) => {
    router.push(`/demoAppList/demoAppDetails?id=${id}`);
  };

  if (!currentJobInfo || isLoadingOrg) {
    return <div className="text-center p-8">Loading...</div>;
  }

  const hiringSteps = hiringStages.docs
    .sort((a, b) => a.order - b.order)
    .map((stage) => stage.title);

  const filteredApplications = transformedApplications.filter((application) => {
    if (selectedStatus === "applied") {
      return application.applicationStatus === "applied";
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

  console.log("filteredApplications :: ", filteredApplications);
  // console.log("Hiring stages :: ",hiringStages)

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
            <BreadcrumbLink href="/demoJobList">Job List</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/demoJobApplicants">
              Job Applicants
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-6">
        <JobInfoCard
          applicants={transformedApplications}
          job={transformJobInfo(currentJobInfo)}
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

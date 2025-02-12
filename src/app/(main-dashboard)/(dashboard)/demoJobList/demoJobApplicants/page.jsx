/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useEffect, useState } from "react";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import JobInfoCard from "../../demoAppList/components/JobInfoCard";
import OurPagination from "@/components/Pagination";
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
  const { data: session } = useSession();
  const accessToken = session?.access_token;

  // State for job applications and applicants
  const [jobApplications, setJobApplications] = useState([]);
  const [applicantProfiles, setApplicantProfiles] = useState({});
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(false);
  const [hasMoreApplicants, setHasMoreApplicants] = useState(true);

  // state for organization details
  const [organizationDetails, setOrganizationDetails] = useState(null);
  const [isLoadingOrg, setIsLoadingOrg] = useState(false);

  // UI states
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("applied");
  const [selectedStep, setSelectedStep] = useState("");
  const [currentJobInfo, setCurrentJobInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [viewMode, setViewMode] = useState("card");
  const [viewCount, setViewCount] = useState(
    orgSettings.docs[0]?.numberOfCvViewed
  );
  const maxViews = orgSettings.docs[0]?.subscriptionId === 1 ? 3 : Infinity;

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
        console.log("organization details data:: ", data);

      setOrganizationDetails(data);
    } catch (error) {
      console.error("Error fetching organization details:", error);
    } finally {
      setIsLoadingOrg(false);
    }
  };

  // console.log("organization details :: ", organizationDetails)

  // Fetch job applications
  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications?where[jobDetails.job.id][equals]=${jobId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        setJobApplications(data.docs || []);
        setCurrentJobInfo(data.docs[0]?.jobDetails);

        if (data.docs[0]?.jobDetails?.job?.organization) {
          fetchOrganizationDetails(data.docs[0].jobDetails.job.organization);
        }
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    if (jobId) {
      fetchJobApplications();
    }
  }, [jobId, accessToken]);

  // console.log("jobApplications :: ", jobApplications);
    // console.log("currentJobInfo :: ", currentJobInfo);


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

  // console.log("applicantsProfile :: ", applicantProfiles);

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
      console.log("Profile ::: ", profile)
      if (!profile) return null;

      return {
        id: application.applicant,
        name: profile.name || "N/A",
        status: application.applicationStatus?.status || "applied",
        steps: application.applicationStatus?.currentStep,
        schedule: {
          date: application.applicationStatus?.scheduleDate || null,
          time: application.applicationStatus?.scheduleTime || null,
        },
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
      };
    })
    .filter(Boolean);

  const transformJobInfo = (jobDetails) => {
    if (!jobDetails) return null;

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
      jobType: jobDetails.jobType?.title || "",
      employeeType: jobDetails.employeeType?.title || "",
      jobRole: jobDetails.jobRole?.[0]?.title || "",
      designation: jobDetails.designation?.title || "",
      location: jobDetails.location || "",
      salary: jobDetails.salary || "",
      description: jobDetails.description || "",
      requirements: jobDetails.requirements || "",
      employeeBenefits: jobDetails.employeeBenefits || "",
      deadline: jobDetails.deadline || "",
      createdAt : jobDetails.createdAt || "",
      industry:
        organizationDetails?.industryType
          ?.map((type) => type.title)
          .join(", ") || "",
      establishedYear: organizationDetails?.orgEstablishedYear || "",
    };
  };

  // Pagination handling
  const currentPaginatedApplicants = transformedApplicants.slice(
    (currentPage - 1) * APPLICANTS_PER_PAGE,
    currentPage * APPLICANTS_PER_PAGE
  );

  // console.log("Current Paginated applicants :: ", currentPaginatedApplicants);

  const totalPages = Math.ceil(
    transformedApplicants.length / APPLICANTS_PER_PAGE
  );

  const handleViewDetails = (id) => {
    router.push(`/demoAppList/demoAppDetails?id=${id}`);
  };

  if (!currentJobInfo || isLoadingOrg) {
    return <div className="text-center p-8">Loading...</div>;
  }

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
          applicants={transformedApplicants}
          job={transformJobInfo(currentJobInfo)}
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
              <div className="mr-2 flex items-center shadow-md">
                <GridListTooltip
                  setViewMode={setViewMode}
                  isListView={viewMode === "list"}
                />
              </div>
            </div>

            {isLoadingProfiles && currentPaginatedApplicants.length === 0 ? (
              <div className="text-center p-8">
                Loading applicant profiles...
              </div>
            ) : currentPaginatedApplicants.length > 0 ? (
              viewMode === "list" ? (
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
        )}

        <OurPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default DemoApplicants;
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  House,
  SquarePen,
  Users,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  GraduationCap,
  Building,
  Globe,
  Phone,
  Mail,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import qs from "qs";
import CreateJobForm from "../../JobCreateForm/components/CreateJobForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const JobDetailsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const jobId = searchParams.get("jobId");
  const [currentJobInfo, setCurrentJobInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const accessToken = session?.access_token;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (!accessToken) throw new Error("No access token available");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-details?limit=1000`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch job details");

        const data = await response.json();

        //finding matched job
        const matchedJob = data?.docs?.find((doc) => doc?.job?.id === jobId);
        console.log("Matched Job :: ", matchedJob);

        if (matchedJob) {
          setCurrentJobInfo(matchedJob);
        } else {
          console.error("No matching job found for jobId:", jobId);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    if (jobId) fetchJobs();
  }, [jobId, session, accessToken]);

  if (!currentJobInfo) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 dark:text-gray-300">
          Loading job details...
        </p>
      </div>
    );
  }

  const handleViewApplicantList = () => {
    router.push(`/JobList/JobApplicants?jobId=${jobId}`);
  };

  if (isEditing) {
    return (
      <CreateJobForm
      jobDetailsId = {currentJobInfo.id}
        jobId={jobId}
        initialData={currentJobInfo}
        isEditing={isEditing}
        onClose={() => setIsEditing(false)}
      />
    );
  }

  const job = currentJobInfo;

  const formatDateLong = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper component for rich text display
  const RichTextDisplay = ({ content, fallback = "Not specified" }) => {
    if (!content)
      return <p className="text-gray-500 dark:text-gray-400">{fallback}</p>;

    // if content is HTML
    if (content.includes("<") && content.includes(">")) {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }

    return <p>{content}</p>;
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
            <BreadcrumbLink href="/JobList/JobDetails">
              {job?.job?.title || "Job Details"}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-screen bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        {/* Header Section */}
        <div className="flex border-b-2 dark:border-gray-500 items-center justify-between px-4 sm:px-6 pb-4">
          <header className="flex items-center text-xs sm:text-sm gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={`${process.env.NEXT_PUBLIC_API_URL}${job?.job?.organization?.img?.url}`}
                alt={job?.job?.organization?.orgName}
              />
              <AvatarFallback className="font-semibold text-xl text-yellow-600 bg-yellow-100">
                {job?.job?.organization?.orgName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                {job?.job?.title || "N/A"}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 font-medium text-base">
                {job?.job?.organization?.orgName || "N/A"}
              </p>
            </div>
          </header>
          <div className="flex flex-col gap-2">
            <div
              className="flex gap-2 items-center border p-2 rounded-md dark:border-gray-300 cursor-pointer w-fit hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsEditing(true)}
            >
              <SquarePen className="dark:text-gray-300" size={16} />
              <span className="text-xs sm:text-sm font-medium">Edit Job</span>
            </div>
            <div
              className="flex gap-2 items-center border p-2 rounded-md dark:border-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={handleViewApplicantList}
            >
              <Users className="dark:text-gray-300" size={16} />
              <span className="text-xs sm:text-sm font-medium">
                View Applicants
              </span>
            </div>
          </div>
        </div>

        {/* Job Overview Cards */}
        <div className="px-6 sm:px-10 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Building className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800 dark:text-blue-300">
                  Job Type
                </h3>
              </div>
              <p className="text-sm">
                {job?.jobType?.title || "Not specified"}
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-green-800 dark:text-green-300">
                  Employee Type
                </h3>
              </div>
              <p className="text-sm">
                {job?.employeeType?.title || "Not specified"}
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800 dark:text-blue-300">
                  Designation
                </h3>
              </div>
              <p className="text-sm">
                {job?.designation?.title || "Not specified"}
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-green-800 dark:text-green-300">
                  Salary
                </h3>
              </div>
              <p className="text-sm">
                {job?.salary ? `${job.salary} BDT` : "Not specified"}
              </p>
            </div>
          </div>

          {/* Job Context */}
          <section className="mb-6 text-sm">
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Job Context
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="leading-relaxed">
                {job?.description || "No description available"}
              </p>
            </div>
          </section>

          {/* Requirements */}
          <section className="mb-6 text-sm">
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Requirements for the role
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg prose dark:prose-invert max-w-none">
              <RichTextDisplay content={job?.requirements} />
            </div>
          </section>

          {/* Employee Benefits */}
          <section className="mb-6 text-sm">
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Employee Benefits
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg prose dark:prose-invert max-w-none">
              <RichTextDisplay
                content={job?.employeeBenefits}
                fallback="No benefits specified"
              />
            </div>
          </section>

          {/* Skills */}
          <section className="mb-6 text-sm">
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Mandatory Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {job?.skills?.length > 0 ? (
                job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill?.title}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 dark:text-gray-400">
                  Not specified
                </span>
              )}
            </div>
          </section>

          {/* Education Requirements */}
          <section className="mb-6 text-sm">
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Education Requirements
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Degree Level
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job?.degreeLevel?.length > 0 ? (
                      job.degreeLevel.map((degree, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-semibold"
                        >
                          {degree?.title}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">
                        Not specified
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Field of Study
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job?.fieldOfStudy?.length > 0 ? (
                      job.fieldOfStudy.map((field, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-semibold"
                        >
                          {field?.title}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">
                        Not specified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-6 text-sm">
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Contact Information
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Email:</span>
                  <span>{job?.email || "Not specified"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Phone:</span>
                  <span>{job?.phone || "Not specified"}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Address:</span>
                  <span>{job?.address || "Not specified"}</span>
                  {/* <p className="font-medium">
                    {job?.address || "Location N/A"}
                  </p> */}
                </div>
              </div>
              {job?.contactInfo && (
                <div className="mt-4">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Contact Info
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {job.contactInfo}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Job Status and Dates */}
          <section className="mb-6 text-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Job Timeline & Status
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-red-500" />
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    Application Deadline
                  </p>
                  <p className="text-red-600 dark:text-red-400 font-semibold">
                    {formatDateLong(job?.deadline) || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-500" />
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    Posted On
                  </p>
                  <p className="text-green-600 dark:text-green-400">
                    {formatDateLong(job?.createdAt) || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    Total Applicants
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold">
                    {job?.applicantCount || "0"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    job?.jobStatus ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </p>
                  <p
                    className={`font-semibold ${
                      job?.jobStatus
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {job?.jobStatus ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default JobDetailsPage;

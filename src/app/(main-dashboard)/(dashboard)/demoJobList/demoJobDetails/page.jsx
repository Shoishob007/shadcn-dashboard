"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { House, SquarePen, Users } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
    router.push(`/demoJobList/demoJobApplicants?jobId=${jobId}`);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const job = currentJobInfo;
 console.log("job ", job);
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
            <BreadcrumbLink href="/demoJobList/demoJobDetails">
              {job?.job?.title || "Job Details"}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex border-b-2 dark:border-gray-500 items-center justify-between px-4 sm:px-6 py-4">
          <header className="flex items-center text-xs sm:text-sm">
            <Image
              src={"/default-company-logo.png"}
              alt={"Company Logo"}
              height={64}
              width={64}
              className="rounded-full mr-4"
            />
            <div>
              <h1 className="text-base sm:text-xl font-bold">
                {job?.job?.title || "N/A"}
              </h1>
              <p className="text-gray-700 dark:text-gray-300">
                {job?.jobRole?.map((role) => role.title).join(", ") || "N/A"}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {job?.address || "Location N/A"}
              </p>
            </div>
          </header>
          <div className="flex flex-col gap-2">
            <div
              className="flex gap-2 items-center border p-1 rounded-sm dark:border-gray-300 cursor-pointer w-fit"
              onClick={handleEdit}
            >
              <SquarePen className="dark:text-gray-300" size={16} />
              <span className="text-xs sm:text-sm font-medium">Edit Job</span>
            </div>
            <div
              className="flex gap-2 items-center border p-1 rounded-sm dark:border-gray-300 cursor-pointer"
              onClick={handleViewApplicantList}
            >
              <Users className="dark:text-gray-300" size={16} />
              <span className="text-xs sm:text-sm font-medium">
                View Applicants
              </span>
            </div>
          </div>
        </div>
        <div className="px-6 sm:px-10 py-3">
          <section className="mb-4 text-xs sm:text-sm">
            <h2 className="text-lg font-semibold">Job Context</h2>
            <p>{job?.description || "No description available"}</p>
          </section>
          <section className="mb-4 text-xs sm:text-sm">
            <h2 className="text-base sm:text-lg font-semibold mb-2">
              What will you do?
            </h2>
            <ul className="list-disc list-inside space-y-1">
              {job?.responsibilities?.length > 0 ? (
                job.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <li>Not Specified</li>
              )}
            </ul>
          </section>
          <section className="mb-4 text-xs sm:text-sm">
            <h2 className="text-lg font-semibold">Requirements for the role</h2>
            <ul className="list-disc list-inside space-y-1">
              {job?.requirements?.length > 0 ? (
                job.requirements.map((req, index) => (
                  <>
                    {" "}
                    <li key={index}>{req}</li>
                    <li>
                      {job.degreeLevel && job.degreeLevel.join(" or ")} in{" "}
                      {job.fieldOfStudy && job.fieldOfStudy.join(", ")} or a
                      related field.
                    </li>
                    <li>
                      {job.yearOfExperience && job.yearOfExperience}+ years in
                      {job.jobRole} or a related field.
                    </li>{" "}
                  </>
                ))
              ) : (
                <li>Not Specified</li>
              )}
            </ul>
          </section>
          <section className="mb-4 text-xs sm:text-sm">
            <h2 className="text-base sm:text-lg font-semibold mb-2">
              Mandatory skills
            </h2>
            <ul className="list-disc list-inside space-y-1">
              {job?.skills?.length > 0 ? (
                job.skills.map((item, index) => <li key={index}>{item}</li>)
              ) : (
                <li>Not specified</li>
              )}
            </ul>
          </section>
          <section className="mb-4 text-xs sm:text-sm">
            <h2 className="text-lg font-semibold">Employee Benefits</h2>
            <p>
              {job?.employeeBenefits?.length > 0
                ? job.employeeBenefits.join(", ")
                : "No benefits specified"}
            </p>
          </section>
          <section className="mb-4 text-xs sm:text-sm">
            <h2 className="text-lg font-semibold">Salary</h2>
            <p>{job?.salary ? `${job.salary}BDT` : "Not specified"}</p>
          </section>
          <section className="bg-red-50 dark:bg-red-100 dark:text-gray-600 p-4 rounded-sm text-xs sm:text-sm flex flex-col sm:flex-row space-x-4 items-center sm:items-start justify-evenly">
            <p>
              <strong>Active until:</strong> {job?.deadline || "N/A"}
            </p>
            <p>
              <strong>Published On:</strong> {job?.published || "N/A"}
            </p>
            <p>
              <strong>Applicants:</strong> {job?.applicantCount || "N/A"}
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default JobDetailsPage;

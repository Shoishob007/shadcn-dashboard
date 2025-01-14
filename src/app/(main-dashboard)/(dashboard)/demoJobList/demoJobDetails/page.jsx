/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SquarePen, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { documents as jobDocuments } from "../components/jobData";
import CreateJobForm from "../../demoJobFormCreate/page";
import { useRouter } from "next/navigation";
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
  const jobId = searchParams.get("jobId");
  const [currentJobInfo, setCurrentJobInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (jobId) {
      const matchedJobInfo = jobDocuments.docs.find(
        (doc) => doc.job.id === jobId
      );
      setCurrentJobInfo(matchedJobInfo);
    }
  }, [jobId, currentJobInfo]);

  if (!currentJobInfo && !isEditing) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 dark:text-gray-300">
          Loading job details...
        </p>
      </div>
    );
  }

  const handleViewApplicantList = (jobId) => {
    router.push(`/demoJobList/demoJobApplicants?jobId=${jobId}`);
  };

  if (isEditing) {
    return (
      <CreateJobForm
        jobId={jobId}
        initialData={currentJobInfo}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    );
  }

  const job = currentJobInfo;
  // console.log(job);

  return (
    <>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/demoJobList">Job List</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/demoJobList/demoJobDetails">
              {job.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg">
        <div className="flex border-y-2 dark:border-gray-500 items-center justify-between px-4 sm:px-6 py-4">
          <header className="flex items-center text-xs sm:text-sm">
            <Image
              src={job.job.organization.img.sizes.thumbnail.url}
              alt={job.job.organization.orgName}
              height={64}
              width={64}
              className="rounded-full mr-4"
            />
            <div>
              <h1 className="text-base sm:text-xl font-bold">{job.title}</h1>
              <p className="text-gray-700 dark:text-gray-300">{job.jobRole}</p>
              <p className="text-gray-500 dark:text-gray-400">{job.location}</p>
            </div>
          </header>
          <div className="flex flex-col gap-2">
            <div
              className="flex gap-2 items-center border p-1 rounded-sm dark:border-gray-300 cursor-pointer w-fit"
              onClick={() => setIsEditing(true)}
            >
              <SquarePen className="dark:text-gray-300" size={16} />{" "}
              <span className="text-xs sm:text-sm font-medium">Edit Job</span>
            </div>
            <div
              className="flex gap-2 items-center border p-1 rounded-sm dark:border-gray-300 cursor-pointer"
              onClick={() => handleViewApplicantList(job.job.id)}
            >
              <Users className="dark:text-gray-300" size={16} />{" "}
              <span className="text-xs sm:text-sm font-medium">
                View Applicants
              </span>
            </div>
          </div>
        </div>
        <div className="px-6 sm:px-10 py-3">
          <section className="mb-4 text-xs sm:text-sm">
            <h2 className="text-base sm:text-lg font-semibold mb-2">
              Job Context
            </h2>
            <p>{job.description}</p>
          </section>

          <section className="mb-4 text-xs sm:text-sm">
            <h2 className="text-base sm:text-lg font-semibold mb-2">
              What will you do?
            </h2>
            <ul className="list-disc list-inside space-y-1">
              {job?.responsibilities?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-4 text-xs sm:text-sm">
            <h2 className="text-lg font-semibold mb-2">
              Requirements for the role
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                {job?.degreeLevel?.join(" or ")} in{" "}
                {job?.fieldOfStudy?.join(", ")} or a related field.
              </li>
              <li>{job?.yearOfExperience}+ years in full-stack development.</li>
              {job?.requirements?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-4 text-xs sm:text-sm">
            <h2 className="text-base sm:text-lg font-semibold mb-2">
              Mandatory skills
            </h2>
            <ul className="list-disc list-inside space-y-1">
              {job?.skills?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-4 text-xs sm:text-sm">
            <h2 className="text-base sm:text-lg font-semibold mb-2">
              Employee Benefits
            </h2>
            <ul className="list-disc list-inside space-y-1">
              {job?.employeeBenefits?.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </section>

          <section className="bg-red-50 dark:bg-red-100 dark:text-gray-600 p-4 rounded-sm text-xs sm:text-sm flex flex-col sm:flex-row items-center sm:items-start justify-evenly">
            <p>
              <strong>Active until:</strong> {job?.deadline}
            </p>
            <p>
              <strong>Published On:</strong> {job?.published}
            </p>
            <p>
              <strong>Applicants:</strong> {job?.applicantCount}
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default JobDetailsPage;

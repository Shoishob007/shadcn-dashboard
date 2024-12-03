"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatRelativeDate } from "@/app/utils/formatRelativeDate";
import {
  Briefcase,
  BriefcaseBusiness,
  CalendarDays,
  Clock,
  Dot,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { JobFilters } from "@/components/filters/JobFilters";
import { documents } from "./components/jobData";
import { filterJobs } from "../../../utils/filters";

const JobList = () => {
  const router = useRouter();

  const [filters, setFilters] = useState({
    searchQuery: "",
    status: "all",
    jobRole: "all",
    experienceRange: "all",
    applicantCount: "all",
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const filteredJobs = filterJobs(documents.docs, filters);

  const handleReset = () => {
    setFilters({
      searchQuery: "",
      status: "all",
      jobRole: "all",
      experienceRange: "all",
      applicantCount: "all",
    });
  };

  const handleViewJobDetails = (id) => {
    router.push(`/demoJobList/demoJobDetails?id=${id}`);
  };
  const handleViewApplicantList = () => {
    router.push(`/demoAppList`);
  };

  return (
    <div className="space-y-2">
      <JobFilters
        jobs={documents.docs}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />
      {filteredJobs.length > 0 ? (
        filteredJobs.map((document) => {
          const deadlineDate = new Date(document.deadline);
          const currentDate = new Date();
          const isPastDeadline = currentDate > deadlineDate;
          const diff = formatRelativeDate(document.published);

          return (
            <>
              <Card
                key={document.id}
                className="flex flex-col mx-auto md:flex-row items-center justify-between py-6 md:py-4 px-2 md:px-6 rounded-lg transition-shadow gap-4 md:gap-0 max-w-5xl"
              >
                <div className="flex items-center justify-around gap-4 px-6 md:px-0 md:justify-start w-full md:w-fit">
                  <div className="flex flex-col gap-3 items-center">
                    <div className="flex items-center space-x-3 md:space-x-3">
                      <Avatar className="h-14 md:h-10 w-14 md:w-10 ">
                        <AvatarImage
                          src={
                            document.job.organization.img.sizes.thumbnail.url
                          }
                          alt={document.job.organization.orgName}
                        />
                        <AvatarFallback className="font-semibold text-base sm:text-xs text-yellow-600 bg-yellow-100">
                          {document.job.title[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex gap-4 md:gap-0 items-center md:flex-col dark:text-gray-200">
                        <div className="flex flex-col md:flex-row gap-2 md:gap-3 items-start md:items-start">
                          <div className="flex flex-col">
                            <h3 className="text-md sm:text-sm font-semibold">
                              {document.job.title}
                            </h3>
                            <p className="text-gray-500 text-xs dark:text-gray-300 hidden md:block">
                              {document.job.organization.orgName}
                            </p>
                          </div>
                          <div className="md:flex hidden flex-col md:flex-col lg:flex-row md:mt-1 gap-1 lg:gap-2">
                            <div className="flex items-center gap-1">
                              <Clock size={12} strokeWidth={2.5} />
                              <p className="text-xs font-normal">
                                {" "}
                                {document.job.employeeType}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase size={12} strokeWidth={2.5} />
                              <p className="text-xs font-normal">
                                {" "}
                                {document.job.jobRole}
                              </p>
                            </div>
                          </div>
                          {isPastDeadline ? (
                            <div className="text-red-500 text-xs font-semibold flex gap-1 items-center border border-red-500 pr-2 rounded-md md:mt-1">
                              <Dot
                                strokeWidth={4}
                                size={20}
                                color="red"
                                className="p-0"
                              />
                              Expired
                            </div>
                          ) : (
                            <div className="text-green-500 text-xs font-semibold flex gap-1 items-center border border-emerald-500 pr-2 rounded-md">
                              <Dot
                                strokeWidth={4}
                                size={20}
                                color="#50C878"
                                className="p-0"
                              />
                              Open
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-600 text-[10px] md:text-xs md:flex gap-2 md:gap-4 dark:text-gray-300 hidden">
                      <div className="items-center gap-1 flex">
                        <BriefcaseBusiness size={12} />
                        <p className="font-semibold">
                          {document.applicantCount} applications
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarDays size={12} />
                        <p className="font-semibold">
                          {" "}
                          Deadline: {document.deadline}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarDays size={12} />
                        <p className="font-semibold"> Posted {diff}</p>
                      </div>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex space-y-2 flex-col text-xs md:text-md md:hidden">
                    <div className="flex flex-col md:flex-row gap-1">
                      <div className="flex items-center gap-1">
                        <Clock size={12} strokeWidth={2.5} />
                        <p className="text-xs font-normal">
                          {" "}
                          {document.job.employeeType}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase size={12} strokeWidth={2.5} />
                        <p className="text-xs font-normal">
                          {" "}
                          {document.job.jobRole}
                        </p>
                      </div>
                    </div>
                    <div className="md:flex flex-col gap-2 hidden">
                      <Button
                        variant="ghost"
                        size="xs"
                        className="border border-gray-400"
                        onClick={() => handleViewApplicantList()}
                      >
                        View All Applicants
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        className="border border-gray-400"
                        onClick={() => handleViewJobDetails(document.job.id)}
                      >
                        View Job Details
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="text-gray-600 text-[10px] md:text-xs flex gap-2 md:gap-4 dark:text-gray-300 md:hidden">
                  <div className="items-center gap-1 hidden md:flex">
                    <BriefcaseBusiness size={12} />
                    <p className="font-semibold">
                      {document.applicantCount} applications
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="items-center gap-1 flex">
                      <BriefcaseBusiness size={12} />
                      <p className="font-semibold">
                        {document.applicantCount} applications
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarDays size={12} />
                      <p className="font-semibold">
                        {" "}
                        Deadline: {document.deadline}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarDays size={12} />
                      <p className="font-semibold"> Posted {diff}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 md:gap-4 px-2 md:px-0">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-center md:justify-normal md:flex-row-reverse text-emerald-600 font-semibold">
                      <Avatar className="h-10 w-10 border border-emerald-600">
                        <AvatarImage
                          src={
                            document.job.organization.img.sizes.thumbnail.url
                          }
                          alt={document.job.organization.orgName}
                        />
                        <AvatarFallback className="text-[10px] bg-emerald-100 dark:bg-emerald-200 items-center text-center">
                          View All
                        </AvatarFallback>
                      </Avatar>
                      <Avatar className="h-10 w-10 border border-emerald-600">
                        <AvatarImage
                          src={
                            document.job.organization.img.sizes.thumbnail.url
                          }
                          alt={document.job.organization.orgName}
                        />
                        <AvatarFallback className="text-xs bg-emerald-100 dark:bg-emerald-200">
                          {document.job.title[0]}
                        </AvatarFallback>
                      </Avatar>
                      <Avatar className="h-10 w-10 border border-emerald-600">
                        <AvatarImage
                          src={
                            document.job.organization.img.sizes.thumbnail.url
                          }
                          alt={document.job.organization.orgName}
                        />
                        <AvatarFallback className="text-xs bg-emerald-100 dark:bg-emerald-200">
                          {document.job.title[0]}
                        </AvatarFallback>
                      </Avatar>
                      <Avatar className="h-10 w-10 border border-emerald-600">
                        <AvatarImage
                          src={
                            document.job.organization.img.sizes.thumbnail.url
                          }
                          alt={document.job.organization.orgName}
                        />
                        <AvatarFallback className="text-xs bg-emerald-100 dark:bg-emerald-200">
                          {document.job.title[0]}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex flex-wrap md:flex-row-reverse gap-1 w-full max-w-[300px]">
                      {document.job.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="dark:bg-gray-900 text-[10px] lg:text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex space-y-2 flex-col text-xs md:text-md">
                    <Button
                      variant="ghost"
                      size="xs"
                      className="border border-gray-400"
                      onClick={() => handleViewApplicantList()}
                    >
                      View All Applicants
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      className="border border-gray-400"
                      onClick={() => handleViewJobDetails(document.job.id)}
                    >
                      View Job Details
                    </Button>
                  </div>
                </div>
              </Card>
            </>
          );
        })
      ) : (
        <p className="text-center text-gray-500">No jobs match your filters.</p>
      )}
    </div>
  );
};

export default JobList;

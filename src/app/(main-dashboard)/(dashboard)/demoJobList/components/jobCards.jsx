"use client";
import { formatRelativeDate } from "@/app/utils/formatRelativeDate";
import { capitalizeText } from "@/components/Capitalize";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BriefcaseBusiness,
  CalendarDays,
  Clock,
  Dot,
  Ellipsis,
  UserCog,
} from "lucide-react";
import React from "react";

const JobCards = ({
  jobs,
  handleEditJob,
  handleShareJob,
  handleDeleteJob,
  handleViewApplicantList,
  handleViewJobDetails,
  applicationsCount,
  applicantProfiles,
}) => {
  console.log("jobs :: ", jobs);
  return (
    <>
      {jobs.length > 0 ? (
        jobs.map((document) => {
          const deadlineDate = new Date(document.deadline);
          const currentDate = new Date();
          const isPastDeadline = currentDate > deadlineDate;
          const diff = formatRelativeDate(document.createdAt);
          const appCount = applicationsCount[document.job.id] || 0;
          // console.log("appCount :: ", appCount);

          return (
            <React.Fragment key={document.id}>
              <Card className="flex flex-col border dark:border dark:border-gray-500 relative mx-auto md:flex-row items-center justify-between hover:shadow-lg py-6 md:p-6 px-2 rounded-lg transition-shadow gap-6 md:gap-4 max-w-5xl">
                {/* Dropdown Menu */}
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Ellipsis className="cursor-pointer h-4 sm:h-5 w-4 sm:w-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => handleEditJob(document)}>
                        Edit Job
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleShareJob}>
                        Share Job
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteJob(document)}
                        className="hover:!text-red-600"
                      >
                        Delete Job
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="jobListCard flex items-center justify-around md:justify-start w-full md:w-fit">
                  <div className="flex flex-col gap-3 md:gap-5">
                    <div className="flex space-x-3 md:space-x-3 items-start">
                      <Avatar className="h-16 md:h-16 w-16 md:w-16">
                        <AvatarImage
                          src={`${process.env.NEXT_PUBLIC_API_URL}${document.job.organization?.img?.url}` || ""}
                          alt={
                            document?.job?.organization?.orgName ||
                            "Unknown Organization"
                          }
                        />
                        <AvatarFallback className="font-semibold text-base sm:text-xs text-yellow-600 bg-yellow-100">
                          {document?.job?.organization?.orgName}
                          src="https://static.vecteezy.com/system/resources/previews/065/319/768/non_2x/modern-profile-picture-icon-business-avatar-blue-theme-vector.jpg"
                          alt="org image"
                        />
                        <AvatarFallback className="font-semibold text-base sm:text-xs text-yellow-600 bg-yellow-100">
                          Unknown
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex gap-4 md:gap-0 items-center md:flex-col dark:text-gray-200">
                        <div className="flex flex-col md:flex-row gap-1 md:gap-3 items-start md:items-start">
                          <div className="flex flex-col">
                            <h3 className="text-sm sm:text-base font-semibold">
                              {document.job?.title}
                            </h3>
                            <p className="text-gray-500 text-xs font-medium dark:text-gray-300">
                              {document.job.organization?.orgName ||
                                "Organization"}
                            </p>
                          </div>
                          <div>
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
                              <div className="text-green-500 text-xs font-semibold flex gap-1 items-center border border-emerald-500 pr-2 rounded-md md:mt-1">
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
                    </div>
                    <div className="text-gray-600 text-[10px] md:text-xs md:flex md:flex-col gap-2 md:gap-4 dark:text-gray-300 hidden">
                      <div>
                        <div className="flex flex-wrap md:justify-start gap-1 w-full max-w-[500px]">
                          <Badge
                            variant="secondary"
                            className="dark:bg-gray-900"
                          >
                            <div className="flex items-center gap-2">
                              <BriefcaseBusiness className="h-4 w-4" />
                              {capitalizeText(
                                document.jobType?.title || "Job Type"
                              )}
                            </div>
                          </Badge>

                          <Badge
                            variant="secondary"
                            className="dark:bg-gray-900"
                          >
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {capitalizeText(
                                document.employeeType?.title || "Employee Type"
                              )}
                            </div>
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="dark:bg-gray-900"
                          >
                            <div className="flex items-center gap-2">
                              <UserCog className="h-4 w-4" />
                              {capitalizeText(
                                document.jobRole?.[0]?.title || "Job Role N/A"
                              )}
                            </div>
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2 md:gap-3 lg:gap-5">
                        <div className="items-center gap-1 flex">
                          <BriefcaseBusiness size={12} />
                          <p className="font-medium text-gray-600 dark:text-gray-300">
                            {appCount} applications
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarDays size={12} />
                          <p className="font-semibold">
                            Deadline:{" "}
                            {new Date(document.deadline).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarDays size={12} />
                          <p className="font-semibold"> Posted {diff}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-y-2 flex-col text-xs md:text-md md:hidden">
                    <div className="text-gray-600 text-xs flex flex-col gap-2 md:gap-4 dark:text-gray-300 md:hidden">
                      <div className="items-center gap-1 flex">
                        <BriefcaseBusiness size={12} />
                        <p className="font-medium text-gray-600 dark:text-gray-300">
                          {appCount} applications
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarDays size={12} />
                        <p className="font-semibold">
                          Deadline:{" "}
                          {new Date(document.deadline).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarDays size={12} />
                        <p className="font-semibold"> Posted {diff}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 md:gap-0 px-2 md:px-0">
                  <div className="flex flex-col gap-5 justify-center mt-2">
                    {/* Applicants Section (if available) */}
                    {appCount > 0 ? (
                      <div className="flex justify-center md:justify-start sm:flex-row text-emerald-600 font-semibold">
                        <div className="flex flex-row items-center justify-center w-full sm:mr-4">
                          {/* <AnimatedTooltip items={document.job.applicants} /> */}
                          {/* <AnimatedTooltip
                            items={applicantProfiles[document.job.id].map(
                              (profile) => ({
                                id: profile.id,
                                name: profile.name,
                                designation:
                                  profile.designation?.title ||
                                  "No Designation",
                                applicant: {
                                  pictureUrl:
                                    profile.pictureUrl ||
                                    "/default-profile.png",
                                },
                              })
                            )}
                          /> */}
                          {/* <p className="text-lg sm:text-base">
                            {appCount} Applicants For This Job
                          </p> */}

                          <AnimatedTooltip
                            items={applicantProfiles[document.job.id] || []}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-center md:justify-start sm:flex-row font-semibold">
                        <div className="flex flex-row items-center justify-center w-full sm:mr-4">
                          <p className="text-lg sm:text-base">
                            No Applicants For This Job
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-center gap-10">
                      <div className="flex md:hidden flex-wrap justify-center gap-1 w-full max-w-[300px]">
                        <Badge variant="secondary" className="dark:bg-gray-900">
                          <div className="flex items-center gap-2">
                            <BriefcaseBusiness className="h-4 w-4" />
                            {capitalizeText(
                              document.jobType?.title || "Job Type"
                            )}
                          </div>
                        </Badge>

                        <Badge variant="secondary" className="dark:bg-gray-900">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {capitalizeText(
                              document.employeeType?.title || "Employee Type"
                            )}
                          </div>
                        </Badge>
                        <Badge variant="secondary" className="dark:bg-gray-900">
                          <div className="flex items-center gap-2">
                            <UserCog className="h-4 w-4" />
                            {capitalizeText(
                              document.jobRole?.[0]?.title || "Job Role"
                            )}
                          </div>
                        </Badge>
                      </div>
                      {/* Action Buttons */}
                      <div className="flex space-y-2 md:space-y-0 md:space-x-1 flex-col md:flex-row text-xs md:text-md">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="border border-gray-400"
                          onClick={() =>
                            handleViewApplicantList(document.job.id)
                          }
                        >
                          View All Applicants ({appCount})
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="border border-gray-400"
                          onClick={() => handleViewJobDetails(document.job.id)}
                        >
                          View Job Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </React.Fragment>
          );
        })
      ) : (
        <p className="text-center text-gray-500">No jobs match your filters.</p>
      )}
    </>
  );
};

export default JobCards;

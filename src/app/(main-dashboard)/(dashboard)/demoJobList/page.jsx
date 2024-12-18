"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatRelativeDate } from "@/app/utils/formatRelativeDate";
import {
  BriefcaseBusiness,
  CalendarDays,
  Clock,
  Dot,
  Ellipsis,
  Plus,
  UserCog,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { JobFilters } from "@/components/filters/JobFilters";
import { documents } from "./components/jobData";
import { filterJobs } from "../../../utils/filters";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import CreateJobForm from "../demoJobFormCreate/page";
import { capitalizeText } from "@/components/Capitalize";
import { Input } from "@/components/ui/input";

// unique job roles by matching IDs
const getJobRoles = () => {
  const jobRoles = new Set();
  documents.docs.forEach((applicantDoc) => {
    const jobId = applicantDoc.job.id;
    const matchingJob = documents.docs.find((job) => job.job.id === jobId);
    if (matchingJob) {
      jobRoles.add(matchingJob.jobRole);
    }
  });
  return Array.from(jobRoles);
};

const jobRoles = getJobRoles();
console.log(jobRoles);

const JobList = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(null);
  const [job, setJob] = useState("");
  const [filters, setFilters] = useState({
    searchQuery: "",
    status: "all",
    jobRole: "all",
    experienceRange: "all",
    applicantCount: "all",
  });
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    job: null,
    password: "",
    reason: "",
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      searchQuery: "",
      status: "all",
      jobRole: "all",
      experienceRange: "all",
      applicantCount: "all",
    });
  };

  const handleViewJobDetails = (jobId) => {
    router.push(`/demoJobList/demoJobDetails?jobId=${jobId}`);
  };
  const handleViewApplicantList = (jobId) => {
    router.push(`/demoJobList/demoJobApplicants?jobId=${jobId}`);
  };
  const handleCreateJob = () => {
    router.push("/demoJobFormCreate");
  };

  const handleEditJob = (job) => {
    console.log(job);
    setId(job.job.id);
    setJob(job);
    setIsEditing(true);
  };

  const handleShareJob = () => {
    console.log("Share Job clicked");
  };

  const handleDeleteJob = (job) => {
    setDeleteDialog({ isOpen: true, job, password: "", reason: "" });
  };

  const handleConfirmDelete = () => {
    if (!deleteDialog.job.published) {
      // Handle deletion with password
      console.log("Password provided:", deleteDialog.password);
      // Implement API call or logic to delete job
    } else {
      // Handle deletion with reason
      console.log("Reason provided:", deleteDialog.reason);
      // Implement logic to move job to junk box
    }
    setDeleteDialog({ isOpen: false, job: null, password: "", reason: "" });
  };

  // Job role filter
  const jobRole =
    filters.selectedRole === "all" ||
    !filters.selectedRole ||
    (() => {
      const matchingJob = jobData.docs.find(
        (job) => job.job.id === applicant.job.id
      );
      return (
        matchingJob &&
        matchingJob.role.toLowerCase() === filters.selectedRole.toLowerCase()
      );
    })();

  const filteredJobs = filterJobs(documents.docs, filters);

  if (isEditing) {
    return (
      <CreateJobForm
        jobId={id}
        initialData={job}
        isEditing={isEditing}
        onClose={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="space-y-2">
      <JobFilters
        jobs={documents.docs}
        filters={filters}
        onFilterChange={handleFilterChange}
        jobRoles={jobRoles}
        onReset={handleReset}
        handleCreateJob={handleCreateJob}
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
                className="flex flex-col relative mx-auto md:flex-row items-center justify-between py-6 md:p-6 px-2 rounded-lg transition-shadow gap-6 md:gap-4 max-w-4xl"
              >
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

                <div className="jobListCard flex items-center justify-center md:justify-start w-full md:w-fit">
                  <div className="flex flex-col gap-3 md:gap-5">
                    <div className="flex space-x-0 md:space-x-3 items-start">
                      <Avatar className="h-16 md:h-16 w-16 md:w-16 ">
                        <AvatarImage
                          src={
                            document.job.organization.img.sizes.thumbnail.url
                          }
                          alt={document.job.organization.orgName}
                        />
                        <AvatarFallback className="font-semibold text-base sm:text-xs text-yellow-600 bg-yellow-100">
                          {document.title}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex gap-4 md:gap-0 items-center md:flex-col dark:text-gray-200">
                        <div className="flex flex-col md:flex-row gap-1 md:gap-3 items-start md:items-start">
                          <div className="flex flex-col">
                            <h3 className="text-sm sm:text-base font-semibold">
                              {document.title}
                            </h3>
                            <p className="text-gray-500 text-xs font-medium dark:text-gray-300">
                              {document.job.organization.orgName}
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
                              <div className="text-green-500 text-xs font-semibold flex gap-1 items-center border border-emerald-500 pr-2 rounded-md  md:mt-1">
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
                        <div className="flex flex-wrap md:justify-start gap-1 w-full max-w-[350px]">
                          <Badge
                            variant="secondary"
                            className="dark:bg-gray-900"
                          >
                            <div className="flex items-center gap-2">
                              <BriefcaseBusiness className="h-4 w-4" />
                              {capitalizeText(document.jobType)}
                            </div>
                          </Badge>

                          <Badge
                            variant="secondary"
                            className="dark:bg-gray-900"
                          >
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {capitalizeText(document.employeeType)}
                            </div>
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="dark:bg-gray-900"
                          >
                            <div className="flex items-center gap-2">
                              <UserCog className="h-4 w-4" />
                              {capitalizeText(document.jobRole)}
                            </div>
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2 md:gap-3 lg:gap-5">
                        <div className="items-center gap-1 flex">
                          <BriefcaseBusiness size={12} />
                          <p className="font-medium text-gray-600 dark:text-gray-300">
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
                  </div>
                  <div className="flex space-y-2 flex-col text-xs md:text-md md:hidden">
                    <div className="text-gray-600 text-xs flex flex-col gap-2 md:gap-4 dark:text-gray-300 md:hidden">
                      <div className="items-center gap-1 flex">
                        <BriefcaseBusiness size={12} />
                        <p className="font-medium text-gray-600 dark:text-gray-300">
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
                </div>
                <div className="flex items-center gap-6 md:gap-0 px-2 md:px-0">
                  <div className="flex flex-col gap-5 justify-center mt-2">
                    <div className="flex justify-center md:justify-start sm:flex-row text-emerald-600 font-semibold">
                      <div className="flex flex-row items-center justify-center w-full sm:mr-4">
                        <AnimatedTooltip items={document.job.applicants} />
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-10">
                      <div className="flex md:hidden flex-wrap justify-center gap-1 w-full max-w-[300px]">
                        <Badge variant="secondary" className="dark:bg-gray-900">
                          <div className="flex items-center gap-2">
                            <BriefcaseBusiness className="h-4 w-4" />
                            {capitalizeText(document.jobType)}
                          </div>
                        </Badge>

                        <Badge variant="secondary" className="dark:bg-gray-900">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {capitalizeText(document.employeeType)}
                          </div>
                        </Badge>
                        <Badge variant="secondary" className="dark:bg-gray-900">
                          <div className="flex items-center gap-2">
                            <UserCog className="h-4 w-4" />
                            {capitalizeText(document.jobRole)}
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
                          View All Applicants
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
            </>
          );
        })
      ) : (
        <p className="text-center text-gray-500">No jobs match your filters.</p>
      )}

      {/* Delete Dialog */}
      <Dialog open={deleteDialog.isOpen} onOpenChange={(isOpen) => setDeleteDialog({ ...deleteDialog, isOpen })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Job</DialogTitle>
            {!deleteDialog.job?.published ? (
              <>
                <DialogDescription>Please enter your password to confirm deletion:</DialogDescription>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={deleteDialog.password}
                  onChange={(e) =>
                    setDeleteDialog((prev) => ({ ...prev, password: e.target.value }))
                  }
                  className="mt-2"
                />
                <Button
                  onClick={handleConfirmDelete}
                  disabled={!deleteDialog.password.trim()}
                  className="mt-4"
                >
                  Delete
                </Button>
              </>
            ) : (
              <>
                <DialogDescription>Please explain why you&apos;re deleting this job:</DialogDescription>
                <Input
                  placeholder="Enter reason"
                  value={deleteDialog.reason}
                  onChange={(e) =>
                    setDeleteDialog((prev) => ({ ...prev, reason: e.target.value }))
                  }
                  className="mt-2"
                />
                <Button
                  onClick={handleConfirmDelete}
                  disabled={!deleteDialog.reason.trim()}
                  className="mt-4"
                >
                  Move to Junk Box
                </Button>
              </>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobList;

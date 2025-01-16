// JobList.js
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { JobFilters } from "@/components/filters/JobFilters";
import { documents } from "./components/jobData";
import { filterJobs } from "../../../utils/filters";
import CreateJobForm from "../demoJobFormCreate/page";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import JobCards from "./components/jobCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { House } from "lucide-react";

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

const JobList = ({ showFilters = true }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(null);
  const [job, setJob] = useState("");
  const [filters, setFilters] = useState({
    searchQuery: "",
    status: "all",
    jobRole: "all",
    experienceRange: "all",
    sortBy: "latest",
  });
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    job: null,
    password: "",
    reason: "",
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const handleReset = () => {
    setFilters({
      searchQuery: "",
      status: "all",
      jobRole: "all",
      experienceRange: "all",
      sortBy: "latest",
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
    setDeleteDialog({ isOpen: true, job });
  };

  const handleConfirmDelete = () => {
    if (!deleteDialog.job.published) {
      console.log("Password provided:", deleteDialog.password);
      // API call
    } else {
      console.log("Reason provided:", deleteDialog.reason);
      // have to implement logic to move job to junk box
    }
    setDeleteDialog({ isOpen: false, job: null, password: "", reason: "" });
  };

  let filteredJobs = filterJobs(documents.docs, filters);

  // Sorting jobs
  if (filters.sortBy === "latest") {
    filteredJobs.sort((a, b) => new Date(b.published) - new Date(a.published));
  } else if (filters.sortBy === "oldest") {
    filteredJobs.sort((a, b) => new Date(a.published) - new Date(b.published));
  }

  if (!showFilters) {
    filteredJobs = filteredJobs.slice(0, 2);
  }

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
    <>
      {showFilters && (
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
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <div className="space-y-3">
        {showFilters && (
          <JobFilters
            jobs={documents.docs}
            filters={filters}
            onFilterChange={handleFilterChange}
            jobRoles={jobRoles}
            onReset={handleReset}
            handleCreateJob={handleCreateJob}
          />
        )}

        {filteredJobs.length > 0 ? (
          <>
            <JobCards
              jobs={filteredJobs}
              handleViewApplicantList={handleViewApplicantList}
              handleViewJobDetails={handleViewJobDetails}
              handleEditJob={handleEditJob}
              handleDeleteJob={handleDeleteJob}
              handleShareJob={handleShareJob}
            />
            {/* Button to see all jobs */}
            {!showFilters && (
              <Button
                onClick={() => router.push("/demoJobList")}
                className="!mt-4 float-right"
                size="sm"
              >
                See All Jobs
              </Button>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500">
            No jobs match your filters.
          </p>
        )}

        {/* Delete Dialog */}
        <Dialog
          open={deleteDialog.isOpen}
          onOpenChange={(isOpen) =>
            setDeleteDialog({ ...deleteDialog, isOpen })
          }
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Job</DialogTitle>
              {!deleteDialog.job?.published ? (
                <>
                  <DialogDescription>
                    Please enter your password to confirm deletion:
                  </DialogDescription>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={deleteDialog?.password}
                    onChange={(e) =>
                      setDeleteDialog((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="mt-2"
                  />
                  <Button
                    onClick={handleConfirmDelete}
                    disabled={!deleteDialog?.password?.trim()}
                    className="mt-4"
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <DialogDescription>
                    Please explain why you&apos;re deleting this job:
                  </DialogDescription>
                  <Input
                    placeholder="Enter reason"
                    value={deleteDialog.reason}
                    onChange={(e) =>
                      setDeleteDialog((prev) => ({
                        ...prev,
                        reason: e.target.value,
                      }))
                    }
                    className="mt-2"
                  />
                  <Button
                    onClick={handleConfirmDelete}
                    disabled={!deleteDialog?.reason?.trim()}
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
    </>
  );
};

export default JobList;

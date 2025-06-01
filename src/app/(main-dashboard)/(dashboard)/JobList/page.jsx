/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { JobFilters } from "@/components/filters/JobFilters";
import { filterJobs } from "../../../utils/filters";
import CreateJobForm from "../JobCreateForm/components/CreateJobForm";
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
import { House, Plus } from "lucide-react";
import { FilterSheet } from "@/components/filters/FilterSheet";
import qs from "qs";

const getJobRoles = (docs) => {
  const jobRoles = new Set();
  docs.forEach((applicantDoc) => {
    const jobId = applicantDoc.job.id;
    const matchingJob = docs.find((job) => job.job.id === jobId);
    if (matchingJob) {
      jobRoles.add(matchingJob.jobRole);
    }
  });
  return Array.from(jobRoles);
};

const JobList = ({ showFilters = true }) => {
  const router = useRouter();
  const { data: session } = useSession();
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
  const [documents, setDocuments] = useState({ docs: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applicationsCount, setApplicationsCount] = useState({});
  const [applicantProfiles, setApplicantProfiles] = useState({});

  const accessToken = session?.access_token;

  useEffect(() => {
    const fetchData = async () => {
      const query = qs.stringify(
        {
          where: {
            "job.organization.id": { equals: session?.organizationId },
          },
        },
        { encode: false }
      );
      // console.log("Query ::", query);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-details?${query}&limit=1000`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }
        const data = await response.json();
        setDocuments(data);
        console.log("Response from job details :: ", data);
        fetchApplicationsCount(data.docs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [accessToken, session?.organizationId]);

  const fetchApplicationsCount = async (jobs) => {
    const counts = {};
    const applicantProfiles = {};

    for (const job of jobs) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications?where[jobDetails.job.id][equals]=${job.job.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        console.log("Application Response :: ", data);
        counts[job.job.id] = data.docs.length;
        applicantProfiles[job.job.id] = data.docs.slice(0, 5).map((doc) => ({
          id: doc.applicant.id,
          name: doc.applicant.name,
          designation: doc.applicant.designation?.title || "No Designation",
          applicant: {
            pictureUrl: doc.applicant.img
              ? `${process.env.NEXT_PUBLIC_API_URL}${doc.applicant.img.url}`
              : "",
          },
        }));
      } catch (error) {
        console.error("Error fetching job applications:", error);
        counts[job.job.id] = 0;
        applicantProfiles[job.job.id] = [];
      }
    }
    setApplicationsCount(counts);
    setApplicantProfiles(applicantProfiles);
  };

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
    router.push(`/JobList/JobDetails?jobId=${jobId}`);
  };

  const handleViewApplicantList = (jobId) => {
    router.push(`/JobList/JobApplicants?jobId=${jobId}`);
  };

  const handleCreateJob = () => {
    router.push("/JobCreateForm");
  };

  const handleEditJob = (job) => {
    // console.log(job);
    setId(job.job.id);
    setJob(job);
    setIsEditing(true);
  };

  const handleShareJob = () => {
    // console.log("Share Job clicked");
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  let filteredJobs = filterJobs(documents.docs, filters);

  // console.log("filteredJobs :: ", filteredJobs);

  // Sorting jobs
  if (filters.sortBy === "latest") {
    filteredJobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (filters.sortBy === "oldest") {
    filteredJobs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
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
        <div className="flex justify-between items-center mb-4">
          <Breadcrumb className="items-center">
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
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex justify-end gap-2 items-center">
            <FilterSheet
              jobs={documents.docs}
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
            />
            <Button
              onClick={handleCreateJob}
              className="p-2 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-300"
            >
              <Plus className="h-3 w-3" />
              <span className="text-xs hidden md:block">Post New Job</span>
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {filteredJobs.length > 0 ? (
          <>
            <JobCards
              jobs={filteredJobs}
              handleViewApplicantList={handleViewApplicantList}
              handleViewJobDetails={handleViewJobDetails}
              handleEditJob={handleEditJob}
              handleDeleteJob={handleDeleteJob}
              handleShareJob={handleShareJob}
              applicationsCount={applicationsCount}
              applicantProfiles={applicantProfiles}
            />
            {/* Button to see all jobs */}
            {!showFilters && (
              <Button
                onClick={() => router.push("/JobList")}
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

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
import { useToast } from "@/hooks/use-toast";

const JobList = ({ showFilters = true }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(null);
  const [job, setJob] = useState(null);
  const [jobDetailsId, setJobDetailsId] = useState(null);
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

  const handleDeleteJob = async () => {
    if (!deleteDialog.job) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${deleteDialog.job.job.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      // Update the local state to remove the deleted job
      setDocuments((prev) => ({
        ...prev,
        docs: prev.docs.filter((doc) => doc.job.id !== deleteDialog.job.job.id),
      }));

      // Update applications count
      const newApplicationsCount = { ...applicationsCount };
      delete newApplicationsCount[deleteDialog.job.job.id];
      setApplicationsCount(newApplicationsCount);

      // Update applicant profiles
      const newApplicantProfiles = { ...applicantProfiles };
      delete newApplicantProfiles[deleteDialog.job.job.id];
      setApplicantProfiles(newApplicantProfiles);

      toast.success("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job");
    } finally {
      setDeleteDialog({ isOpen: false, job: null });
    }
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
    setId(job.job.id);
    setJobDetailsId(job.id);
    setJob(job);
    setIsEditing(true);
  };

  const handleShareJob = () => {
    // console.log("Share Job clicked");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  let filteredJobs = filterJobs(documents.docs, filters);

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
        jobDetailsId={jobDetailsId}
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
              handleDeleteJob={(job) => setDeleteDialog({ isOpen: true, job })}
              handleShareJob={handleShareJob}
              applicationsCount={applicationsCount}
              applicantProfiles={applicantProfiles}
            />
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

        <Dialog
          open={deleteDialog.isOpen}
          onOpenChange={(isOpen) =>
            setDeleteDialog({ ...deleteDialog, isOpen })
          }
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Job</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this job? This action cannot be
                undone.
              </DialogDescription>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setDeleteDialog({ isOpen: false, job: null })}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteJob}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default JobList;

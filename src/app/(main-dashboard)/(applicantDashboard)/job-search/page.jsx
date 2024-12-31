"use client";
import { jobs } from "@/components/ApplicantDashboardUI/applicantJobData";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import JobSearchCard from "./components/JobSearchCard";

const JobSearch = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    location: "",
    employmentType: "",
    jobCategory: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      location: "",
      employmentType: "",
      jobCategory: "",
    });
    setCurrentPage(1);
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.location ? job.location.includes(filters.location) : true) &&
      (filters.employmentType
        ? job.employeeType.includes(filters.employeeType)
        : true) &&
      (filters.jobCategory
        ? job.jobCategory.includes(filters.jobCategory)
        : true)
    );
  });

  const jobsPerPage = 6;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="overflow-hidden">
      <h1 className="text-xl font-semibold">Job Search</h1>
      {/* Filter Section */}
      <div className="flex gap-4 mt-6">
        {/* <select
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          className="border px-4 py-2 rounded text-sm"
        >
          <option value="">All Locations</option>
          <option value="Remote">Remote</option>
          <option value="California, USA">California, USA</option>
          <option value="New York, USA">New York, USA</option>
        </select> */}

        <select
          name="employmentType"
          value={filters.employmentType}
          onChange={handleFilterChange}
          className="border px-4 py-2 rounded text-sm"
        >
          <option value="">All Employment Types</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Freelance">Freelance</option>
        </select>

        {/* <select
          name="jobCategory"
          value={filters.jobCategory}
          onChange={handleFilterChange}
          className="border px-4 py-2 rounded text-sm"
        >
          <option value="">All Categories</option>
          <option value="Software Development">Software Development</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
        </select> */}

        <Button
          variant="ghost"
          onClick={handleResetFilters}
          className="bg-white shadow text-sm px-4 py-2 rounded flex items-center gap-1"
        >
          <span>
            <RotateCcw size={18} />
          </span>
          <span>Reset</span>
        </Button>
      </div>

      {/* Job Listings */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentJobs.length === 0 ? (
          <p>No jobs found based on your filters.</p>
        ) : (
          currentJobs.map((job) => <JobSearchCard key={job.id} job={job} />)
        )}
      </div>

      {filteredJobs.length > jobsPerPage && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      handlePageChange(currentPage - 1);
                    }
                  }}
                  className="cursor-pointer"
                />
              </PaginationItem>

              {/* Dynamically generate page numbers */}
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index + 1}>
                  <PaginationLink
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(index + 1);
                    }}
                    isActive={currentPage === index + 1}
                    className="cursor-pointer"
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                      handlePageChange(currentPage + 1);
                    }
                  }}
                  className="cursor-pointer"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default JobSearch;

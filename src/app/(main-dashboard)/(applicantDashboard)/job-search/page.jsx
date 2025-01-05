"use client";
import { jobs } from "@/components/ApplicantDashboardUI/applicantJobData";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import JobFilter from "./components/JobFilter";
import JobSearchCard from "./components/JobSearchCard";
import SearchBar from "./components/SearchBar";

const JobSearch = () => {
  const itemsPerPage = 6; // Items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    location: "",
    employmentType: "",
    jobCategory: "",
  });

  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.location ? job.location.includes(filters.location) : true) &&
      (filters.employmentType
        ? job.employeeType.includes(filters.employmentType)
        : true) &&
      (filters.jobCategory
        ? job.jobCategory.includes(filters.jobCategory)
        : true)
    );
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Pagination Logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPaginatedJobs = filteredJobs.slice(startIndex, endIndex);

  return (
    <div className="overflow-hidden">
      <h1 className="text-xl font-semibold">Job Search</h1>

      {/* Filter Section */}
      <div className="flex justify-between gap-4 mt-6 px-1">
        <div className="w-full">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Sort By (Default)" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="random">Random</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <JobFilter />
        </div>
      </div>

      {/* Job Listings */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentPaginatedJobs.length === 0 ? (
          <p>No jobs found based on your filters.</p>
        ) : (
          currentPaginatedJobs.map((job) => (
            <JobSearchCard key={job.id} job={job} />
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {filteredJobs.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default JobSearch;

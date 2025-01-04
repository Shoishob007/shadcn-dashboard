"use client";
import { jobs } from "@/components/ApplicantDashboardUI/applicantJobData";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
        ? job.employeeType.includes(filters.employmentType)
        : true) &&
      (filters.jobCategory
        ? job.jobCategory.includes(filters.jobCategory)
        : true)
    );
  });

  // const jobsPerPage = 6;
  // const indexOfLastJob = currentPage * jobsPerPage;
  // const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  // const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  // const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="overflow-hidden">
      <h1 className="text-xl font-semibold">Job Search</h1>
      {/* Filter Section */}
      <div className="flex justify-between gap-4 mt-6 px-1">
        <div>
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
            <option value="full-time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="contractual">Contractual</option>
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

          {/* <Button
          variant="ghost"
          onClick={handleResetFilters}
          className="bg-white shadow text-sm px-4 py-2 rounded flex items-center gap-1"
        >
          <span>
            <RotateCcw size={18} />
          </span>
          <span>Reset</span>
        </Button> */}
        </div>

        <div className="flex items-center gap-2">
          <Select >
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Sort By (Default)" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Newest</SelectItem>
                <SelectItem value="banana">Oldest</SelectItem>
                <SelectItem value="blueberry">Random</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div>
            <Button>Filter</Button>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.length === 0 ? (
          <p>No jobs found based on your filters.</p>
        ) : (
          filteredJobs.map((job) => <JobSearchCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default JobSearch;

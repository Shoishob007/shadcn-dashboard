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

  return (
    <div className="overflow-hidden">
      <h1 className="text-xl font-semibold">Job Search</h1>
      {/* Filter Section */}
      <div className="flex justify-between gap-4 mt-6 px-1">
        <div className="w-full">
          <div className="">
            <SearchBar/>
          </div>
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
          <div>
            <JobFilter/>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

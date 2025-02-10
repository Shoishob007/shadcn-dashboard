"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { House } from "lucide-react";
import { useEffect, useState } from "react";
import JobFilter from "./components/JobFilter";
import JobSearchCard from "./components/JobSearchCard";
import SearchBar from "./components/SearchBar";

const JobSearch = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    location: "",
    employmentType: "",
    jobCategory: "",
    sortBy: "newest",
  });
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Job Data
  useEffect(() => {
    const getJobData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-details?limit=1000`
        );
        const data = await response.json();

        if (data.docs && Array.isArray(data.docs)) {
          setJobData(data.docs);
        } else {
          console.error("Expected an array but got:", data);
          setError("Invalid data format");
          setJobData([]);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs");
        setJobData([]);
      } finally {
        setLoading(false);
      }
    };

    getJobData();
  }, []);

  console.log("Fetched Jobs:", jobData);

  // Sort Jobs
  const sortJobs = (jobs) => {
    return [...jobs].sort((a, b) => {
      if (!a.postedDate || !b.postedDate) return 0;
      switch (filters.sortBy) {
        case "oldest":
          return new Date(a.postedDate) - new Date(b.postedDate);
        case "random":
          return Math.random() - 0.5;
        case "newest":
        default:
          return new Date(b.postedDate) - new Date(a.postedDate);
      }
    });
  };

  // Filter Jobs
  const filteredJobs = sortJobs(
    jobData.filter((job) => {
      return (
        (filters.location ? job.location?.includes(filters.location) : true) &&
        (filters.employmentType
          ? job.employeeType?.includes(filters.employmentType)
          : true) &&
        (filters.jobCategory
          ? job.jobCategory?.includes(filters.jobCategory)
          : true)
      );
    })
  );

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPaginatedJobs = filteredJobs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <House className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/profile">Jobs</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="overflow-hidden">
        {/* Loading and Error Handling */}
        {loading && <p>Loading jobs...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <div className="flex justify-between gap-4 px-1">
              <SearchBar />
              <div className="flex items-center gap-2">
                <Select
                  onValueChange={(value) =>
                    setFilters({ ...filters, sortBy: value })
                  }
                >
                  <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800">
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
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentPaginatedJobs.length === 0 ? (
                <p>No jobs found based on your filters.</p>
              ) : (
                currentPaginatedJobs.map((job) => (
                  <JobSearchCard key={job.id} job={job} />
                ))
              )}
            </div>

            {/* Pagination */}
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
                        ? "bg-black text-white"
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
          </>
        )}
      </div>
    </>
  );
};

export default JobSearch;

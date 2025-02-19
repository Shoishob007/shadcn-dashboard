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
import { useEffect, useState, useRef, useCallback } from "react";
import JobFilter from "./components/JobFilter";
import JobSearchCard from "./components/JobSearchCard";
import SearchBar from "./components/SearchBar";
import { useInView } from "react-intersection-observer";

const JobSearch = () => {
  const itemsPerPage = 6;
  const [filters, setFilters] = useState({
    location: "",
    employmentType: "",
    jobCategory: "",
    sortBy: "newest",
  });
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job-details?limit=${itemsPerPage}&page=${page}`
      );
      const data = await response.json();
      if (data.docs && Array.isArray(data.docs)) {
        setJobData((prev) => [...prev, ...data.docs]);
      } else {
        console.error("Invalid data format", data);
        setError("Invalid data format");
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    if (inView && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [inView, loading]);

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
        {error && <p className="text-red-500">{error}</p>}
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

        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobData.length === 0 && !loading && <p>No jobs found.</p>}
          {jobData.map((job) => (
            <JobSearchCard key={job.id} job={job} />
          ))}
        </div>

        {loading && <p className="text-center mt-4">Loading more jobs...</p>}
        <div ref={ref} className="h-10"></div>
      </div>
    </>
  );
};

export default JobSearch;

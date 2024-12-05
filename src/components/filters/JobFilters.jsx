import React from "react";
import { SearchBar } from "./SearchBar.jsx";
import { RangeFilter } from "./RangeFilters";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Open", value: "open" },
  { label: "Expired", value: "expired" },
];

const jobRoleOptions = [
  { label: "All Roles", value: "all" },
  { label: "Full-Stack", value: "Full-Stack" },
  { label: "Frontend", value: "Frontend" },
  { label: "Backend", value: "Backend" },
];

const experienceOptions = [
  { label: "Any Experience", value: "all" },
  { label: "0-2 years", value: "0-2" },
  { label: "2-5 years", value: "2-5" },
  { label: "5+ years", value: "5-999" },
];

const applicantOptions = [
  { label: "All Applications", value: "all" },
  { label: "0-10", value: "0-10" },
  { label: "11-50", value: "11-50" },
  { label: "50+", value: "51-999" },
];

export const JobFilters = ({ jobs, filters, onFilterChange, onReset }) => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-2 dark:bg-gray-900 rounded-lg">
      <div className="flex flex-col gap-4">
        {/* Search bar and Range Filters */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <div className="flex items-center gap-4">
            <SearchBar
              jobs={jobs}
              placeholder="Search by title, location, organization..."
              value={filters.searchQuery}
              onSearch={(value) => onFilterChange("searchQuery", value)}
            />
            <div className="block md:hidden">
              {/* Reset button */}
              <Button
                variant="outline"
                onClick={onReset}
                className="flex items-center gap-2 p-2 dark:border-gray-500 dark:hover:bg-gray-900 h-7 md:h-9"
              >
                <RotateCcw className="w-2 h-2" />
                <span className=" text-[10px] md:text-xs">Reset</span>
              </Button>
            </div>
          </div>

          <div className="flex gap-0 md:gap-4">
            {/* Range Filters */}
            <RangeFilter
              placeholder="Status"
              options={statusOptions}
              value={filters.status}
              onChange={(value) => onFilterChange("status", value)}
              className="w-24 md:w-48"
            />
            <RangeFilter
              placeholder="Job Role"
              options={jobRoleOptions}
              value={filters.jobRole}
              onChange={(value) => onFilterChange("jobRole", value)}
              className="w-24 md:w-48"
            />
            <RangeFilter
              placeholder="Experience"
              options={experienceOptions}
              value={filters.experienceRange}
              onChange={(value) => onFilterChange("experienceRange", value)}
              className="w-24 md:w-48"
            />
            {/* <RangeFilter
              placeholder="Applications"
              options={applicantOptions}
              value={filters.applicantCount}
              onChange={(value) => onFilterChange("applicantCount", value)}
              className="w-24 md:w-48"
            /> */}
          </div>

          <div className="hidden md:block">
            {/* Reset button */}
            <Button
              variant="outline"
              onClick={onReset}
              className="flex items-center gap-2 px-3 py-2 dark:border-gray-500 dark:hover:bg-gray-900 h-7 md:h-9"
            >
              <RotateCcw className="h-3 w-3" />
              <span className="text-xs hidden md:block">Reset</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

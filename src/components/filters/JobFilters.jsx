import React from "react";
import { SearchBar } from "./SearchBar.jsx";
import { RangeFilter } from "./RangeFilters";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { getSafeValue } from "@/lib/helper.js";

const statusOptions = [
  { label: "Any Status", value: "all" },
  { label: "Open", value: "open" },
  { label: "Expired", value: "expired" },
];

const jobRoleOptions = [
  { label: "Any Roles", value: "all" },
  { label: "Full-Stack", value: "Full-Stack Engineer" },
  { label: "Frontend", value: "Frontend Engineer" },
  { label: "Backend", value: "Backend Engineer" },
];

const experienceOptions = [
  { label: "Any Experience", value: "all" },
  { label: "0-2 years", value: "0-2" },
  { label: "2-5 years", value: "2-5" },
  { label: "5+ years", value: "5-999" },
];

const sortOptions = [
  { label: "Latest First", value: "latest" },
  { label: "Oldest First", value: "oldest" },
];

export const JobFilters = ({ jobs, filters, onFilterChange, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <SearchBar
            jobs={jobs}
            placeholder="Search by title, location, organization..."
            value={filters.searchQuery}
            onSearch={(value) => onFilterChange("searchQuery", value)}
          />
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                By Status
              </label>
              <RangeFilter
                placeholder="Status"
                options={statusOptions}
                value={filters.status}
                onChange={(value) => onFilterChange("status", value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                By Experience
              </label>
              <RangeFilter
                placeholder="Experience"
                options={experienceOptions}
                value={filters.experienceRange}
                onChange={(value) => onFilterChange("experienceRange", value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                By Time
              </label>
              <RangeFilter
                placeholder="Sort By"
                options={sortOptions}
                value={filters.sortBy}
                onChange={(value) => onFilterChange("sortBy", value)}
              />
            </div>
          </div>
          <Button
            variant="outline"
            onClick={onReset}
            className="flex items-center gap-2 dark:border-gray-500"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset Filters</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export const AppFilters = ({
  applicants,
  filters,
  jobTitles,
  onFilterChange,
  onReset,
}) => {
  const jobTitleOptions = [
    { value: "all", label: "All Job Titles" },
    ...(jobTitles || []).map((title) => ({
      value: getSafeValue(title),
      label: getSafeValue(title),
    })),
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="space-y-6">
        {/* Search Bar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search
          </label>
          <SearchBar
            applicants={applicants}
            placeholder="Search by name, location, organization..."
            value={filters.searchQuery}
            onSearch={(value) => onFilterChange("searchQuery", value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              By Job Title
            </label>
            <RangeFilter
              placeholder="Select Job Title"
              options={jobTitleOptions}
              value={filters.selectedTitle}
              onChange={(value) => onFilterChange("selectedTitle", value)}
              className="w-full"
            />
          </div>

          {/* Reset Button */}
          <Button
            variant="outline"
            onClick={onReset}
            className="flex items-center gap-2 dark:border-gray-500"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="text-sm">Reset Filters</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

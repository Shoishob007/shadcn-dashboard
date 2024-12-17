import React from "react";
import { SearchBar } from "./SearchBar.jsx";
import { RangeFilter } from "./RangeFilters";
import { Button } from "@/components/ui/button";
import { Plus, RotateCcw } from "lucide-react";

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Open", value: "open" },
  { label: "Expired", value: "expired" },
];

const jobRoleOptions = [
  { label: "All Roles", value: "all" },
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

export const JobFilters = ({
  jobs,
  filters,
  onFilterChange,
  onReset,
  handleCreateJob,
}) => {
  return (
    <div className="flex mx-auto max-w-4xl items-center">
      <div className="w-full space-y-2 dark:bg-gray-900 rounded-lg">
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
                className="min-w-24 max-w-40"
              />
              <RangeFilter
                placeholder="Job Role"
                options={jobRoleOptions}
                value={filters.jobRole}
                onChange={(value) => onFilterChange("jobRole", value)}
                className="min-w-24 max-w-40"
              />
              <RangeFilter
                placeholder="Experience"
                options={experienceOptions}
                value={filters.experienceRange}
                onChange={(value) => onFilterChange("experienceRange", value)}
                className="min-w-24 max-w-40"
              />
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
      <div>
        <Button onClick={handleCreateJob} className="p-2">
          <Plus className="h-3 w-3" />
          <span className="text-xs hidden md:block">Post New Job</span>
        </Button>
      </div>
    </div>
  );
};
export const AppFilters = ({
  applicants,
  filters,
  onFilterChange,
  onReset,
}) => {
  return (
    <div className="flex mx-auto max-w-4xl items-center">
      <div className="w-full space-y-2 dark:bg-gray-900 rounded-lg">
        <div className="flex flex-col gap-4">
          {/* Search bar and Range Filters */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <div className="flex items-center gap-4">
              <SearchBar
                applicants={applicants}
                placeholder="Search by name, location, organization..."
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
              {/* <RangeFilter
                placeholder="Status"
                options={statusOptions}
                value={filters.status}
                onChange={(value) => onFilterChange("status", value)}
                className="min-w-24 max-w-40"
              /> */}
              {/* <RangeFilter
                placeholder="Job Role"
                options={jobRoleOptions}
                value={filters.jobRole}
                onChange={(value) => onFilterChange("jobRole", value)}
                className="min-w-24 max-w-40"
              /> */}
              {/* <RangeFilter
                placeholder="Experience"
                options={experienceOptions}
                value={filters.experienceRange}
                onChange={(value) => onFilterChange("experienceRange", value)}
                className="min-w-24 max-w-40"
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
      {/* <div>
        <Button onClick={handleCreateJob} className="p-2">
          <Plus className="h-3 w-3" />
          <span className="text-xs hidden md:block">Post New Job</span>
        </Button>
      </div> */}
    </div>
  );
};

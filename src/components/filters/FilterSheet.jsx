import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { JobFilters } from "./JobFilters";

export const FilterSheet = ({ jobs, filters, onFilterChange, onReset }) => {
  return (
    <Sheet className="">
      <SheetTrigger asChild>
        <Button
          variant="default"
          className="flex items-center gap-2 p-2 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-300"
        >
          <Filter className="size-3" />
          <span className="text-xs hidden md:block">Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:w-96 bg-white dark:bg-gray-900"
      >
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">Filter Jobs</SheetTitle>
          <SheetDescription className="text-sm text-gray-600 dark:text-gray-300">
            Refine your job search by applying filters. You can filter by
            status, experience, date and more.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          {/* Job Filters */}
          <JobFilters
            jobs={jobs}
            filters={filters}
            onFilterChange={onFilterChange}
            onReset={onReset}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

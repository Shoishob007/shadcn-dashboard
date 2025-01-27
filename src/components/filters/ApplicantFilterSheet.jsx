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
import { Filter} from "lucide-react";
import { AppFilters } from "@/components/filters/JobFilters";

export const ApplicantFilterSheet = ({
  applicants,
  filters,
  jobTitles,
  onFilterChange,
  onReset,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="default"
          className="flex items-center gap-2 p-1.5 sm:p-2 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-300"
        >
          <Filter className="size-3" />
          <span className="text-xs hidden md:block">Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-96">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">
            Filter Applicants
          </SheetTitle>
          <SheetDescription className="text-sm text-gray-600">
            Refine your applicant search by applying filters. You can filter by
            job title, name, location, and more.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          {/* Applicant Filters */}
          <AppFilters
            applicants={applicants}
            filters={filters}
            jobTitles={jobTitles}
            onFilterChange={onFilterChange}
            onReset={onReset}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

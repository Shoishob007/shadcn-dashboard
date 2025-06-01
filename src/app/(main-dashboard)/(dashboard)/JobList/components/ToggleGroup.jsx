import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ChevronDown } from "lucide-react";
import { capitalizeText } from "@/components/Capitalize";

const ToggleGroupComponent = ({
  steps,
  selectedStep,
  selectedStatus,
  setSelectedStep,
  setSelectedStatus,
}) => {
  return (
    <>
      <ToggleGroup
        className="flex gap-0 justify-start bg-white dark:bg-gray-800 w-fit rounded-full shadow-sm h-7 sm:h-9"
        type="single"
        value={selectedStatus}
        onValueChange={(value) => value && setSelectedStatus(value)}
      >
        <ToggleGroupItem
          className={`h-7 md:h-9 pr-2 pl-3 md:px-6 py-1 md:py-2 text-xs md:text-sm font-medium rounded-l-full transition-all duration-300 ${
            selectedStatus === "applied"
              ? "!text-white dark:!text-blue-900 shadow-md !bg-gray-800 dark:!bg-blue-300"
              : "bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-300 dark:hover:!bg-gray-700 dark:text-gray-300"
          }`}
          value="applied"
        >
          Applied
        </ToggleGroupItem>

        <ToggleGroupItem
          className={`h-7 md:h-9 px-2 md:px-6 py-1 md:py-2 text-xs md:text-sm font-medium rounded-none transition-all duration-300 ${
            selectedStatus === "shortlisted"
              ? "!text-white dark:!text-yellow-900 shadow-md !bg-gray-800 dark:!bg-yellow-300"
              : "bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-300 dark:hover:!bg-gray-700 dark:text-gray-300"
          }`}
          value="shortlisted"
        >
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-between w-full">
              Shortlisted
              <ChevronDown
                className={`w-4 h-4 ${
                  selectedStatus === "shortlisted"
                    ? "text-white"
                    : "text-gray-700"
                }`}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setSelectedStep("all")}>
                <div className="flex items-center justify-between w-full text-sm">
                  <div>All</div>
                  {selectedStep === "all" && "✔"}
                </div>
              </DropdownMenuItem>
              {steps?.map((step) => (
                <DropdownMenuItem
                  key={step}
                  onSelect={() => setSelectedStep(step)}
                >
                  <div className="flex items-center justify-between w-full gap-4 text-sm">
                    <div>{capitalizeText(step)}</div>
                    {selectedStep === step && "✔"}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </ToggleGroupItem>

        <ToggleGroupItem
          className={`h-7 md:h-9 px-2 md:px-6 py-1 md:py-2 text-xs md:text-sm font-medium rounded-none transition-all duration-300 ${
            selectedStatus === "hired"
              ? "!text-white dark:!text-emerald-900 shadow-md !bg-gray-800 dark:!bg-emerald-300"
              : "bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-300 dark:hover:!bg-gray-700 dark:text-gray-300"
          }`}
          value="hired"
        >
          Hired
        </ToggleGroupItem>
        <ToggleGroupItem
          className={`h-7 md:h-9 pr-3 pl-2 md:px-6 py-1 md:py-2 text-xs md:text-sm font-medium rounded-r-full transition-all duration-300 ${
            selectedStatus === "rejected"
              ? "!text-white dark:!text-red-900 shadow-md !bg-gray-800 dark:!bg-red-300"
              : "bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-300 dark:hover:!bg-gray-700 dark:text-gray-300"
          }`}
          value="rejected"
        >
          Rejected
        </ToggleGroupItem>
      </ToggleGroup>
    </>
  );
};

export default ToggleGroupComponent;

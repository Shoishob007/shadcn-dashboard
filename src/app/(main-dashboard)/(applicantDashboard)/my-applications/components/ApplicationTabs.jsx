"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const ApplicationTabs = () => {
  const [selectedStatus, setSelectedStatus] = useState("Applied");

  return (
    <Tabs
      value={selectedStatus}
      onValueChange={(value) => setSelectedStatus(value)}
    >
      <TabsList className="mb-6">
        <TabsTrigger
          value="Applied"
          className={`h-7 md:h-9 pr-2 pl-3 md:px-6 py-1 md:py-2 text-xs md:text-sm font-medium rounded-l-full transition-all duration-300 cursor-pointer ${
            selectedStatus === "Applied"
              ? "!text-white dark:!text-blue-900 shadow-md !bg-gray-800 dark:!bg-blue-300"
              : "bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-300 dark:hover:!bg-gray-700 dark:text-gray-300"
          }`}
        >
          Applied
        </TabsTrigger>
        <TabsTrigger
          value="Shortlisted"
          className={`h-7 md:h-9 pr-2 pl-3 md:px-6 py-1 md:py-2 text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer ${
            selectedStatus === "Shortlisted"
              ? "!text-white dark:!text-yellow-900 shadow-md !bg-gray-800 dark:!bg-yellow-300 rounded-l-none"
              : "bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-300 dark:hover:!bg-gray-700 dark:text-gray-300"
          }`}
        >
          Shortlisted
        </TabsTrigger>
        <TabsTrigger
          value="Rejected"
          className={`h-7 md:h-9 pr-2 pl-3 md:px-6 py-1 md:py-2 text-xs md:text-sm font-medium rounded-r-full transition-all duration-300 cursor-pointer ${
            selectedStatus === "Rejected"
              ? "!text-white dark:!text-red-900 shadow-md !bg-gray-800 dark:!bg-red-300 rounded-l-none"
              : "bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-300 dark:hover:!bg-gray-700 dark:text-gray-300"
          }`}
        >
          Rejected
        </TabsTrigger>
      </TabsList>

      <TabsContent value="Applied">Applied Content</TabsContent>
      <TabsContent value="Shortlisted">Shortlisted Content</TabsContent>
      <TabsContent value="Rejected">Rejected Content</TabsContent>
    </Tabs>
  );
};

export default ApplicationTabs;

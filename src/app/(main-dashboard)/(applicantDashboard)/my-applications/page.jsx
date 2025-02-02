"use client";
import { jobs } from "@/components/ApplicantDashboardUI/applicantJobData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { House } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MyApplications = () => {
  const [selectedStatus, setSelectedStatus] = useState("Applied");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const searchParams = useSearchParams();
  const statusFromQuery = searchParams.get("tab");

  useEffect(() => {
    if (statusFromQuery) {
      setSelectedStatus(statusFromQuery);
    }
  }, [statusFromQuery]);

  const filteredJobs =
    selectedStatus === "Applied"
      ? jobs.filter((job) => job.isApplied)
      : jobs.filter((job) => job.isApplied && job.status === selectedStatus);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPaginatedJobs = filteredJobs.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <House className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/profile">My Applications</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Tabs
        value={selectedStatus}
        onValueChange={(value) => {
          setSelectedStatus(value);
          setCurrentPage(1);
        }}
      >
        <TabsList className="mb-6">
          <TabsTrigger
            value="Applied"
            className={`h-7 md:h-9 pr-2 pl-3 md:px-6 py-1 md:py-2 text-xs md:text-sm font-medium rounded-l-full transition-all duration-300 cursor-pointer ${
              selectedStatus === "Applied"
                ? "!text-white dark:!text-blue-900 shadow-md !bg-gray-800 dark:!bg-blue-300 "
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

        <TabsContent value="Applied">
          <ApplicationCards
            applications={currentPaginatedJobs}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </TabsContent>
        <TabsContent value="Shortlisted">
          <ApplicationCards
            applications={currentPaginatedJobs}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </TabsContent>
        <TabsContent value="Rejected">
          <ApplicationCards
            applications={currentPaginatedJobs}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ApplicationCards = ({
  applications,
  handlePageChange,
  currentPage,
  totalPages,
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {applications.map((app, index) => {
            const date = app.deadline;
            const formattedDate = format(date, "MMM dd, yyyy");
            return (
              <div key={index}>
                <Card className="w-full hover:border hover:border-black duration-300 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 font-medium bg-gray-200 rounded-full flex items-center justify-center">
                        <span>{app.orgName.slice(0, 1)}</span>
                      </div>
                      <div>
                        <h1 className="text-[15px] font-medium">
                          {app.orgName}
                        </h1>
                        <p className="text-xs">{app.location}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h1 className="text-[17px] font-semibold">{app.title}</h1>
                      <div className="flex items-center mt-3 gap-3">
                        <span
                          className={`text-xs font-semibold capitalize ${
                            app.employeeType === "full-time"
                              ? "text-[#20c997]"
                              : app.employeeType === "contractual"
                              ? "text-[#ffc107]"
                              : app.employeeType === "part-time"
                              ? "text-[#6610f2]"
                              : "text-black"
                          }`}
                        >
                          {app.employeeType}
                        </span>
                        <span className="text-xs font-medium">
                          {app.yearOfExperience}{" "}
                          {app.yearOfExperience === 1 ? "year" : "years"}
                        </span>
                        {/* <span className="text-xs font-medium">{jobType}</span> */}
                      </div>
                      <div className="mt-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xs">
                            Applied on:{" "}
                            <span className="font-medium">{formattedDate}</span>
                          </span>
                          <span
                            className={`text-xs lowercase font-medium p-1 rounded-md ${
                              app.status === "Applied"
                                ? "text-blue-500 bg-blue-100"
                                : app.status === "Shortlisted"
                                ? "text-yellow-500 bg-yellow-100"
                                : "text-red-500 bg-red-100"
                            }`}
                          >
                            {app.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div>
                      <div>
                        <span className="font-bold">${app.salary}</span>
                        <span className="text-sm">/month</span>
                      </div>
                    </div>
                    <Button size="sm">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyApplications;

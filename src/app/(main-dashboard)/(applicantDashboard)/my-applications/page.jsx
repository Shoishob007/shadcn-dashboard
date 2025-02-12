"use client";
import { jobs } from "@/components/ApplicantDashboardUI/applicantJobData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { House } from "lucide-react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ApplicationCards from "./components/ApplicationCards";

const MyApplications = () => {
  const { data: session, status } = useSession();
  const accessToken = session?.access_token;

  const [selectedStatus, setSelectedStatus] = useState("Applied");
  const [currentPage, setCurrentPage] = useState(1);
  const [application, setApplication] = useState([]);
  const itemsPerPage = 6;

  const searchParams = useSearchParams();
  const statusFromQuery = searchParams.get("tab");

  useEffect(() => {
    const getJobApplications = async () => {
      if (status !== "authenticated" || !accessToken) {
        console.error("Access Token Missing or Session not authenticated!");
        return;
      }
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setApplication(data.docs);
        console.log("Job data:: ", data);
      } catch (error) {
        console.log("Error fetching job applications:: ", error.message);
      }
    };
    getJobApplications();
  }, [accessToken, status]);

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

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  console.log("Job Application data:: ", application);

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
            application={application}
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

export default MyApplications;

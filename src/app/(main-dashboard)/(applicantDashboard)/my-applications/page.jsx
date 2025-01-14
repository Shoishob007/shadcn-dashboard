"use client";
import { jobs } from "@/components/ApplicantDashboardUI/applicantJobData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, MapPin, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import companyLogo from "../../../../../public/assests/company.png";
import ApplicantStepsBar from "./components/ApplicantStepsBar";
import ApplicantionStatus from "./components/ApplicantionStatus";

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
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
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
        {applications.map((app, index) => (
          <div key={index}>
            <Card className="flex flex-col justify-between w-full shadow hover:border hover:border-black duration-300 bg-white rounded cursor-pointer">
              {/* Header with Company Logo and Job Title */}
              <Link href={`/my-applications/${app.id}`}>
                <CardHeader className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-800 p-5 rounded-t-md">
                  <Image
                    src={companyLogo}
                    width={50}
                    height={50}
                    alt="logo"
                    className="rounded-full border border-gray-300"
                  />
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      {app.title}
                    </CardTitle>
                    <p className="text-sm text-center text-gray-500 dark:text-gray-300">
                      {app.orgName}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="p-5 flex flex-col flex-grow">
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-4">
                    {app.description.slice(0, 100)}...
                  </p>
                  <ul className="mt-3 text-sm text-gray-600 space-y-2">
                    <li className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                      <span className="dark:text-gray-300">
                        Location: {app.location}
                      </span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                      <span className="dark:text-gray-300">
                        Salary: ${app.salary} per month{" "}
                      </span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                      <span className="dark:text-gray-300">
                        Experience: {app.yearOfExperience} Years of Experience
                      </span>
                    </li>
                  </ul>

                  {/* Application Status */}
                  <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                    <p>
                      Status:
                      <span
                        className={`font-semibold ml-1 ${
                          app.status === "Applied"
                            ? "text-blue-500"
                            : app.status === "Shortlisted"
                            ? "text-yellow-500"
                            : app.status === "Hired"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {app.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Applied on: {app.published}
                    </p>
                  </div>
                </CardContent>
              </Link>

              <hr className="border-gray-200" />
              <CardFooter className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-5 rounded-b-md mt-auto">
                <div className="w-full md:w-[60%]">
                  <ApplicantStepsBar />
                </div>
                <ApplicantionStatus viewStatus={app.status} />
              </CardFooter>
            </Card>
          </div>
        ))}
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
                  ? "bg-emerald-500 text-white"
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

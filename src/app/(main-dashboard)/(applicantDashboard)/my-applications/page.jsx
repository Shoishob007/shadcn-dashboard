"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import companyLogo from "../../../../../public/assests/company.png";

const MyApplications = () => {
  const applications = [
    {
      id: "1",
      jobTitle: "Frontend Developer",
      companyName: "Tech Innovators Ltd.",
      jobStatus: "Open",
      applicantStatus: "Shortlisted", // Shortlisted
      applicationDate: "2024-12-01",
      deadline: "2024-12-15",
      salary: "$50,000",
      jobType: "Full-Time",
      employeeType: "Contractual",
      location: "Remote",
      category: "Software Development",
    },
    {
      id: "2",
      jobTitle: "UI/UX Designer",
      companyName: "DesignCraft Studio",
      jobStatus: "Closed",
      applicantStatus: "Applied", // Applied
      applicationDate: "2024-11-28",
      deadline: "2024-12-10",
      salary: "$60,000",
      jobType: "Full-Time",
      employeeType: "Permanent",
      location: "On-site",
      category: "Design",
    },
    {
      id: "3",
      jobTitle: "JavaScript Developer",
      companyName: "CodeCrafters Inc.",
      jobStatus: "Open",
      applicantStatus: "Shortlisted", // Shortlisted
      applicationDate: "2024-11-20",
      deadline: "2024-12-05",
      salary: "$55,000",
      jobType: "Part-Time",
      employeeType: "Freelance",
      location: "Remote",
      category: "Web Development",
    },
    {
      id: "4",
      jobTitle: "Backend Engineer",
      companyName: "DevSolutions",
      jobStatus: "Closed",
      applicantStatus: "Rejected", // Rejection
      applicationDate: "2024-10-10",
      deadline: "2024-10-30",
      salary: "$70,000",
      jobType: "Full-Time",
      employeeType: "Permanent",
      location: "On-site",
      category: "Software Engineering",
    },
    {
      id: "5",
      jobTitle: "DevOps Engineer",
      companyName: "CloudBridge Systems",
      jobStatus: "Open",
      applicantStatus: "Applied", // Applied
      applicationDate: "2024-12-02",
      deadline: "2024-12-20",
      salary: "$80,000",
      jobType: "Full-Time",
      employeeType: "Permanent",
      location: "Remote",
      category: "Cloud Infrastructure",
    },
  ];

  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "Applied";
  const [selectedStatus, setSelectedStatus] = useState(activeTab);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredApplications = applications.filter(
    (app) => app.applicantStatus === selectedStatus || selectedStatus === "All"
  );
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const currentApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">My Applications</h1>
      <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
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
            className={` h-7 md:h-9 pr-2 pl-3 md:px-6 py-1 md:py-2 text-xs md:text-sm font-medium rounded-r-full transition-all duration-300 cursor-pointer ${
              selectedStatus === "Rejected"
                ? "!text-white dark:!text-red-900 shadow-md !bg-gray-800 dark:!bg-red-300 rounded-l-none"
                : "bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-300 dark:hover:!bg-gray-700 dark:text-gray-300"
            }`}
          >
            Rejected
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Applied">
          <ApplicationCards applications={currentApplications} />
        </TabsContent>
        <TabsContent value="Shortlisted">
          <ApplicationCards applications={currentApplications} />
        </TabsContent>
        <TabsContent value="Rejected">
          <ApplicationCards applications={currentApplications} />
        </TabsContent>
      </Tabs>

      {/* Pagination Section */}
      {filteredApplications.length > itemsPerPage && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      handlePageChange(currentPage - 1);
                    }
                  }}
                  className="cursor-pointer"
                />
              </PaginationItem>

              {/* Dynamically generate page numbers */}
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index + 1}>
                  <PaginationLink
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(index + 1);
                    }}
                    isActive={currentPage === index + 1}
                    className="cursor-pointer"
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                      handlePageChange(currentPage + 1);
                    }
                  }}
                  className="cursor-pointer"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

const ApplicationCards = ({ applications }) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6">
        {applications.map((app, index) => (
          <Link href={`/my-applications/${app.id}`} key={index}>
            <div className="bg-white border border-gray-200 shadow rounded-lg p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{app.jobTitle}</h2>
                  <p className="text-sm text-gray-600">{app.companyName}</p>
                </div>
                <Image src={companyLogo} alt="Company Logo" width={60} />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <MapPin size={16} /> {app.location}
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <GraduationCap size={16} />{" "}
                  <span>B.Sc Computer Science and Engineering</span>
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <Calendar size={16} /> Application Date:{" "}
                    {app.applicationDate}
                  </p>
                  <p className="font-semibold text-gray-800">{app.salary}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;

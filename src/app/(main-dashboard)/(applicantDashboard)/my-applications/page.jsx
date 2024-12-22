"use client";
import ApplicantProgress from "@/components/ApplicantDashboardUI/ApplicantProgress";
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
  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">My Applications</h1>
      <Tabs defaultValue={activeTab}>
        <TabsList className="mb-6">
          <TabsTrigger className="ml-6 text-md" value="Applied">
            Applied
          </TabsTrigger>
          <TabsTrigger className="ml-6 text-md" value="Shortlisted">
            Shortlisted
          </TabsTrigger>
          <TabsTrigger className="ml-6 text-md" value="Rejected">
            Rejected
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Applied">
          <ApplicationCards applications={applications} />
        </TabsContent>
        <TabsContent value="Shortlisted">
          <ApplicationCards
            applications={applications.filter(
              (app) => app.applicantStatus === "Shortlisted"
            )}
          />
        </TabsContent>
        <TabsContent value="Rejected">
          <ApplicationCards
            applications={applications.filter(
              (app) => app.applicantStatus === "Rejected"
            )}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ApplicationCards = ({ applications }) => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(applications.length / itemsPerPage);

  const currentApplications = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="grid grid-cols-1  gap-6">
        {currentApplications.map((app, index) => {
          const progressSteps = [
            "In Review",
            "Coding Test",
            "Interview",
            "Offer",
          ];
          // const currentStepIndex = progressSteps.indexOf(job.applicantStatus);
          const currentStepIndex =
            progressSteps.indexOf(app.applicantStatus) + 1;
          return (
            <Link href={`/my-applications/${app.id}`} key={index}>
              <div className="bg-white border border-gray-200 shadow rounded-lg p-6 relative">
                {/* Company Logo and Job Info */}
                <div className="flex items-center justify-between ">
                  <div>
                    <h2 className="text-lg font-semibold">{app.jobTitle}</h2>
                    <p className="text-sm text-gray-600">{app.companyName}</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <div className="flex gap-2">
                        <div
                          className={`py-1 px-3 rounded-full text-xs font-medium flex items-center gap-1 ${
                            app.jobStatus === "Open"
                              ? "border border-green-600 text-green-600"
                              : "border border-red-600 text-red-600"
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              app.jobStatus === "Open"
                                ? "bg-green-600"
                                : "bg-red-500"
                            }`}
                          ></div>{" "}
                          <span>{app.jobStatus}</span>
                        </div>
                        <span
                          className={`py-1 px-3 rounded-full text-xs font-medium ${
                            app.applicantStatus === "Shortlisted"
                              ? "bg-yellow-100 text-yellow-600"
                              : app.applicantStatus === "Rejected"
                              ? "bg-red-100 text-red-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {app.applicantStatus}
                        </span>
                      </div>
                    </div>
                    <Image src={companyLogo} alt="Company Logo" width={60} />
                  </div>
                </div>

                {/* Job Details */}
                <div className=" space-y-2">
                  {/* <p className="text-sm text-gray-700">
                    <span className="font-medium">Category:</span>{" "}
                    {app.category}
                  </p> */}
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <MapPin size={16} /> {app.location}
                  </p>
                  <div className="text-sm text-gray-700 flex items-center gap-2">
                    <span>
                      <GraduationCap size={16} />
                    </span>
                    <div>
                      <span>B.Sc</span>{" "}
                      <span>Computer Science and Engineering</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-700 flex items-center gap-2">
                      <Calendar size={16} /> Application Date:{" "}
                      {app.applicationDate}
                    </p>
                    <div className=" flex items-center justify-center">
                      <ApplicantProgress currentStepIndex={currentStepIndex} />
                    </div>
                    <p className="font-semibold text-gray-800">{app.salary}</p>
                  </div>
                  {/* <p className="text-sm text-gray-700 flex items-center gap-2">
                    <Calendar size={16} /> Deadline: {app.deadline}
                  </p> */}
                </div>

                {/* Status and Salary */}
              </div>
            </Link>
          );
        })}
      </div>
      {applications.length > itemsPerPage && (
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

export default MyApplications;

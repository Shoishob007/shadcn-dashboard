"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Adjust path as needed
import { Bookmark, Calendar, CheckCircle, MapPin, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import companyLogo from "../../../../../public/assests/company.png";

const MyApplications = () => {
  const applications = [
    {
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

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-semibold mb-6">My Applications</h1>
      <Tabs defaultValue="Applied">
        <TabsList className="mb-6">
          <TabsTrigger className="ml-6 text-md" value="Applied">
            Applied
          </TabsTrigger>
          <TabsTrigger className="ml-6 text-md" value="Shortlisted">
            Shortlisted
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
      </Tabs>
    </div>
  );
};

const ApplicationCards = ({ applications }) => {
  if (applications.length === 0) {
    return <p className="text-center text-gray-500">No applications found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {applications.map((app, index) => (
        <Link href={"/job-details"} key={index}>
          <div className="bg-white border border-gray-200 shadow rounded-lg p-6 relative">
            {/* Company Logo and Job Info */}
            <div className="flex items-center justify-between ">
              
              <div>
                <h2 className="text-lg font-semibold">{app.jobTitle}</h2>
                <p className="text-sm text-gray-600">{app.companyName}</p>
              </div>
              <Image src={companyLogo} alt="Company Logo" width={60} />
            </div>

            {/* Job Details */}
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Category:</span> {app.category}
              </p>
              <p className="text-sm text-gray-700 flex items-center gap-2">
                <MapPin size={16} /> {app.location}
              </p>
              <p className="text-sm text-gray-700 flex items-center gap-2">
                <Calendar size={16} /> Application Date: {app.applicationDate}
              </p>
              <p className="text-sm text-gray-700 flex items-center gap-2">
                <Calendar size={16} /> Deadline: {app.deadline}
              </p>
            </div>

            {/* Status and Salary */}
            <div className="flex justify-between items-center mt-4">
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
                      app.jobStatus === "Open" ? "bg-green-600" : "bg-red-500"
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
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {app.applicantStatus}
                </span>
              </div>
              <p className="font-semibold text-gray-800">{app.salary}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MyApplications;

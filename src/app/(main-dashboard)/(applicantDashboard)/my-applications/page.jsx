"use client";
import { jobs } from "@/components/ApplicantDashboardUI/applicantJobData";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import companyLogo from "../../../../../public/assests/company.png";

import { DollarSign, User } from "lucide-react";
import ApplicantionStatus from "./components/ApplicantionStatus";
import ApplicantStepsBar from "./components/ApplicantStepsBar";

const MyApplications = () => {
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") || "Applied";
  console.log(activeTab);
  const [selectedStatus, setSelectedStatus] = useState(activeTab);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const myApplied = jobs.filter(
    (applied) =>
      applied.status == "Applied" ||
      applied.status == "Shortlisted" ||
      applied.status == "Rejected"
  );
  console.log(myApplied);
  const myShortlisted = jobs.filter(
    (shortlisted) => shortlisted.status === "Shortlisted"
  );
  const myRejected = jobs.filter((rejected) => rejected.status === "Rejected");

  // const filteredApplications = jobs.filter((app) => {
  //   if (selectedStatus === "Applied") {
  //     return app.isApplied;
  //   } else {
  //     return app.isApplied && app.applicantStatus === selectedStatus;
  //   }
  // });

  // const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  // const currentApplications = filteredApplications.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

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
          <ApplicationCards applications={myApplied} />
        </TabsContent>
        <TabsContent value="Shortlisted">
          <ApplicationCards applications={myShortlisted} />
        </TabsContent>
        <TabsContent value="Rejected">
          <ApplicationCards applications={myRejected} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ApplicationCards = ({ applications }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {applications.map((app, index) => (
          <div key={index}>
            <Card className="flex flex-col justify-between w-full shadow hover:border hover:border-black duration-300 bg-white rounded cursor-pointer">
              {/* Header with Company Logo and Job Title */}
              <Link href={`/my-applications/${app.id}`}>
                <CardHeader className="flex items-center space-x-4 bg-gray-50 p-4 rounded-t-md">
                  <Image
                    src={companyLogo}
                    width={50}
                    height={50}
                    alt="logo"
                    className="rounded-full border border-gray-300"
                  />
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-800">
                      {app.title}
                    </CardTitle>
                    <p className="text-sm text-center text-gray-500">
                      {app.orgName}
                    </p>
                  </div>
                </CardHeader>

                {/* Content with Job Application Details */}
                <CardContent className="p-4 flex flex-col flex-grow">
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                    {app.description.slice(0, 100)}...
                  </p>
                  <ul className="mt-3 text-sm text-gray-600 space-y-2">
                    <li className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>Location: {app.location}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span>Salary: ${app.salary} per month </span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>
                        Experience: {app.yearOfExperience} Years of Experience
                      </span>
                    </li>
                  </ul>

                  {/* Application Status */}
                  <div className="mt-4 text-sm text-gray-700">
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
                    <p className="text-sm text-gray-500">
                      Applied on: {app.published}
                    </p>
                  </div>
                </CardContent>
              </Link>

              {/* Footer with Apply Button */}
              <hr className="border-gray-200" />
              <CardFooter className="flex justify-between items-center bg-gray-50 p-4 rounded-b-md mt-auto">
               <div className="w-full md:w-1/2">
                  <ApplicantStepsBar/>
                </div> 
               <ApplicantionStatus viewStatus={app.status} />
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;

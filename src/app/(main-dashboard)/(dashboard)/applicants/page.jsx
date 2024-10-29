"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import PageTitle from "@/components/PageTitle";
import FormatTitle from "@/components/TitleFormatter";

const ApplicantsPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (route) => {
    router.push(route);
  };

  const pageTitle = FormatTitle(pathname);

  return (
    <>
      {" "}
      <PageTitle title={pageTitle} className={"pb-4 ml-2"} />
      <div className="flex flex-col space-y-4 mr-2 items-center  text-center justify-center">
        <div className="w-2/3 md:w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* For applicants data */}
          <Card
            className="cursor-pointer hover:border-gray-950 transition-shadow duration-300 ease-in-out"
            onClick={() => handleNavigation("/applicants/view")}
          >
            <CardHeader>
              <CardTitle>View All Applicants</CardTitle>
              <CardDescription>
                Browse and manage all the applicants available for the jobs.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              Click to view the list of applicants regardless the job positions.
            </CardContent>
          </Card>

          {/* for shortlisted applicants */}
          <Card
            className="cursor-pointer hover:border-gray-950 transition-shadow duration-300 ease-in-out"
            onClick={() => handleNavigation("/applicants/view/shortlisted")}
          >
            <CardHeader>
              <CardTitle>View Shortlisted Applicants</CardTitle>
              <CardDescription>
                Browse and manage the shortlisted applicants
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              Click to view all the shortlisted applicants along with the
              respective jobs.
            </CardContent>
          </Card>
        </div>
        <div className="">
          <Card
            className="cursor-pointer hover:border-gray-950 transition-shadow duration-300 ease-in-out"
            onClick={() => handleNavigation("/applicants/view/hired")}
          >
            <CardHeader>
              <CardTitle>View Hired Applicants</CardTitle>
              <CardDescription>
                Browse and manage the hired applicants
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              Click to view all the hired applicants along with the respective
              designation.
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ApplicantsPage;

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const ApplicantsPage = () => {
  const router = useRouter();

  const handleNavigation = (route) => {
    router.push(route);
  };

  return (
    <div className="flex flex-col items-center h-full justify-center text-center space-y-4 mr-2">
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
          onClick={() => handleNavigation("/applicants/shortlisted")}
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
    </div>
  );
};

export default ApplicantsPage;

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

const JobsPage = () => {
  const router = useRouter();

  const handleNavigation = (route) => {
    router.push(route);
  };

  return (
    <div className="flex flex-col items-center h-full justify-center text-center space-y-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-2/3 md:w-full">
        {/* For jobs data */}
        <Card
          className="cursor-pointer hover:border-gray-950 transition-shadow duration-300 ease-in-out"
          onClick={() => handleNavigation("/jobs/view")}
        >
          <CardHeader>
            <CardTitle>View All Jobs</CardTitle>
            <CardDescription>
              Browse and manage all the job postings available on the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            Click to view the list of available job positions.
          </CardContent>
        </Card>

        {/* for creating jobs */}
        <Card
          className="cursor-pointer hover:border-gray-950 transition-shadow duration-300 ease-in-out"
          onClick={() => handleNavigation("/jobs/create")}
        >
          <CardHeader>
            <CardTitle>Create a New Job</CardTitle>
            <CardDescription>
              Post a new job and manage your job listings effectively.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            Click to create a new job posting.
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:border-gray-950 transition-shadow duration-300 ease-in-out"
          onClick={() => handleNavigation("/jobs/view/open")}
        >
          <CardHeader>
            <CardTitle>View Open Jobs</CardTitle>
            <CardDescription>
              Browse and manage all the open jobs on the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            Click to view the list of available open job positions.
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:border-gray-950 transition-shadow duration-300 ease-in-out"
          onClick={() => handleNavigation("/jobs/view/closed")}
        >
          <CardHeader>
            <CardTitle>View Closed Jobs</CardTitle>
            <CardDescription>
              Browse and manage all the closed jobs on the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            Click to view the list of available closed job positions.
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobsPage;

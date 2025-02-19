"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AppliedContent from "./AppliedContent";

const ApplicationTabs = () => {
  const { data: session, status } = useSession();
  const accessToken = session?.access_token;
  const [selectedStatus, setSelectedStatus] = useState("Applied");
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch job applications
  useEffect(() => {
    if (!accessToken) return;

    const getJobApplicationData = async () => {
      try {
        setLoading(true);
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

        const responseData = await response.json();
        console.log("Job Applications data: ", responseData);
        setMyApplications(responseData?.docs || []);
      } catch (error) {
        console.error("Error fetching job applications:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getJobApplicationData();
  }, [accessToken]);


//   Applied jobs
//   const appliedJobs = myApplications.filter(
//     (app) => app?.applicationStatus?.docs?.length === 0
//   );

// Applied jobs
const appliedJobs = myApplications?.filter(
  (myApp) =>
    !myApp?.applicationStatus?.docs || myApp?.applicationStatus?.docs.length === 0);
//   console.log("Applied Jobs:", appliedJobs);

//   Shortlisted jobs
const shortlistedJobs = myApplications?.filter(
  (myApp) => myApp?.applicationStatus?.docs?.length > 0);
//   console.log("Shortlisted jobs: ", shortlistedJobs)

  if (status === "loading" || loading) {
    return <Skeleton className="h-20 w-full rounded-lg" />;
  }

  return (
    <Tabs
      value={selectedStatus}
      onValueChange={(value) => setSelectedStatus(value)}
    >
      <TabsList className="mb-6">
        <TabsTrigger
          value="Applied"
          className={`h-7 md:h-9 pr-2 pl-3 md:px-6 py-1 md:py-2 text-xs md:text-sm font-medium rounded-l-full transition-all duration-300 cursor-pointer ${
            selectedStatus === "Applied"
              ? "!text-white dark:!text-blue-900 shadow-md !bg-gray-800 dark:!bg-blue-300"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appliedJobs?.map((appliedJob) => (
            <AppliedContent key={appliedJob.id} appliedJob={appliedJob} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="Shortlisted">
        {selectedStatus === "Shortlisted" && "Shortlisted Content"}
      </TabsContent>

      <TabsContent value="Rejected">
        {selectedStatus === "Rejected" && "Rejected Content"}
      </TabsContent>
    </Tabs>
  );
};

export default ApplicationTabs;

"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AppliedContent from "./AppliedContent";
import RejectedContent from "./RejectedContent";
import ShortlistedContent from "./ShortlistedContent";

const ApplicationTabs = ({ activeTab }) => {
  const { data: session, status } = useSession();
  const accessToken = session?.access_token;
  const [selectedStatus, setSelectedStatus] = useState(activeTab);

  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);


    // Extra validation for active tabs
    useEffect(() => {
      if (activeTab) {
        setSelectedStatus(activeTab);
      }
    }, [activeTab]);


  // Fetch job applications
  useEffect(() => {
    if (!accessToken) return;

    const getJobApplicationData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications?limit=100`,
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
        // console.log("Job Applications data: ", responseData);
        setMyApplications(responseData?.docs || []);
      } catch (error) {
        console.error("Error fetching job applications:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getJobApplicationData();
  }, [accessToken]);

  // Applied jobs
  const appliedJobs = myApplications?.filter(
    (myApp) =>
      !myApp?.applicationStatus?.docs ||
      myApp?.applicationStatus?.docs.length === 0
  );

  //   Shortlisted jobs
  const shortlistedJobs = myApplications?.filter(
    (myApp) => myApp?.applicationStatus?.docs?.length > 0
  );

  // Rejected jobs
  const rejectedJobs = myApplications?.filter(
    (myApp) =>
      myApp?.applicationStatus?.docs?.length > 0 &&
      myApp?.applicationStatus?.docs[0]?.status === "Rejected"
  );

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
        {appliedJobs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appliedJobs.map((appliedJob) => (
              <AppliedContent key={appliedJob.id} appliedJob={appliedJob} />
            ))}
          </div>
        ) : (
          <p className="font-semibold capitalize">No applied jobs available.</p>
        )}
      </TabsContent>

      <TabsContent value="Shortlisted">
        {shortlistedJobs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shortlistedJobs.map((shortlistedJob) => (
              <ShortlistedContent
                key={shortlistedJob.id}
                shortlistedJob={shortlistedJob}
              />
            ))}
          </div>
        ) : (
          <p className="font-semibold capitalize">
            No shortlisted jobs available.
          </p>
        )}
      </TabsContent>

      <TabsContent value="Rejected">
        {rejectedJobs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rejectedJobs.map((rejectedJob) => (
              <RejectedContent key={rejectedJob.id} rejectedJob={rejectedJob} />
            ))}
          </div>
        ) : (
          <p className="font-semibold capitalize">
            No rejected jobs available.
          </p>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ApplicationTabs;

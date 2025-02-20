"use client";
import { Briefcase, CircleX, Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

export default function DashboardCardSection() {
  const router = useRouter();
  const [myApplications, setMyApplications] = useState([]);
  const { data: session } = useSession();
  const accessToken = session?.access_token;

  const handleCardClick = (tabName) => {
    router.push(`/my-applications?tab=${tabName}`);
  };

  useEffect(() => {
    if (!accessToken) return;

    const getJobApplicationData = async () => {
      try {
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
        setMyApplications(responseData?.docs || []);
      } catch (error) {
        console.error("Error fetching job applications:", error.message);
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

  // Shortlisted jobs
  const shortlistedJobs = myApplications?.filter(
    (myApp) => myApp?.applicationStatus?.docs?.length > 0
  );

  // Rejected jobs
  const rejectedJobs = myApplications?.filter(
    (myApp) =>
      myApp?.applicationStatus?.docs?.length > 0 &&
      myApp?.applicationStatus?.docs[0]?.status === "Rejected"
  );

  return (
    <div>
      <div className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 lg:grid-cols-3 mb-4">
        <div
          onClick={() => handleCardClick("Applied")}
          className="md:flex-1 cursor-pointer"
        >
          <div className="flex items-center justify-between p-5 bg-white border border-gray-200 dark:border-none dark:hover:scale-105 dark:duration-500 dark:transition-all rounded shadow-sm hover:border hover:border-black transition-shadow duration-300 w-full dark:bg-gray-800">
            <div className="w-full flex flex-col gap-5">
              <section className="flex items-center justify-between">
                <h3 className="text-sm dark:text-gray-200">Applied Job</h3>
                <div className="text-gray-500">
                  <Briefcase className="h-6 w-6 text-gray-400 dark:text-gray-200" />
                </div>
              </section>
              <section className="text-2xl font-semibold dark:text-gray-200">
                <CountUp
                  start={0}
                  end={appliedJobs.length}
                  duration={2}
                  delay={1}
                />
              </section>
            </div>
          </div>
        </div>

        <div
          onClick={() => handleCardClick("Shortlisted")}
          className="md:flex-1 cursor-pointer"
        >
          <div className="flex items-center justify-between p-5 bg-white border border-gray-200 dark:border-none dark:hover:scale-105 dark:duration-500 dark:transition-all rounded shadow-sm hover:border hover:border-black transition-shadow duration-300 w-full dark:bg-gray-800">
            <div className="w-full flex flex-col gap-5">
              <section className="flex items-center justify-between">
                <h3 className="text-sm dark:text-gray-200">Shortlisted</h3>
                <div className="text-gray-500">
                  <Heart className="h-6 w-6 text-gray-400 dark:text-gray-200" />
                </div>
              </section>
              <section className="text-2xl font-semibold dark:text-gray-200">
                <CountUp
                  start={0}
                  end={shortlistedJobs.length}
                  duration={2}
                  delay={1}
                />
              </section>
            </div>
          </div>
        </div>

        <div
          onClick={() => handleCardClick("Rejected")}
          className="flex-1 cursor-pointer"
        >
          <div className="flex items-center justify-between p-5 bg-white border border-gray-200 dark:border-none dark:hover:scale-105 dark:duration-500 dark:transition-all rounded shadow-sm hover:border hover:border-black transition-shadow duration-300 w-full dark:bg-gray-800">
            <div className="w-full flex flex-col gap-5">
              <section className="flex items-center justify-between">
                <h3 className="text-sm dark:text-gray-200">Rejected</h3>
                <div className="text-gray-500">
                  <CircleX className="h-6 w-6 text-gray-400 dark:text-gray-200" />
                </div>
              </section>
              <section className="text-2xl font-semibold dark:text-gray-200">
                <CountUp
                  start={0}
                  end={rejectedJobs.length}
                  duration={2}
                  delay={1}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

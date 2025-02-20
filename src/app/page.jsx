/* eslint-disable react/jsx-key */
"use client";
import { applicantsData } from "@/app/(main-dashboard)/(dashboard)/demoAppList/components/applicantsData";
import ApplicantDashboardPage from "@/components/ApplicantDashboardUI/ApplicantDashboardPage";
import Card, { CardContent } from "@/components/Card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import useRoleStore from "@/stores/roleStore/useRoleStore";
import { Briefcase, CalendarDays, House, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ApplicantsList from "./(main-dashboard)/(dashboard)/demoAppList/page";
import { documents as jobApplicants } from "./(main-dashboard)/(dashboard)/demoJobList/components/jobApplicants";
import { documents as jobData } from "./(main-dashboard)/(dashboard)/demoJobList/components/jobData";
import JobList from "./(main-dashboard)/(dashboard)/demoJobList/page";

const totalSchedules = applicantsData.filter(
  (applicant) => applicant.schedule
).length;

export default function Home() {
  const router = useRouter();
  const { currentRole, setRole } = useRoleStore();
  const { data: session } = useSession();
  const [showFilters, setShowFilters] = useState(false);
  const [limitToThree, setLimitToThree] = useState(true);
  const [inHome, setInHome] = useState(true);
  const [jobDetailsData, setJobDetailsData] = useState([]);
  const [allApplicantions, setAllApplicantions] = useState([]);
  const [shortlistedCount, setShortlistedCount] = useState(2);

  // const [totalSchedules, setTotalSchedules] = useState(0);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-details`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );
        const data = await response.json();
        setJobDetailsData(data.docs);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    const fetchApplicantsData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );
        const data = await response.json();
        console.log("Applicants data fetched:", data);

        setAllApplicantions(data.docs);
        console.log("data.docs :: ", data.docs);

        const count = data.docs.reduce((acc, applicant) => {
          if (
            applicant.applicationStatus &&
            applicant.applicationStatus.docs[0].status === "shortlisted"
          ) {
            return acc + 1;
          }
          return acc;
        }, 0);

        setShortlistedCount(count);
      } catch (error) {
        console.error("Error fetching applicants data:", error);
      }
    };

    if (session) {
      fetchJobData();
      fetchApplicantsData();
    } else {
      console.warn("Session is not available");
    }
  }, [session]);

  const handleClick = () => {
    router.push("/demoBillings/pricing");
  };

  console.log("shortlistedCount :: ", shortlistedCount);

  const cardData = [
    {
      label: "Total Openings",
      amount: jobDetailsData.length,
      discription: "+2 from last three months",
      icon: Briefcase,
      href: "/demoJobList",
    },
    {
      label: "Total Applicants",
      amount: allApplicantions.length,
      discription: "+5 from last three months",
      icon: Users,
      href: "/demoAppList",
    },
    {
      label: "Upcoming Schedule",
      amount: shortlistedCount,
      discription: "+3 since last month",
      icon: CalendarDays,
      href: "/demoSchedule",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {currentRole === "applicant" ? (
        <ApplicantDashboardPage currentRole={currentRole} session={session} />
      ) : (
        <div>
          <div className="mb-6 flex justify-between items-center">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <House className="h-4 w-4" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div
              onClick={handleClick}
              className="hidden group text-gray-600 dark:text-gray-200 hover:text-white px-10 py-2 sm:flex flex-col items-center bg-white bg-gradient-to-tr from-white to-white dark:from-gray-800 dark:to-gray-800 rounded-md border-[1px] border-red-700 hover:from-rose-500 hover:to-orange-500 dark:hover:from-rose-600 dark:hover:to-orange-600 cursor-pointer"
            >
              <h2 className="text-sm font-semibold">
                Go{" "}
                <span className="text-red-500 group-hover:text-white dark:group-hover:text-gray-300">
                  Pro
                </span>
              </h2>
              <p className="text-xs">Get 3x more facilities</p>
            </div>
          </div>
          <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 lg:grid-cols-3 mb-4">
            {cardData.map((d, i) => (
              <Link href={d.href || "#"} key={i}>
                <Card
                  amount={d.amount}
                  discription={d.discription}
                  icon={d.icon}
                  label={d.label}
                />
              </Link>
            ))}
          </section>
          <section className="grid grid-cols-1 gap-4 transition-all dark:text-gray-200">
            <CardContent className="bg-white dark:bg-gray-800 hover:shadow-md ">
              <p className="text-xl font-semibold text-center">Recent Jobs</p>
              <JobList showFilters={showFilters} className="shadow-none" />
            </CardContent>
            <CardContent className="flex justify-between gap-4 bg-white dark:bg-gray-800 hover:shadow-md ">
              <section>
                <p className="text-lg font-semibold text-center">
                  Recent Applications
                </p>
              </section>
              <ApplicantsList
                limitToThree={limitToThree}
                inHome={inHome}
                setInHome={setInHome}
              />
            </CardContent>
          </section>
        </div>
      )}
    </div>
  );
}

/* eslint-disable react/jsx-key */
"use client";
import { applicantsData } from "@/app/(main-dashboard)/(dashboard)/demoAppList/components/applicantsData";
import ApplicantDashboardPage from "@/components/ApplicantDashboardUI/ApplicantDashboardPage";
import Card, { CardContent } from "@/components/Card";
import { Badge } from "@/components/ui/badge";
import useRoleStore from "@/stores/roleStore/useRoleStore";
import { Briefcase, CalendarDays, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ApplicantsList from "./(main-dashboard)/(dashboard)/demoAppList/page";
import { documents as jobApplicants } from "./(main-dashboard)/(dashboard)/demoJobList/components/jobApplicants";
import { documents as jobData } from "./(main-dashboard)/(dashboard)/demoJobList/components/jobData";
import JobList from "./(main-dashboard)/(dashboard)/demoJobList/page";

const allApplicants = jobApplicants.docs.flatMap((doc) =>
  doc.applicants.map((applicant) => ({
    ...applicant,
    job: doc.job,
  }))
);

const totalSchedules = applicantsData.filter(
  (applicant) => applicant.schedule
).length;

const cardData = [
  {
    label: "Total Openings",
    amount: jobData.docs.length,
    discription: "+2 from last three months",
    icon: Briefcase,
    href: "/demoJobList",
  },
  {
    label: "Total Applicants",
    amount: allApplicants.length,
    discription: "+5 from last three months",
    icon: Users,
    href: "/demoAppList",
  },
  {
    label: "Upcoming Schedule",
    amount: totalSchedules,
    discription: "+3 since last month",
    icon: CalendarDays,
    href: "/demoSchedule",
  },
];

export default function Home() {
  const router = useRouter();
  const { currentRole, setRole } = useRoleStore();
  const { data: session } = useSession();
  console.log("dashboard session", session);
  const [showFilters, setShowFilters] = useState(false);
  const [limitToThree, setLimitToThree] = useState(true);

  const handleClick = () => {
    router.push("/demoBillings/pricing");
  };

  return (
    <div className="flex flex-col gap-5 w-full">

      {currentRole === "applicant" ? (
        <ApplicantDashboardPage currentRole={currentRole} session={session} />
      ) : (
        <div>
          <div className="mb-6 flex justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg md:text-2xl">Welcome!</span>{" "}
              <h1 className="font-medium text-lg md:text-2xl">
                {session?.user?.name}
              </h1>{" "}
              <Badge>{currentRole}</Badge>
            </div>
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
              <ApplicantsList limitToThree={limitToThree} />
            </CardContent>
          </section>
        </div>
      )}
    </div>
  );
}

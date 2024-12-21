/* eslint-disable react/jsx-key */
/** @format */

"use client";
import ApplicantRecentApplied from "@/components/ApplicantDashboardUI/ApplicantRecentApplied";
import { applicantsData } from "@/app/(main-dashboard)/(dashboard)/applicants/components/applicantsData";
import DashboardCardSection from "@/components/ApplicantDashboardUI/DashboardCardSection";
import LatestJobApplied from "@/components/ApplicantDashboardUI/LatestJobApplied";
import Card, { CardContent } from "@/components/Card";
import { Badge } from "@/components/ui/badge";
import useRoleStore from "@/stores/roleStore/useRoleStore";
import { Briefcase, CalendarDays, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import InterviewSchedule from "./(main-dashboard)/(dashboard)/interviews/schedule/page";
import JobList from "./(main-dashboard)/(dashboard)/demoJobList/page";
import { useState } from "react";
import ApplicantsList from "./(main-dashboard)/(dashboard)/demoAppList/page";

const cardData = [
  {
    label: "Total Openings",
    amount: "40",
    discription: "+5 from last three months",
    icon: Briefcase,
    href: "/demoJobList",
  },
  {
    label: "Total Applicants",
    amount: "150",
    discription: "+25 from last three months",
    icon: Users,
    href: "/demoAppList",
  },
  {
    label: "Upcoming Interviews",
    amount: "10",
    discription: "+10 since last month",
    icon: CalendarDays,
    href: "/demoSchedule",
  },
];

export default function Home() {
  const { currentRole, setRole } = useRoleStore();
  const { data: session } = useSession();
  const [showFilters, setShowFilters] = useState(false);
  const [limitToSix, setLimitToSix] = useState(true);


  return (
    <div className="flex flex-col gap-5 w-full">
      {/* <PageTitle title="Dashboard" className={"ml-2"} /> */}

      {currentRole === "applicant" ? (
        <div>
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">Welcome!</span>{" "}
              <h1 className="font-medium text-2xl">Emam Jion</h1>{" "}
              <Badge>{currentRole}</Badge>
            </div>
          </div>
          <div>
            <DashboardCardSection />

            {/* Recently Job applied section */}
            <section>
              {/* <JobApplied /> */}
              {/* <ApplicantRecentApplied /> */}
              <LatestJobApplied />
            </section>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="text-lg md:text-2xl">Welcome!</span>{" "}
              <h1 className="font-medium text-lg md:text-2xl">
                {session?.user?.name}
              </h1>{" "}
              <Badge>{currentRole}</Badge>
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
            <CardContent className="bg-white dark:bg-gray-800 hover:border-gray-950 ">
              <p className="text-xl font-semibold text-center">Recent Jobs</p>
              <JobList showFilters={showFilters} className="shadow-none" />
            </CardContent>
            <CardContent className="flex justify-between gap-4 bg-white dark:bg-gray-800 hover:border-gray-950">
              <section>
                <p className="text-lg font-semibold text-center">
                  Recent Applications
                </p>
              </section>
              <ApplicantsList limitToSix={limitToSix}/>
            </CardContent>
          </section>
        </div>
      )}
    </div>
  );
}

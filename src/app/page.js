/** @format */

"use client";
import BarChart from "@/components/BarChart";
import Card, { CardContent } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import { role } from "@/components/RoleManagement";
import ApplicantsCard from "@/components/SalesCard";
import {
  Activity,
  ArchiveX,
  Briefcase,
  CalendarDays,
  Loader,
  TableOfContents,
  Users,
} from "lucide-react";
import Link from "next/link";
import InterviewSchedule from "./(dashboard)/interviews/schedule/page";

const cardData = [
  {
    label: "Total Openings",
    amount: "40",
    discription: "+5 from last three months",
    icon: Briefcase,
    href: "/jobs/view",
  },
  {
    label: "Applicants Hired",
    amount: "150",
    discription: "+25 from last three months",
    icon: Users,
    href: "/applicants/view/hired",
  },
  {
    label: "Active Jobs",
    amount: "30",
    discription: "+6 since last month",
    icon: Activity,
    href: "/jobs/view/open",

  },
  {
    label: "Closed Jobs",
    amount: "10",
    discription: "+2 since last month",
    icon: ArchiveX,
    href: "/jobs/view/closed",

  },
  {
    label: "Upcoming Interviews",
    amount: "10",
    discription: "+10 since last month",
    icon: CalendarDays,
    href: "/interviews/upcoming",
  },
  {
    label: "Applicants Status",
    discription: "Click to view status",
    icon: Loader,
    href: "/applicants/view",

  },
];

const applicantCardData = [
  {
    label: "Applicants Overview",
    amount: "5",
    discription: "+3 since last month",
    icon: TableOfContents,
    href: "/overview",
  },
  {
    label: "Upcoming Interviews",
    amount: "10",
    discription: "+3 since last month",
    icon: CalendarDays,
    href: "/upcoming-interviews",
  },
  {
    label: "Recent Job Postings",
    amount: "18",
    discription: "+1 since last month",
    icon: CalendarDays,
    href: "/recent-job-postings",
  },
]

const employeeData = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    position: "Full-Stack Engineer",
  },
  {
    name: "Jackson Lee",
    email: "isabella.nguyen@email.com",
    position: "DevOps Engineer",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    position: "Sales Manager",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    position: "Marketing Lead",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    position: "Junior Executive",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Dashboard" />

      {
        role === 'applicant' ? (
          <div>
            <div>
              <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 lg:grid-cols-3 mb-4 hover:border-gray-950">
                {applicantCardData.map((d, i) => (
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
              <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
              <CardContent className="bg-white hover:border-gray-950">
                <p className="p-4 font-semibold">Total Applicants</p>
                <BarChart />
              </CardContent>
              <CardContent className="flex justify-between gap-4 bg-white hover:border-gray-950">
                <section>
                  <p>Top Employees</p>
                  <p className="text-sm text-gray-400">
                    Top contributors from last three months
                  </p>
                </section>
                {employeeData.map((d, i) => (
                  <ApplicantsCard
                    key={i}
                    email={d.email}
                    name={d.name}
                    position={d.position}
                  />
                ))}
              </CardContent>
            </section>
            </div>
          </div>
        ) : (
          <div>
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
            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
              <CardContent className="bg-white hover:border-gray-950 ">
                <p className="text-xl font-semibold text-center">Interviews</p>
                <InterviewSchedule className="shadow-none" />
              </CardContent>
              <CardContent className="flex justify-between gap-4 bg-white hover:border-gray-950">
                <section>
                  <p>Top Employees</p>
                  <p className="text-sm text-gray-400">
                    Top contributors from last three months
                  </p>
                </section>
                {employeeData.map((d, i) => (
                  <ApplicantsCard
                    key={i}
                    email={d.email}
                    name={d.name}
                    position={d.position}
                  />
                ))}
              </CardContent>
            </section>
          </div>
        )
      }
    </div >
  );
}

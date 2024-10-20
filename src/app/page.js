/** @format */

"use client";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import {
  Briefcase,
  Users,
  ArchiveX,
  Activity,
  CalendarDays,
  Loader,
} from "lucide-react";
import Card, { CardContent } from "@/components/Card";
import BarChart from "@/components/BarChart";
import ApplicantsCard from "@/components/SalesCard";

const cardData = [
  {
    label: "Total Openings",
    amount: "40",
    discription: "+5 from last three months",
    icon: Briefcase,
    href: "/jobs",
  },
  {
    label: "Applicants Hired",
    amount: "150",
    discription: "+25 from last three months",
    icon: Users,
  },
  {
    label: "Active Jobs",
    amount: "30",
    discription: "+6 since last month",
    icon: Activity,
  },
  {
    label: "Closed Jobs",
    amount: "10",
    discription: "+2 since last month",
    icon: ArchiveX,
  },
  {
    label: "Upcoming Interviews",
    amount: "10",
    discription: "+10 since last month",
    icon: CalendarDays,
  },
  {
    label: "Applicants Status",
    discription: "Click to view status",
    icon: Loader,
  },
];

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
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 lg:grid-cols-3">
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
        <CardContent>
          <p className="p-4 font-semibold">Total Applicants</p>
          <BarChart />
        </CardContent>
        <CardContent className="flex justify-between gap-4">
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
  );
}

/* eslint-disable react/jsx-key */
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
import InterviewSchedule from "./(main-dashboard)/(dashboard)/interviews/schedule/page";
import { applicantsData } from "@/app/(main-dashboard)/(dashboard)/applicants/components/applicantsData";
import useRoleStore from "@/stores/roleStore/useRoleStore";

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
    amount: "N/A",
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
    href: "/recent-job",
  },
]

const jobs = [
  {
    id: 1,
    date: '2024-10-30',
    time: '10:00 AM',
    company: 'GoProgs Technologies Pvt. Ltd.',
    jobTitle: 'Frontend Developer',
    position: 'Junior Developer',
    role: 'Frontend Development',
    salary: '50,000 BDT', // Monthly salary
    deadline: '2024-10-28',
    status: 'open',
    location: 'Dhaka',
    jobType: 'full-time',
    details: 'Interview for the frontend developer position, focusing on React.js and Tailwind CSS proficiency.',
  },
  {
    id: 2,
    date: '2024-11-05',
    time: '02:00 PM',
    company: 'Rocket Systems',
    jobTitle: 'React.js Developer',
    position: 'Mid-Level Developer',
    role: 'Frontend Development',
    salary: '58,333 BDT', // Monthly salary
    deadline: '2024-11-02',
    status: 'open',
    location: 'Khulna',
    jobType: 'full-time',
    details: 'React.js developer interview focusing on advanced JavaScript and component-based architecture.',
  },
  {
    id: 3,
    date: '2024-11-10',
    time: '11:00 AM',
    company: 'Bit Software Solutions Ltd.',
    jobTitle: 'Full Stack Developer',
    position: 'Senior Developer',
    role: 'Full Stack Development',
    salary: '75,000 BDT', // Monthly salary
    deadline: '2024-11-07',
    status: 'open',
    location: 'Dhaka',
    jobType: 'full-time',
    details: 'Full-stack role involving both backend (Node.js) and frontend (React.js) development tasks.',
  },
  {
    id: 4,
    date: '2024-11-12',
    time: '09:00 AM',
    company: 'Tech Innovations',
    jobTitle: 'Software Engineer',
    position: 'Entry-Level Developer',
    role: 'Software Development',
    salary: '45,833 BDT', // Monthly salary
    deadline: '2024-11-10',
    status: 'closed',
    jobType: 'full-time',
    location: 'Dhaka',
    details: 'Interview focusing on problem-solving skills and knowledge of programming fundamentals.',
  },
  {
    id: 5,
    date: '2024-11-15',
    time: '03:30 PM',
    company: 'Creative Solutions Co.',
    jobTitle: 'UI/UX Designer',
    position: 'Mid-Level Designer',
    role: 'Design',
    salary: '54,167 BDT', // Monthly salary
    deadline: '2024-11-13',
    status: 'open',
    location: 'Dhaka',
    jobType: 'contractual',
    details: 'UI/UX design interview emphasizing user-centered design principles and portfolio review.',
  },
  {
    id: 6,
    date: '2024-11-20',
    time: '01:00 PM',
    company: 'Dev Team Ltd.',
    jobTitle: 'DevOps Engineer',
    position: 'Senior Engineer',
    role: 'DevOps',
    salary: '70,833 BDT', // Monthly salary
    deadline: '2024-11-18',
    status: 'open',
    location: 'Dhaka',
    jobType: 'contractual',
    details: 'DevOps interview focusing on CI/CD processes and cloud infrastructure management.',
  },
]

// const employeeData = [
//   {
//     name: "Olivia Martin",
//     email: "olivia.martin@email.com",
//     position: "Full-Stack Engineer",
//   },
//   {
//     name: "Jackson Lee",
//     email: "isabella.nguyen@email.com",
//     position: "DevOps Engineer",
//   },
//   {
//     name: "Isabella Nguyen",
//     email: "isabella.nguyen@email.com",
//     position: "Sales Manager",
//   },
//   {
//     name: "William Kim",
//     email: "will@email.com",
//     position: "Marketing Lead",
//   },
//   {
//     name: "Sofia Davis",
//     email: "sofia.davis@email.com",
//     position: "Junior Executive",
//   },
// ];

const topApplications = [
  {
    id: "m5gr84i9",
    jobTitle: "Full-Stack Engineer",
    company: "Fintechhub",
    applicantEmail: "shoishob@hotmail.com",
    status: "shortlisted",
    CVScore: 50,
    deadline: new Date("2024-11-01"),
  },
  {
    id: "3u1reuv4",
    jobTitle: "Software Engineer",
    company: "Brain Station 23",
    applicantEmail: "ataullah@gmail.com",
    status: "hired",
    CVScore: 65,
    deadline: new Date("2024-11-05"),
    interviewSchedule: new Date("2024-11-14"),
  },
  {
    id: "derv1ws0",
    jobTitle: "Human Resources Manager",
    company: "Olloyo",
    applicantEmail: "arfin@outlook.com",
    status: "shortlisted",
    CVScore: 50,
    deadline: new Date("2024-11-01"),
    interviewSchedule: new Date("2024-11-10"),
  },
  {
    id: "5kma53ae",
    jobTitle: "Marketing Manager",
    company: "Bijit Limited",
    applicantEmail: "shoishob@hotmain.com",
    status: "applied",
    CVScore: 50,
    deadline: new Date("2024-11-01"),
  },
  {
    id: "bhqecj4p",
    jobTitle: "QA Engineer",
    company: "Mediusware",
    applicantEmail: "ashfaq@gmail.com",
    status: "hired",
    CVScore: 60,
    deadline: new Date("2024-10-01"),
    interviewSchedule: new Date("2024-10-10"),
  },
];


export default function Home() {
  const { currentRole, setRole } = useRoleStore();
  
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Dashboard" className={"ml-2"} />

      {
        currentRole === 'applicant' ? (
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
              <CardContent className="flex justify-between gap-4 bg-white dark:bg-gray-700 hover:border-gray-950">
                <section>
                  <p className="text-lg font-semibold">Recent Applications</p>
                  <p className="text-sm text-gray-400">
                    Top applications according to CV score
                  </p>
                </section>
                {topApplications.map((d, i) => (
                  <ApplicantsCard
                    key={i}
                    email={d.company}
                    name={d.jobTitle}
                    position={d.status}
                  />
                ))}
              </CardContent>
                <CardContent className="flex justify-between gap-4 bg-white dark:bg-gray-700 hover:border-gray-950">
                  <section>
                    <p className="text-lg font-semibold"> Recent Job Postings </p>
                    <p className="text-sm text-gray-400">
                      Recent jobs from last months
                    </p>
                  </section>
                  {jobs.map((d, i) => (
                    <Link href={'/recent-job'}>
                      <ApplicantsCard
                        key={i}
                        email={d.jobTitle}
                        name={d.company}
                        position={d.position}
                      />
                    </Link>
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
            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2 dark:text-gray-200">
              <CardContent className="bg-white dark:bg-gray-700 hover:border-gray-950 ">
                <p className="text-xl font-semibold text-center">Interviews</p>
                <InterviewSchedule className="shadow-none" />
              </CardContent>
              <CardContent className="flex justify-between gap-4 bg-white dark:bg-gray-700 hover:border-gray-950">
                <section>
                  <p className="text-lg font-semibold">Recent Applications</p>
                  <p className="text-sm text-gray-400">
                    Top applicants according to CV score
                  </p>
                </section>
                {applicantsData.map((d, i) => (
                  <ApplicantsCard
                    key={i}
                    email={d.applicantEmail}
                    name={d.applicantName}
                    position={d.status}
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
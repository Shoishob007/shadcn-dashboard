"use client";

import PageTitle from "@/components/PageTitle";
import FormatTitle from "@/components/TitleFormatter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import companyLogo from '../../../public/assests/dummy-logo.png';
import logo from '../../../public/assests/h-logo.png';

export const interviewList = [
  {
    id: 1,
    jobTitle: "Frontend Developer",
    position: "Junior",
    company: "Tech Co.",
    date: "October 31, 2024",
    time: "10:00 AM",
    salary: "$70,000",
    details: "A great opportunity to join a dynamic team and work on exciting frontend projects.",
    status: "shortlisted",
    role: "Developer"
  },
  {
    id: 1,
    jobTitle: "Frontend Developer",
    position: "Junior",
    company: "Tech Co.",
    date: "October 31, 2024",
    time: "10:00 AM",
    salary: "$70,000",
    details: "A great opportunity to join a dynamic team and work on exciting frontend projects.",
    status: "shortlisted",
    role: "Developer"
  },
  {
    id: 1,
    jobTitle: "Frontend Developer",
    position: "Junior",
    company: "Tech Co.",
    date: "October 31, 2024",
    time: "10:00 AM",
    salary: "$70,000",
    details: "A great opportunity to join a dynamic team and work on exciting frontend projects.",
    status: "shortlisted",
    role: "Developer"
  },
  {
    id: 1,
    jobTitle: "Frontend Developer",
    position: "Junior",
    company: "Tech Co.",
    date: "October 31, 2024",
    time: "10:00 AM",
    salary: "$70,000",
    details: "A great opportunity to join a dynamic team and work on exciting frontend projects.",
    status: "shortlisted",
    role: "Developer"
  },
  {
    id: 1,
    jobTitle: "Frontend Developer",
    position: "Junior",
    company: "Tech Co.",
    date: "October 31, 2024",
    time: "10:00 AM",
    salary: "$70,000",
    details: "A great opportunity to join a dynamic team and work on exciting frontend projects.",
    status: "shortlisted",
    role: "Developer"
  },
  {
    id: 1,
    jobTitle: "Frontend Developer",
    position: "Junior",
    company: "Tech Co.",
    date: "October 31, 2024",
    time: "10:00 AM",
    salary: "$70,000",
    details: "A great opportunity to join a dynamic team and work on exciting frontend projects.",
    status: "shortlisted",
    role: "Developer"
  },
  {
    id: 1,
    jobTitle: "Frontend Developer",
    position: "Junior",
    company: "Tech Co.",
    date: "October 31, 2024",
    time: "10:00 AM",
    salary: "$70,000",
    details: "A great opportunity to join a dynamic team and work on exciting frontend projects.",
    status: "shortlisted",
    role: "Developer"
  },
  {
    id: 1,
    jobTitle: "Frontend Developer",
    position: "Junior",
    company: "Tech Co.",
    date: "October 31, 2024",
    time: "10:00 AM",
    salary: "$70,000",
    details: "A great opportunity to join a dynamic team and work on exciting frontend projects.",
    status: "shortlisted",
    role: "Developer"
  },
  {
    id: 1,
    jobTitle: "Frontend Developer",
    position: "Junior",
    company: "Tech Co.",
    date: "October 31, 2024",
    time: "10:00 AM",
    salary: "$70,000",
    details: "A great opportunity to join a dynamic team and work on exciting frontend projects.",
    status: "shortlisted",
    role: "Developer"
  },
  {
    id: 1,
    jobTitle: "Frontend Developer",
    position: "Junior",
    company: "Tech Co.",
    date: "October 31, 2024",
    time: "10:00 AM",
    salary: "$70,000",
    details: "A great opportunity to join a dynamic team and work on exciting frontend projects.",
    status: "shortlisted",
    role: "Developer"
  },
  {
    id: 1,
    jobTitle: "Frontend Developer",
    position: "Junior",
    company: "Tech Co.",
    date: "October 31, 2024",
    time: "10:00 AM",
    salary: "$70,000",
    details: "A great opportunity to join a dynamic team and work on exciting frontend projects.",
    status: "shortlisted",
    role: "Developer"
  },
  {
    id: 1,
    jobTitle: "Frontend Developer",
    position: "Junior",
    company: "Tech Co.",
    date: "October 31, 2024",
    time: "10:00 AM",
    salary: "$70,000",
    details: "A great opportunity to join a dynamic team and work on exciting frontend projects.",
    status: "shortlisted",
    role: "Developer"
  },
  {
    id: 1,
    jobTitle: "Frontend Developer",
    position: "Junior",
    company: "Tech Co.",
    date: "October 31, 2024",
    time: "10:00 AM",
    salary: "$70,000",
    details: "A great opportunity to join a dynamic team and work on exciting frontend projects.",
    status: "shortlisted",
    role: "Developer"
  },
  {
    id: 1,
    jobTitle: "Frontend Developer",
    position: "Junior",
    company: "Tech Co.",
    date: "October 31, 2024",
    time: "10:00 AM",
    salary: "$70,000",
    details: "A great opportunity to join a dynamic team and work on exciting frontend projects.",
    status: "shortlisted",
    role: "Developer"
  },
  {
    id: 1,
    jobTitle: "Frontend Developer",
    position: "Junior",
    company: "Tech Co.",
    date: "October 31, 2024",
    time: "10:00 AM",
    salary: "$70,000",
    details: "A great opportunity to join a dynamic team and work on exciting frontend projects.",
    status: "shortlisted",
    role: "Developer"
  },
  // Additional interview data
];

const UpcomingInterviews = () => {
  const pathname = usePathname();
  const pageTitle = FormatTitle(pathname);
  const shortlisted = interviewList.filter(d => d.status === 'shortlisted');

  const [open, setOpen] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState(null);

  const handleDetails = (id) => {
    const interviewDetailsData = interviewList.find(d => d.id === id);
    setInterviewDetails(interviewDetailsData);
    setOpen(true);  
  };

  const closeDialog = () => setOpen(false);

  return (
    <div className="px-4">
      <PageTitle title={pageTitle} className="pb-6 text-2xl font-bold" />
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shortlisted.map(data => (
          <Card key={data.id} className="border border-gray-200 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            <CardContent className="p-6 bg-white">
              <div className="flex items-center gap-4">
                <Image src={logo} alt="logo" width={60} className="rounded-full shadow-sm" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{data.jobTitle}</h2>
                  <p className="text-gray-600">{data.position} at {data.company}</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Interview Date</span>
                  <span className="text-sm font-medium text-gray-700">{data.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Time</span>
                  <span className="text-sm font-medium text-gray-700">{data.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Salary</span>
                  <span className="text-sm font-semibold text-gray-700">{data.salary}</span>
                </div>
              </div>
              <div className="mt-4 text-gray-600 text-sm">
                <p>{data.details}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end p-4 bg-gray-100">
              <Button onClick={() => handleDetails(data.id)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Interview Details</DialogTitle>
            <DialogDescription>
              {interviewDetails && (
                <section className="mt-4">
                  <div className="flex items-center gap-3">
                    <Image src={companyLogo} width={50} alt="Company logo" className="rounded shadow-sm" />
                    <div>
                      <h1 className="text-lg font-semibold text-gray-800">{interviewDetails.jobTitle}</h1>
                      <h2 className="text-sm text-gray-500">{interviewDetails.company}</h2>
                    </div>
                  </div>
                  <div className="mt-5 space-y-2">
                    <p className="text-sm text-gray-500">Position: <span className="text-gray-700">{interviewDetails.position}</span></p>
                    <p className="text-sm text-gray-500">Role: <span className="text-gray-700">{interviewDetails.role}</span></p>
                    <p className="text-sm text-gray-500">Interview Date: <span className="text-gray-700">{interviewDetails.date}</span></p>
                    <p className="text-sm text-gray-500">Details:</p>
                    <p className="text-gray-700 text-sm">{interviewDetails.details}</p>
                  </div>
                </section>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end">
            <Button onClick={closeDialog} className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg shadow">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpcomingInterviews;

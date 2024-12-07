/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SquarePen } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { documents as jobDocuments } from "../components/jobData";

const JobDetailsPage = () => {
  const jobData = {
    id: "dfacc5af-c464-47ab-92a4-af019499f608",
    job: {
      id: "dfacc5af-c464-47ab-92a4-af019499f608",
      // title: "Demo Job Title 1",
      // description:
      //   "Join our dynamic team as a Full-Stack Developer at FintechHub Limited, where you'll build and maintain scalable web applications. This role involves contributing to both front-end and back-end development, solving complex challenges, and collaborating with cross-functional teams. If you're passionate about clean code, modern technologies, and innovation, we'd love to hear from you!",
      // skills: ["JavaScript", "React", "Node.js", "Express", "SQL/NoSQL", "Git"],
      // jobRole: "Full-Stack",
      // degreeLevel: ["MSc.", "BSc."],
      // yearOfExperience: 2,
      // location: "Mirpur, Dhaka, Bangladesh",
      // fieldOfStudy: ["CSE", "EEE", "ETE", "MIE"],
      // requirements: [
      //   "JavaScript (React, Node.js)",
      //   "RESTful APIs integration.",
      //   "SQL/NoSQL databases.",
      //   "Version control (Git)",
      //   "Problem-solving ability.",
      //   "Communication and Teamwork.",
      // ],
      // responsibilities: [
      //   "Develop and maintain secure, scalable web applications.",
      //   "Write clean, maintainable code and conduct code reviews.",
      //   "Collaborate with designers and product managers.",
      //   "Troubleshoot and optimize application performance.",
      //   "Stay updated with emerging technologies and mentor junior developers.",
      // ],
      // employeeBenefits: [
      //   "Competitive salary with performance bonuses.",
      //   "Comprehensive health insurance.",
      //   "Flexible working hours and remote options.",
      //   "Paid vacation and sick leave.",
      //   "Professional development programs and training.",
      // ],
      // salary: 40000,
      organization: {
        orgName: "Max Innovations Co.",
        img: {
            sizes: {
                thumbnail: {
                    url: `${process.env.NEXT_PUBLIC_API_URL}/media/images/hh_logo.png`,
                },
            },
        },
    },
    },
    title: "Demo Job Title 1",
    description:
      "Join our dynamic team as a Full-Stack Developer at [Org1], where you'll build and maintain scalable web applications. This role involves contributing to both front-end and back-end development, solving complex challenges, and collaborating with cross-functional teams. If you're passionate about clean code, modern technologies, and innovation, we'd love to hear from you!",
    skills: ["JavaScript", "React", "Node.js", "Express"],
    jobRole: "Full-Stack Engineer",
    degreeLevel: ["MSc.", "BSc."],
    fieldOfStudy: ["CSE", "EEE", "ETE", "MIE"],
    yearOfExperience: 2,
    location: "Mirpur, Dhaka, Bangladesh",
    requirements: [
      "JavaScript (React, Node.js)",
      "RESTful APIs integration.",
      "SQL/NoSQL databases.",
      "Version control (Git)",
      "Problem-solving ability.",
      "Communication and Teamwork.",
    ],
    responsibilities: [
      "Develop and maintain secure, scalable web applications.",
      "Write clean, maintainable code and conduct code reviews.",
      "Collaborate with designers and product managers.",
      "Troubleshoot and optimize application performance.",
      "Stay updated with emerging technologies and mentor junior developers.",
    ],
    employeeBenefits: [
      "Competitive salary with performance bonuses.",
      "Comprehensive health insurance.",
      "Flexible working hours and remote options.",
      "Paid vacation and sick leave.",
      "Professional development programs and training.",
      "Team-building events and wellness initiatives.",
    ],
    salary: 40000,
    address: null,
    phone: "+8801405-444444",
    email: "demo-email@example.com",
    contactInfo: null,
    employeeType: "Full-Time",
    jobType: "Physical",
    steps: ["Screening Test", "Aptitude Test", "Technical Test", "Interview"],
    applicantCount: 50,
    deadline: "2024-11-22",
    published: "2024-11-12",
  };

  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const [currentJobInfo, setCurrentJobInfo] = useState(null);

  useEffect(() => {
    if (jobId) {
      const matchedJobInfo = jobDocuments.docs.find(
        (doc) => doc.job.id === jobId
      );
      if (matchedJobInfo) {
        setCurrentJobInfo(matchedJobInfo);
        // console.log(currentJobInfo);
      }
    }
  }, [jobId, currentJobInfo]);

  if (!currentJobInfo) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 dark:text-gray-300">Loading job details...</p>
      </div>
    );
  }

  // const jobData = currentJobInfo
  const job = currentJobInfo
  console.log(job)

  return (
    <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg">
      <div className="flex border-y-2 dark:border-gray-500 items-center justify-between px-4 sm:px-6 py-4">
        <header className="flex items-center text-xs sm:text-sm">
          <Image
            src={job.job.organization.img.sizes.thumbnail.url}
            alt={job.job.organization.orgName}
            height={64}
            width={64}
            className="rounded-full mr-4"
          />
          <div>
            <h1 className="text-base sm:text-xl font-bold">
              {job.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              {job.jobRole}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              {job.location}
            </p>
          </div>
        </header>
        <div className="flex gap-2 items-center border p-1 rounded-sm dark:border-gray-300">
          <SquarePen className="dark:text-gray-300" size={16} />{" "}
          <span className="text-[10px] sm:text-sm">Edit Job</span>
        </div>
      </div>
      <div className="px-6 sm:px-10 py-3">
        <section className="mb-4 text-xs sm:text-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2">
            Job Context
          </h2>
          <p>{job.description}</p>
        </section>

        <section className="mb-4 text-xs sm:text-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2">
            What will you do?
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {job?.responsibilities?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-4 text-xs sm:text-sm">
          <h2 className="text-lg font-semibold mb-2">
            Requirements for the role
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              {job?.degreeLevel?.join(" or ")} in{" "}
              {job?.fieldOfStudy?.join(", ")} or a related field.
            </li>
            <li>
              {job?.yearOfExperience}+ years in full-stack development.
            </li>
            {job?.requirements?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-4 text-xs sm:text-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2">
            Mandatory skills
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {job?.skills?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-4 text-xs sm:text-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2">
            Employee Benefits
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {job?.employeeBenefits?.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </section>

        <section className="bg-red-50 dark:bg-red-100 dark:text-gray-600 p-4 rounded-sm text-xs sm:text-sm flex flex-col sm:flex-row items-center sm:items-start justify-evenly">
          <p>
            <strong>Active until:</strong> {job?.deadline}
          </p>
          <p>
            <strong>Published On:</strong> {job?.published}
          </p>
          <p>
            <strong>Applicants:</strong> {job?.applicantCount}
          </p>
        </section>
      </div>
    </div>
  );
};

export default JobDetailsPage;

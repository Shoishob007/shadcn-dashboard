/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { SquarePen } from "lucide-react";

const JobDetailsPage = () => {
  const jobData = {
    id: "dfacc5af-c464-47ab-92a4-af019499f608",
    job: {
      title: "Demo Job Title 1",
      description:
        "Join our dynamic team as a Full-Stack Developer at FintechHub Limited, where you'll build and maintain scalable web applications. This role involves contributing to both front-end and back-end development, solving complex challenges, and collaborating with cross-functional teams. If you're passionate about clean code, modern technologies, and innovation, we'd love to hear from you!",
      skills: ["JavaScript", "React", "Node.js", "Express", "SQL/NoSQL", "Git"],
      jobRole: "Full-Stack",
      degreeLevel: ["MSc.", "BSc."],
      yearOfExperience: 2,
      location: "Mirpur, Dhaka, Bangladesh",
      fieldOfStudy: ["CSE", "EEE", "ETE", "MIE"],
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
      ],
      salary: 40000,
      organization: {
        orgName: "FintechHub Limited",
        img: {
          url: `${process.env.NEXT_PUBLIC_API_URL}/media/images/hh_logo_modified-3.png`,
        },
      },
    },
    applicantCount: 50,
    deadline: "2024-11-22",
    published: "2024-11-12",
  };

  return (
    <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg">
      <div className="flex border-y-2 dark:border-gray-500 items-center justify-between px-4 sm:px-6 py-4">
        <header className="flex items-center text-xs sm:text-sm">
          <Image
            src={jobData.job.organization.img.url}
            alt={jobData.job.organization.orgName}
            height={64}
            width={64}
            className="rounded-full mr-4"
          />
          <div>
            <h1 className="text-base sm:text-xl font-bold">
              {jobData.job.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              {jobData.job.jobRole}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              {jobData.job.location}
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
            Job Description
          </h2>
          <p>{jobData.job.description}</p>
        </section>

        <section className="mb-4 text-xs sm:text-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2">
            What will you do?
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {jobData.job.responsibilities.map((item, index) => (
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
              {jobData.job.degreeLevel.join(" or ")} in{" "}
              {jobData.job.fieldOfStudy.join(", ")} or a related field.
            </li>
            <li>
              {jobData.job.yearOfExperience}+ years in full-stack development.
            </li>
            {jobData.job.requirements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-4 text-xs sm:text-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2">
            Mandatory skills
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {jobData.job.skills.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-4 text-xs sm:text-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2">
            Employee Benefits
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {jobData.job.employeeBenefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </section>

        <section className="bg-red-50 dark:bg-red-100 dark:text-gray-600 p-4 rounded-sm text-xs sm:text-sm flex flex-col sm:flex-row items-center sm:items-start justify-evenly">
          <p>
            <strong>Active until:</strong> {jobData.deadline}
          </p>
          <p>
            <strong>Published On:</strong> {jobData.published}
          </p>
          <p>
            <strong>Applicants:</strong> {jobData.applicantCount}
          </p>
        </section>
      </div>
    </div>
  );
};

export default JobDetailsPage;

"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatRelativeDate } from "@/app/utils/formatRelativeDate";
import {
  Briefcase,
  BriefcaseBusiness,
  CalendarDays,
  Clock,
  Dot,
} from "lucide-react";
import { useRouter } from "next/navigation";

const JobList = () => {
  const router = useRouter();

  const handleViewJobDetails = (id) => {
    router.push(`/demoJobList/demoJobDetails?id=${id}`);
  };
  const documents = {
    docs: [
      {
        id: "dfacc5af-c464-47ab-92a4-af019499f608",
        job: {
          id: "bf200cb1-3ffa-4ef7-a071-3b81103ebebd",
          title: "Demo Job Title 1",
          description:
            "Join our dynamic team as a Full-Stack Developer at [Org1], where you'll build and maintain scalable web applications. This role involves contributing to both front-end and back-end development, solving complex challenges, and collaborating with cross-functional teams. If you're passionate about clean code, modern technologies, and innovation, we'd love to hear from you!",
          skills: ["JavaScript", "React", "Node.js", "Express"],
          jobRole: "Full-Stack",
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

          organization: {
            orgName: "Org1",
            img: {
              sizes: {
                thumbnail: {
                  url: "/media/images/hh_logo_modified-3.png",
                },
              },
            },
          },
        },
        applicantCount: 50,
        deadline: "2024-11-22",
        published: "2024-11-12",
      },
      {
        id: "dfacc5af-c464-47ab-92a4-af019499f608",
        job: {
          id: "bf200cb1-3ffa-4ef7-a071-3b81103ebebd",
          title: "Demo Job Title 2",
          description: "Short and Brief description of the job",

          skills: ["JavaScript", "React", "Node.js", "Express"],
          jobRole: "Full-Stack",
          degreeLevel: ["Phd", "MSc."],
          fieldOfStudy: ["CSE", "EEE", "ETE", "MIE"],
          yearOfExperience: null,
          location: null,
          requirements: null,
          employeeBenefits: null,
          salary: null,
          address: null,
          phone: "+8801405-444444",
          email: "demo-email@example.com",
          contactInfo: null,
          published: "2024-12-12",
          employeeType: "Full-Time",
          jobType: "Remote",

          organization: {
            orgName: "Org2",
            img: {
              sizes: {
                thumbnail: {
                  url: "/media/images/hh_logo_modified-3.png",
                },
              },
            },
          },
        },
        applicantCount: 50,
        deadline: "2024-12-22",
        published: "2024-11-26",
      },
      {
        id: "dfacc5af-c464-47ab-92a4-af019499f608",
        job: {
          id: "bf200cb1-3ffa-4ef7-a071-3b81103ebebd",
          title: "Demo Job Title 3",
          description: "Short and Brief description of the job",
          skills: [
            "JavaScript",
            "React",
            "Node.js",
            "Express",
            "SQL/NoSQL",
            "Git",
          ],
          jobRole: "Backend",
          degreeLevel: ["MSc.", "BSc."],
          fieldOfStudy: ["CSE", "EEE", "ETE", "MIE"],
          yearOfExperience: null,
          location: null,
          requirements: null,
          employeeBenefits: null,
          salary: null,
          address: null,
          phone: "+8801405-444444",
          email: "demo-email@example.com",
          contactInfo: null,
          employeeType: "Part-Time",
          jobType: "Hybrid",

          organization: {
            orgName: "Org3",
            img: {
              sizes: {
                thumbnail: {
                  url: "/media/images/hh_logo_modified-3.png",
                },
              },
            },
          },
        },
        applicantCount: 50,
        deadline: "2024-12-22",
        published: "2024-11-12",
      },
    ],
  };

  return (
    <div className="space-y-2">
      {documents.docs.map((document) => {
        const deadlineDate = new Date(document.deadline);
        const currentDate = new Date();
        const isPastDeadline = currentDate > deadlineDate;
        const diff = formatRelativeDate(document.published);

        return (
          <Card
            key={document.id}
            className="flex flex-col mx-auto sm:flex-row items-center justify-between py-4 sm:px-6 px-4 rounded-lg transition-shadow gap-2 max-w-5xl"
          >
            <div className="flex items-center gap-10">
              <div className="flex flex-col gap-3 items-center">
                <div className="flex items-center space-x-6 sm:space-x-3">
                  <Avatar className="h-10 w-10 ">
                    <AvatarImage
                      src={document.job.organization.img.sizes.thumbnail.url}
                      alt={document.job.organization.orgName}
                    />
                    <AvatarFallback className="font-semibold text-xs text-yellow-600 bg-yellow-100">
                      {document.job.title[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex gap-6 sm:gap-0 items-center sm:flex-col dark:text-gray-200">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center">
                      {" "}
                      <div className="flex flex-col">
                        <h3 className="text-sm font-semibold">
                          {document.job.title}
                        </h3>
                        <p className="text-gray-500 text-xs dark:text-gray-300 hidden sm:block">
                          {document.job.organization.orgName}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-1">
                        <div className="flex items-center gap-1">
                          <Clock size={12} strokeWidth={2.5} />
                          <p className="text-xs font-normal">
                            {" "}
                            {document.job.employeeType}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase size={12} strokeWidth={2.5} />
                          <p className="text-xs font-normal">
                            {" "}
                            {document.job.jobRole}
                          </p>
                        </div>
                      </div>
                      {isPastDeadline ? (
                        <div className="text-red-500 text-xs font-semibold flex gap-1 items-center border border-red-500 pr-2 rounded-sm">
                          <Dot
                            strokeWidth={4}
                            size={20}
                            color="red"
                            className="p-0"
                          />
                          Expired
                        </div>
                      ) : (
                        <div className="text-green-500 text-xs font-semibold flex gap-1 items-center border border-emerald-500 pr-2 rounded-sm">
                          <Dot
                            strokeWidth={4}
                            size={20}
                            color="#50C878"
                            className="p-0"
                          />
                          Open
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-gray-600 text-[10px] sm:text-xs sm:flex gap-2 sm:gap-4 dark:text-gray-300 hidden">
                  <div className="items-center gap-1 flex">
                    <BriefcaseBusiness size={12} />
                    <p className="font-semibold">
                      {document.applicantCount} applications
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarDays size={12} />
                    <p className="font-semibold">
                      {" "}
                      Deadline: {document.deadline}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarDays size={12} />
                    <p className="font-semibold"> Posted {diff}</p>
                  </div>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex space-y-2 flex-col text-xs sm:text-sm sm:hidden">
                <Button
                  variant="ghost"
                  size="xs"
                  className="border border-gray-400"
                >
                  View All Applicants
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  className="border border-gray-400"
                  onClick={() => handleViewJobDetails(document.job.id)}
                >
                  View Job Details
                </Button>
              </div>
            </div>

            <div className="text-gray-600 text-[10px] sm:text-xs flex gap-2 sm:gap-4 dark:text-gray-300 sm:hidden">
              <div className="items-center gap-1 hidden sm:flex">
                <BriefcaseBusiness size={12} />
                <p className="font-semibold">
                  {document.applicantCount} applications
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <CalendarDays size={12} />
                  <p className="font-semibold">
                    {" "}
                    Deadline: {document.deadline}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarDays size={12} />
                  <p className="font-semibold"> Posted {diff}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex justify-center sm:justify-normal sm:flex-row-reverse text-emerald-600 font-semibold">
                  <Avatar className="h-10 w-10 border border-emerald-600">
                    <AvatarImage
                      src={document.job.organization.img.sizes.thumbnail.url}
                      alt={document.job.organization.orgName}
                    />
                    <AvatarFallback className="text-[10px] bg-emerald-100 dark:bg-emerald-200 items-center text-center">
                      View All
                    </AvatarFallback>
                  </Avatar>
                  <Avatar className="h-10 w-10 border border-emerald-600">
                    <AvatarImage
                      src={document.job.organization.img.sizes.thumbnail.url}
                      alt={document.job.organization.orgName}
                    />
                    <AvatarFallback className="text-xs bg-emerald-100 dark:bg-emerald-200">
                      {document.job.title[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Avatar className="h-10 w-10 border border-emerald-600">
                    <AvatarImage
                      src={document.job.organization.img.sizes.thumbnail.url}
                      alt={document.job.organization.orgName}
                    />
                    <AvatarFallback className="text-xs bg-emerald-100 dark:bg-emerald-200">
                      {document.job.title[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Avatar className="h-10 w-10 border border-emerald-600">
                    <AvatarImage
                      src={document.job.organization.img.sizes.thumbnail.url}
                      alt={document.job.organization.orgName}
                    />
                    <AvatarFallback className="text-xs bg-emerald-100 dark:bg-emerald-200">
                      {document.job.title[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-wrap sm:flex-row-reverse gap-1 w-full max-w-[300px]">
                  {document.job.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="dark:bg-gray-900"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              {/* Action Buttons */}
              <div className="sm:flex space-y-2 flex-col text-xs sm:text-sm hidden">
                <Button
                  variant="ghost"
                  size="xs"
                  className="border border-gray-400"
                >
                  View All Applicants
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  className="border border-gray-400"
                  onClick={() => handleViewJobDetails(document.job.id)}
                >
                  View Job Details
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default JobList;

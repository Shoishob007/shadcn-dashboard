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

const JobList = () => {
  const documents = {
    docs: [
      {
        id: "dfacc5af-c464-47ab-92a4-af019499f608",
        job: {
          id: "bf200cb1-3ffa-4ef7-a071-3b81103ebebd",
          title: "Demo Job Title 1",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          skills: ["JavaScript", "React", "Node.js", "Express"],
          jobRole: "Full-Stack",
          degreeLevel: ["MSc.", "BSc."],
          fieldOfStudy: ["CSE", "EEE", "ETE", "MIE"],
          yearOfExperience: 2,
          location: "Mirpur, Dhaka, Bangladesh",
          requirements: null,
          employeeBenefits: null,
          salary: null,
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
          skills: ["JavaScript", "React", "Node.js", "Express"],
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
            className="flex flex-col sm:flex-row items-center justify-between py-4 px-6 rounded-lg transition-shadow gap-2 sm:gap-0"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center space-x-6 sm:space-x-4">
                <Avatar className="h-10 w-10 ">
                  <AvatarImage
                    src={document.job.organization.img.sizes.thumbnail.url}
                    alt={document.job.organization.orgName}
                  />
                  <AvatarFallback className="font-semibold text-xs text-yellow-600 bg-yellow-100">
                    {document.job.title[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-6 sm:gap-0 items-start sm:flex-col dark:text-gray-200">
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    {" "}
                    <h3 className="text-sm font-semibold">
                      {document.job.title}
                    </h3>
                    <p className="text-gray-500 text-xs dark:text-gray-300 block sm:hidden">
                      {document.job.organization.orgName}
                    </p>
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

                  <p className="text-gray-500 text-xs dark:text-gray-300 hidden sm:block">
                    {document.job.organization.orgName}
                  </p>
                </div>
              </div>
              <div className="text-gray-600 text-xs flex gap-4 dark:text-gray-300">
                <div className="flex items-center gap-1">
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
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex justify-center sm:justify-normal sm:flex-row-reverse text-emerald-600 font-semibold">
                <Avatar className="h-10 w-10 border border-emerald-600">
                  <AvatarImage
                    src={document.job.organization.img.sizes.thumbnail.url}
                    alt={document.job.organization.orgName}
                  />
                  <AvatarFallback className="text-[10px] bg-emerald-100 items-center text-center">
                    View All
                  </AvatarFallback>
                </Avatar>
                <p>...</p>
                <Avatar className="h-10 w-10 border border-emerald-600">
                  <AvatarImage
                    src={document.job.organization.img.sizes.thumbnail.url}
                    alt={document.job.organization.orgName}
                  />
                  <AvatarFallback className="text-xs bg-emerald-100">
                    {document.job.title[0]}
                  </AvatarFallback>
                </Avatar>
                <Avatar className="h-10 w-10 border border-emerald-600">
                  <AvatarImage
                    src={document.job.organization.img.sizes.thumbnail.url}
                    alt={document.job.organization.orgName}
                  />
                  <AvatarFallback className="text-xs bg-emerald-100">
                    {document.job.title[0]}
                  </AvatarFallback>
                </Avatar>
                <Avatar className="h-10 w-10 border border-emerald-600">
                  <AvatarImage
                    src={document.job.organization.img.sizes.thumbnail.url}
                    alt={document.job.organization.orgName}
                  />
                  <AvatarFallback className="text-xs bg-emerald-100">
                    {document.job.title[0]}
                  </AvatarFallback>
                </Avatar>
                <Avatar className="h-10 w-10 border border-emerald-600">
                  <AvatarImage
                    src={document.job.organization.img.sizes.thumbnail.url}
                    alt={document.job.organization.orgName}
                  />
                  <AvatarFallback className="text-xs bg-emerald-100">
                    {document.job.title[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-wrap gap-1">
                {document.job.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className={"dark:bg-gray-900"}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-y-2 flex-col text-xs">
              <Button
                variant="ghost"
                size="sm"
                className="border border-gray-400"
              >
                View All Applicants
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="border border-gray-400"
              >
                View Job Details
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default JobList;

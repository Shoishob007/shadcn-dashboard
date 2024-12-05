"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { applicantsData } from "../../applicants/components/applicantsData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ScheduleModal } from "./components/ScheduleModal";
import {
  Linkedin,
  Facebook,
  Globe,
  GraduationCap,
  CirclePlus,
  NotebookPen,
  Settings,
  SquareActivity,
  File,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepSelector } from "./components/StepSelector";

const ApplicantDetails = () => {
  const searchParams = useSearchParams();
  const applicantId = searchParams.get("id");
  const applicant = applicantsData.find((app) => app.id === applicantId);

  const [selectedStep, setSelectedStep] = useState(applicant?.steps || "");
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [schedule, setSchedule] = useState({
    date: applicant.schedule?.date || null,
    time: applicant.schedule?.time || "",
  });

  if (!applicant) {
    return (
      <div className="flex justify-center items-center">
        Applicant not found!
      </div>
    );
  }

  const handleStepChange = (step) => {
    setSelectedStep(step);
    applicant.status = "shortlisted";
    applicant.steps = step;
    setSchedule({ date: null, time: "" });
    setIsScheduleModalOpen(true);
  };

  const handleSchedule = (date, time) => {
    setSchedule({ date, time });
    console.log(
      `Scheduled ${selectedStep} for ${
        applicant.applicantName
      } on ${date.toLocaleDateString()} at ${time}`
    );
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const {
    applicantName,
    applicantEmail,
    phone,
    address,
    experiences,
    education,
    skills,
    socialLinks,
    designation,
    bloodGroup,
    academicActivity,
    certifications,
    extracurricularActivity,
  } = applicant;

  return (
    <>
      <Card className="w-full max-w-5xl mx-auto p-5 rounded-lg bg-white dark:bg-gray-800 grid grid-col-1 sm:grid-cols-3 gap-4 overflow-hidden">
        {/* Left Section */}
        <div className="col-span-2 sm:col-span-1 bg-gray-50 dark:bg-gray-700 flex flex-col items-center justify-between py-6 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="flex items-start sm:items-center gap-4">
              <div>
                <Avatar className="h-16 sm:h-24 w-16 sm:w-24 border-4 border-emerald-300 dark:border-emerald-400">
                  <AvatarImage src="/path/to/image.jpg" alt={applicantName} />
                  <AvatarFallback className="text-xl sm:text-2xl md:text-4xl bg-emerald-400 dark:bg-emerald-500 text-white">
                    {applicantName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="block sm:hidden ">
                <h2 className="text-base sm:text-lg font-semibold sm:mt-4 dark:text-white">
                  {applicantName}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  {designation}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 items-center">
                  🩸 {bloodGroup}
                </p>
              </div>
            </div>

            <div className="hidden items-center sm:flex flex-col justify-center">
              <h2 className="text-lg text-center font-semibold sm:mt-4 dark:text-white">
                {applicantName}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {designation}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                🩸 {bloodGroup}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex sm:flex-col gap-2">
                <p className="text-xs sm:text-sm dark:text-gray-300">
                  📍 {address}
                </p>
                <p className="text-xs sm:text-sm dark:text-gray-300">
                  📞 {phone}
                </p>
              </div>
              <div className="flex sm:flex-col gap-2">
                <p className="text-xs sm:text-sm dark:text-gray-300">
                  ✉️ {applicantEmail}
                </p>
                <div className="flex gap-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300 justify-center">
                  {socialLinks
                    ? socialLinks.map((link) => (
                        <a
                          key={link.id}
                          href={link.socialMediaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
                        >
                          {link.socialMedia.title === "facebook" ? (
                            <Facebook size={16} />
                          ) : link.socialMedia.title === "linkedin" ? (
                            <Linkedin size={16} />
                          ) : (
                            <Globe size={16} />
                          )}
                        </a>
                      ))
                    : "No social media available"}
                </div>
              </div>

              {/* Social Links */}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 mt-4 sm:mt-0">
            <div>
              <Button
                variant="default"
                size="xs"
                className="border border-red-600 bg-red-100 text-red-600 hover:bg-red-200 shadow-none dark:border-gray-600 dark:bg-gray-100 dark:text-gray-600 dark:hover:bg-gray-200"
              >
                Download CV
              </Button>
            </div>

            {applicant.status === "applied" ? (
          <StepSelector
            selectedStep={selectedStep}
            onStepChange={handleStepChange}
          />
        ) : applicant.status === "shortlisted" ? (
          <div className="flex gap-2 items-center">
            <div
              className="text-[10px] bg-yellow-100 text-yellow-600 border border-yellow-500 font-medium dark:border-gray-600 dark:bg-gray-100 dark:text-gray-700 dark:hover:bg-gray-200 p-1.5 rounded-md cursor-pointer"
              onClick={toggleDropdown}
            >
              {schedule.date
                ? `${selectedStep}: ${schedule.date.toLocaleDateString()} at ${schedule.time}`
                : `Appearing ${selectedStep || "Step not defined"}`}
            </div>
            
            {isDropdownOpen && (
              <StepSelector
                selectedStep={selectedStep}
                onStepChange={handleStepChange}
              />
            )}
          </div>
        ) : (
          <Button
            variant="default"
            size="xs"
            className={`border ${
              applicant.status === "hired"
                ? "bg-emerald-100 text-emerald-600 border-emerald-600 dark:border-gray-600 dark:bg-gray-100 dark:text-gray-600 dark:hover:bg-gray-200"
                : "bg-red-100 text-red-600"
            }`}
            disabled
          >
            This applicant is {applicant.status}
          </Button>
        )}
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-2 grid grid-cols-2 gap-2 px-1 sm:px-5">
          {/* Experiences Section */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <CirclePlus size={16} />{" "}
              <h3 className="text-md font-semibold mb-1">Experiences</h3>
            </div>
            {experiences.map((exp, index) => (
              <div key={index} className="mb-3 text-sm">
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  {exp.position}
                </p>
                <div className="flex sm:flex-col justify-between sm:justify-start">
                  <p className="dark:text-gray-300">{exp.companyName}</p>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(exp.startDate).toLocaleDateString()} -{" "}
                    {new Date(exp.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Certification Section */}
          <div className="col-span-2 sm:col-span-1">
            <div className="cols-span-2 sm:col-span-1 flex items-center gap-2">
              <File size={16} />{" "}
              <h3 className="text-md font-semibold mb-1">Certifications</h3>
            </div>
            {certifications &&
              certifications.map((certificate, index) => (
                <div key={index} className="mb-3 text-sm">
                  <p className="font-semibold text-gray-700 dark:text-gray-300">
                    {certificate.name}
                  </p>
                  <div className="flex sm:flex-col justify-between">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {certificate.issuingOrganization}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(certificate.dateObtained).toLocaleDateString()}{" "}
                      -{" "}
                      {new Date(
                        certificate.expirationDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          {/* Education Section */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <GraduationCap size={16} />{" "}
              <h3 className="text-md font-semibold mb-1">Education</h3>
            </div>
            {education.map((edu, index) => (
              <div key={index} className="mb-2 text-sm">
                <p className="font-semibold dark:text-gray-200">{edu.degree}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {edu.institution}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Graduated: {edu.graduationYear}
                </p>
              </div>
            ))}
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col">
            {/* Academic Activities Section */}
            <div className="">
              <div className="flex items-center gap-2">
                <NotebookPen size={16} />{" "}
                <h3 className="text-md font-semibold mb-1">
                  Academic Activities
                </h3>
              </div>
              {academicActivity &&
                academicActivity.map((activity, index) => (
                  <div key={index} className="mb-3 text-sm">
                    <p className="font-semibold text-gray-700 dark:text-gray-300">
                      {activity.title}
                    </p>
                    <div className="flex justify-between sm:flex-col">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-300">
                        {activity.academicActivityType.title} (
                        {activity.duration} months)
                      </p>
                    </div>
                    <p className="text-xs hidden sm:block text-gray-500 dark:text-gray-400">
                      {new Date(activity.beginning).toLocaleDateString()} -{" "}
                      {new Date(activity.ending).toLocaleDateString()}
                    </p>
                  </div>
                ))}
            </div>

            {/* Extracurricular Activities */}
            <div>
              <div className="flex items-center gap-2">
                <SquareActivity size={16} />{" "}
                <h3 className="text-md font-semibold mb-1">
                  Extracurricular Activities
                </h3>
              </div>
              {extracurricularActivity.map((activity, index) => (
                <div key={index} className="mb-3 text-sm">
                  <p className="font-semibold text-gray-700 dark:text-gray-300">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {activity.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="flex flex-col items-start col-span-2 gap-2">
            <div className="flex items-center gap-2">
              <Settings size={20} />{" "}
              <h3 className="text-md font-medium w-full">Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2 ">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="text-xs px-2 py-1 text-gray-700 dark:text-gray-200 bg-gray-200 hover:bg-gray-300 dark:bg-gray-900"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        step={selectedStep}
        onSchedule={handleSchedule}
      />
    </>
  );
};

export default ApplicantDetails;

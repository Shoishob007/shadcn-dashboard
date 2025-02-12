"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
// import { applicantsData } from "../../demoAppList/components/applicantsData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
  House,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepSelector } from "./components/StepSelector";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSession } from "next-auth/react";

const ApplicantDetails = () => {
  const searchParams = useSearchParams();
  const applicantId = searchParams.get("id");
  const { data: session } = useSession();
  const accessToken = session?.access_token;
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("applied");
  const [selectedStep, setSelectedStep] = useState("");
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [schedule, setSchedule] = useState({
    date: null,
    time: "",
  });

  useEffect(() => {
    const fetchApplicantData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/applicants/${applicantId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("REsponse :: ", response);
        if (!response.ok) {
          throw new Error("Failed to fetch applicant data");
        }
        const data = await response.json();
        setApplicant(data);
        setStatus(data.status || "applied");
        setSelectedStep(data.steps || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (applicantId) {
      fetchApplicantData();
    }
  }, [applicantId, accessToken]);

  console.log("Applicant we got :: ", applicant);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading applicant details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!applicant) {
    return (
      <div className="flex justify-center items-center h-64">
        Applicant not found!
      </div>
    );
  }

  const handleStepChange = (step) => {
    setSelectedStep(step);
    setStatus("shortlisted");
    setSchedule({ date: null, time: "" });
    setIsScheduleModalOpen(true);
  };

  const handleReject = () => {
    setStatus("rejected");
    setSelectedStep("");
  };

  const handleSchedule = (date, time) => {
    setSchedule({ date, time });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const {
    name = "N/A",
    firstName = "",
    lastName = "",
    email = "Not provided",
    phone = "Not provided",
    address = "Not provided",
    cv = null,
    experiences = [],
    educations = [],
    skills = [],
    socialLinks = [],
    designation = "Position not specified",
    bloodGroup = "Not specified",
    academicActivity = [],
    trainingAndCertifications = [],
    extracurricularActivity = [],
  } = applicant;

  const displayName =
    name || `${firstName} ${lastName}`.trim() || "Anonymous Applicant";

  return (
    <>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <House className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/demoAppList">Applicants List</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/demoAppList/demoAppDetails?id=${applicantId}`}
            >
              {displayName}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="w-full max-w-5xl mx-auto p-5 rounded-lg bg-white dark:bg-gray-800 grid grid-col-1 sm:grid-cols-3 gap-4 sm:gap-0 md:gap-4 overflow-hidden">
        {/* Left Section */}
        <div className="col-span-2 sm:col-span-1 bg-gray-50 dark:bg-gray-700 flex flex-col items-center justify-between py-4 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="flex items-start sm:items-center gap-4">
              <Avatar className="h-16 sm:h-24 w-16 sm:w-24 border-4 border-emerald-300 dark:border-emerald-400">
                <AvatarImage src={applicant.img} alt={displayName} />
                <AvatarFallback className="text-xl sm:text-2xl md:text-4xl bg-emerald-400 dark:bg-emerald-500 text-white">
                  {displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="block sm:hidden">
                <h2 className="text-base sm:text-lg font-semibold sm:mt-4 dark:text-white">
                  {displayName}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  {designation}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 items-center">
                  🩸 {bloodGroup}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-center justify-center">
              <h2 className="text-lg text-center font-semibold sm:mt-4 dark:text-white">
                {displayName}
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
                  ✉️ {email}
                </p>
                <div className="flex gap-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300 justify-center">
                  {socialLinks.length > 0 ? (
                    socialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.socialMediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
                      >
                        {link.socialMedia?.title === "facebook" ? (
                          <Facebook size={16} />
                        ) : link.socialMedia?.title === "linkedin" ? (
                          <Linkedin size={16} />
                        ) : (
                          <Globe size={16} />
                        )}
                      </a>
                    ))
                  ) : (
                    <span className="text-gray-500">
                      No social links available
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 mt-4 sm:mt-0 capitalize">
            <Button
              variant="outline"
              size="xs"
              className="border shadow-none bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-100 dark:text-gray-700 dark:hover:bg-gray-300"
              onClick={() => {
                if (cv) {
                  window.open(cv, "_blank", "noopener,noreferrer");
                } else {
                  alert("No CV available to download");
                }
              }}
            >
              View Resume
            </Button>

            {status === "applied" ? (
              <StepSelector
                selectedStep={selectedStep}
                onStepChange={handleStepChange}
                onReject={handleReject}
              />
            ) : status === "shortlisted" ? (
              <div className="flex flex-col gap-2 items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="text-[10px] bg-yellow-100 text-yellow-600 border border-yellow-500 font-medium dark:border-yellow-600 dark:bg-yellow-100 dark:text-yellow-700 dark:hover:bg-yellow-200 p-1.5 rounded-md cursor-pointer"
                        onClick={toggleDropdown}
                      >
                        {schedule.date
                          ? `${selectedStep}: ${schedule.date.toLocaleDateString()} at ${
                              schedule.time
                            }`
                          : `Appearing ${selectedStep || "Step not defined"}`}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isDropdownOpen ? "Click to close" : "Click to change"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {isDropdownOpen && (
                  <StepSelector
                    selectedStep={selectedStep}
                    onStepChange={handleStepChange}
                    onReject={handleReject}
                  />
                )}
              </div>
            ) : (
              <Button
                variant="default"
                size="xs"
                className={`border ${
                  status === "hired"
                    ? "bg-emerald-100 text-emerald-600 border-emerald-600 dark:border-emerald-600 dark:bg-emerald-100 dark:text-emerald-600 dark:hover:bg-emerald-200"
                    : "bg-red-100 text-red-600"
                } disabled:opacity-50`}
                disabled
              >
                This applicant is {status}
              </Button>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-2 grid grid-cols-2 gap-2 px-1 sm:px-5 overflow-y-auto">
          {/* Experiences Section */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 border w-fit px-2 py-0.5 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-200 border-black rounded-md">
              <CirclePlus size={16} />
              <h3 className="text-sm font-semibold">Experiences</h3>
            </div>
            {experiences.length > 0 ? (
              experiences.map((exp, index) => (
                <div key={index} className="mb-3 text-sm">
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    {exp.position || "Position not specified"}
                  </p>
                  <div className="flex sm:flex-col justify-between sm:justify-start">
                    <p className="dark:text-gray-300">
                      {exp.companyName || "Company not specified"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {exp.startDate
                        ? new Date(exp.startDate).toLocaleDateString()
                        : "Start date not specified"}{" "}
                      -
                      {exp.endDate
                        ? new Date(exp.endDate).toLocaleDateString()
                        : "Present"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                No experience information available
              </p>
            )}
          </div>

          {/* Certification Section */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 border w-fit px-2 py-0.5 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-200 border-black rounded-md">
              <File size={16} />
              <h3 className="text-sm font-semibold">Certifications</h3>
            </div>
            {trainingAndCertifications.length > 0 ? (
              trainingAndCertifications.map((cert, index) => (
                <div key={index} className="mb-3 text-sm">
                  <p className="font-semibold text-gray-700 dark:text-gray-300">
                    {cert.name || "Certificate name not specified"}
                  </p>
                  <div className="flex sm:flex-col justify-between">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {cert.issuingOrganization || "Organization not specified"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {cert.dateObtained
                        ? new Date(cert.dateObtained).toLocaleDateString()
                        : "Date obtained not specified"}{" "}
                      -
                      {cert.expirationDate
                        ? new Date(cert.expirationDate).toLocaleDateString()
                        : "No expiration date"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                No certification information available
              </p>
            )}
          </div>

          {/* Education Section */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 border w-fit px-2 py-0.5 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-200 border-black rounded-md">
              <GraduationCap size={16} />
              <h3 className="text-sm font-semibold">Education</h3>
            </div>
            {educations.length > 0 ? (
              educations.map((edu, index) => (
                <div key={index} className="mb-2 text-sm">
                  <p className="font-semibold dark:text-gray-200">
                    {edu.degree || "Degree not specified"}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {edu.institution || "Institution not specified"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Graduated: {edu.graduationYear || "Year not specified"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                No education information available
              </p>
            )}
          </div>

          <div className="col-span-2 sm:col-span-1 gap-2 flex flex-col">
            {/* Academic Activities Section */}
            <div>
              <div className="flex items-center gap-2 border w-fit px-2 py-0.5 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-200 border-black rounded-md">
                <NotebookPen size={16} />
                <h3 className="text-sm font-semibold">Academic Activities</h3>
              </div>
              {academicActivity.length > 0 ? (
                academicActivity.map((activity, index) => (
                  <div key={index} className="mb-3 text-sm">
                    <p className="font-semibold text-gray-700 dark:text-gray-300">
                      {activity.title || "Activity title not specified"}
                    </p>
                    <div className="flex justify-between sm:flex-col">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {activity.description || "No description available"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-300">
                        {activity.academicActivityType?.title ||
                          "Type not specified"}
                        ({activity.duration || "N/A"} months)
                      </p>
                    </div>
                    <p className="text-xs hidden sm:block text-gray-500 dark:text-gray-400">
                      {activity.beginning
                        ? new Date(activity.beginning).toLocaleDateString()
                        : "Start date not specified"}{" "}
                      -
                      {activity.ending
                        ? new Date(activity.ending).toLocaleDateString()
                        : "End date not specified"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  No academic activities available
                </p>
              )}
            </div>

            {/* Extracurricular Activities */}
            <div>
              <div className="flex items-center gap-2 border w-fit px-2 py-0.5 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-200 border-black rounded-md">
                <SquareActivity size={16} />
                <h3 className="text-sm font-semibold">
                  Extracurricular Activities
                </h3>
              </div>
              {extracurricularActivity.length > 0 ? (
                extracurricularActivity.map((activity, index) => (
                  <div key={index} className="mb-3 text-sm">
                    <p className="font-semibold text-gray-700 dark:text-gray-300">
                      {activity.title || "Activity title not specified"}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {activity.description || "No description available"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  No extracurricular activities available
                </p>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div className="flex flex-col items-start col-span-2 gap-2">
            <div className="flex items-center gap-2 border w-fit px-2 py-0.5 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-200 border-black rounded-md">
              <Settings size={20} />
              <h3 className="text-sm font-medium w-full">Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="text-xs px-2 py-1 text-gray-700 dark:text-gray-200 bg-gray-200 hover:bg-gray-300 dark:bg-gray-900"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No skills listed
                </p>
              )}
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

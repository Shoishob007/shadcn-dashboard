"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
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
import StepSelector from "./components/StepSelector";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSession } from "next-auth/react";
import ScheduleModal from "./components/ScheduleModal";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import HiringProgress from "../../JobList/components/HiringProgressBar";

const ApplicantDetails = ({
  currentApplicant,
  applicantId,
  jobApplicationId,
  applicationStatus,
  applicationStatusId,
  hiringStages,
  jobComponent,
}) => {
  // console.log("Applicant Profile ID:", applicantId);
  // console.log("Job Application ID:", jobApplicationId);
  // console.log("Application Status ID:", applicationStatusId);
  // console.log("Hiring stages :: ", hiringStages);
  console.log("Application Status :: ", applicationStatus);
  const searchParams = useSearchParams();
  // const jobApplication = searchParams.get("jobId");
  // console.log("jobApplication :: ", jobApplication)
  const { data: session } = useSession();
  const accessToken = session?.access_token;
  const { toast } = useToast();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("applied");
  const [selectedStep, setSelectedStep] = useState("");
  const [scheduleModal, setScheduleModal] = useState({
    isOpen: false,
    applicantId: null,
    applicationId: null,
    step: null,
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
        if (!response.ok) {
          throw new Error("Failed to fetch applicant data");
        }
        const data = await response.json();
        setApplicant(data);
        // console.log("Applicants status :: ", data)
        setStatus(applicationStatus || "applied");
        setSelectedStep(data?.steps || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (applicantId) {
      fetchApplicantData();
    }
  }, [applicantId, accessToken, applicationStatus]);

  console.log("Applicants i am sending :: ", applicant);

  // Get the latest stage and status for an applicant
  const getLatestStageInfo = (applicant) => {
    const latestStatus = applicant.applicationStatus;
    const latestHiringStage = applicant.hiringStep?.title;
    const latestHiringStageOrder = applicant.hiringStep?.order;

    return {
      status: latestStatus,
      stage: latestHiringStage,
      order: latestHiringStageOrder,
    };
  };

  // Render the hiring stages progress bar with circular indicators
  const renderHiringStages = (applicant) => {
    const {
      stage: latestStage,
      order: latestStageOrder,
      status: latestStatus,
    } = getLatestStageInfo(applicant);

    return (
      <HiringProgress
        currentStage={latestStageOrder}
        totalStages={hiringStages.docs.length}
        stages={hiringStages.docs}
        status={latestStatus}
      />
    );
  };

  const handleStepChange = async (
    jobApplicationId,
    applicationStatusId,
    newStage
  ) => {
    if (!applicationStatusId) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/applicant-status`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              jobApplication: jobApplicationId,
              hiringStage: hiringStages.docs[0].id,
              status: "shortlisted",
              timeStamp: new Date().toISOString(),
            }),
          }
        );

        if (response.ok) {
          setStatus("shortlisted");
          setSelectedStep(newStage);
          toast({
            title: "Success",
            description: "Applicant shortlisted successfully.",
            variant: "ourSuccess",
          });
        } else {
          throw new Error("Failed to shortlist applicant");
        }
      } catch (error) {
        console.error("Error updating applicant status:", error);
        toast({
          title: "Error",
          description: "Failed to shortlist applicant. Please try again.",
          variant: "ourDestructive",
        });
      }
    } else {
      setScheduleModal({
        isOpen: true,
        applicantId: jobApplicationId,
        applicationStatusId: applicationStatusId,
        step: newStage,
      });
    }
  };

  const handleReject = async (jobApplicationId, applicationStatusId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicant-status/${applicationStatusId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            jobApplication: jobApplicationId,
            status: "rejected",
          }),
        }
      );

      if (response.ok) {
        setStatus("rejected");
        toast({
          title: "Success",
          description: "Applicant rejected successfully.",
          variant: "ourSuccess",
        });
      } else {
        throw new Error("Failed to reject applicant");
      }
    } catch (error) {
      console.error("Error updating applicant status:", error);
      toast({
        title: "Error",
        description: "Failed to reject applicant. Please try again.",
        variant: "ourDestructive",
      });
    }
  };

  const handleHire = async (jobApplicationId, applicationStatusId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicant-status/${applicationStatusId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            jobApplication: jobApplicationId,
            status: "hired",
          }),
        }
      );

      if (response.ok) {
        setStatus("hired");
        toast({
          title: "Success!",
          description: "Applicant hired successfully.",
          variant: "ourSuccess",
        });
      } else {
        throw new Error("Failed to hire applicant");
      }
    } catch (error) {
      console.error("Error updating applicant status:", error);
      toast({
        title: "Error!",
        description: "Failed to hire applicant. Please try again.",
        variant: "ourDestructive",
      });
    }
  };

  const handleSchedule = async (date, time, selectedStage) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error("Invalid date value");
      toast({
        title: "Error",
        description: "Invalid date selected.",
        variant: "ourDestructive",
      });
      return;
    }

    const convertTo24Hour = (time) => {
      const match = time.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
      if (!match) return null;

      let [_, hours, minutes, period] = match;
      hours = parseInt(hours, 10);
      if (period.toUpperCase() === "PM" && hours !== 12) {
        hours += 12;
      } else if (period.toUpperCase() === "AM" && hours === 12) {
        hours = 0;
      }
      return `${String(hours).padStart(2, "0")}:${minutes}:00`;
    };

    const formattedTime = convertTo24Hour(time);
    if (!formattedTime) {
      console.error("Invalid time format");
      toast({
        title: "Error",
        description: "Invalid time format. Please use HH:MM AM/PM.",
        variant: "ourDestructive",
      });
      return;
    }

    const timestamp = new Date(
      `${date.toISOString().split("T")[0]}T${formattedTime}Z`
    ).toISOString();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicant-status/${applicationStatusId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            jobApplication: jobApplicationId,
            hiringStage: selectedStage.id,
            timeStamp: timestamp,
          }),
        }
      );

      if (response.ok) {
        setStatus("scheduled");
        setSelectedStep(selectedStage);
        toast({
          title: "Success",
          description: "Applicant schedule updated successfully.",
          variant: "ourSuccess",
        });
        setScheduleModal({
          isOpen: false,
          applicantId: null,
          applicationId: null,
          step: null,
        });
      } else {
        throw new Error("Failed to update hiring stage");
      }
    } catch (error) {
      console.error("Error updating applicant status:", error);
      toast({
        title: "Error",
        description: "Failed to update hiring stage. Please try again.",
        variant: "ourDestructive",
      });
    }
  };

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

  const {
    name = "N/A",
    email = "Email not provided",
    phone = "Phone not provided",
    address = "Address not provided",
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

  const displayName = name || "Anonymous Applicant";
  // console.log("Display Name :: ", displayName)

  const customCV = `${process.env.NEXT_PUBLIC_API_URL}${applicant?.cv?.url}`;
  // console.log("Applicant Details :: ", applicant?.img?.url);
  const profilePicture = `${process.env.NEXT_PUBLIC_API_URL}${applicant?.img?.url}`;

  return (
    <>
      {!jobComponent ? (
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <House className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/ApplicantList">
                Applicants List
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/ApplicantList/ApplicantDetails?id=${applicantId}`}
              >
                {displayName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ) : (
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <House className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/JobList">Job List</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/JobList/JobApplicants">
                Job Applicants
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/JobList/JobApplicants?id=${applicantId}`}>
                {displayName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}

      <Card className="w-full max-w-screen p-6 rounded-lg bg-white dark:bg-gray-800 grid grid-col-1 sm:grid-cols-3 gap-4 sm:gap-0 md:gap-4 overflow-hidden">
        {/* Left Section */}
        <div className="col-span-2 sm:col-span-1 bg-gray-50 dark:bg-gray-700 flex flex-col items-center justify-between py-4 rounded-lg">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-start sm:items-center gap-4">
              <Avatar className="h-16 sm:h-24 w-16 sm:w-24 border-4 border-emerald-300 dark:border-emerald-400">
                <AvatarImage src={profilePicture} alt={"Unknown Applicant"} />

                <AvatarFallback className="text-xl sm:text-2xl md:text-4xl bg-emerald-400 dark:bg-emerald-500 text-white">
                  {displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="block sm:hidden">
                <h2 className="text-base sm:text-lg font-semibold sm:mt-4 dark:text-white">
                  {displayName}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  💼 {designation?.title || "Designation not specified"}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 items-center">
                  🩸 {bloodGroup || "Blood group not provided"}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-center justify-center space-y-2">
              <h2 className="text-lg text-center font-semibold sm:mt-4 dark:text-white">
                {displayName}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                💼 {designation?.title || "Designation not specified"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                🩸 {bloodGroup || "Blood group not provided"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex sm:flex-col items-center justify-center gap-2">
                <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-300">
                  📍 {address || "Address not Provided"}
                </p>
                <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-300">
                  📞 {phone || "Phone not provided"}
                </p>
              </div>
              <div className="flex sm:flex-col justify-center items-center gap-2">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  ✉️ {email || "Email not provided"}
                </p>
                <div className="flex gap-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300 justify-center">
                  {socialLinks.length > 0 ? (
                    socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.socialMediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
                      >
                        <Globe size={16} />
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

          <div className="flex flex-col-reverse items-center gap-2 mt-5 sm:mt-3">
            <div className="flex items-center gap-2 capitalize">
              <Button
                variant="outline"
                size="xs"
                className="border shadow-none text-gray-700 bg-gray-300 hover:bg-gray-400 dark:border-gray-600 dark:bg-gray-100 dark:text-gray-700 dark:hover:bg-gray-300"
                onClick={() => {
                  if (cv) {
                    window.open(customCV, "_blank", "noopener,noreferrer");
                  } else {
                    alert("No CV available to download");
                  }
                }}
              >
                View Resume
              </Button>

              <StepSelector
                selectedStep={selectedStep}
                onStepChange={(newStage) =>
                  handleStepChange(
                    jobApplicationId,
                    applicationStatusId,
                    newStage
                  )
                }
                onReject={() =>
                  handleReject(jobApplicationId, applicationStatusId)
                }
                onHire={() => handleHire(jobApplicationId, applicationStatusId)}
                hiringStages={hiringStages.docs}
                applicationId={applicationStatusId}
                applicationStatus={status}
              />
            </div>
            <div className="">
              {/* Render hiring stages */}
              {renderHiringStages(currentApplicant)}
            </div>
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
                    {exp.designation.title || "Position not specified"}
                  </p>
                  <div className="flex sm:flex-col justify-between sm:justify-start">
                    <p className="dark:text-gray-300">
                      {exp.companyName || "Company not specified"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {exp.beginning
                        ? new Date(exp.beginning).toLocaleDateString()
                        : "Start date not specified"}{" "}
                      -
                      {exp.ending
                        ? new Date(exp.ending).toLocaleDateString()
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
                    {cert.title || "Certificate name not specified"}
                  </p>
                  <div className="flex sm:flex-col justify-between">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {cert?.issuingOrganization ||
                        "Organization not specified"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {cert.beginning
                        ? new Date(cert.beginning).toLocaleDateString()
                        : "Date obtained not specified"}{" "}
                      -
                      {cert.ending
                        ? new Date(cert.ending).toLocaleDateString()
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
                    {edu.degreeLevel.title || "Degree not specified"}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {edu.instituteName || "Institution not specified"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Graduated: {edu.ending || "Year not specified"}
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
                        {activity?.academicActivityType?.title ||
                          "Type not specified"}
                        ({activity?.duration || "N/A"} months)
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
                    {skill.title}
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

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={scheduleModal.isOpen}
        onClose={() =>
          setScheduleModal({
            isOpen: false,
            applicantId: null,
            applicationId: null,
            step: null,
          })
        }
        step={scheduleModal.step}
        onSchedule={handleSchedule}
        hiringStages={hiringStages.docs}
      />
    </>
  );
};

export default ApplicantDetails;

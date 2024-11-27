"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { applicantsData } from "../applicants/components/applicantsData";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const socialMediaIcons = {
  google: FaGoogle,
  facebook: FaFacebook,
};

const calculateTotalExperience = (experiences) => {
  const totalMonths = experiences.reduce((acc, exp) => {
    const start = new Date(exp.startDate);
    const end = new Date(exp.endDate);
    const duration =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    return acc + duration;
  }, 0);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return `${years} years ${months} months`;
};

const ApplicantsList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {applicantsData.map((applicant) => {
        const totalExperience = calculateTotalExperience(applicant.experiences);
        return (
          <Card
            key={applicant.id}
            className="flex flex-col justify-between p-5 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg bg-white dark:bg-gray-800"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center mb-4 ">
              <Avatar className="h-12 w-12 border border-emerald-500 text-sm">
                <AvatarImage
                  src={applicant.applicantName}
                  alt={applicant.applicantName}
                />
                <AvatarFallback className="bg-gray-300 text-xs font-bold text-gray-700">
                  {applicant.applicantName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="items-center flex gap-2 justify-between">
                  <h4 className="text-sm font-semibold dark:text-white">
                    {applicant.applicantName}
                  </h4>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {applicant.jobTitle}
                  </p>
                  <div
                    className={`px-2 py-1 rounded-full text-[10px] font-semibold mx-auto ${
                      applicant.status === "shortlisted"
                        ? "bg-yellow-100 text-yellow-600"
                        : `${
                            applicant.status === "hired"
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-red-100 text-red-600"
                          }`
                    }`}
                  >
                    {applicant.status.charAt(0).toUpperCase() +
                      applicant.status.slice(1)}
                  </div>
                </div>
              </div>
            </div>

            <div className=" text-gray-700 text-xs dark:text-gray-300 mb-3">
              <div className="flex flex-col text-xs items-center mb-3">
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {applicant.education.map((degree, index) => (
                    <li key={index} className="text-xs">
                      {degree.degree}
                    </li>
                  ))}
                </ul>
              </div>
              <p>
                Experience:<strong> {totalExperience}</strong>{" "}
              </p>
              <p>
                Certifications:{" "}
                <strong> {applicant.certifications.length}</strong>
              </p>
              <p>
                CV Score:<strong> {applicant.CVScore}</strong>{" "}
              </p>
            </div>

            <div className="flex flex-wrap gap-1 mb-3 justify-center">
              {applicant.skills.slice(0, 6).map((skill) => (
                <Badge
                  key={skill}
                  size="xs"
                  variant="secondary"
                  className={" text-xs dark:bg-gray-900"}
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex justify-between items-center gap-4">
              <div className="flex gap-2">
                {applicant.socialLinks && applicant.socialLinks.length > 0 ? (
                  applicant.socialLinks.map((link) => {
                    const Icon =
                      socialMediaIcons[link.socialMedia.title.toLowerCase()];
                    return (
                      Icon && (
                        <a
                          key={link.id}
                          href={link.socialMediaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-300 hover:scale-125 transition duration-200"
                        >
                          <Icon size={14} />
                        </a>
                      )
                    );
                  })
                ) : (
                  <span className="text-xs">N/A</span>
                )}
              </div>

              {/* View Details Button */}
              <Button
                variant="ghost"
                size="sm"
                className="w-full border dark:border-gray-200 transition-colors"
              >
                View Details
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ApplicantsList;

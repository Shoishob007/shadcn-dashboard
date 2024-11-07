import { useWindowWidth } from "@react-hook/window-size";
import React from "react";

export const ApplicantDetailsPopover = ({ applicant }) => {
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  return (
    <div>
      <div
        className={`max-h-[60vh] overflow-y-auto ${
          mobileWidth ? "text-xs" : "text-sm"
        }`}
      >
        <div>
          {/* Contact Info */}
          <div className="mb-2">
            <p className="font-medium text-base">Contact Information</p>
            <p>
              Email:{" "}
              <span className="font-light">{applicant.applicantEmail}</span>
            </p>
            <p>
              Job Title:{" "}
              <span className="font-light">{applicant.jobTitle}</span>
            </p>
          </div>

          {/* Skills */}
          <div className="mb-2 border-t dark:border-gray-200">
            <p className="font-medium text-base">Skills</p>
            <p>{applicant.skills.join(", ")}</p>
          </div>

          {/* Certifications */}
          <div className="mb-2 border-t dark:border-gray-200">
            <p className="font-medium text-base">Certifications</p>
            <ul className="list-disc list-inside">
              {applicant.certifications.map((certification, index) => (
                <li
                  key={index}
                  className="font-normal text-gray-800 dark:text-gray-300"
                >
                  {certification.name} - {certification.issuingOrganization}
                  <span className="text-[10px] ml-2">
                    (
                    {new Date(certification.dateObtained).toLocaleDateString(
                      "en-US"
                    )}
                    )
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences */}
          <div className="mb-2 border-t dark:border-gray-200">
            <p className="font-medium text-base">Experience</p>
            {applicant.experiences.map((experience, index) => (
              <div key={index} className="flex flex-col">
                <p>
                  {experience.position} at {experience.companyName}
                </p>
                <p className="text-[10px]">
                  ({new Date(experience.startDate).toLocaleDateString("en-US")}{" "}
                  -{" "}
                  {experience.endDate
                    ? new Date(experience.endDate).toLocaleDateString("en-US")
                    : "Present"}
                  )
                </p>
                {/* <ul className="list-disc list-inside pl-4 space-y-1">
                  {experience.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="text-gray-600 dark:text-gray-300">
                      {responsibility}
                    </li>
                  ))}
                </ul> */}
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="col-span-2 border-t dark:border-gray-200">
            <p className="font-medium text-base">Education</p>
            {applicant.education.map((edu, index) => (
              <div key={index}>
                <span className="font-medium">{edu.degree}</span> from{" "}
                {edu.institution} <br />
                <span className="text-[10px]">
                  Graduated: {edu.graduationYear}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

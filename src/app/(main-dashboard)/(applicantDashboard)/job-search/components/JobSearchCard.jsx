"use client";
import { Badge } from "../../../../../components/ui/badge";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent } from "../../../../../components/ui/card";
import { Separator } from "../../../../../components/ui/separator";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const JobSearchCard = ({ job }) => {
  const { data: session } = useSession();
  const accessToken = session?.access_token;
  const [employeeTypeData, setEmployeeTypeData] = useState("");
  const [jobTypeData, setJobTypeData] = useState("");
  const [showSkills, setShowSkills] = useState("");
  //   console.log("Job Data: ", job);
  const {
    id = job?.id,
    address = job?.address === null ? "address not found" : job?.address,
    title = job?.job?.title === null ? "title not found" : job?.job?.title,
    orgName = job?.job?.organization?.orgName === null
      ? "Organization not found"
      : job?.job?.organization?.orgName,
    salary = job?.salary === null ? "salary not found" : job?.salary,
    employeeTypeId = job?.ememployeeType === null
      ? "not found"
      : job?.employeeType,
    yearOfExperience = job?.yearOfExperience,
    jobTypeId = job?.jobType,
    // skills = job?.skills?.map((skill) => skill),
    skills = job?.skills?.map((skill) => skill.id),
  } = job;

  //   console.log("skills: ", skills)
  //   Employee type
  useEffect(() => {
    const getEmployeeType = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/employee-types/${employeeTypeId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const employeeData = await response.json();
      if (employeeData?.id) {
        setEmployeeTypeData(employeeData?.title);
      }
      //   console.log("Employee data: ", employeeData?.title);
    };
    getEmployeeType();
  }, [employeeTypeId, accessToken]);

  //   job type
  useEffect(() => {
    const getJobType = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job-types/${jobTypeId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const jobTypeData = await response.json();
      if (jobTypeData?.id) {
        setJobTypeData(jobTypeData?.title);
      }
      //   console.log("Employee data: ", employeeData?.title);
    };
    getJobType();
  }, [jobTypeId, accessToken]);

  //   skills
  // useEffect(() => {
  //   const fetchSkills = async () => {
  //     try {
  //       if (!skills || skills.length === 0) {
  //         console.error("Skills data missing.");
  //         return;
  //       }

  //       const skillIds = skills.join(",");
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/skills/${skillIds}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       // const skillsResponse = await response.json();
  //       // if (skillsResponse?.id) {
  //       //   setShowSkills(skillsResponse?.title);
  //       // }

  //       const skillsResponse = await response.json();
  //       if (Array.isArray(skillsResponse)) {
  //         setShowSkills(skillsResponse);
  //       }

  //       // console.log("Skills from skills response: ", skillsResponse);
  //     } catch (error) {
  //       console.error("Error fetching skills:", error.message);
  //     }
  //   };
  //   fetchSkills();
  // }, [skills, accessToken]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        if (!skills || skills.length === 0) {
          console.error("Skills data missing.");
          return;
        }

        // Loop through each skill ID and fetch one by one
        const fetchedSkills = await Promise.all(
          skills.map(async (skillId) => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/skills/${skillId}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            if (!res.ok) {
              console.error(`Failed to fetch skill with id ${skillId}`);
              return null;
            }
            return await res.json(); // should contain { id, title }
          })
        );

        // Filter out any null responses
        const validSkills = fetchedSkills.filter(
          (skill) => skill && skill.title
        );
        setShowSkills(validSkills);
      } catch (error) {
        console.error("Error fetching skills:", error.message);
      }
    };

    fetchSkills();
  }, [skills, accessToken]);

  return (
    <Link href={`/job-search/${id}`} className="">
      <Card className="w-full bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
        <CardContent className="p-6">
          {/* Header with logo and save button */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex bg-slate-100 border items-center justify-center text-lg font-semibold`}
              >
                {orgName ? orgName.charAt(0).toUpperCase() : "UN"}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {orgName ? orgName : "Unknown"}
                </h3>
                {/* <p className="text-sm text-gray-500">{timeAgo}</p> */}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 px-3 text-sm ${
                employeeTypeData === "Onsite"
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {employeeTypeData ? (
                <span>onsite</span>
              ) : (
                <span>remote</span>
              )}
            </Button>
          </div>

          {/* Job title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4 leading-tight">
            {title}
          </h2>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {showSkills.length > 0 ? (
              showSkills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-sm bg-gray-100 font-normal px-3 py-1"
                >
                  {skill.title}
                </Badge>
              ))
            ) : (
              <Badge
                variant="outline"
                className="bg-gray-100 text-sm px-3 py-1"
              >
                Skills not found
              </Badge>
            )}
          </div>

          <Separator className="my-4 bg-gray-100" />

          {/* Footer with salary, location and apply button */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {salary ? salary : 0} BDT
              </p>
              <p className="text-sm text-gray-500">
                {address ? address : "Not provided"}
              </p>
            </div>
            <Button className="bg-black text-white hover:bg-gray-800 px-6">
              Apply now
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default JobSearchCard;

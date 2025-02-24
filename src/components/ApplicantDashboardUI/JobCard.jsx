"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BriefcaseBusiness, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const JobCard = ({ job }) => {
  const { data: session } = useSession();
  const accessToken = session?.access_token;
  const [employeeTypeData, setEmployeeTypeData] = useState("");
  const [jobTypeData, setJobTypeData] = useState("");
  const [showSkills, setShowSkills] = useState("");

  const {
    id = job?.id,
    address = job?.address || "Address not found",
    title = job?.job?.title || "Title not found",
    orgName = job?.job?.organization?.orgName || "Organization not found",
    salary = job?.salary || "Salary not found",
    employeeTypeId = job?.employeeType || null,
    yearOfExperience = job?.yearOfExperience || "Experience not found",
    jobTypeId = job?.jobType || null,
    skills = job?.skills?.filter((skill) => skill) || [],
  } = job;

  // Employee Type Fetch
  useEffect(() => {
    const getEmployeeType = async () => {
      if (!accessToken || !employeeTypeId) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/employee-types/${employeeTypeId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const employeeData = await response.json();
        setEmployeeTypeData(employeeData?.title || "Not Found");
      } catch (error) {
        console.error("Error fetching employee type:", error.message);
      }
    };
    getEmployeeType();
  }, [employeeTypeId, accessToken]);

  // Skills Fetch
  useEffect(() => {
    const fetchSkills = async () => {
      if (!accessToken || skills.length === 0) return;
      try {
        const skillIds = skills.join(",");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/skills/${skillIds}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const skillsResponse = await response.json();
        setShowSkills(skillsResponse?.title || "Not Found");
      } catch (error) {
        console.error("Error fetching skills:", error.message);
      }
    };
    fetchSkills();
  }, [skills, accessToken]);

  // Job Type Fetch
  useEffect(() => {
    const getJobType = async () => {
      if (!accessToken || !jobTypeId) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-types/${jobTypeId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const jobTypeData = await response.json();
        setJobTypeData(jobTypeData?.title || "Not Found");
      } catch (error) {
        console.error("Error fetching job type:", error.message);
      }
    };
    getJobType();
  }, [jobTypeId, accessToken]);

  return (
    <Link href={`/job-search/${id}`} className="">
      <Card className="w-full hover:border hover:border-black duration-300 cursor-pointer">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 font-medium bg-gray-200 rounded-full flex items-center justify-center">
              <h1>{orgName ? orgName[0] : "U"}</h1>
            </div>
            <div>
              <h1 className="text-[15px] font-medium">{orgName}</h1>
              <p className="text-xs">{address}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <h1 className="text-[17px] font-semibold">{title}</h1>
            <div className="my-3 flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span>
                  <BriefcaseBusiness size={16} />
                </span>
                <span className="text-xs">{employeeTypeData}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>
                  <User size={16} />
                </span>
                <span className="text-xs">{yearOfExperience}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>
                  <User size={16} />
                </span>
                <span className="text-xs">{jobTypeData}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-wrap mt-2 text-sm">
              <span className="border border-black p-1 rounded-lg">
                {showSkills}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <div>
              <span className="font-bold">BDT {salary}</span>
              <span className="text-sm">/month</span>
            </div>
          </div>
          <Button size="sm">View Details</Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default JobCard;

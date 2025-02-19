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
  console.log("Job Data: ", job);
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
    skills = job?.skills.map((skill) => console.log("Skill: ", skill)),
  } = job;

  console.log("skills: ", skills);
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
  return (
    <Link href={`/job-search/${id}`} className="">
      <Card className="w-full hover:border hover:border-black duration-300 cursor-pointer">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 font-medium bg-gray-200 rounded-full flex items-center justify-center">
              <span>O</span>
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
                <span className={`text-xs`}>
                  {!employeeTypeData ? "not found" : employeeTypeData}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>
                  <User size={16} />
                </span>
                <span className={`text-xs`}>
                  {yearOfExperience === null
                    ? "experience not found"
                    : yearOfExperience}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>
                  <User size={16} />
                </span>
                <span className={`text-xs`}>
                  {jobTypeData === null ? "job type not found" : jobTypeData}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-wrap mt-2 text-sm">
              skills
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

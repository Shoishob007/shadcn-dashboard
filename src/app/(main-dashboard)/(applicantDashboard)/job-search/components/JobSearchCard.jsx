"use client";
import SkillsDisplay from "@/components/ApplicantDashboardUI/SkillsDisplay";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const JobSearchCard = ({ job }) => {
    console.log('Jobs Data :: ', job)
    const { data: session, status } = useSession();
    const accessToken = session?.access_token;
    const [storeOrgName, setStoreOrgName]= useState('');
    console.log("job location", job?.location)
  const {
    id = "unknown",
    orgName = `${storeOrgName ? storeOrgName : "Unknown Company"}`,
    orgId = `${
      job?.job?.organization?.id
        ? job?.job?.organization?.id
        : "Unknown Company"
    }`,
    title = `${job?.job?.title ? job?.job?.title : "Job Title Not Available"}`,
    address = `${
      job?.address ? job?.address : job?.address === null ? "Address not defined" : "Address Not Specified"
    }`,
    skills = `${job?.skills ? job?.skills.map((skill) => <p key={skill.id}>{skill}</p>) : "No Skills Listed"}`,
    employeeType = "other",
    salary = "0",
    img = "",
  } = job || {};


//   const formattedEmployeeType =
//     typeof employeeType === "string" ? employeeType.replace("-", " ") : "Other";

    useEffect(() => {
        const getOrgName = async() => {
            try {
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${orgId}`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              );
              const data = await response.json();
            //   console.log("Org response :: ", data);
              setStoreOrgName(data.orgName);
            //   console.log("Org name :: ", data.orgName);
            } catch (error) {
              console.log(
                "Error fetching application details: ",
                error.message
              );
            }
        };
        getOrgName();
    }, [orgId, accessToken]);

  return (
    <Link href={`/job-search/${id}`} className="">
      <Card className="w-full hover:border hover:border-black duration-300 cursor-pointer">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 font-medium bg-gray-200 rounded-full flex items-center justify-center">
              <span>{orgName.charAt(0)}</span>
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
            {/* <span
              className={`text-xs font-semibold capitalize ${
                formattedEmployeeType === "full time"
                  ? "text-[#20c997]"
                  : formattedEmployeeType === "contractual"
                  ? "text-[#ffc107]"
                  : formattedEmployeeType === "part time"
                  ? "text-[#6610f2]"
                  : "text-gray-500"
              }`}
            >
              {formattedEmployeeType}
            </span> */}
            <div className="flex items-center gap-1 flex-wrap mt-2 text-sm">
              {skills.length > 0 ? (
                <SkillsDisplay skills={skills} />
              ) : (
                <span className="text-gray-500">No skills listed</span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <div>
              <span className="font-bold">${salary}</span>
              <span className="text-sm">/month</span>
            </div>
          </div>
          <Button size="sm">View Details</Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default JobSearchCard;

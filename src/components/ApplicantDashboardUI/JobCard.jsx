import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import SkillsDisplay from "./SkillsDisplay";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const JobCard = ({ job }) => {
    const { data: session, status } = useSession();
    const accessToken = session?.access_token;
    const [storeOrgName, setStoreOrgName]= useState('');
    const {
      id = `${job?.id ? job?.id : "unknown"}`,
      orgName = `${storeOrgName ? storeOrgName : "Unknown Company"}`,
      orgId = `${
        job?.job?.organization?.id
          ? job?.job?.organization?.id
          : "Unknown Company"
      }`,
      title = `${
        job?.job?.title ? job?.job?.title : "Job Title Not Available"
      }`,
      address = `${
        job?.address
          ? job?.address
          : job?.address === null
          ? "Address not defined"
          : "Address Not Specified"
      }`,
      skills = `${
        job?.skills
          ? job?.skills.map((skill) => <p key={skill.id}>{skill}</p>)
          : "No Skills Listed"
      }`,
      employeeType = `${job?.employeeType ? job?.employeeType : "not found"}`,
      salary = "0",
      img = "",
      yearOfExperience = `${
        job?.yearOfExperience === null
          ? "not specified"
          : job?.yearOfExperience
          ? job?.yearOfExperience
          : "not found"
      }`,
    } = job || {};

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
    <Link href={`/job-detail/${id}`} className="">
      <Card className="w-full hover:border hover:border-black duration-300 cursor-pointer">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 font-medium bg-gray-200  rounded-full flex items-center justify-center">
              <span className="">{orgName.slice(0, 1)}</span>
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
            <div className="flex items-center mt-3 gap-3">
              <span
                className={`text-xs font-semibold capitalize ${
                  employeeType === "full-time"
                    ? "text-[#20c997]"
                    : employeeType === "contractual"
                    ? "text-[#ffc107]"
                    : employeeType === "part-time"
                    ? "text-[#6610f2]"
                    : "text-black"
                }`}
              >
                {employeeType}
              </span>
              <span className="text-xs font-medium">
                {yearOfExperience}
              </span>
              {/* <span className="text-xs font-medium">{jobType}</span> */}
            </div>
            <div className="mt-3">
              <SkillsDisplay skills={skills} />
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
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default JobCard;

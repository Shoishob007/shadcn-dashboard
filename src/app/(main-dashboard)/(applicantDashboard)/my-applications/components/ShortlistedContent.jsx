"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BriefcaseBusiness } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import HiringSteps from "./HiringSteps";

const ShortlistedContent = ({ shortlistedJob }) => {
  const [storeOrgName, setstoreOrgName] = useState("");
  const { data: session } = useSession();
  const accessToken = session?.access_token;
  const {
    title = shortlistedJob?.jobDetails?.job?.title,
    address = shortlistedJob?.jobDetails?.address,
    organizationId = shortlistedJob?.jobDetails?.job?.organization,
    jobType = shortlistedJob?.jobDetails?.jobType?.title,
    salary = shortlistedJob?.jobDetails?.salary,
    yearOfExperience = shortlistedJob?.jobDetails?.yearOfExperience,
    appliedDate = shortlistedJob?.createdAt,
    status = shortlistedJob?.applicationStatus?.docs,
  } = shortlistedJob;

const applicationStatus = shortlistedJob?.applicationStatus || {}; 

  console.log("Shortlisted jobs: ", shortlistedJob);

  // Organization name
  useEffect(() => {
    const getOrgName = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${organizationId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        setstoreOrgName(data.orgName);
        //   console.log("org data: ", data.orgName);
      } catch (error) {
        console.error("Error fetching organization:", error);
      }
    };
    getOrgName();
  }, [organizationId, accessToken]);

  return (
    <Link href={`/my-applications/${shortlistedJob.id}`}>
      <Card className="w-full hover:border hover:border-black duration-300 cursor-pointer">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 font-medium bg-gray-200 rounded-full flex items-center justify-center">
              <span>{!storeOrgName ? "U" : storeOrgName.slice(0, 1)}</span>
            </div>
            <div>
              <h1 className="text-[15px] font-medium">
                {storeOrgName === null
                  ? "Organization not found"
                  : storeOrgName}
              </h1>
              <p className="text-xs">
                {address === null ? "Address not found" : address}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <h1 className="text-[17px] font-semibold">
              {title === null ? "Title not found" : title}
            </h1>
            <div className="flex items-center mt-3 gap-3">
              <div className="flex items-center gap-1">
                <span>
                  <BriefcaseBusiness size={16} />
                </span>
                <span className="text-xs">
                  {yearOfExperience === null || yearOfExperience === null
                    ? "experience not found"
                    : yearOfExperience == 1
                    ? yearOfExperience + "Year"
                    : yearOfExperience + "Years"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>
                  <BriefcaseBusiness size={16} />
                </span>
                <span className="text-xs">
                  {!jobType ? "Job type not found" : jobType}
                </span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-xs">Applied on:</span>
                  <span className="text-xs font-medium">
                    {appliedDate
                      ? new Date(appliedDate).toLocaleDateString("en-GB")
                      : "Date not found"}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-yellow-500 bg-yellow-100 p-1 rounded-lg">
                    {status?.length === 0 || status === undefined
                      ? "applied"
                      : status[0]?.status}
                  </span>
                </div>
              </div>
              {/* Hiring steps */}
              <div className="text-xs">
                <HiringSteps applicationStatus={applicationStatus} />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <div>
              <span className="font-bold">
                BDT {salary === null ? "0" : salary}
              </span>
              <span className="text-sm">/month</span>
            </div>
          </div>
          <Button size="sm">View Details</Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ShortlistedContent;
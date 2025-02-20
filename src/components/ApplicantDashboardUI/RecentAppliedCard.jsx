import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import HiringSteps from "./HiringSteps";
import { BriefcaseBusiness } from "lucide-react";

const RecentAppliedCard = ({ app }) => {
  const [storeOrgName, setstoreOrgName] = useState("");
   const [dataStore, setDataStore] = useState([]);
  const { data: session } = useSession();
  const accessToken = session?.access_token;
 
    console.log("Recent Applied job data: ", app);
    const {
      id = app?.id,
      jobDetailsId = app?.jobDetails?.id,
      address = app?.jobDetails?.address,
      title = app?.jobDetails?.job?.title,
      organizationId = app?.jobDetails?.job?.organization,
      jobType = app?.jobDetails?.jobType?.title,
      salary = app?.jobDetails?.salary,
      yearOfExperience = app?.jobDetails?.yearOfExperience,
      appliedDate = app?.createdAt,
      status = app?.applicationStatus?.docs,
    } = app;

    const applicationStatus = app?.applicationStatus || {}; 

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
    <div key={id}>
      <Card className="1w-full hover:border hover:border-black duration-300 cursor-pointer">
        <Link href={`/my-applications/${id}`}>
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 font-medium bg-gray-200 rounded-full flex items-center justify-center">
                  <span>{!storeOrgName ? "U" : storeOrgName.slice(0, 1)}</span>
                </div>
                <div>
                  <h1 className="text-[15px] font-medium">{storeOrgName}</h1>
                  <p className="text-xs">
                    {address === null ? "Address not found" : address}
                  </p>
                </div>
              </div>
              <div>
                <span>
                  {status?.length === 0 || status === undefined ? (
                    <span className="text-xs text-blue-500 bg-blue-100 p-1 rounded-lg">
                      applied
                    </span>
                  ) : (
                    <span className="text-xs text-yellow-500 bg-yellow-100 p-1 rounded-lg">
                      {status[0]?.status}
                    </span>
                  )}
                </span>
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
                    {yearOfExperience === null
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
                <div className="flex items-center gap-1">
                  <span className="text-xs">Applied on:</span>
                  <span className="text-xs font-medium">
                    {appliedDate
                      ? new Date(appliedDate).toLocaleDateString("en-GB")
                      : "Date not found"}
                  </span>
                </div>
                {/* Hiring steps */}
                <div className="text-xs">
                  <HiringSteps applicationStatus={applicationStatus} />
                </div>
              </div>
            </div>
          </CardContent>
        </Link>
        <CardFooter className="flex justify-between">
          <div>
            <div>
              <span className="font-bold">
                BDT {salary === null ? "0" : salary}
              </span>
              <span className="text-sm">/month</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RecentAppliedCard;

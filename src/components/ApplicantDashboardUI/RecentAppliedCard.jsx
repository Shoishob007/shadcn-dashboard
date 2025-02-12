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

const RecentAppliedCard = ({ app }) => {
  const [storeOrgName, setstoreOrgName] = useState("");
  const { data: session } = useSession();
  const accessToken = session?.access_token;
  console.log("Recent applied card : ", app);
  const {
    id = app?.id,
    orgId = `${
      app?.jobDetails?.job?.organization
        ? app?.jobDetails?.job?.organization
        : "Org not found"
    }`,
    orgName = `${storeOrgName ? storeOrgName : "Unknown Company"}`,
    title = `${
      app.jobDetails.job.title ? app.jobDetails.job.title : "Title not found"
    }`,
    address = "unknown",
    salary = app?.jobDetails?.salary ? app?.jobDetails?.salary : 0,
  } = app || {};

  useEffect(() => {
    const getOrgName = async () => {
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
        setstoreOrgName(data.orgName);
        //   console.log("org data: ", data.orgName);
      } catch (error) {
        console.error("Error fetching organization:", error);
      }
    };
    getOrgName();
  }, [orgId, accessToken]);

  return (
    <div key={app.id}>
      <Card className="w-full hover:border hover:border-black duration-300 cursor-pointer">
        <Link href={`/my-applications/${id}`}>
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
              <div className="flex items-center mt-3 gap-3">
                <span
                  className={`text-xs font-semibold capitalize ${
                    app.employeeType === "full-time"
                      ? "text-[#20c997]"
                      : app.employeeType === "contractual"
                      ? "text-[#ffc107]"
                      : app.employeeType === "part-time"
                      ? "text-[#6610f2]"
                      : "text-black"
                  }`}
                >
                  {app.employeeType}
                </span>
                <span className="text-xs font-medium">
                  {app.yearOfExperience}{" "}
                  {app.yearOfExperience === 1 ? "year" : "years"}
                </span>
                {/* <span className="text-xs font-medium">{jobType}</span> */}
              </div>
              <div className="mt-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs">
                    Applied on: <span className="font-medium"></span>
                  </span>
                  <span
                    className={`text-xs lowercase font-medium p-1 rounded-md ${
                      app.status === "Applied"
                        ? "text-blue-500 bg-blue-100"
                        : app.status === "Shortlisted"
                        ? "text-yellow-500 bg-yellow-100"
                        : "text-red-500 bg-red-100"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Link>
        <CardFooter className="flex justify-between">
          <div>
            <div>
              <span className="font-bold">${salary}</span>
              <span className="text-sm">/month</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            View status
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RecentAppliedCard;

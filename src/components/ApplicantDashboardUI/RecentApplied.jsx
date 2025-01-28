import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";
import { jobs } from "./applicantJobData";

const RecentApplied = () => {
  const recentJobs = jobs.filter((job) => job.isApplied);

  return (
    <div className="mt-6">
      <h1 className="text-xl font-semibold mb-3">Recent Applied</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentJobs.slice(0, 3).map((app) => {
          const date = app.deadline;
          const formattedDate = format(date, "MMM dd, yyyy");
          return (
            <Link href={"/"} key={app.id}>
              <Card className="w-full hover:border hover:border-black duration-300 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 font-medium bg-gray-200 rounded-full flex items-center justify-center">
                      <span>{app.orgName.slice(0, 1)}</span>
                    </div>
                    <div>
                      <h1 className="text-[15px] font-medium">{app.orgName}</h1>
                      <p className="text-xs">{app.location}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h1 className="text-[17px] font-semibold">{app.title}</h1>
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
                          Applied on:{" "}
                          <span className="font-medium">{formattedDate}</span>
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
                <CardFooter className="flex justify-between">
                  <div>
                    <div>
                      <span className="font-bold">${app.salary}</span>
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
        })}
      </div>
      <div className="mt-3 flex items-center justify-end">
        <Link href={"/my-applications"}>
          <Button size="sm">See All Applications</Button>
        </Link>
      </div>
    </div>
  );
};

export default RecentApplied;

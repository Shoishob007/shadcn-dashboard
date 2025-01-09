import ApplicantionStatus from "@/app/(main-dashboard)/(applicantDashboard)/my-applications/components/ApplicantionStatus";
import ApplicantStepsBar from "@/app/(main-dashboard)/(applicantDashboard)/my-applications/components/ApplicantStepsBar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, MapPin, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import companyLogo from "../../../public/assests/company.png";
import { Button } from "../ui/button";
import { jobs } from "./applicantJobData";

const RecentApplied = () => {
  const recentJobs = jobs.filter((job) => job.isApplied);

  return (
    <div className="mt-6">
      <h1 className="text-xl font-semibold mb-3">Recent Applied</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentJobs.slice(0, 3).map((app) => (
          <Card
            key={app.id}
            className="flex flex-col justify-between w-full shadow hover:border hover:border-black duration-300 bg-white rounded cursor-pointer dark:bg-gray-800"
          >
            <Link href={`/my-applications/${app.id}`}>
              <CardHeader className="flex items-center space-x-4 p-5 rounded-t-md"> {/* bg-gray-50 dark:bg-gray-800 */}
                <Image
                  src={companyLogo}
                  width={50}
                  height={50}
                  alt="logo"
                  className="rounded-full border border-gray-300"
                />
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {app.title}
                  </CardTitle>
                  <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                    {app.orgName}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="p-5 flex flex-col flex-grow ">
                <p className="text-sm text-gray-600 dark:text-gray-200 leading-relaxed line-clamp-4">
                  {app.description.slice(0, 100)}...
                </p>
                <ul className="mt-3 text-sm text-gray-600 dark:text-gray-200 space-y-2">
                  <li className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span>Location: {app.location}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span>Salary: ${app.salary}/month </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span>
                      Experience: {app.yearOfExperience} Years of Experience
                    </span>
                  </li>
                </ul>
                <div className="mt-4 text-sm text-gray-700 dark:text-gray-200">
                  <p>
                    Status:
                    <span
                      className={`text-xs font-medium ml-1 rounded p-1 ${
                        app.status === "Applied"
                          ? "text-blue-500 bg-blue-100 border border-blue-200"
                          : app.status === "Shortlisted"
                          ? "text-yellow-500 bg-yellow-100 border border-yellow-200"
                          : app.status === "Hired"
                          ? "text-green-500 bg-green-100 border border-green-200"
                          : "text-red-500 bg-red-100 border border-red-200"
                      }`}
                    >
                      {app.status}
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-200">
                    Applied on: {app.published}
                  </p>
                </div>
              </CardContent>
            </Link>

            <hr className="border-gray-200" />
            <CardFooter className="flex justify-between items-center  p-5 rounded-b-md mt-auto"> {/* bg-gray-50 dark:bg-gray-800 */}
              <div className="w-[60%]">
                {/* <ApplicantStepsBar/> */}
                {/* <ApplicantProgress/> */}
                <ApplicantStepsBar />
              </div>
                <ApplicantionStatus viewStatus={app.status} />
            </CardFooter>
          </Card>
        ))}
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

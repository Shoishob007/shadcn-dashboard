import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, MapPin, User } from "lucide-react";
import Image from "next/image";
import logo from "../../../../../public/assests/company.png";

const AppliedJobCard = ({ job, applicationStatus, dateApplied }) => {
  return (
    <div className="flex justify-center items-center w-full ">
      {/* Card with job details and application status */}
      <Card className="flex flex-col justify-between w-full shadow hover:border hover:border-black duration-300 bg-white rounded cursor-pointer">
        {/* Header with Company Logo and Job Title */}
        <CardHeader className="flex items-center space-x-4 bg-gray-50 p-4 rounded-t-md">
          <Image
            src={logo}
            width={50}
            height={50}
            alt="logo"
            className="rounded-full border border-gray-300"
          />
          <div>
            <CardTitle className="text-xl font-semibold text-gray-800">
              {job.title}
            </CardTitle>
            <p className="text-sm text-gray-500">{job.company}</p>
          </div>
        </CardHeader>

        {/* Content with Job Application Details */}
        <CardContent className="p-4 flex flex-col flex-grow">
          <ul className="mt-3 text-sm text-gray-600 space-y-2">
            <li className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>Location: {job.location}</span>
            </li>
            <li className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <span>Salary: {job.salary}</span>
            </li>
            <li className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-500" />
              <span>Experience: {job.experience}</span>
            </li>
          </ul>
          
          {/* Application Status */}
          <div className="mt-4 text-sm text-gray-700">
            <p>
              Status:
              <span
                className={`font-semibold ml-1 ${
                  applicationStatus === "Pending"
                    ? "text-yellow-500"
                    : applicationStatus === "Interview"
                    ? "text-blue-500"
                    : applicationStatus === "Accepted"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {applicationStatus}
              </span>
            </p>
            <p className="text-sm text-gray-500">Applied on: {dateApplied}</p>
          </div>
        </CardContent>

        {/* Footer with Apply Button */}
        <hr className="border-gray-200" />
        <CardFooter className="flex justify-between items-center bg-gray-50 p-4 rounded-b-md mt-auto">
          <Button variant="outline" onClick={() => alert("View Status")}>
            View Status
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AppliedJobCard;

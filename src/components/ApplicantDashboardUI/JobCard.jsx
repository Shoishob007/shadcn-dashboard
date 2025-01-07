import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Code, DollarSign, MapPin, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/assests/company.png";

const JobCard = ({ job }) => {
  return (
    <Link href={`/job-detail/${job.id}`} className="">
      <Card className="w-full shadow hover:border hover:border-black duration-300 bg-white dark:bg-gray-800 rounded cursor-pointer">
        {/* Header with Company Logo and Name */}
        <CardHeader className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-800 p-5 rounded-t-md">
          <Image
            src={logo}
            width={50}
            height={50}
            alt="logo"
            className="rounded-full border border-gray-300"
          />
          <div>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {job.title}
            </CardTitle>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">{job.orgName}</p>
          </div>
        </CardHeader>

        {/* Content with Job Details */}
        <CardContent className="p-5 flex flex-col justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-200 leading-relaxed line-clamp-4">
            {job.description.slice(0, 150)}...
          </p>
          <ul className="mt-3 text-sm text-gray-600 dark:text-gray-200 space-y-2">
            <li className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-200" />
              <span>Location: {job.location}</span>
            </li>
            <li className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-gray-500 dark:text-gray-200" />
              <span>Salary: ${job.salary}/month</span>
            </li>
            <li className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500 dark:text-gray-200" />
              <span>Employment Type: {job.employeeType}</span>
            </li>
            <li className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-500 dark:text-gray-200" />
              <span>
                Experience: {job.yearOfExperience} years of experience
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-gray-500 dark:text-gray-200" />
              <span>Skills: {job.skills.map((skill, i) => (<span key={i}>{skill},</span>))}</span>
            </li>
          </ul>
        </CardContent>

        {/* Footer with Border and Apply Button */}
        <hr className="border-gray-200" />
        <CardFooter className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-5 rounded-b-md mt-auto">
          <p className="text-sm text-gray-500 dark:text-gray-200">Posted: {job.published}</p>
          <Button>View Details</Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default JobCard;

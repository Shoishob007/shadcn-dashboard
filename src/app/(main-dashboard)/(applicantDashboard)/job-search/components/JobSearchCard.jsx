import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, Calendar, DollarSign, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import companyLogo from "../../../../../../public/assests/company.png";

const JobSearchCard = ({ job }) => {
  return (
    <Link href={`/job-search/${job.id}`} className="">
      <Card className="w-full shadow-hover:border hover:border-black duration-300 bg-white rounded cursor-pointer">
        {/* Header with Company Logo and Name */}
        <CardHeader className="flex items-center space-x-4 bg-gray-50 p-4 rounded-t-md">
          <Image
            src={companyLogo}
            width={50}
            height={50}
            alt="logo"
            className="rounded-full border border-gray-300"
          />
          <div>
            <CardTitle className="text-xl font-semibold text-gray-800">
              {job.title || "Untitled Job"}
            </CardTitle>
            <p className="text-sm text-center text-gray-500">
              {job.orgName || "Unknown Company"}
            </p>
          </div>
        </CardHeader>

        {/* Content with Job Details */}
        <CardContent className="p-4 flex flex-col justify-between">
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
            {job.description}
          </p>
          <ul className="mt-3 text-sm text-gray-600 space-y-2">
            <li className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>Location: {job.location || "Location Unavailable"}</span>
            </li>
            <li className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <span>
                Salary: {job.salary ? `$${job.salary}` : "Negotiable"}
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>Deadline: {job.deadline || "Not Mentioned"}</span>
            </li>
            <li className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-gray-500" />
              <span>
                Experience:{" "}
                {(job.yearOfExperience && `${job.yearOfExperience} Years`) ||
                  "Not Specified"}
              </span>
            </li>
          </ul>
        </CardContent>

        {/* Footer with Border and Apply Button */}
        <hr className="border-gray-200" />
        <CardFooter className="flex justify-between items-center bg-gray-50 p-4 rounded-b-md mt-auto">
          <p className="text-sm text-gray-500">
            Posted: {job.published || "Unknown"}
          </p>
          <Button variant="outline">View Details</Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default JobSearchCard;

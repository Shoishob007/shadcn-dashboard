import { Briefcase, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import companyLogo from "../../../../../../public/assests/company.png";

const JobSearchCard = ({ job }) => {
  return (
    <Link href={`/job-search/${job.id}`}>
      <div className="max-w-sm w-full bg-white border border-gray-200 shadow-lg rounded-lg p-5 hover:shadow transition-all duration-300 flex flex-col">
        {/* Header: Job Title and Company Logo */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {job.jobTitle || "Untitled Job"}
            </h2>
            <p className="text-sm text-gray-600">
              {job.companyName || "Unknown Company"}
            </p>
          </div>
          <Image
            src={companyLogo}
            alt={`${job.companyName || "Company"} Logo`}
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
        </div>

        {/* Job Meta Info */}
        <div className="space-y-2">
          <p className="text-sm text-gray-700 flex items-center gap-2">
            <MapPin size={16} className="text-gray-500" />{" "}
            {job.location || "Location Unavailable"}
          </p>
          <p className="text-sm text-gray-700 flex items-center gap-2">
            <Calendar size={16} className="text-gray-500" /> Deadline:{" "}
            {job.deadline || "Not Mentioned"}
          </p>
          {/* Experience */}
          <p className="text-sm text-gray-700 flex items-center gap-2">
            <Briefcase size={16} className="text-gray-500" /> Experience:{" "}
            {job.experience || "Not Specified"}
          </p>
        </div>

        {/* Footer: Job Type and Salary */}
        <div className="flex justify-between items-center mt-5">
          {/* Job Type */}
          <span
            className={`py-1 px-3 rounded-full text-xs font-medium ${
              job.employmentType === "Full-Time"
                ? "bg-green-100 text-green-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {job.employmentType || "Type Unspecified"}
          </span>

          {/* Salary */}
          <p className="text-sm font-semibold text-gray-800">
            {job.salary ? `${job.salary}` : "Negotiable"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default JobSearchCard;

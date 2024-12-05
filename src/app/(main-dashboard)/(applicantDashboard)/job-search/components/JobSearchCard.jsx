import { Bookmark, Calendar, MapPin, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import companyLogo from '../../../../../../public/assests/company.png';

const JobSearchCard = ({ job }) => {
  return (
    <Link href={'/job-details'}>
      <div className="max-w-sm w-full bg-white border border-gray-200 shadow-lg rounded-lg p-6 hover:shadow transition-all duration-300 flex flex-col">
      {/* Job Title and Company Info */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{job.jobTitle}</h2>
          <p className="text-sm text-gray-600">{job.companyName}</p>
        </div>
        <Image src={companyLogo} alt="Company Logo" width={60} />
      </div>

      {/* Job Details */}
      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Category:</span> {job.category}
        </p>
        <p className="text-sm text-gray-700 flex items-center gap-2">
          <MapPin size={16} /> {job.location}
        </p>
        <p className="text-sm text-gray-700 flex items-center gap-2">
          <Calendar size={16} /> Application Date: {job.applicationDate}
        </p>
        <p className="text-sm text-gray-700 flex items-center gap-2">
          <Calendar size={16} /> Deadline: {job.deadline}
        </p>
      </div>

      {/* Status and Salary */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
          {/* Job Status */}
          <div
            className={`py-1 px-3 rounded-full text-xs font-medium flex items-center gap-1 ${
              job.jobStatus === "Open"
                ? "border border-green-600 text-green-600"
                : "border border-red-600 text-red-600"
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                job.jobStatus === "Open" ? "bg-green-600" : "bg-red-500"
              }`}
            ></div>
            <span>{job.jobStatus}</span>
          </div>
        </div>

        {/* Salary */}
        <p className="font-semibold text-gray-800">{job.salary}</p>
      </div>
    </div>
    </Link>

  );
};

export default JobSearchCard;

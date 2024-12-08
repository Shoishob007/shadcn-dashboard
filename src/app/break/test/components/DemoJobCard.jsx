"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const DemoJobCard = ({ job }) => {
  return (
    <Card className="p-6  w-full bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        {/* Company Logo or Placeholder */}
        <div className="bg-gray-100 h-12 w-12 rounded-full flex items-center justify-center">
          <span className="text-sm text-gray-700 font-semibold dark:text-gray-300">
            {job.companyName.slice(0, 2).toUpperCase()}
          </span>
        </div>

        {/* Job Status Badge */}
        <Badge
          className={`px-2 py-1 text-sm flex items-center gap-1 bg-transparent font-medium ${
            job.jobStatus === "open"
              ? "border border-green-600 text-green-600"
              : "border border-red-600 text-red-600"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              job.jobStatus === "open" ? "bg-green-600" : "bg-red-600"
            }`}
          ></span>
          <span className="">{job.jobStatus}</span>
        </Badge>
      </div>

      {/* Job Title */}
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {job.title}
      </h2>

      {/* Company Name and Publish Date */}
      <div className="flex justify-between items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
        <span>{job.companyName}</span>
        <span>{job.publishDate}</span>
      </div>

      {/* Job Type and Salary */}
      <div className="mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <strong>Job Type:</strong> {job.jobType}
        </p>
      </div>

      {/* Apply Button */}
      <div className="flex justify-between items-center">
        <div>
          <div className=" font-semibold text-sm dark:text-gray-400">
            <span>{job.salary}</span>
          </div>
        </div>
        <button className="px-4 py-2 text-sm text-white bg-slate-600 rounded-md hover:bg-slate-900 focus:outline-none">
          Apply Now
        </button>
      </div>
    </Card>
  );
};

export default DemoJobCard;

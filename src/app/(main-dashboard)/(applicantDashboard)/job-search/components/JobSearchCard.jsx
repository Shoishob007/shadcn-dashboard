import { Bookmark, Share2 } from "lucide-react";
import Image from "next/image";
import companyLogo from '../../../../../../public/assests/company.png';

const JobSearchCard = ({ job }) => {
  return (
    <div className="border rounded-lg shadow p-6 bg-white hover:shadow-lg transition">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Image
          src={companyLogo}
          alt={`${job.companyName} Logo`}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
          <p className="text-gray-500 text-sm">{job.companyName}</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="mt-4 space-y-2">
        <p className="text-gray-600 text-sm">{job.description}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-green-100 text-green-600 text-xs font-medium py-1 px-3 rounded-full">
            {job.location}
          </span>
          <span className="bg-blue-100 text-blue-600 text-xs font-medium py-1 px-3 rounded-full">
            {job.employmentType}
          </span>
          <span className="bg-orange-100 text-orange-600 text-xs font-medium py-1 px-3 rounded-full">
            {job.jobCategory}
          </span>
        </div>
        <p className="text-gray-600 text-sm mt-2">
          <strong>Salary:</strong> {job.salary}
        </p>
        <p className="text-gray-600 text-sm">
          <strong>Deadline:</strong> {job.deadline}
        </p>
        {job.skills && (
          <p className="text-gray-600 text-sm">
            <strong>Key Skills:</strong> {job.skills.join(", ")}
          </p>
        )}
      </div>

      {/* Call to Action */}
      <div className="mt-4 flex justify-between items-center">
        <button className="flex items-center gap-2 px-4 py-2 rounded bg-[#00ca99] hover:bg-[#212121] duration-300 text-white font-medium outline-none border-none">
          Apply Now
        </button>
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-blue-600">
            <Bookmark size={20} />
          </button>
          <button className="text-gray-400 hover:text-blue-600">
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobSearchCard;

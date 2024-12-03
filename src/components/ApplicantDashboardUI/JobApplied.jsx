import { Bookmark, Briefcase, Clock, Eye, MapPin, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import companyLogo from "../../../public/assests/company.png";

export const jobsData = [
  {
    jobTitle: "Frontend Developer",
    companyName: "Tech Innovators Ltd.",
    category: "Software Development",
    deadline: "2024-12-15",
    locationType: "Remote",
    location: "Global",
    jobType: "Full-Time",
    salary: "$50,000",
    employeeType: "Contractual",
    applicantStatus: "Hired",
    jobStatus: "Open",
  },
  {
    jobTitle: "UI/UX Designer",
    companyName: "DesignCraft Studio",
    category: "Design",
    deadline: "2024-12-20",
    locationType: "On-site",
    location: "San Francisco, CA",
    jobType: "Full-Time",
    salary: "$60,000",
    employeeType: "Permanent",
    applicantStatus: "Applied",
    jobStatus: "Closed",
  },
  {
    jobTitle: "Backend Developer",
    companyName: "CodeBase Solutions",
    category: "Software Development",
    deadline: "2024-12-10",
    locationType: "Hybrid",
    location: "New York, NY",
    jobType: "Contract",
    salary: "$40000",
    employeeType: "Freelance",
    applicantStatus: "Shortlisted",
    jobStatus: "Open",
  },
  {
    jobTitle: "Marketing Specialist",
    companyName: "GrowthHackers Inc.",
    category: "Marketing",
    deadline: "2024-12-18",
    locationType: "Remote",
    location: "USA",
    jobType: "Part-Time",
    salary: "$35000",
    employeeType: "Permanent",
    applicantStatus: "Shortlisted",
    jobStatus: "Open",
  },
  {
    jobTitle: "Data Analyst",
    companyName: "Data Insights Co.",
    category: "Analytics",
    deadline: "2024-12-25",
    locationType: "On-site",
    location: "Austin, TX",
    jobType: "Full-Time",
    salary: "$70,000",
    employeeType: "Freelance",
    applicantStatus: "Rejected",
    jobStatus: "Closed",
  },
];

const JobApplied = () => {
  return (
    <div className="mt-[30px]">
      <h1 className="font-medium text-xl mb-5">Recent Job Applied</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobsData.map((job, index) => (
          <div
            key={index}
            className="p-6 shadow rounded-lg border border-gray-200 bg-white relative group"
          >
            {/* Job Info */}
            <div className="flex gap-4">
              <div>
                <Image src={companyLogo} alt="company logo" width={80} />
              </div>
              <div>
                <h1 className="text-lg font-semibold mb-1">{job.jobTitle}</h1>
                <span className="block text-sm text-gray-500 mb-3">
                  {job.companyName}
                </span>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4 items-center text-sm text-gray-600">
                    <Briefcase size={18} />
                    <span>{job.category}</span>
                  </div>
                  <div className="flex gap-4 items-center text-sm text-gray-600">
                    <Clock size={18} />
                    <span>Deadline: {job.deadline}</span>
                  </div>
                  <div className="flex gap-4 items-center text-sm text-gray-600">
                    <MapPin size={18} />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2 flex-wrap">
                <span className="bg-orange-100 text-orange-600 text-xs font-medium py-1 px-3 rounded-full">
                  {job.jobType}
                </span>
                <span className="bg-pink-100 text-pink-600 text-xs font-medium py-1 px-3 rounded-full">
                  {job.locationType}
                </span>
                <span className="bg-cyan-100 text-cyan-600 text-xs font-medium py-1 px-3 rounded-full">
                  {job.employeeType}
                </span>
              </div>
              {/* <div className="font-semibold text-gray-800 ">{job.salary}</div> */}
            </div>

            {/* Add jobStatus and applicantStatus here */}
            <div className="flex gap-2 mt-3">
              <div>
                <span className="text-sm">Job Status:</span>{" "}
                <span className="bg-blue-100 text-blue-600 text-xs font-medium py-1 px-3 rounded-full">
                  {job.jobStatus}
                </span>
              </div>
              <div>
                <span className="text-sm">Applicant Status:</span>{" "}
                <span
                  className={`${
                    job.applicantStatus === "Shortlisted"
                      ? "bg-yellow-100 text-yellow-600"
                      : job.applicantStatus === "Hired"
                      ? "bg-green-100 text-green-600"
                      : job.applicantStatus === "Rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-purple-100 text-purple-600"
                  } text-xs font-medium py-1 px-3 rounded-full`}
                >
                  {job.applicantStatus}
                </span>
              </div>
            </div>
            <div className="font-semibold text-gray-800 flex items-center justify-end">
              {job.salary}
            </div>

            {/* Hover Icons */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col gap-2">
              <span className="cursor-pointer text-gray-500 hover:text-gray-800">
                <Bookmark size={20} />
              </span>
              <Link href={"/job-details"}>
                <span className="cursor-pointer text-gray-500 hover:text-gray-800">
                  <Eye size={20} />
                </span>
              </Link>
              <span className="cursor-pointer text-red-500 hover:text-red-700">
                <Trash2 size={20} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobApplied;

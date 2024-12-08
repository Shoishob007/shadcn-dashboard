import { Briefcase, Clock, MapPin } from "lucide-react";
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
    applicantStatus: "Applied",
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
    salary: "$40,000",
    employeeType: "Freelance",
    applicantStatus: "Applied",
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
    salary: "$35,000",
    employeeType: "Permanent",
    applicantStatus: "Applied",
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
    applicantStatus: "Applied",
    jobStatus: "Closed",
  },
];

const JobApplied = () => {
  return (
    <div className="mt-[30px]">
      <h1 className="font-medium text-xl mb-5">Recent Job Applied</h1>
      <div className="grid grid-cols-1 gap-6">
        {jobsData.map((job, index) => {
          const progressSteps = ["Applied", "In Review", "Interview", "Offer"];
          const currentStepIndex = progressSteps.indexOf(job.applicantStatus);
          return (
            <Link href={"/job-details"} key={index}>
              <div className="p-6 shadow rounded-lg border border-gray-200 bg-white relative group">
                {/* Job Info */}
                <div className="flex justify-between gap-4">
                  <div>
                    <h1 className="text-lg font-semibold mb-1">
                      {job.jobTitle}
                    </h1>
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
                  <div>
                    <Image
                      src={companyLogo}
                      alt="company logo"
                      width={120}
                      height={120}
                    />
                  </div>
                </div>

                {/* Job Status & Type */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-4">
                    <span className="text-xs font-medium py-1 px-3 rounded-full border border-blue-500 text-blue-500">
                      {job.jobType}
                    </span>
                    <span className="text-xs font-medium py-1 px-3 rounded-full border border-teal-500 text-teal-500">
                      {job.locationType}
                    </span>
                    <span className="text-xs font-medium py-1 px-3 rounded-full border border-purple-500 text-purple-500">
                      {job.employeeType}
                    </span>
                  </div>
                  <div className="font-semibold text-gray-800">
                    {job.salary}
                  </div>
                </div>

                {/* Add jobStatus and applicantStatus */}
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
                        job.applicantStatus === "Applied"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-gray-100 text-gray-600"
                      } text-xs font-medium py-1 px-3 rounded-full`}
                    >
                      {job.applicantStatus}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex items-center">
                    {progressSteps.map((step, index) => {
                      const isCompleted = index < currentStepIndex;
                      const isActive = index === currentStepIndex;

                      return (
                        <div key={index} className="flex flex-col items-center">
                          {/* Step Circle */}
                          <div className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                                isCompleted
                                  ? "bg-purple-600 text-white border-purple-600"
                                  : isActive
                                  ? "bg-white text-purple-600 border-purple-600"
                                  : "bg-gray-100 text-gray-400 border-gray-300"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div>
                              {index < progressSteps.length - 1 && (
                                <div
                                  className={`w-20 h-1 ${
                                    isCompleted
                                      ? "bg-purple-600"
                                      : isActive
                                      ? "bg-purple-300"
                                      : "bg-gray-300"
                                  }`}
                                ></div>
                              )}
                            </div>
                          </div>

                          {/* Step Label */}
                          <div
                            className={`text-sm mt-2 ${
                              isCompleted
                                ? "text-purple-600"
                                : isActive
                                ? "text-purple-600 font-semibold"
                                : "text-gray-400"
                            }`}
                          >
                            {step}
                          </div>

                          {/* Line Between Steps */}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default JobApplied;

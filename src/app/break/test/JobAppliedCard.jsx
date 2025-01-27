import Image from "next/image";

export default function JobAppliedCard({
  jobTitle = "Frontend Developer",
  companyName = "Rocket Systems",
  companyLogo = "/rocket-logo.png",
  appliedDate = "January 24, 2025",
  location = "Remote",
  status = "Under Review",
}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-3">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{jobTitle}</h3>
          <p className="text-sm text-gray-500">at {companyName}</p>
        </div>
        <Image
          src={companyLogo}
          alt={`${companyName} Logo`}
          className="h-10 w-10 rounded-full"
          width={60}
          height={60}
        />
      </div>

      {/* Application Details */}
      <p className="text-sm text-gray-600">Applied on: {appliedDate}</p>
      <div className="flex items-center gap-2">
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            status === "Under Review"
              ? "bg-blue-100 text-blue-600"
              : status === "Shortlisted"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {status}
        </span>
        <span className="text-sm text-gray-500">Location: {location}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 mt-2">
        <button className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200">
          View Details
        </button>
        <button className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200">
          Withdraw
        </button>
      </div>
    </div>
  );
}

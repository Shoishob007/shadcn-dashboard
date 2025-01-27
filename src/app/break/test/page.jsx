import Image from "next/image";
import JobAppliedCard from "./JobAppliedCard";

const AppliedCard = () => {
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Frontend Developer
              </h3>
              <p className="text-sm text-gray-500">at Rocket Systems</p>
            </div>
            <Image
              src="/rocket-logo.png"
              alt="Rocket Systems Logo"
              width={80}
              height={80}
              className="h-10 w-10 rounded-full"
            />
          </div>
          <p className="text-sm text-gray-600">Applied on: January 24, 2025</p>
          <div className="flex items-center gap-2">
            <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              Under Review
            </span>
            <span className="text-sm text-gray-500">Location: Remote</span>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200">
              View Details
            </button>
            <button className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200">
              Withdraw
            </button>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Frontend Developer
              </h3>
              <p className="text-sm text-gray-500">at Rocket Systems</p>
            </div>
            <Image
              src="/rocket-logo.png"
              alt="Rocket Systems Logo"
              width={80}
              height={80}
              className="h-10 w-10 rounded-full"
            />
          </div>
          <p className="text-sm text-gray-600">Applied on: January 24, 2025</p>
          <div className="flex items-center gap-2">
            <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              Under Review
            </span>
            <span className="text-sm text-gray-500">Location: Remote</span>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200">
              View Details
            </button>
            <button className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200">
              Withdraw
            </button>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Frontend Developer
              </h3>
              <p className="text-sm text-gray-500">at Rocket Systems</p>
            </div>
            <Image
              src="/rocket-logo.png"
              alt="Rocket Systems Logo"
              width={80}
              height={80}
              className="h-10 w-10 rounded-full"
            />
          </div>
          <p className="text-sm text-gray-600">Applied on: January 24, 2025</p>
          <div className="flex items-center gap-2">
            <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              Under Review
            </span>
            <span className="text-sm text-gray-500">Location: Remote</span>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200">
              View Details
            </button>
            <button className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200">
              Withdraw
            </button>
          </div>
        </div>
      </section>
      <section>
        <JobAppliedCard />
      </section>
    </>
  );
};

export default AppliedCard;

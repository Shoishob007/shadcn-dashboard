"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const ToggleGroup = () => {
  const searchParams = useSearchParams();
  const [selectedStatus, setSelectedStatus] = useState("applied");

  useEffect(() => {
    // Get the 'status' query parameter from URL
    const status = searchParams.get("status");
    if (status) {
      setSelectedStatus(status);
    }
  }, [searchParams]);

  const handleToggleChange = (status) => {
    setSelectedStatus(status);
    // You can use a router push if you want to sync state with the URL
    window.history.pushState({}, "", `?status=${status}`);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Toggle Group */}
      <div className="flex gap-0 justify-start bg-white dark:bg-gray-800 w-fit rounded-full shadow-sm h-7 md:h-9">
        <div
          className={`h-7 md:h-9 pr-2 pl-3 md:px-6 py-1 md:py-2 text-xs md:text-sm font-medium rounded-l-full transition-all duration-300 cursor-pointer ${
            selectedStatus === "applied"
              ? "!text-white dark:!text-blue-900 shadow-md !bg-gray-800 dark:!bg-blue-300"
              : "bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-300 dark:hover:!bg-gray-700 dark:text-gray-300"
          }`}
          onClick={() => handleToggleChange("applied")}
        >
          Applied
        </div>

        <div
          className={`h-7 md:h-9 px-2 md:px-6 py-1 md:py-2 text-xs md:text-sm font-medium rounded-none transition-all duration-300 cursor-pointer ${
            selectedStatus === "shortlisted"
              ? "!text-white dark:!text-yellow-900 shadow-md !bg-gray-800 dark:!bg-yellow-300"
              : "bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-300 dark:hover:!bg-gray-700 dark:text-gray-300"
          }`}
          onClick={() => handleToggleChange("shortlisted")}
        >
          Shortlisted
        </div>

        <div
          className={`h-7 md:h-9 pr-3 pl-2 md:px-6 py-1 md:py-2 text-xs md:text-sm font-medium rounded-r-full transition-all duration-300 cursor-pointer ${
            selectedStatus === "rejected"
              ? "!text-white dark:!text-red-900 shadow-md !bg-gray-800 dark:!bg-red-300"
              : "bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-300 dark:hover:!bg-gray-700 dark:text-gray-300"
          }`}
          onClick={() => handleToggleChange("rejected")}
        >
          Rejected
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-4 p-4 border rounded-md shadow-sm bg-gray-100 dark:bg-gray-700">
        {selectedStatus === "applied" && (
          <div>
            <h2 className="text-lg font-semibold">Applied</h2>
            <p>
              You have successfully applied for the position. Your application
              is being reviewed.
            </p>
          </div>
        )}
        {selectedStatus === "shortlisted" && (
          <div>
            <h2 className="text-lg font-semibold">Shortlisted</h2>
            <p>
              Congratulations! You have been shortlisted for the next stage of
              the selection process.
            </p>
          </div>
        )}
        {selectedStatus === "rejected" && (
          <div>
            <h2 className="text-lg font-semibold">Rejected</h2>
            <p>
              We&apos;re sorry to inform you that your application has been
              rejected. Best wishes for your future endeavors.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToggleGroup;

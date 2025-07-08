"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import companyLogo from "../../../../../../public/assests/company.png";

const RichTextDisplay = ({ content, fallback = "Not specified" }) => {
  if (!content)
    return <p className="text-gray-500 dark:text-gray-400">{fallback}</p>;
  if (content.includes("<") && content.includes(">")) {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return <p>{content}</p>;
};

const MyAppDetails = ({ params }) => {
  const { appId } = params;
  const { data: session, status } = useSession();
  const accessToken = session?.access_token;
  const [appData, setAppData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications/${appId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch application details");
        }

        const data = await response.json();
        setAppData(data);
        clg("Application data fetched:", data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppDetails();
  }, [appId, accessToken]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading application details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!appData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">No application data found</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg min-h-screen">
      <div className="flex border-y-2 dark:border-gray-500 items-center justify-between px-4 sm:px-6 py-4">
        <header className="flex items-center text-xs sm:text-sm">
          <Image
            src={companyLogo}
            alt="Company Logo"
            height={72}
            width={72}
            className="rounded-full"
          />
          <div className="ml-3">
            <h1 className="text-base sm:text-xl font-bold">
              {appData?.jobDetails?.job?.title || "N/A"}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              {appData?.jobDetails?.designation?.title ||
                "Designation not found"}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {appData?.jobDetails?.address || "Address not found"}
            </p>
          </div>
        </header>
      </div>

      <div className="px-6 sm:px-10 py-3">
        {/* Job Description */}
        <section className="mb-6 text-sm">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Job Description
          </h2>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <RichTextDisplay
              content={appData?.jobDetails?.description}
              fallback="No description available"
            />
          </div>
        </section>

        {/* Requirements */}
        <section className="mb-6 text-sm">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Requirements
          </h2>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg prose dark:prose-invert max-w-none">
            <RichTextDisplay
              content={appData?.jobDetails?.requirements}
              fallback="No requirements specified"
            />
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-6 text-sm">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {appData?.jobDetails?.skills?.length > 0 ? (
              appData.jobDetails.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill.title}
                </span>
              ))
            ) : (
              <span className="text-gray-500 dark:text-gray-400">
                No skills mentioned
              </span>
            )}
          </div>
        </section>

        {/* Employee Benefits */}
        <section className="mb-6 text-sm">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Employee Benefits
          </h2>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg prose dark:prose-invert max-w-none">
            <RichTextDisplay
              content={appData?.jobDetails?.employeeBenefits}
              fallback="No benefits listed"
            />
          </div>
        </section>

        {/* Salary */}
        <section className="mb-6 text-sm">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Salary
          </h2>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p>
              {appData?.jobDetails?.salary
                ? `৳ ${appData.jobDetails.salary}/month`
                : "Not specified"}
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-6 text-sm">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Contact Information
          </h2>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p>
              <strong>Email:</strong>{" "}
              {appData?.jobDetails?.email || "Not provided"}
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              {appData?.jobDetails?.phone || "Not provided"}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyAppDetails;

"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import companyLogo from "../../../../../../public/assests/company.png";
import ApplyJob from "./components/ApplyJob";

const RichTextDisplay = ({ content, fallback = "Not specified" }) => {
  if (!content)
    return <p className="text-gray-500 dark:text-gray-400">{fallback}</p>;
  if (content.includes("<") && content.includes(">")) {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return <p>{content}</p>;
};

const JobDetailsPage = ({ params }) => {
  const { detailsId } = params;
  const session = useSession();
  const accessToken = session?.data?.access_token;
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skills, setSkills] = useState([]);
  const [showSkills, setShowSkills] = useState([]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-details/${detailsId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }

        const data = await response.json();
        setJobData(data);
        setSkills(data?.skills || []);
        console.log("Job data res :: ", data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [detailsId]);

  //   const skillsId = skills.map((skill) => {
  //     if (typeof skill === "object" && skill.id) {
  //       return skill.id;
  //     }
  //     return skill;
  //   });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const fetchedSkills = await Promise.all(
          skills.map(async (skillId) => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/skills/${skillId}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            if (!res.ok) {
              console.error(`Failed to fetch skill with id ${skillId}`);
              return null;
            }
            const data = await res.json(); // data is the skill object { id, title }
            return data;
          })
        );

        // Filter valid skills
        const validSkills = fetchedSkills.filter(
          (skill) => skill && skill.title
        );
        setShowSkills(validSkills);
      } catch (error) {
        console.error("Error fetching skills:", error.message);
      }
    };

    if (skills.length > 0 && accessToken) {
      fetchSkills();
    }
  }, [skills, accessToken]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading job details...</p>
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

  if (!jobData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">No job data found</p>
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
              {jobData?.job?.title || "N/A"}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              {jobData?.job?.organization?.orgName || "N/A"}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {jobData?.address || "N/A"}
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
              content={jobData?.description}
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
              content={jobData?.requirements}
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
            {showSkills.length > 0 ? (
              showSkills.map((skill, index) => (
                <span
                  key={index}
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
              content={jobData?.employeeBenefits}
              fallback="No benefits listed"
            />
          </div>
        </section>

        {/* Apply button */}
        <section className="flex items-center justify-end fixed bottom-32 right-20">
          <ApplyJob id={jobData.id} />
        </section>
      </div>
    </div>
  );
};

export default JobDetailsPage;

"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import companyLogo from "../../../../../../public/assests/company.png";

const MyAppDetails = ({ params }) => {
  const { appId } = params;
  const { data: session, status } = useSession();
  const accessToken = session?.access_token;
  const [appData, setAppData] = useState([]);

  useEffect(() => {
    const fetchAppDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications/${appId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        setAppData(data);
        console.log("Application details data:: ", data);
      } catch (error) {
        console.log("Error fetching application details: ", error.message);
      }
    };
    fetchAppDetails();
  }, [appId, accessToken]);

  console.log("App data:: ", appData);

  return (
    <div className=" bg-white dark:bg-gray-800 rounded-lg">
      <div className="flex border-y-2 dark:border-gray-500 items-center justify-between px-4 sm:px-6 py-4">
        <header className="flex items-center text-xs sm:text-sm">
          <Image
            src={companyLogo}
            alt={"Company Logo"} // organization ||
            height={72}
            width={72}
            className="rounded-full"
          />
          <div className="ml-3">
            <h1 className="text-base sm:text-xl font-bold">
              {appData?.jobDetails?.job?.title
                ? appData?.jobDetails?.job?.title
                : "N/A"}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              {appData?.jobDetails?.designation?.title
                ? appData?.jobDetails?.designation?.title
                : "Designation not found"}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {appData?.jobDetails?.address
                ? appData?.jobDetails?.address
                : "address not found"}
            </p>
          </div>
        </header>
      </div>

      <div className="px-6 sm:px-10 py-3">
        <section className="mb-4 text-xs sm:text-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2">
            Job Description
          </h2>
          <p>
            {appData?.jobDetails?.description
              ? appData?.jobDetails?.description
              : "No description available."}
          </p>
        </section>

        <section className="mb-4 text-xs sm:text-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2">
            Requirements
          </h2>
          {/* <ul className="list-disc list-inside space-y-1">
            {appData?.requirements?.length
              ? appData?.requirements?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              : "No requirements specified."}
          </ul> */}
          <p>
            {appData?.jobDetails?.requirements
              ? appData?.jobDetails?.requirements
              : "Requirments not found"}
          </p>
        </section>

        <section className="mb-4 text-xs sm:text-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2">Skills</h2>
          {/* <ul className="list-disc list-inside space-y-1">
            {appData?.skills?.length
              ? appData?.skills.map((item, index) => <li key={index}>{item}</li>)
              : "No skills mentioned."}
          </ul> */}
          <div>
            {appData?.jobDetails?.skills
              ? appData?.jobDetails?.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full mr-2 mb-2"
                  >
                    {skill?.title}
                  </span>
                ))
              : "Skills not found"}
          </div>
        </section>

        <section className="mb-4 text-xs sm:text-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2">
            Employee Benefits
          </h2>
          {/* <ul className="list-disc list-inside space-y-1">
            {appData?.employeeBenefits?.length
              ? appData?.employeeBenefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))
              : "No benefits listed."}
          </ul> */}
          <div>
            {appData?.jobDetails?.employeeBenefits
              ? appData?.jobDetails?.employeeBenefits
              : "Employee Benefits not found"}
          </div>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-semibold">Salary</h2>
          <p>
            {appData?.jobDetails?.salary
              ? `৳ ${appData?.jobDetails?.salary}/month`
              : "Not specified"}
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-semibold">Contact Information</h2>
          <p>
            <strong>Email:</strong>{" "}
            {appData?.jobDetails?.email || "Not provided"}
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            {appData?.jobDetails?.phone || "Not provided"}
          </p>
        </section>
        <section className="flex items-center justify-end fixed bottom-20 right-20"></section>
      </div>
    </div>
  );
};

export default MyAppDetails;

import Image from "next/image";
import companyLogo from "../../../../../../public/assests/company.png";
import ApplyJob from "../../job-search/[detailsId]/components/ApplyJob";


const JobDetailsPage = async ({ params }) => {
  const { jobId } = params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/job-details/${jobId}`
  );
  const data = await response.json();
  //   console.log("Response data ::::: ", data);

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
              {data?.job.title || "N/A"}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              {data?.designation || "N/A"}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {data?.location || "N/A"}
            </p>
          </div>
        </header>
      </div>

      <div className="px-6 sm:px-10 py-3">
        <section className="mb-4 text-xs sm:text-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2">
            Job Description
          </h2>
          <p>{data?.description || "No description available."}</p>
        </section>

        <section className="mb-4 text-xs sm:text-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2">
            Requirements
          </h2>
          {/* <ul className="list-disc list-inside space-y-1">
            {data?.requirements?.length
              ? data?.requirements?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              : "No requirements specified."}
          </ul> */}
        </section>

        <section className="mb-4 text-xs sm:text-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2">Skills</h2>
          <ul className="list-disc list-inside space-y-1">
            {data?.skills?.length
              ? data?.skills.map((item, index) => <li key={index}>{item}</li>)
              : "No skills mentioned."}
          </ul>
        </section>

        <section className="mb-4 text-xs sm:text-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2">
            Employee Benefits
          </h2>
          {/* <ul className="list-disc list-inside space-y-1">
            {data?.employeeBenefits?.length
              ? data?.employeeBenefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))
              : "No benefits listed."}
          </ul> */}
        </section>

        {/* Apply form */}
        {/* <section>
          <ApplyForm
            appliedStatus={appliedStatus}
            setAppliedStatus={setAppliedStatus}
          />
        </section> */}
        <section className="flex items-center justify-end fixed bottom-20 right-20">
          <ApplyJob id={data.id} />
        </section>
      </div>
    </div>
  );
};

export default JobDetailsPage;

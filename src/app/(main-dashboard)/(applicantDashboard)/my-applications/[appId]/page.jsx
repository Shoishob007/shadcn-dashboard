import { jobs } from "@/components/ApplicantDashboardUI/applicantJobData";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import companyLogo from "../../../../../../public/assests/company.png";
import ApplyForm from "../../job-details/components/ApplyForm";

const JobDetailsPage = ({ params }) => {
  const jobId = params.appId;
  const jobData = jobs.find((data) => data.id === parseInt(jobId));

  return (
    <div
      key={jobData.id}
      className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg"
    >
      <div className="flex border-y-2 dark:border-gray-500 items-center justify-between px-4 sm:px-6 py-4">
        <header className="flex items-center text-xs sm:text-sm">
          <Image
            src={companyLogo}
            alt={jobData.orgName}
            height={72}
            width={72}
            className="rounded-full"
          />
          <div>
            <h1 className="text-base sm:text-xl font-bold">{jobData.title}</h1>
            <p className="text-gray-700 dark:text-gray-300">
              {jobData.jobRole}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              {jobData.location}
            </p>
          </div>
        </header>
        {/* <button className="flex gap-2 items-center border py-2.5 px-3 rounded-sm text-white font-medium bg-[#78AEB3] dark:bg-[#78AEB3]">
          <span className="text-sm">Apply Now</span>{" "}
          <SendHorizontal className="dark:text-white" size={16} />
        </button> */}
      </div>
      <div className="px-6 sm:px-10 py-3">
        <section className="mb-4 text-xs sm:text-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2">
            Job Description
          </h2>
          <p>{jobData.description}</p>
        </section>

        <section className="mb-4 text-xs sm:text-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2">
            What will you do?
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {jobData.responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-4 text-xs sm:text-sm">
          <h2 className="text-lg font-semibold mb-2">
            Requirements for the role
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              {jobData.degreeLevel.join(" or ")} in{" "}
              {jobData.fieldOfStudy.join(", ")} or a related field.
            </li>
            <li>
              {jobData.yearOfExperience}+ years in full-stack development.
            </li>
            {jobData.requirements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-4 text-xs sm:text-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2">
            Mandatory skills
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {jobData.skills.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-4 text-xs sm:text-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2">
            Employee Benefits
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {jobData.employeeBenefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </section>
        <section className="flex items-center justify-end">
          {jobData.isApplied ? (
            <Button className='px-4' disabled>Applied</Button>
          ) : (
            <ApplyForm />
          )}
        </section>
      </div>
    </div>
  );
};

export default JobDetailsPage;

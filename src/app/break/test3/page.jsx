import { jobs as documents } from "@/components/ApplicantDashboardUI/applicantJobData";
import JobCard from "./components/JobCard";
const JobsPage = () => {
  console.log(documents);
  return (
    <div>
      <h1>Jobs page</h1>
      {/* <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    documents.map(job => <JobCard key={job.id} job={job} />)
                }
            </div> */}

      <JobCard />
    </div>
  );
};

export default JobsPage;

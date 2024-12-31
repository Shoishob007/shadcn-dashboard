import Link from "next/link";
import { Button } from "../ui/button";
import JobCard from "./JobCard";
import { jobs } from "./applicantJobData";


const FeaturedJobs = () => {
  return (
    <section className="mt-6">
      <div>
        <h1 className="text-xl font-semibold mb-3">Featured Jobs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.slice(0,3).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-end">
          <Link href={"/job-search"}>
            <Button>See All Jobs</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;

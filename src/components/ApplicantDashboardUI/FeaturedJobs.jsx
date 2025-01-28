import Link from "next/link";
import { Button } from "../ui/button";
import JobCard from "./JobCard";
import { jobs } from "./applicantJobData";

const FeaturedJobs = () => {
  return (
    <section className="mt-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-semibold text-center">Featured Jobs</h1>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.slice(0, 3).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-end">
            <Link href={"/job-search"}>
              <Button size="sm">See All Jobs</Button>
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
};

export default FeaturedJobs;

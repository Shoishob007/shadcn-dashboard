"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import JobCard from "./JobCard";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const getJobs = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job-details?limit=3`
      );
      const data = await response.json();
      setJobs(data?.docs);
      // console.log("Job Data: ", data?.docs);
    };
    getJobs();
  }, []);

  return (
    <section className="mt-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-semibold text-center">Featured Jobs</h1>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {jobs?.map((job) => (
              <JobCard key={job?.id} job={job} />
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

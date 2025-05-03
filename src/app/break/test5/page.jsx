"use client";
import { useState } from "react";


import jobsData from "./components/jobsData.json"; // Import the JSON data
import JobCard from "./components/jobCard";

function JobsList() {
  // Initialize state with the jobs data from JSON
  const [jobs, setJobs] = useState(jobsData.jobs);

  const handleApply = (jobId) => {
    setJobs(
      jobs.map((job) => (job.id === jobId ? { ...job, applied: true } : job))
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} handleApply={handleApply} />
      ))}
    </div>
  );
}

export default JobsList;

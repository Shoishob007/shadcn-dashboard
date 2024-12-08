"use client";

import { useEffect, useState } from "react";
import DemoJobCard from "./components/DemoJobCard";

const DemoJobs = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/jobData.json");
      const data = await response.json();
      console.log(data);
      setJobs(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Job Card</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, index) => (
          <DemoJobCard job={job} key={index} />
        ))}
      </div>
    </div>
  );
};

export default DemoJobs;

"use client";

import ApplicantProgress from "@/components/ApplicantDashboardUI/ApplicantProgress";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CircleDollarSign, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const ApplicantRecentApplied = () => {
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
    <div className="mt-[30px]">
      <h1 className="font-medium text-xl mb-5">Recent Job Applied</h1>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {jobs.map((job, index) => {
          const progressSteps = [
            "In Review",
            "Coding Test",
            "Interview",
            "Offer",
          ];
          // const currentStepIndex = progressSteps.indexOf(job.applicantStatus);
          const currentStepIndex =
            progressSteps.indexOf(job.applicantStatus) + 1;
          return (
            <Card key={index} className="p-6">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <div className="bg-orange-200 h-9 w-9 rounded-full flex items-center justify-center">
                    <span className="font-semibold">
                      {job.companyName.slice(0, 1)}
                    </span>
                  </div>
                  <div>
                    <h1 className="font-medium mb-0">{job.companyName}</h1>
                    <span className="text-sm text-gray-400">
                      {job.publishDate}
                    </span>
                  </div>
                </div>
                <div>
                  <Badge variant="secondary" className="dark:bg-gray-900">
                    {job.jobType}
                  </Badge>
                </div>
              </div>
              <div className="mt-6">
                <h1 className="text-[17px] font-semibold">{job.title}</h1>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <span>
                    <MapPin size={16} />
                  </span>
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mt-1">
                  <span>
                    <CircleDollarSign size={16} />
                  </span>
                  <span>{job.salary}</span>
                </div>
              </div>

              <div className="mt-6">
                <ApplicantProgress currentStepIndex={currentStepIndex} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicantRecentApplied;

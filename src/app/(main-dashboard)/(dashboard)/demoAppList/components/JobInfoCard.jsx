import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Users } from "lucide-react";

const JobInfoCard = ({ job }) => {
  if (!job) return null;
  // console.log(job);

  return (
    <Card className="p-6 mb-6 w-full bg-white dark:bg-gray-800 flex justify-between">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold dark:text-white">{job.title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {job.organization?.orgName}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {job.jobType && (
            <Badge variant="secondary" className="dark:bg-gray-900">
              {job.jobType}
            </Badge>
          )}
          {job.employeeType && (
            <Badge variant="secondary" className="dark:bg-gray-900">
              {job.employeeType}
            </Badge>
          )}
          {job.jobRole && (
            <Badge variant="secondary" className="dark:bg-gray-900">
              {job.jobRole}
            </Badge>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <CalendarDays size={16} />
              <span>Posted: {job.published}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <CalendarDays size={16} />
              <span>Deadline: {job.deadline}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Users size={16} />
              <span>{job.applicantCount} applications</span>
            </div>
          </div>
    </Card>
  );
};

export default JobInfoCard;

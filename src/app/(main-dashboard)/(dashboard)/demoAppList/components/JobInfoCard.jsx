import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  SquarePen,
  Users,
  BriefcaseBusiness,
  Clock,
  UserCog,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreateJobForm from "../../demoJobFormCreate/components/CreateJobForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const JobInfoCard = ({ job }) => {
  // console.log("Job i got in the card::", job)
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!job) return null;

  // function (text) {
  //   return text.charAt(0).toUpperCase() + text.slice(1);
  // }

  const handleEdit = () => {
    setIsDialogOpen(true);
  };

  const handleViewJobDetails = (jobId) => {
    router.push(`/demoJobList/demoJobDetails?jobId=${jobId}`);
  };
  return (
    <>
      <Card className="p-6 mb-6 w-full bg-white dark:bg-gray-800 flex justify-between">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between">
            <div className="flex gap-1">
              <div>
                <Avatar className="h-12 w-12 ">
                  <AvatarImage
                    src={job.job.organization?.img}
                    alt={job.job.organization.orgName}
                  />
                  <AvatarFallback className="font-semibold text-base sm:text-xs text-yellow-600 bg-yellow-100">
                    {job.job.organization.orgName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h2 className="text-xl font-semibold dark:text-white">
                  {job.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {job.job.organization?.orgName}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div
                className="flex gap-2 w-fit items-center border p-1 rounded-sm dark:border-gray-300 cursor-pointer md:mr-2"
                onClick={handleEdit}
              >
                <SquarePen className="dark:text-gray-300 h-4 w-4" />
                <span className="text-xs sm:text-sm font-medium">Edit Job</span>
              </div>
              <div
                className="flex gap-2 items-center border p-1 rounded-sm dark:border-gray-300 cursor-pointer"
                onClick={() => handleViewJobDetails(job.job.id)}
              >
                <Users className="dark:text-gray-300" size={16} />{" "}
                <span className="text-xs sm:text-sm font-medium">
                  View Job Details
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 justify-between">
            <div className="flex flex-wrap gap-2 w-full">
              <Badge variant="secondary" className="dark:bg-gray-900">
                <div className="flex items-center gap-2 w-fit">
                  <BriefcaseBusiness className="h-4 w-4" />
                  {job.jobType == "" || !job.jobType || job.jobType == undefined
                    ? "N/A"
                    : job.jobType}
                </div>
              </Badge>
              <Badge variant="secondary" className="dark:bg-gray-900">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {job.employeeType == "" ||
                  !job.employeeType ||
                  job.employeeType == undefined
                    ? "N/A"
                    : job.employeeType}
                </div>
              </Badge>

              <Badge variant="secondary" className="dark:bg-gray-900">
                <div className="flex items-center gap-2">
                  <UserCog className="h-4 w-4" />
                  {job.jobRole == "" || !job.jobRole || job.jobRole == undefined
                    ? "N/A"
                    : job.jobRole}
                </div>
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold justify-end">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 justify-end">
                <CalendarDays size={16} />
                <span>
                  Posted: {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 justify-end">
                <CalendarDays size={16} />
                <span>
                  Deadline: {new Date(job.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Dialog for editing the job */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(isOpen) => setIsDialogOpen(isOpen)}
      >
        <DialogContent className="flex flex-col h-[calc(100vh-20px)] max-w-3xl p-8">
          <CreateJobForm
            jobId={job.id}
            initialData={job}
            isEditing={true}
            onClose={() => setIsDialogOpen(false)}
            className="flex-1"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobInfoCard;

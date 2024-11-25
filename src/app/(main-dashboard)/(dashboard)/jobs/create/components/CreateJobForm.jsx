"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { jobSchema } from "../../../schemas/jobFormSchema";
import {
  DollarSign,
  ALargeSmall,
  FileChartColumnIncreasing,
  File,
  ClipboardPenLine,
  SlidersHorizontal,
  SlidersVertical,
  CalendarFold,
  MapPin,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const CreateJobForm = ({ jobId, onClose }) => {
  const { data: session } = useSession();
  const [jobData, setJobData] = useState(null);

  const organizationId = session?.organizationId;
  const accessToken = session?.access_token;
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      employeeType: "full-time",
      jobType: "onsite",
    },
  });
  useEffect(() => {
    if (jobId) {
      const fetchJobDetails = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/job-details/${jobId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch job details.");
          }

          const data = await response.json();
          setJobData(data);
          reset(data);
        } catch (error) {
          console.error("Error fetching job details:", error);
        }
      };

      fetchJobDetails();
    }
  }, [jobId, accessToken, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job-details/${jobId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          // body: JSON.stringify({ ...data, organization: organizationId }),
          body: JSON.stringify({
            organization: organizationId,
            deadline: "2024-11-27",
            description: "12 Pm Description",
            designation: "bc498653-b598-4246-b4f5-46ba6eb8ab80",
            employeeType: "part-time",
            jobType: "physical",
            location: "Mirpur - 10, Dhaka, Bangladesh",
            // organization: "0b2adfa3-7c92-43dc-921b-fbd5471475a1",
            requirements: "12 PM Requirements",
            salary: "40000",
            skills: [
              "a1e18457-0a76-448e-8d31-36955bb96d21",
              "c59e858d-483f-4c7d-bb61-af90961e8fb1",
            ],
            degreeLevel: ["be5b4d94-1dd4-4807-a60d-30a980544cad"],
            jobRole: [
              "1107be94-9795-4482-bab3-23083ab2efca",
              "4ce8efc6-7be4-4244-aa2a-80e073468ace",
            ],
            title: "12 PM Job Title",
            fieldOfStudy: [
              "530d77dc-d325-47b9-b363-c7ad66283881",
              "c435d686-c581-4003-ad74-8fd53fe5f9ad",
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating job details.");
      }

      toast({
        title: "Success",
        description: "Job details updated successfully!",
        variant: "ourSuccess",
      });
      // onClose();
    } catch (error) {
      console.error("Error updating job:", error);
      toast({
        title: "Error",
        description: "Failed to update the job. Please try again.",
        variant: "ourDestructive",
      });
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="rounded-lg w-full">
        <Card className="shadow-none border-none">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold">Create Job</CardTitle>
            <CardDescription>
              Please fill up all the fields to create a new job!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-4 w-full"
            >
              <div className="flex flex-col">
                <Label htmlFor="title" className="mb-2">
                  Job Title
                </Label>
                <div className="flex items-center border dark:border-gray-200 rounded-md">
                  <ALargeSmall className="mx-3 text-gray-400 w-4" />
                  <Input
                    id="title"
                    name="title"
                    {...register("title")}
                    required
                    className="!rounded-l-none"
                    defaultValue={jobData?.title}
                  />
                </div>
                {errors.title && (
                  <span className="text-xs text-red-500">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="designation" className="mb-2">
                  Job Designation
                </Label>
                <div className="flex items-center border dark:border-gray-200 rounded-md">
                  <FileChartColumnIncreasing className="mx-3 text-gray-400 w-4" />
                  <Input
                    id="designation"
                    name="designation"
                    {...register("designation")}
                    required
                    className="!rounded-l-none"
                    defaultValue={jobData?.designation}
                  />
                </div>
                {errors.designation && (
                  <span className="text-xs text-red-500">
                    {errors.designation.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="description" className="mb-2">
                  Job Description
                </Label>
                <div className="flex items-center border dark:border-gray-200 rounded-md">
                  <File className="mx-3 text-gray-400 w-4" />
                  <Textarea
                    id="description"
                    name="description"
                    {...register("description")}
                    required
                    className="!rounded-l-none !border-l-0"
                    defaultValue={jobData?.description}
                  />
                </div>
                {errors.description && (
                  <span className="text-xs text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="requirements" className="mb-2">
                  Job Requirements
                </Label>
                <div className="flex items-center border dark:border-gray-200 rounded-md">
                  <ClipboardPenLine className="mx-3 text-gray-400 w-4" />
                  <Textarea
                    id="requirements"
                    name="requirements"
                    {...register("requirements")}
                    required
                    className="!rounded-l-none"
                    defaultValue={jobData?.requirements}
                  />
                </div>
                {errors.requirements && (
                  <span className="text-xs text-red-500">
                    {errors.requirements.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="skills" className="mb-2">
                  Mandatory Skills
                </Label>
                <div className="flex items-center border dark:border-gray-200 rounded-md">
                  <ClipboardPenLine className="mx-3 text-gray-400 w-4" />
                  <Textarea
                    id="skills"
                    name="skills"
                    {...register("skills")}
                    required
                    className="!rounded-l-none"
                    defaultValue={jobData?.skills}
                  />
                </div>
                {errors.skills && (
                  <span className="text-xs text-red-500">
                    {errors.skills.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="employeeType" className="mb-2">
                  Employee Type
                </Label>
                <div className="flex items-center border dark:border-gray-200 rounded-md">
                  <SlidersHorizontal className="mx-3 text-gray-400 w-4" />
                  <Select
                    id="employeeType"
                    name="employeeType"
                    onValueChange={(value) => setValue("employeeType", value)}
                    className="!rounded-l-none"
                    defaultValue={jobData?.employeeType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="full-time">Full-Time</SelectItem>
                      <SelectItem value="part-time">Part-Time</SelectItem>
                      <SelectItem value="contractual">Contractual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {errors.employeeType && (
                  <span className="text-xs text-red-500">
                    {errors.employeeType.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="jobType" className="mb-2">
                  Job Type
                </Label>
                <div className="flex items-center border dark:border-gray-200 rounded-md">
                  <SlidersVertical className="mx-3 text-gray-400 w-4" />
                  <Select
                    id="jobType"
                    name="jobType"
                    onValueChange={(value) => setValue("jobType", value)}
                    className="!rounded-l-none"
                    defaultValue={jobData?.jobType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Nature" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="onsite">Onsite</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {errors.jobType && (
                  <span className="text-xs text-red-500">
                    {errors.jobType.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col">
                  <Label htmlFor="salary" className="mb-2">
                    Job Salary
                  </Label>
                  <div className="flex items-center border dark:border-gray-200 rounded-md w-full">
                    <DollarSign className="mx-3 text-gray-400 w-4" />
                    <Input
                      id="salary"
                      name="salary"
                      {...register("salary", {
                        required: "Salary is required",
                      })}
                      className="!rounded-l-none w-full"
                      defaultValue={jobData?.salary}
                    />
                  </div>
                  {errors.salary && (
                    <span className="text-xs text-red-500">
                      {errors.salary.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="deadline" className="mb-2">
                    Application Deadline
                  </Label>
                  <div className="flex items-center border dark:border-gray-200 rounded-md">
                    <CalendarFold className="mx-3 text-gray-400 w-4" />
                    <Input
                      id="deadline"
                      name="deadline"
                      type="date"
                      {...register("deadline")}
                      className="!rounded-l-none"
                      defaultValue={jobData?.deadline}
                    />
                  </div>
                  {errors.deadline && (
                    <span className="text-xs text-red-500">
                      {errors.deadline.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <Label htmlFor="location" className="mb-2">
                  Job Location
                </Label>
                <div className="flex items-center border dark:border-gray-200 rounded-md">
                  <MapPin className="mx-3 text-gray-400 w-4" />
                  <Input
                    id="location"
                    name="location"
                    {...register("location")}
                    className="!rounded-l-none"
                    defaultValue={jobData?.location}
                  />
                </div>
                {errors.location && (
                  <span className="text-xs text-red-500">
                    {errors.location.message}
                  </span>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center gap-10">
            <Button
              variant="outline"
              className="border dark:border-gray-200 dark:hover:bg-gray-900"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit" onClick={handleSubmit(onSubmit)}>
              Create
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CreateJobForm;

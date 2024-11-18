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

const CreateJobForm = ({ onClose }) => {
  const { data: session } = useSession();

  const organizationId = session?.organizationId;
  const accessToken = session?.access_token;
  console.log("organizationId from job form : ", organizationId);
  console.log("accessToken from create job : ", accessToken);

  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      employeeType: "full-time",
      jobType: "onsite",
    },
  });

  const onSubmit = async (data) => {
    try {
      const requestData = {
        organization: organizationId,
        ...data,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("API Response:", responseData);

      toast({
        title: "Success",
        description: "Created the job successfully!",
        variant: "ourSuccess",
      });
      onClose();
    } catch (error) {
      console.error("Error creating job:", error);
      toast({
        title: "Error",
        description: "Failed to create the job. Please try again.",
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
                <Label htmlFor="jobTitle" className="mb-2">
                  Job Title
                </Label>
                <div className="flex items-center border dark:border-gray-200 rounded-md">
                  <ALargeSmall className="mx-3 text-gray-400 w-4" />
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    {...register("jobTitle")}
                    required
                    className="!rounded-l-none"
                  />
                </div>
                {errors.jobTitle && (
                  <span className="text-xs text-red-500">
                    {errors.jobTitle.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="jobDesignation" className="mb-2">
                  Job Designation
                </Label>
                <div className="flex items-center border dark:border-gray-200 rounded-md">
                  <FileChartColumnIncreasing className="mx-3 text-gray-400 w-4" />
                  <Input
                    id="jobDesignation"
                    name="jobDesignation"
                    {...register("jobDesignation")}
                    required
                    className="!rounded-l-none"
                  />
                </div>
                {errors.jobDesignation && (
                  <span className="text-xs text-red-500">
                    {errors.jobDesignation.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="jobDescription" className="mb-2">
                  Job Description
                </Label>
                <div className="flex items-center border dark:border-gray-200 rounded-md">
                  <File className="mx-3 text-gray-400 w-4" />
                  <Textarea
                    id="jobDescription"
                    name="jobDescription"
                    {...register("jobDescription")}
                    required
                    className="!rounded-l-none !border-l-0"
                  />
                </div>
                {errors.jobDescription && (
                  <span className="text-xs text-red-500">
                    {errors.jobDescription.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="jobRequirements" className="mb-2">
                  Job Requirements
                </Label>
                <div className="flex items-center border dark:border-gray-200 rounded-md">
                  <ClipboardPenLine className="mx-3 text-gray-400 w-4" />
                  <Textarea
                    id="jobRequirements"
                    name="jobRequirements"
                    {...register("jobRequirements")}
                    required
                    className="!rounded-l-none"
                  />
                </div>
                {errors.jobRequirements && (
                  <span className="text-xs text-red-500">
                    {errors.jobRequirements.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="jobSkills" className="mb-2">
                  Mandatory Skills
                </Label>
                <div className="flex items-center border dark:border-gray-200 rounded-md">
                  <ClipboardPenLine className="mx-3 text-gray-400 w-4" />
                  <Textarea
                    id="jobSkills"
                    name="jobSkills"
                    {...register("jobSkills")}
                    required
                    className="!rounded-l-none"
                  />
                </div>
                {errors.jobSkills && (
                  <span className="text-xs text-red-500">
                    {errors.jobSkills.message}
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
                  <Label htmlFor="jobSalary" className="mb-2">
                    Job Salary
                  </Label>
                  <div className="flex items-center border dark:border-gray-200 rounded-md w-full">
                    <DollarSign className="mx-3 text-gray-400 w-4" />
                    <Input
                      id="jobSalary"
                      name="jobSalary"
                      {...register("jobSalary", {
                        required: "Salary is required",
                      })}
                      className="!rounded-l-none w-full"
                    />
                  </div>
                  {errors.jobSalary && (
                    <span className="text-xs text-red-500">
                      {errors.jobSalary.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="jobDeadline" className="mb-2">
                    Application Deadline
                  </Label>
                  <div className="flex items-center border dark:border-gray-200 rounded-md">
                    <CalendarFold className="mx-3 text-gray-400 w-4" />
                    <Input
                      id="jobDeadline"
                      name="jobDeadline"
                      type="date"
                      {...register("jobDeadline")}
                      className="!rounded-l-none"
                    />
                  </div>
                  {errors.jobDeadline && (
                    <span className="text-xs text-red-500">
                      {errors.jobDeadline.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <Label htmlFor="jobLocation" className="mb-2">
                  Job Location
                </Label>
                <div className="flex items-center border dark:border-gray-200 rounded-md">
                  <MapPin className="mx-3 text-gray-400 w-4" />
                  <Input
                    id="jobLocation"
                    name="jobLocation"
                    {...register("jobLocation")}
                    className="!rounded-l-none"
                  />
                </div>
                {errors.jobLocation && (
                  <span className="text-xs text-red-500">
                    {errors.jobLocation.message}
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

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
} from "lucide-react";

const CreateJobForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobCategory: "full-time",
      jobType: "onsite",
    },
  });

  const onSubmit = (data) => {
    console.log("Job data:", data);
    onClose();
  };

  return (
    <div className="flex justify-center w-full">
      <div className="rounded-lg w-full">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold">Create Job</CardTitle>
            <CardDescription>
              Please fill up all the fields to create a new job!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-4"
            >
              <div className="flex flex-col">
                <Label htmlFor="title" className="mb-2">
                  Job Title
                </Label>
                <div className="flex items-center border rounded-md">
                  <ALargeSmall className="mx-3 text-gray-400 w-4" />
                  <Input
                    id="title"
                    name="title"
                    {...register("title")}
                    required
                    className="!rounded-l-none"
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
                <div className="flex items-center border rounded-md">
                  <FileChartColumnIncreasing className="mx-3 text-gray-400 w-4" />
                  <Input
                    id="designation"
                    name="designation"
                    {...register("designation")}
                    required
                    className="!rounded-l-none"
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
                <div className="flex items-center border rounded-md">
                  <File className="mx-3 text-gray-400 w-4" />
                  <Textarea
                    id="description"
                    name="description"
                    {...register("description")}
                    required
                    className="!rounded-l-none"
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
                <div className="flex items-center border rounded-md">
                  <ClipboardPenLine className="mx-3 text-gray-400 w-4" />
                  <Textarea
                    id="requirements"
                    name="requirements"
                    {...register("requirements")}
                    required
                    className="!rounded-l-none"
                  />
                </div>

                {errors.requirements && (
                  <span className="text-xs text-red-500">
                    {errors.requirements.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="jobCategory" className="mb-2">
                  Job Category
                </Label>
                <div className="flex items-center border rounded-md">
                  <SlidersHorizontal className="mx-3 text-gray-400 w-4" />
                  <Select
                    id="jobCategory"
                    name="jobCategory"
                    onValueChange={(value) => setValue("jobCategory", value)}
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

                {errors.jobCategory && (
                  <span className="text-xs text-red-500">
                    {errors.jobCategory.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="jobType" className="mb-2">
                  Job Nature
                </Label>
                <div className="flex items-center border rounded-md">
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

              <div className="flex flex-col">
                <Label htmlFor="salaryRange" className="mb-2">
                  Salary Range
                </Label>
                <div className="flex items-center border rounded-md">
                  <DollarSign className="mx-3 text-gray-400 w-4" />
                  <Input
                    id="salaryRange"
                    name="salaryRange"
                    {...register("salaryRange", {
                      required: "Salary range is required",
                    })}
                    className="!rounded-l-none"
                  />
                </div>

                {errors.salaryRange && (
                  <span className="text-xs text-red-500">
                    {errors.salaryRange.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="deadline" className="mb-2">
                  Application Deadline
                </Label>
                <div className="flex items-center border rounded-md">
                  <CalendarFold className="mx-3 text-gray-400 w-4" />
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    {...register("deadline")}
                    className="!rounded-l-none"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center md:justify-end gap-10">
            <Button variant="outline" onClick={onClose}>
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

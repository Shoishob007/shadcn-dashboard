"use client";

import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema } from "../../../schemas/jobFormSchema";

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
    <div className="flex justify-center">
      <div className="p-4 rounded-lg w-full">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create Job</CardTitle>
            <CardDescription>
              Please fill up all the fields to create a new job!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="flex flex-col">
                <Label htmlFor="title" className="mb-2">
                  Job Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  {...register("title")}
                  required
                />
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
                <Input
                  id="designation"
                  name="designation"
                  {...register("designation")}
                  required
                />
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
                <Textarea
                  id="description"
                  name="description"
                  {...register("description")}
                  required
                />
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
                <Textarea
                  id="requirements"
                  name="requirements"
                  {...register("requirements")}
                  required
                />
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
                <Select
                  id="jobCategory"
                  name="jobCategory"
                  onValueChange={(value) => setValue("jobCategory", value)}
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
                <Select
                  id="jobType"
                  name="jobType"
                  onValueChange={(value) => setValue("jobType", value)}
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
                <Input
                  id="salaryRange"
                  name="salaryRange"
                  {...register("salaryRange", {
                    valueAsNumber: true,
                    required: "Salary range is required",
                  })}
                />
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
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  {...register("deadline")}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center gap-10">
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

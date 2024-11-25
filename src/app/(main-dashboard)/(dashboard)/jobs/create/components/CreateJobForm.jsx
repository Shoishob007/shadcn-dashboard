/* eslint-disable react-hooks/exhaustive-deps */
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
  AlignLeft,
  SlidersHorizontal,
  SlidersVertical,
  CalendarFold,
  MapPin,
  Book,
  CalendarCheck,
  ReceiptText,
  GraduationCap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const CreateJobForm = ({ jobDocId, jobId, onClose }) => {
  const { data: session } = useSession();
  const [jobData, setJobData] = useState(null);
  const [skillsOptions, setSkillsOptions] = useState([]);
  const [jobRolesOptions, setJobRolesOptions] = useState([]);
  const [fieldOfStudyOptions, setFieldOfStudyOptions] = useState([]);
  const [degreeLevelOptions, setDegreeLevelOptions] = useState([]);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [employeeTypeOptions, setEmployeeTypeOptions] = useState([]);
  const [jobTypeOptions, setJobTypeOptions] = useState([]);

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
      defaultValues: {
        skills: [],
        jobRole: [],
        fieldOfStudy: [],
        degreeLevel: [],
        employeeType: "",
        jobType: "",
        designation: "",
      },
    },
  });

  // Fetching options for dropdowns
  const fetchOptions = async () => {
    try {
      const [
        skillsResponse,
        rolesResponse,
        fieldsResponse,
        degreesResponse,
        designationsResponse,
        employeeTypeResponse,
        jobTypeResponse,
      ] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/job-roles`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/field-of-studies`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/degree-levels`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/designations`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/employee-types`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/job-types`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      ]);

      if (
        !skillsResponse.ok ||
        !rolesResponse.ok ||
        !fieldsResponse.ok ||
        !degreesResponse.ok ||
        !designationsResponse.ok ||
        !employeeTypeResponse.ok ||
        !jobTypeResponse.ok
      ) {
        throw new Error("Failed to fetch options");
      }

      const skillsData = await skillsResponse.json();
      const rolesData = await rolesResponse.json();
      const fieldsData = await fieldsResponse.json();
      const degreesData = await degreesResponse.json();
      const designationsData = await designationsResponse.json();
      const employeeTypeData = await employeeTypeResponse.json();
      const jobTypeData = await jobTypeResponse.json();

      setSkillsOptions(skillsData.docs);
      setJobRolesOptions(rolesData.docs);
      setFieldOfStudyOptions(fieldsData.docs);
      setDegreeLevelOptions(degreesData.docs);
      setDesignationOptions(designationsData.docs);
      setEmployeeTypeOptions(employeeTypeData.docs);
      setJobTypeOptions(jobTypeData.docs);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job-details/${jobDocId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            ...data,
            job: jobId,
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
      onClose();
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
                  <Select
                    onValueChange={(value) => setValue("designation", value)}
                  >
                    <SelectTrigger className="!rounded-l-none">
                      <SelectValue placeholder="Select Designation" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {designationOptions.map((designation) => (
                        <SelectItem key={designation.id} value={designation.id}>
                          {designation.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                <Label htmlFor="employeeBenefits" className="mb-2">
                  Employee Benefits
                </Label>
                <div className="flex items-center border dark:border-gray-200 rounded-md">
                  <AlignLeft className="mx-3 text-gray-400 w-4" />
                  <Textarea
                    id="employeeBenefits"
                    name="employeeBenefits"
                    {...register("employeeBenefits")}
                    required
                    className="!rounded-l-none"
                    defaultValue={jobData?.employeeBenefits}
                  />
                </div>
                {errors.employeeBenefits && (
                  <span className="text-xs text-red-500">
                    {errors.employeeBenefits.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="skills" className="mb-2">
                  Mandatory Skills
                </Label>
                <div className="flex items-center border dark:border-gray-200 rounded-md">
                  <ClipboardPenLine className="mx-3 text-gray-400 w-4" />
                  <Select
                    multiple
                    onValueChange={(value) => setValue("skills", value)}
                  >
                    <SelectTrigger className="!rounded-l-none">
                      <SelectValue placeholder="Select Skills" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {skillsOptions.map((skill) => (
                        <SelectItem key={skill.id} value={skill.id}>
                          {skill.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    onValueChange={(value) => setValue("employeeType", value)}
                  >
                    <SelectTrigger className="!rounded-l-none">
                      <SelectValue placeholder="Select Employee Type" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {employeeTypeOptions.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.title}
                        </SelectItem>
                      ))}
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
                <Label htmlFor="jobRole" className="mb-2">
                  Job Role
                </Label>
                <div className="flex items-center border dark:border-gray-200 rounded-md">
                  <SlidersVertical className="mx-3 text-gray-400 w-4" />
                  <Select
                    multiple
                    onValueChange={(value) => setValue("jobRole", value)}
                  >
                    <SelectTrigger className="!rounded-l-none">
                      <SelectValue placeholder="Select Job Roles" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {jobRolesOptions.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {errors.jobRole && (
                  <span className="text-xs text-red-500">
                    {errors.jobRole.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="jobRole" className="mb-2">
                  Field of Study
                </Label>
                <div className="flex items-center border dark:border-gray-200 rounded-md">
                  <Book className="mx-3 text-gray-400 w-4" />
                  <Select
                    multiple
                    onValueChange={(value) => setValue("fieldOfStudy", value)}
                  >
                    <SelectTrigger className="!rounded-l-none">
                      <SelectValue placeholder="Select Fields of Study" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {fieldOfStudyOptions.map((field) => (
                        <SelectItem key={field.id} value={field.id}>
                          {field.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {errors.fieldOfStudy && (
                  <span className="text-xs text-red-500">
                    {errors.fieldOfStudy.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="jobRole" className="mb-2">
                  Degree-Level
                </Label>
                <div className="flex items-center border dark:border-gray-200 rounded-md">
                  <GraduationCap className="mx-3 text-gray-400 w-4" />
                  <Select
                    multiple
                    onValueChange={(value) => setValue("degreeLevel", value)}
                  >
                    <SelectTrigger className="!rounded-l-none">
                      <SelectValue placeholder="Select Degree Levels" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {degreeLevelOptions.map((degree) => (
                        <SelectItem key={degree.id} value={degree.id}>
                          {degree.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {errors.degreeLevel && (
                  <span className="text-xs text-red-500">
                    {errors.degreeLevel.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="jobType" className="mb-2">
                  Job Type
                </Label>
                <div className="flex items-center border dark:border-gray-200 rounded-md">
                  <ReceiptText className="mx-3 text-gray-400 w-4" />
                  <Select
                    multiple
                    onValueChange={(value) => setValue("jobType", value)}
                  >
                    <SelectTrigger className="!rounded-l-none">
                      <SelectValue placeholder="Select Job Type" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {jobTypeOptions.map((jobType) => (
                        <SelectItem key={jobType.id} value={jobType.id}>
                          {jobType.title}
                        </SelectItem>
                      ))}
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
                      type="number"
                      {...register("salary", {
                        required: "Salary is required",
                        valueAsNumber: true,
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
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col">
                  <Label htmlFor="yearOfExperience" className="mb-2">
                    Years Of Experience
                  </Label>
                  <div className="flex items-center border dark:border-gray-200 rounded-md w-full">
                    <CalendarCheck className="mx-3 text-gray-400 w-4" />
                    <Input
                      id="yearOfExperience"
                      name="yearOfExperience"
                      type="number"
                      {...register("yearOfExperience", {
                        required: "Years Of Experience is required",
                        valueAsNumber: true,
                      })}
                      className="!rounded-l-none w-full"
                      defaultValue={jobData?.yearOfExperience}
                    />
                  </div>
                  {errors.yearOfExperience && (
                    <span className="text-xs text-red-500">
                      {errors.yearOfExperience.message}
                    </span>
                  )}
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

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

const CreateJobModal = ({ onClose }) => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    requirements: "",
    designation: "",
    jobCategory: "Full-Time",
    jobType: "Onsite",
    salaryRange: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job data:", jobData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="p-4 rounded-lg shadow-lg w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Create Job</CardTitle>
            <CardDescription>
              Please fill up all the fields to create a new job!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={jobData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={jobData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="requirements">Job Requirements</Label>
                <Input
                  id="requirements"
                  name="requirements"
                  value={jobData.requirements}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="designation">Job Designation</Label>
                <Input
                  id="designation"
                  name="designation"
                  value={jobData.designation}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="salaryRange">Salary Range</Label>
                <Input
                  id="salaryRange"
                  name="salaryRange"
                  value={jobData.salaryRange}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="jobCategory">Job Category</Label>
                <Select
                  id="jobCategory"
                  name="jobCategory"
                  value={jobData.jobCategory}
                  onValueChange={(value) =>
                    setJobData({ ...jobData, jobCategory: value })
                  }
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
              <div className="flex flex-col">
                <Label htmlFor="jobType">Job Nature</Label>
                <Select
                  id="jobType"
                  name="jobType"
                  value={jobData.jobType}
                  onValueChange={(value) =>
                    setJobData({ ...jobData, jobType: value })
                  }
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

              <div className="flex flex-col">
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  onChange={handleChange}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              Deploy
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CreateJobModal;

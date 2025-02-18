"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollText, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import CreateJobForm from "./components/CreateJobForm";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import qs from "qs";
// import useIndustryTypeStore from "@/stores/authStore/useIndustryTypeStore";

export default function CreateJobCard() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [docId, setDocId] = useState(null);
  const accessToken = session?.access_token;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!accessToken) {
      toast({
        title: "Error",
        description: "You must be logged in to create a job",
        variant: "ourDestructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // First request: Create Job
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ title: data.title }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create job");
      }

      const responseData = await response.json();
      console.log("Response after job create :: ", responseData)
      reset();

      const newJobId = responseData.doc.id;
      console.log("New Job Id :: ", newJobId);
      // console.log("New Job.job Id :: ", responseData.doc.job.id);

      const query = qs.stringify(
        {
          where: {
            "job.id": {
              equals: newJobId,
            },
          },
        },
        { encode: false }
      );

      let attempts = 0;
      let jobDetailsData = null;

      // console.log("Query :: ", query)

      while (attempts < 3) {
        const jobDetailsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-details?${query}`
        );

        jobDetailsData = await jobDetailsResponse.json();

        if (jobDetailsData.docs.length > 0) {
          setShowForm(true);
          setDocId(jobDetailsData.docs[0].id);
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        attempts++;
      }

      if (!jobDetailsData || jobDetailsData.docs.length === 0) {
        console.log("Final Attempt: No matching job found.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to create job",
        variant: "ourDestructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2 text-center">
            <ScrollText className="w-5 h-5 text-primary text-center" />
            <CardTitle className="text-2xl">Create a New Job</CardTitle>
          </div>
          <CardDescription className="text-center">
            Ready to find your next team member? Follow these steps to create an
            effective job posting.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-3">
            <div className="space-y-2">
              <h3 className="font-semibold">Before you begin:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Prepare a clear job title and detailed description</li>
                <li>Define required skills and qualifications</li>
                <li>Determine salary range and employment type</li>
                <li>Have location requirements ready</li>
              </ul>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-medium text-amber-800 dark:text-amber-300">
                    Important Notes
                  </h4>
                  <ul className="text-sm text-amber-700 dark:text-amber-400 list-disc list-inside space-y-1">
                    <li>Job postings cannot be edited after 24 hours</li>
                    <li>Free plan users can post up to 3 jobs per month</li>
                    <li>All fields marked with * are required</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Form for Job Title */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Job Title *
              </label>
              <Input
                id="title"
                {...register("title", { required: "Job title is required" })}
                placeholder="Enter job title"
                className="w-full"
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Start Creating Your Job Post"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-5xl h-[90vh] p-0">
          <DialogTitle className="sr-only">Create New Job</DialogTitle>
          <CreateJobForm
            isDialogOpen={true}
            onClose={() => setShowForm(false)}
            jobId={docId}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

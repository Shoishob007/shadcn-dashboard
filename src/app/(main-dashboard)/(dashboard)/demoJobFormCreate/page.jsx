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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollText, AlertCircle } from "lucide-react";
import { useState } from "react";
import CreateJobForm from "./components/CreateJobForm";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

export default function CreateJobCard() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jobId, setJobId] = useState(null);

  const organizationId = session?.organizationId;
  const accessToken = session?.access_token;

  const handleCreateJob = async () => {
    if (!organizationId || !accessToken) {
      toast({
        title: "Error",
        description: "You must be logged in to create a job",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log(JSON.stringify({ organization: organizationId }));
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ organization: organizationId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create job");
      }

      const data = await response.json();
      //   console.log("Data i got :", data)
      setJobId(data.doc.id);
      setShowForm(true);

      const jobDetailsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job-details`
      );
      const jobDetailsData = await jobDetailsResponse.json();

      console.log("Job Details Data::", jobDetailsData);

      console.log("Job Details Docs::", jobDetailsData.docs);

      const matchedJob = jobDetailsData.docs.find(
        (document) => document.job.id === jobId,
      );

      if (matchedJob) {
        console.log("Matched job id:", matchedJob.id);
        console.log("Matched job :", matchedJob);
      } else {
        console.log("No matching job found.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to create job",
        variant: "destructive",
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
        </CardContent>
        <CardFooter className="justify-center">
          <Button
            className="w-fit text-center items-center"
            size="lg"
            onClick={handleCreateJob}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Start Creating Your Job Post"}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-5xl h-[90vh] p-0">
          <DialogTitle className="sr-only">Create New Job</DialogTitle>
          <CreateJobForm
            isDialogOpen={true}
            onClose={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

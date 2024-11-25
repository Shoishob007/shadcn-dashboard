"use client";

import { useState } from "react";
import CreateJobForm from "./components/CreateJobForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle";
import { usePathname } from "next/navigation";
import FormatTitle from "@/components/TitleFormatter";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";

const CreateJobPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [jobDocId, setJobDocId] = useState(null);
  const pathname = usePathname();
  const pageTitle = FormatTitle(pathname);
  const { data: session } = useSession();

  const organizationId = session?.organizationId;
  const accessToken = session?.access_token;
  // console.log("organizationId from job form : ", organizationId);
  // console.log("accessToken from create job : ", accessToken);

  const handleOpenForm = async () => {
    try {
      const createResponse = await fetch(
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

      if (!createResponse.ok) {
        throw new Error("Error creating job.");
      }

      const createData = await createResponse.json();
      console.log("Created Data : ", createData);

      const getResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job-details`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!getResponse.ok) {
        throw new Error("Error fetching job details.");
      }

      const getData = await getResponse.json();
      console.log("Job details fetching :", getData);
      const jobDocumentId = getData.docs[0].id;
      const jobId = getData.docs[0].job.id

      // if (Array.isArray(getData.docs)) {
      //   const jobDoc = getData.docs.find(
      //     (doc) => doc.job && doc.job.id === createData.doc.id
      //   );
      //   console.log("doc.job.id", doc.job.id);
      //   console.log("createData.doc.id", createData.doc.id);

      //   if (jobDoc) {
      //     setJobId(jobDoc.id);
      //     console.log("Found Job ID:", jobDoc.id);
      //   } else {
      //     throw new Error("Job not found with the matching job id.");
      //   }
      // } else {
      //   throw new Error("Job details are not in the expected array format.");
      // }

      setJobDocId(jobDocumentId);
      setJobId(jobId)
      setShowForm(true);
    } catch (error) {
      console.error("Failed to create or fetch job:", error);
    }
  };
  const handleCloseForm = () => setShowForm(false);

  return (
    <>
      <PageTitle title={pageTitle} className={"pb-4 ml-2"} />
      <div className="flex flex-col items-center justify-center h-full overflow-y-hidden">
        <Card className="sm:w-full p-4 max-w-lg shadow-lg overflow-y-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-xl md:text-2xl font-semibold">
              Create Your Job
            </CardTitle>
            <CardDescription className="space-y-3">
              Post a new job and find the perfect candidates.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <CardDescription className="text-center text-sm">
              Fill out the form to create a new job posting and start finding
              applicants today.
            </CardDescription>
            <Button onClick={handleOpenForm} size="lg" className="w-full">
              Create Job
            </Button>
          </CardContent>
        </Card>

        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-2xl max-h-[calc(100vh-60px)] overflow-auto">
            {jobDocId && <CreateJobForm jobDocId={jobDocId} jobId={jobId} onClose={handleCloseForm} />}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CreateJobPage;

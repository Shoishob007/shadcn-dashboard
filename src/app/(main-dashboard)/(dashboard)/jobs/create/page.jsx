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
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const CreateJobPage = () => {
  const [showForm, setShowForm] = useState(false);
  const pathname = usePathname();
  const pageTitle = FormatTitle(pathname);

  const handleOpenForm = () => setShowForm(true);
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
            <CreateJobForm onClose={handleCloseForm} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CreateJobPage;

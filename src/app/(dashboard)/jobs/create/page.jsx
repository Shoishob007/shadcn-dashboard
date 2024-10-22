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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const CreateJobPage = () => {
  const [showForm, setShowForm] = useState(false);

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
    <div className="relative flex flex-col items-center text-center justify-center h-full space-y-6">
      {!showForm ? (
        <Card className="w-2/3 sm:w-full max-w-lg p-4 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-bold">
              Create your job
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
      ) : (
        <CreateJobForm onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default CreateJobPage;

"use client";

import { useState } from "react";
import CreateJobForm from "./components/CreateJobForm";
import { Button } from "@/components/ui/button";

const CreateJobPage = () => {
  const [showForm, setShowForm] = useState(false);

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
    <div className="relative flex flex-col items-center justify-center h-full p-6">
      {!showForm ? (
        <>
          <h1 className="text-2xl font-bold mb-4 transition-opacity duration-300 ease-in-out">
            Jobs Dashboard
          </h1>

          <Button
            onClick={handleOpenForm}
            className="px-4 py-2 rounded-lg transition-opacity duration-300 ease-in-out"
          >
            Create Job
          </Button>
        </>
      ) : (
        <div
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-400 ease-in-out transform ${
            showForm ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <CreateJobForm onClose={handleCloseForm} />
        </div>
      )}
    </div>
  );
};

export default CreateJobPage;

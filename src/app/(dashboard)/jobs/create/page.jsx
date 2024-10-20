"use client";

import { useState } from "react";
import CreateJobModal from "./components/CreateJobModal";
import { Button } from "@/components/ui/button";

const CreateJobPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="flex flex-col items-center text-center justify-center h-[calc(100vh-150px)] p-8">
      <h1 className="text-3xl font-bold mb-6">Jobs Dashboard</h1>

      <Button onClick={handleOpenModal} className="px-4 py-2 rounded">
        Create Job
      </Button>

      {showModal && <CreateJobModal onClose={handleCloseModal} />}
    </div>
  );
};

export default CreateJobPage;

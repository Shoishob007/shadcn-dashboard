"use client";
import { Pencil, X } from "lucide-react";
import { useState, useEffect } from "react";
import ResumeUpload from "./ResumeUpload";

const Resume = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [fileURL, setFileURL] = useState("");

  // Retrieve resume URL from localStorage when the component mounts
  useEffect(() => {
    const storedResume = localStorage.getItem("uploadedResume");
    if (storedResume) {
      setFileURL(storedResume);
    }
  }, []);

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg dark:text-gray-200">
      <div className="p-4 space-y-4 w-full">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight">Resume</h1>
            <div
              onClick={() => setIsEditing(!isEditing)}
              className="bg-gray-100 hover:bg-gray-200 duration-300 h-8 w-8 flex items-center justify-center rounded-md cursor-pointer"
            >
              <span className="">
                {isEditing ? <X size={15} /> : <Pencil size={15} />}
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Transform your resume into a powerful showcase that highlights your
            skills and captures employer&apos;s attention.
          </p>
        </div>

        {/* Resume Content */}
        <div className="mt-6">
          {isEditing ? (
            <ResumeUpload setFileURL={setFileURL} />
          ) : fileURL ? (
            <div>
              <h2 className="text-xl">Uploaded Resume:</h2>
              <a
                href={fileURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Your Resume
              </a>
            </div>
          ) : (
            <p>No resume uploaded yet. Click to edit and upload one.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Resume;

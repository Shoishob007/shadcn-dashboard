"use client";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ApplicantResumeUpload({ register }) {
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("No file chosen");
    }
  };

  return (
    <div className="flex flex-col items-start w-full max-w-lg mx-auto">
      <Label htmlFor="resume-upload" className="block mb-1.5 text-[12px]">
        Upload Resume
      </Label>
      <div className="flex items-center w-full border border-gray-300 rounded-lg">
        <input
          type="file"
          id="resume-upload"
          accept=".pdf, .doc, .docx"
          className="hidden"
          {...register("resume", {
            required: "Resume is required", // Validation
            onChange: handleFileChange, // Updates fileName state
          })}
        />
        <label
          htmlFor="resume-upload"
          className="flex-shrink-0 bg-gray-100 text-gray-700 px-4 py-2 cursor-pointer border-r border-gray-300"
        >
          Choose File
        </label>
        <span className="flex-grow text-sm text-gray-500 px-4 py-2">
          {fileName}
        </span>
      </div>
    </div>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { CloudUpload, FileText } from "lucide-react";
import { useState } from "react";

export default function ResumeUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileURL, setFileURL] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setFileURL(url);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      alert(`Uploaded file: ${selectedFile.name}`);
      console.log("File URL:", fileURL);
      console.log("File:", selectedFile);
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div className=" p-6 bg-white">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        Resume
      </h2>
      <p className="text-sm text-gray-500 mb-8">
        Highlight your skills and experience by uploading a resume in PDF, DOC,
        or DOCX format.
      </p>

      {/* Upload Box */}
      <label
        htmlFor="file-upload"
        className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50 hover:bg-gray-100 hover:border-gray-600 transition"
      >
        {selectedFile ? (
          <div className="flex items-center justify-center space-x-2">
            <FileText size={24} className="text-green-600" />
            <span className="text-gray-700 font-medium">
              {selectedFile.name}
            </span>
          </div>
        ) : (
          <>
            <div className="flex justify-center items-center mb-2">
              <span className="text-gray-600 bg-gray-200 h-12 w-12 rounded-full flex items-center justify-center">
                <CloudUpload size={24} />
              </span>
            </div>
            <span className="text-gray-700 font-semibold">
              Drag & Drop to Upload
            </span>
            <p className="text-xs text-gray-500 mt-1">
              Or click to select a file (PDF, DOCX, DOC - Max 10MB)
            </p>
          </>
        )}
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".doc,.docx,.pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Preview Section */}
      {fileURL && (
        <div className="mt-4 text-sm text-gray-600">
          <span className="font-semibold">Preview:</span>
          <a
            href={fileURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline ml-2"
          >
            View File
          </a>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex justify-end mt-6">
        <Button onClick={handleUpload} className="px-6 py-2">
          Upload Resume
        </Button>
      </div>
    </div>
  );
}

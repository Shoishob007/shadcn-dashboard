"use client";
import { Button } from "@/components/ui/button";
import { Check, CloudUpload, FileText, Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ResumeUpload({ setFileURL }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const accessToken = session?.access_token;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("cv", selectedFile);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/media-images`, // Update the URL accordingly
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Upload failed");
      }

      const data = await response.json();
      const uploadedResumeURL = data?.fileURL;

      // Store the uploaded resume URL in localStorage
      localStorage.setItem("uploadedResume", uploadedResumeURL);

      // Set the file URL state
      setFileURL(uploadedResumeURL);
      alert("File uploaded successfully!");
    } catch (error) {
      alert(`File upload failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
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

      {/* Upload Button */}
      <div className="flex justify-end mt-6">
        <Button onClick={handleUpload} className="px-4 py-2" disabled={loading}>
          {loading ? <Loader className="animate-spin" /> : <Check />}
          {loading ? "Uploading..." : "Upload Resume"}
        </Button>
      </div>
    </div>
  );
}

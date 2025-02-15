"use client";
import { Button } from "@/components/ui/button";
import { Check, CloudUpload, FileText, Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ResumeUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileURL, setFileURL] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const accessToken = session?.access_token;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setFileURL(url);
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/media-images`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      // Log the response for debugging
      console.log("Response Status:", response.status);

      if (!response.ok) {
        // Log the error response from the server
        const errorData = await response.json();
        console.error("Server Error Response:", errorData);
        throw new Error(
          `Failed to upload file: ${errorData.message || "Unknown error"}`
        );
      }

      const data = await response.json();
      console.log("File uploaded successfully!");
      console.log("Server Response:", data);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
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
        <Button onClick={handleUpload} className="px-4 py-2" disabled={loading}>
          {loading ? <Loader className="animate-spin" /> : <Check />}
          {loading ? "Uploading..." : "Upload Resume"}
        </Button>
      </div>
    </div>
  );
}

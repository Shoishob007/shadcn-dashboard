"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Check, CloudUpload, FileText, Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ResumeUpload({ setFileURL, docId }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const accessToken = session?.access_token;
//   console.log("Document Id: ", docId);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // File validation
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type. Please upload a PDF or Word document.");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB.");
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    if (!accessToken) {
      alert("Authentication error. Please log in again.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/media-pdfs`,
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
    //   console.log("cv data: ", data);
      //   const uploadedResumeURL = data?.fileURL;
      if (data?.doc?.id) {
        // const cvId = data?.doc;
        const cvFilename = data?.doc;
        console.log("CV filename : ",cvFilename);

        const setCVResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/applicants/${docId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              cv: cvFilename,
            }),
          }
        );
        const cvResponse = await setCVResponse.json();
        if(cvResponse?.doc?.cv){
            toast({
              title: "Success",
              description: cvResponse?.message,
              variant: "success",
            });
        }
        // console.log("CV Response: ", cvResponse);
      }

      // Set the file URL state
      //   setFileURL(uploadedResumeURL);
      //   alert("File uploaded successfully!");
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

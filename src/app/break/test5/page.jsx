"use client";
import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";
import { useState } from "react";

export default function ResumeUploader() {
  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileChange = (e) => {
  //   setSelectedFile(e.target.files[0]);
  // };

  // const handleUpload = () => {
  //   if (selectedFile) {
  //     alert(`Uploaded file: ${selectedFile.name}`);
  //     console.log(selectedFile);
  //   } else {
  //     alert("Please select a file to upload.");
  //   }
  // };
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileURL, setFileURL] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setFileURL(url); // URL save kortechi
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
    <div className="p-6">
      <div className="w-full p-6 bg-white shadow rounded-lg">
        <h2 className="text-sm font-semibold text-gray-800 mb-2.5">Resume</h2>
        <p className="text-sm text-gray-600">
          Remember that one pager that highlights how amazing you are? Time to
          let employers notice your potential through it.
        </p>

        <div className="mt-2.5">
          <label
            htmlFor="file-upload"
            className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 bg-stripes hover:bg-gray-100 hover:border-black transition"
          >
            {selectedFile ? (
              <span className="text-black font-medium">
                {selectedFile.name}
              </span>
            ) : (
              <>
                <div className="flex justify-center items-center">
                  <span className="text-black bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center">
                    <CloudUpload size={20} />
                  </span>
                </div>
                <div className="mt-2 flex flex-col gap-2">
                  <span className="text-black font-medium text-[12px]">
                    Update Resume
                  </span>
                  <p className="text-[12px] text-gray-500">
                    Supported file formats: DOC, DOCX, PDF. File size limit: 10
                    MB.
                  </p>
                </div>
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
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleUpload}>Upload File</Button>
        </div>
      </div>
    </div>
  );
}

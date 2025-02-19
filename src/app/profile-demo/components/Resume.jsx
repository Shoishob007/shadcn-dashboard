"use client";
import { Pencil, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ResumeUpload from "./ResumeUpload";

const Resume = ({ data }) => {
  const { data: session } = useSession();
  const accessToken = session?.access_token;
  const [isEditing, setIsEditing] = useState(false);
  const [fileURL, setFileURL] = useState("");
  const [cvUrl, setCvUrl] = useState('');
  const cvId = data?.cv;


  useEffect(() => {
    const getCv = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/media-pdfs/${cvId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const cvData = await response.json();
      console.log("CV data: ", cvData);
      if(cvData?.id){
        const publicUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
        const cvDataUrl = cvData?.url;
        const cvUrl = publicUrl.concat(cvDataUrl);
        console.log(cvUrl)
        setFileURL(cvUrl);
      }
    };
    getCv();
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
            <ResumeUpload setFileURL={setFileURL} docId={data?.id} />
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

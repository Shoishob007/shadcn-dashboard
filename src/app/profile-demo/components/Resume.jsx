"use client";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import ResumeUpload from "./ResumeUpload";

const Resume = () => {
    const [isEditing, setIsEditing] = useState(false);
    return (
        <section className="bg-white dark:bg-gray-800 rounded-lg dark:text-gray-200">
            <div className="p-4 space-y-4 w-full">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-semibold tracking-tight">Resume</h1>
                        <div onClick={() => setIsEditing(!isEditing)} className="bg-gray-100 hover:bg-gray-200 duration-300 h-8 w-8 flex items-center justify-center rounded-md cursor-pointer">
                            <span className="">
                                {
                                    isEditing ?  <X size={15} /> : <Pencil size={15} />
                                }
                            </span>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Transform your resume into a powerful showcase that highlights your
        skills and captures employer&apos;s attention.
                    </p>
                </div>

                {/* Resume Content */}
                <div  className='mt-6'>
                    {
                        isEditing ? (
                            <ResumeUpload/>
                        ) : (<h1>view</h1>)
                    }
                </div>
            </div>
        </section>
    );
};

export default Resume;
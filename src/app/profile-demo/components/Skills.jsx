"use client";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import UpdateSkills from "./UpdateSkills";

const Skills = () => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg dark:text-gray-200">
      <div className="p-4 space-y-4 w-full">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight">Skills</h1>
            <div onClick={() => setIsEditing(!isEditing)} className="bg-gray-100 hover:bg-gray-200 duration-300 h-8 w-8 flex items-center justify-center rounded-md cursor-pointer">
                <span className="">
                {isEditing ?  <X size={15} /> : <Pencil size={15} />}
                </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            The Skills section is your opportunity to share your skills.
          </p>
        </div>

        {/* Resume Content */}
        <div  className='mt-6'>
            {
              isEditing ? (
                <UpdateSkills/>
              ) : (<h1>view</h1>)
            }
        </div>
      </div>
    </section>
  );
};

export default Skills;

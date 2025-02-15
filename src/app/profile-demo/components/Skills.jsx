"use client";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import UpdateSkills from "./UpdateSkills";
import { Button } from "@/components/ui/button";

const Skills = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState([]);

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg dark:text-gray-200">
      <div className="p-4 space-y-4 w-full">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight">Skills</h1>
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
            The Skills section is your opportunity to share your skills.
          </p>
        </div>

        {/* Resume Content */}
        <div className="mt-6">
          {isEditing ? (
            <UpdateSkills skills={skills} setSkills={setSkills} />
          ) : (
            <div>
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Button
                      key={skill}
                      variant="secondary"
                      className="text-[#1c4980] bg-[#ddedff] hover:bg-gray-100 duration-300 text-sm px-3 rounded-lg py-2"
                    >
                      {skill}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No skills added yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;

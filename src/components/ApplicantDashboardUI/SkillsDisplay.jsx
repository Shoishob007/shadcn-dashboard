"use client";

import { useState } from "react";

const SkillsDisplay = ({ skills }) => {
  const [viewSkills, setViewSkills] = useState();

//   const showSkills = skills.length > 3 ? 
  const remainingSkills = skills.length - 3;
    return (
    <div className="flex items-center gap-2">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="border p-1 border-black rounded-md text-[12px]"
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

export default SkillsDisplay;

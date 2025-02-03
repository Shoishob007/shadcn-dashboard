"use client";

import { useState } from "react";

const SkillsDisplay = ({ skills }) => {
  const visibleSkills = skills.slice(0, 2);
  const remainingSkillsCount = skills.length - 2;

  return (
    <div className="flex items-center gap-2">
      {visibleSkills.map((skill, index) => (
        <span
          key={index}
          className="border p-1 border-black rounded-md text-[12px]"
        >
          {skill}
        </span>
      ))}
      {remainingSkillsCount > 0 && (
        <span className="border py-1 px-2 border-black rounded-md text-[12px] font-semibold">
          +{remainingSkillsCount}
        </span>
      )}
    </div>
  );
};

export default SkillsDisplay;

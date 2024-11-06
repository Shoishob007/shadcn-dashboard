"use client";

import * as React from "react";

// Sample skill list
const availableSkills = ["JavaScript", "React", "Node.js", "Next.js", "TypeScript", "CSS", "HTML"];

export default function SkillSelector() {
  const [selectedSkills, setSelectedSkills] = React.useState([]);

  // Function to add a skill
  const handleAddSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Function to remove a skill
  const handleRemoveSkill = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Select Your Skills</h2>
      
      {/* Selectable skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {availableSkills.map((skill) => (
          <button
            key={skill}
            onClick={() => handleAddSkill(skill)}
            className="bg-blue-200 text-blue-800 px-3 py-1 rounded-lg"
          >
            {skill}
          </button>
        ))}
      </div>

      {/* Display selected skills */}
      <div className="mt-4">
        <h3 className="text-md font-semibold mb-2">Selected Skills:</h3>
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <div
              key={skill}
              className="flex items-center bg-green-200 text-green-800 px-3 py-1 rounded-lg"
            >
              {skill}
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="ml-2 text-red-600 font-bold"
              >
                ✕
              </button>
            </div>
          ))}
          {selectedSkills.length === 0 && <p>No skills selected.</p>}
        </div>
      </div>
    </div>
  );
}

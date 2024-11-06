"use client";

import * as React from "react";

export default function SkillSelector() {
  const [selectedSkills, setSelectedSkills] = React.useState([]);
  const [inputSkill, setInputSkill] = React.useState("");

  // Function to add a skill
  const handleAddSkill = () => {
    if (inputSkill && !selectedSkills.includes(inputSkill)) {
      setSelectedSkills([...selectedSkills, inputSkill]);
      setInputSkill(""); // Clear the input after adding
    }
  };

  // Function to remove a skill
  const handleRemoveSkill = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill !== skillToRemove));
  };

  // Handle Enter key for adding skill
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddSkill();
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Add Your Skills</h2>
      
      {/* Input field for adding skills */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={inputSkill}
          onChange={(e) => setInputSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a skill and press Enter"
          className="border px-3 py-2 rounded-lg w-full"
        />
        <button
          onClick={handleAddSkill}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
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

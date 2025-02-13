"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
import { useState } from "react";

const UpdateSkills = () => {
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState("");

  const suggestions = [
    "Teamwork",
    "Certifications",
    "Proofreading",
    "Copywriting",
    "Keyword Analysis",
    "Memorization",
    "Debugging",
    "Service Level Agreements",
    "Calculus",
    "Google Cloud",
  ];

  // Filtered suggestions based on input
  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(input.toLowerCase()) &&
      !skills.includes(suggestion)
  );

  const addSkill = (skill) => {
    if (!skills.includes(skill)) setSkills([...skills, skill]);
    setInput("");
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !skills.includes(input)) {
      setSkills([...skills, input]);
      setInput("");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">Skills</h2>
      <p className="text-sm text-gray-500 mb-8">
        The Skills section is your opportunity to share your skills, showcase
        your strengths, and highlight your professional journey.
      </p>

      {/* Display Selected Skills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {skills.map((skill) => (
          <Button
            key={skill}
            variant="secondary"
            className="text-[#1c4980] bg-[#ddedff] hover:bg-gray-100 duration-300 text-sm px-3 rounded-lg py-2 flex items-center gap-2"
          >
            {skill}
            <span
              className="rounded-full w-4 h-4"
              variant="ghost"
              onClick={() => removeSkill(skill)}
            >
              <X />
            </span>
          </Button>
        ))}
      </div>

      {/* Suggestions */}
      <h3 className="text-gray-600 text-xs mb-2.5">Suggestions</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {filteredSuggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => addSkill(suggestion)}
            className="border px-3 py-1.5 rounded-md hover:bg-gray-100 text-sm"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input Section */}
      <h3 className="text-gray-600 text-xs mt-6 mb-2.5">Skills</h3>
      <form onSubmit={handleInputSubmit} className="relative">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="List your skills here, showcasing what you excel at."
        />

        {/* Dynamic Dropdown for Input Suggestions */}
        {input && (
          <ul className="absolute w-full bg-white border rounded-md mt-1 shadow-lg max-h-40 overflow-y-auto z-10">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => addSkill(suggestion)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {suggestion}
              </li>
            ))}
            {/* Add custom input option */}
            {!filteredSuggestions.includes(input) && (
              <li
                onClick={() => addSkill(input)}
                className="p-2 hover:bg-gray-100 cursor-pointer text-gray-500"
              >
                Add `{input}`
              </li>
            )}
          </ul>
        )}
      </form>

      {/* Save Button */}
      <div className="flex items-center justify-end mt-5">
        <Button type="submit" className="px-4 py-2">
          <Check />
          Save
        </Button>
      </div>
    </div>
  );
};

export default UpdateSkills;

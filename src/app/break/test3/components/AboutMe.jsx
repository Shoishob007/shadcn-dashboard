"use client";
import { useState } from "react";

const AboutMe = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutMeText, setAboutMeText] = useState(
    "Click to add or edit your 'About Me' section."
  );

  const handleSave = () => {
    if (aboutMeText.trim() === "") {
      setAboutMeText("Click to add or edit your 'About Me' section.");
    }
    setIsEditing(false);
  };

  return (
    <div className="my-8">
      {!isEditing ? (
        <div
          className="border h-[200px] border-gray-400 p-4 rounded-lg text-gray-600 text-center cursor-pointer hover:border-red-500 hover:bg-gray-100 transition-all"
          onClick={() => setIsEditing(true)}
        >
          {aboutMeText}
        </div>
      ) : (
        <textarea
          className="w-full border h-[200px] border-red-500 p-4 rounded-lg text-gray-700 focus:outline-none "
          value={aboutMeText}
          onChange={(e) => setAboutMeText(e.target.value)}
          onBlur={handleSave}
          placeholder="Write about yourself here..."
          rows={4}
        ></textarea>
      )}
    </div>
  );
};

export default AboutMe;

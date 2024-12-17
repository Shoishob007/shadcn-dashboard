"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const platformsList = [
  { id: "facebook", label: "Facebook" },
  { id: "twitter", label: "Twitter" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "instagram", label: "Instagram" }
];

const SocialLinks = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [links, setLinks] = useState({});
  const [errors, setErrors] = useState({});

  // Handles platform selection (toggle on/off)
  const handlePlatformChange = (platform) => {
    setSelectedPlatforms((prevSelected) => {
      if (prevSelected.includes(platform)) {
        return prevSelected.filter((item) => item !== platform); // Deselect platform
      } else {
        return [...prevSelected, platform]; // Select platform
      }
    });
  };

  // Handles input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLinks((prevLinks) => ({
      ...prevLinks,
      [name]: value,
    }));
  };

  // URL validation function
  const validateURL = (url) => {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url);
  };

  // Handles save action
  const handleSave = () => {
    const newErrors = {};
    selectedPlatforms.forEach((platform) => {
      if (!links[platform] || !validateURL(links[platform])) {
        newErrors[platform] = "Please enter a valid URL.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Here you would save the links to your database or API
    alert("Links saved successfully!");
  };

  // Reset all selected platforms, links, and errors
  const handleReset = () => {
    setSelectedPlatforms([]);
    setLinks({});
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Social Media Links
      </h1>

      {/* Dropdown for platform selection and reset button */}
      <div className="mb-4 flex items-center space-x-4">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-2">
            Select Social Media Platforms:
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full p-2 border border-gray-300 rounded-md">
              Select Platforms
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2 border border-gray-300 rounded-md w-full">
              {platformsList.map(({ id, label }) => (
                <DropdownMenuItem
                  key={id}
                  onClick={() => handlePlatformChange(id)}
                >
                  <Checkbox
                    checked={selectedPlatforms.includes(id)}
                    className="mr-2"
                  />
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-300"
        >
          Reset
        </button>
      </div>

      {/* Conditional input fields for selected platforms (grid layout) */}
      {selectedPlatforms.length > 0 && (
        <div className="grid grid-cols-2 gap-6">
          {selectedPlatforms.map((platform) => (
            <div key={platform} className="mb-4">
              <label
                htmlFor={platform}
                className="block text-xl font-medium mb-2"
              >
                Enter your{" "}
                {platform.charAt(0).toUpperCase() + platform.slice(1)} link:
              </label>
              <input
                type="url"
                name={platform}
                id={platform}
                value={links[platform] || ""}
                onChange={handleInputChange}
                placeholder={`Enter your ${platform} URL`}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors[platform] && (
                <p className="text-red-600 text-sm">{errors[platform]}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Save Button */}
      {selectedPlatforms.length > 0 && (
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 mt-4"
        >
          Save Links
        </button>
      )}
    </div>
  );
};

export default SocialLinks;

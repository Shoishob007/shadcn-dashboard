"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Check,
  Facebook,
  Instagram,
  Linkedin,
  RefreshCw,
  Twitter,
} from "lucide-react";
import { useState } from "react";

const platformsList = [
  { id: "facebook", label: "Facebook", icon: <Facebook /> },
  { id: "twitter", label: "Twitter", icon: <Twitter /> },
  { id: "linkedin", label: "LinkedIn", icon: <Linkedin /> },
  { id: "instagram", label: "Instagram", icon: <Instagram /> },
];

const SocialLinks = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [links, setLinks] = useState({});
  const [errors, setErrors] = useState({});

  // Handles platform selection and removes it from dropdown
  const handlePlatformChange = (value) => {
    if (!selectedPlatforms.includes(value)) {
      setSelectedPlatforms((prevSelected) => [...prevSelected, value]);
    }
  };

  // Handles input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLinks((prevLinks) => ({
      ...prevLinks,
      [name]: value,
    }));
  };

  const validateURL = (url) => {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url);
  };

  // Handles save
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
    alert("Links saved successfully!");
  };

  const handleReset = () => {
    setSelectedPlatforms([]);
    setLinks({});
    setErrors({});
  };

  // Filter available platforms for dropdown
  const availablePlatforms = platformsList.filter(
    (platform) => !selectedPlatforms.includes(platform.id)
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-8">Social Links</h2>
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Select onValueChange={handlePlatformChange}>
            <SelectTrigger className="w-full border border-gray-300 p-2 rounded-md">
              <SelectValue placeholder="Select Platforms" />
            </SelectTrigger>
            <SelectContent>
              {availablePlatforms.map(({ id, label }) => (
                <SelectItem
                  key={id}
                  value={id}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleReset}>
          <RefreshCw />
          Reset
        </Button>
      </div>

      {/* Input Fields for Selected Platforms */}
      {selectedPlatforms.length > 0 && (
        <div className="grid grid-cols-2 gap-5 mt-8">
          {selectedPlatforms.map((platform) => {
            const platformData = platformsList.find((p) => p.id === platform);
            return (
              <div key={platform} className="mb-4">
                <label
                  htmlFor={platform}
                  className="text-sm mb-2 flex items-center gap-1"
                >
                  <span>{platformData.icon}</span>{" "}
                  <span>{platformData.label}</span> link:
                </label>
                <Input
                  type="url"
                  name={platform}
                  id={platform}
                  value={links[platform] || ""}
                  onChange={handleInputChange}
                  placeholder={`Enter your ${platformData.label} URL`}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors[platform] && (
                  <p className="text-red-600 text-sm">{errors[platform]}</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Save Button */}
      <div className="flex items-center justify-end mt-5">
        {selectedPlatforms.length > 0 && (
          <Button onClick={handleSave} className="px-4 py-2">
            <Check />
            Save
          </Button>
        )}
      </div>
    </div>
  );
};

export default SocialLinks;

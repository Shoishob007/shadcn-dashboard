"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useSocialStore from "../../../stores/profile-settings/useSocialStore";
import { Facebook, Github, Linkedin, Plus, Twitter, X, Youtube } from "lucide-react";
import React, { useEffect, useState } from "react";

const socialPlatforms = {
  linkedin: {
    name: "LinkedIn",
    icon: Linkedin,
    color: "text-sky-600",
    placeholder: "https://linkedin.com/in/username",
  },
  facebook: {
    name: "Facebook",
    icon: Facebook,
    color: "text-blue-600",
    placeholder: "https://facebook.com/username",
  },
  github: {
    name: "GitHub",
    icon: Github,
    color: "text-gray-800",
    placeholder: "https://github.com/username",
  },
  twitter: {
    name: "Twitter",
    icon: Twitter,
    color: "text-blue-400",
    placeholder: "https://twitter.com/username",
  },
  youtube: {
    name: "YouTube",
    icon: Youtube,
    color: "text-red-600",
    placeholder: "https://youtube.com/@username",
  },
};

export default function SocialLinks() {
  const { formData, setFormData, saveSocial, fetchSocialDetails } = useSocialStore();
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [tempFormData, setTempFormData] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchSocialDetails();
  }, [fetchSocialDetails]);

  const handleAddPlatform = () => {
    if (!selectedPlatform || !tempFormData[selectedPlatform]?.trim()) return;

    const updatedFormData = {
      ...formData,
      [selectedPlatform]: tempFormData[selectedPlatform],
    };
    setFormData(updatedFormData);
    saveSocial(updatedFormData);
    resetForm();
  };

  const handleRemovePlatform = (platform) => {
    setIsDeleting(true);
    const updatedFormData = { ...formData };
    delete updatedFormData[platform];
    setFormData(updatedFormData);
    saveSocial(updatedFormData);
    setIsDeleting(false);
  };

  const resetForm = () => {
    setSelectedPlatform("");
    setTempFormData({});
  };

  const activePlatforms = Object.keys(formData).filter(
    (key) => formData[key]?.trim()
  );
  const availablePlatforms = Object.keys(socialPlatforms).filter(
    (platform) => !activePlatforms.includes(platform)
  );

  return (
    <div className="bg-white rounded-lg p-6 space-y-8">
      <h2 className="text-2xl font-semibold">Social Profiles</h2>
      <p className="text-sm text-gray-500">Connect your social media accounts.</p>

      <div className="space-y-6">
        {availablePlatforms.length > 0 && (
          <div className="space-y-4">
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-full border rounded-md">
                <SelectValue placeholder="Add a social platform" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-40">
                  {availablePlatforms.map((platform) => (
                    <SelectItem key={platform} value={platform}>
                      <div className="flex items-center gap-2">
                        {React.createElement(
                          socialPlatforms[platform].icon,
                          { className: `w-4 h-4 ${socialPlatforms[platform].color}` }
                        )}
                        <span>{socialPlatforms[platform].name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>

            {selectedPlatform && (
              <div className="flex gap-4 items-center">
                <Input
                  placeholder={socialPlatforms[selectedPlatform].placeholder}
                  value={tempFormData[selectedPlatform] || ""}
                  onChange={(e) =>
                    setTempFormData({
                      ...tempFormData,
                      [selectedPlatform]: e.target.value,
                    })
                  }
                />
                <Button onClick={handleAddPlatform}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="space-y-4">
          {activePlatforms.map((platform) => (
            <div
              key={platform}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-md"
            >
              <div className="flex items-center gap-2">
                {React.createElement(
                  socialPlatforms[platform].icon,
                  { className: `w-5 h-5 ${socialPlatforms[platform].color}` }
                )}
                <span>{socialPlatforms[platform].name}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={formData[platform]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Visit
                </a>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemovePlatform(platform)}
                  disabled={isDeleting}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

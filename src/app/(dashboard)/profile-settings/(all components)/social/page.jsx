"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Github,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

export default function SocialSettings() {
  const [formData, setFormData] = useState({
    github: "",
    twitter: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    youtube: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Social profiles updated:", formData);
  };

  const socialLinks = [
    {
      name: "github",
      icon: Github,
      placeholder: "https://github.com/username",
    },
    {
      name: "twitter",
      icon: Twitter,
      placeholder: "https://twitter.com/username",
    },
    {
      name: "linkedin",
      icon: Linkedin,
      placeholder: "https://linkedin.com/in/username",
    },
    {
      name: "facebook",
      icon: Facebook,
      placeholder: "https://facebook.com/username",
    },
    {
      name: "instagram",
      icon: Instagram,
      placeholder: "https://instagram.com/username",
    },
    {
      name: "youtube",
      icon: Youtube,
      placeholder: "https://youtube.com/@username",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mr-2">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Social Profiles
          </h2>
          <p className="text-sm text-muted-foreground">
            Connect your social media accounts.
          </p>
        </div>

        <div className="space-y-4">
          {socialLinks.map(({ name, icon: Icon, placeholder }) => (
            <div key={name} className="space-y-2">
              <Label htmlFor={name} className="flex items-center gap-2">
                <Icon className="w-4 h-4 ml-2" />
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Label>
              <Input
                id={name}
                value={formData[name]}
                onChange={(e) =>
                  setFormData({ ...formData, [name]: e.target.value })
                }
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save Social Links</Button>
        </div>
      </form>
    </div>
  );
}

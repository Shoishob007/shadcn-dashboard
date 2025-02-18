import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const platformsData = [
  {
    platform: "facebook",
    label: "Facebook",
    placeholder: "https://facebook.com/your-profile",
  },
  {
    platform: "twitter",
    label: "Twitter",
    placeholder: "https://twitter.com/your-profile",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    placeholder: "https://linkedin.com/in/your-profile",
  },
  {
    platform: "instagram",
    label: "Instagram",
    placeholder: "https://instagram.com/your-profile",
  },
];

export default function SocialLinks() {
  const [formData, setFormData] = useState({});
  const [connectedPlatforms, setConnectedPlatforms] = useState([]);
  const [editingPlatform, setEditingPlatform] = useState("");

  const handleConnectPlatform = async (platform) => {
    const socialMediaUrl = formData[platform];
    if (socialMediaUrl) {
      const newPlatform = { platform, socialMediaUrl };

      setConnectedPlatforms((prev) => [...prev, newPlatform]);
      setFormData((prev) => ({ ...prev, [platform]: "" }));

      console.log("Connected Platforms:", [...connectedPlatforms, newPlatform]);

      // Send data to backend
      try {
        const response = await fetch(
          "https://your-backend-api.com/social-links",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPlatform),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to save link");
        }
        console.log("Link saved successfully");
      } catch (error) {
        console.error("Error saving link:", error);
      }
    }
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platformsData.map(({ platform, label, placeholder }) => (
            <Card key={platform}>
              <CardHeader>
                <CardTitle>{label}</CardTitle>
                <CardDescription>Connect your {label} profile.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor={platform}>{label} URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id={platform}
                      type="url"
                      value={formData[platform] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [platform]: e.target.value })
                      }
                      placeholder={placeholder}
                      disabled={connectedPlatforms.some(
                        (p) => p.platform === platform
                      )}
                    />
                    <Button
                      onClick={() => handleConnectPlatform(platform)}
                      disabled={connectedPlatforms.some(
                        (p) => p.platform === platform
                      )}
                    >
                      Connect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

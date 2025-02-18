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
import useApplicantProfileStore from "@/store/useApplicantProfileStore"; // ✅ zustand store import

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
  const { formData, setFormData } = useApplicantProfileStore(); // ✅ zustand store থেকে data নেওয়া
  const [editingPlatform, setEditingPlatform] = useState("");

  const handleConnectPlatform = (platform) => {
    const url = formData[platform];
    if (url) {
      const newSocialLinks = [
        ...(formData.socialLinks || []),
        { platform, url },
      ];
      setFormData({ socialLinks: newSocialLinks });
      setFormData({ [platform]: "" });
    }
  };

  const handleRemovePlatform = (platform) => {
    const updatedSocialLinks = formData.socialLinks.filter(
      (p) => p.platform !== platform
    );
    setFormData({ socialLinks: updatedSocialLinks });
  };

  const handleEditPlatform = (platform) => {
    const platformData = formData.socialLinks.find(
      (p) => p.platform === platform
    );
    if (platformData) {
      setEditingPlatform(platform);
      setFormData({ [platform]: platformData.url });
    }
  };

  const handleSavePlatform = (platform) => {
    const updatedSocialLinks = formData.socialLinks.map((p) =>
      p.platform === platform ? { ...p, url: formData[platform] } : p
    );
    setFormData({ socialLinks: updatedSocialLinks });
    setEditingPlatform("");
  };

  return (
    <div>
      {/* Connect New Platforms */}
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
                    disabled={formData.socialLinks?.some(
                      (p) => p.platform === platform
                    )}
                  />
                  <Button
                    onClick={() => handleConnectPlatform(platform)}
                    disabled={formData.socialLinks?.some(
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

      {/* Connected Platforms */}
      <div className="mt-8 ">
        <h2 className="text-xl font-semibold mb-4">Connected Platforms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.socialLinks?.map(({ platform, url }) => {
            const { label, placeholder } =
              platformsData.find((p) => p.platform === platform) || {};
            return (
              <Card key={platform}>
                <CardHeader>
                  <CardTitle>{label}</CardTitle>
                  <CardDescription>{url}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    {editingPlatform !== platform ? (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => handleEditPlatform(platform)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleRemovePlatform(platform)}
                        >
                          Remove
                        </Button>
                      </>
                    ) : (
                      <form
                        className="w-full space-y-2"
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSavePlatform(platform);
                        }}
                      >
                        <Input
                          type="url"
                          value={formData[platform] || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [platform]: e.target.value,
                            })
                          }
                          placeholder={placeholder}
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setEditingPlatform("")}
                          >
                            Cancel
                          </Button>
                          <Button type="submit">Save</Button>
                        </div>
                      </form>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

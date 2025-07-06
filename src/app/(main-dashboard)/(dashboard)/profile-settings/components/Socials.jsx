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
import { Card, CardContent } from "@/components/ui/card";
import useSocialStore from "@/stores/profile-settings/useSocialStore";
import { Facebook, Plus, X, ExternalLink, CheckCircle2 } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const socialPlatforms = {
  facebook: {
    name: "Facebook",
    icon: Facebook,
    color: "text-blue-600",
    placeholder: "https://facebook.com/username",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  google: {
    name: "Google",
    icon: FaGoogle,
    color: "text-red-500",
    placeholder: "https://google.com/username",
    bgColor: "bg-red-50 dark:bg-red-950",
  },
};

export default function SocialSettings({ imageId }) {
  const { formData, setFormData, saveSocial, fetchSocialDetails } =
    useSocialStore();
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [editingPlatform, setEditingPlatform] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [tempFormData, setTempFormData] = useState({});
  const pathname = usePathname();
  const { data: session } = useSession();
  const accessToken = session?.access_token;
  const organizationId = session?.organizationId;

  useEffect(() => {
    if (accessToken && organizationId) {
      fetchSocialDetails(accessToken, organizationId);
    }
  }, [accessToken, organizationId, fetchSocialDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (accessToken && organizationId) {
      const newFormData = {
        ...formData,
        ...(selectedPlatform && tempFormData[selectedPlatform]
          ? { [selectedPlatform]: tempFormData[selectedPlatform] }
          : {}),
      };

      const filteredFormData = Object.fromEntries(
        Object.entries(newFormData).filter(([_, value]) => value.trim() !== "")
      );

      await saveSocial(accessToken, organizationId, filteredFormData, imageId);
      setEditingPlatform("");
      setSelectedPlatform("");
      setTempFormData({});
      await fetchSocialDetails(accessToken, organizationId);
    }
  };

  const getActivePlatforms = () =>
    Object.entries(formData)
      .filter(([_, value]) => value.trim() !== "")
      .map(([key]) => key);

  const getAvailablePlatforms = () =>
    Object.keys(socialPlatforms).filter(
      (platform) => !getActivePlatforms().includes(platform)
    );

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
    setTempFormData({ ...tempFormData, [platform]: "" });
  };

  const handleRemovePlatform = async (platform) => {
    setIsDeleting(true);
    try {
      const updatedFormData = { ...formData };
      delete updatedFormData[platform];
      setFormData(updatedFormData);

      await saveSocial(accessToken, organizationId, updatedFormData, imageId);
      setEditingPlatform("");
      setSelectedPlatform("");
    } catch (error) {
      console.error("Error removing platform:", error);
      setFormData(formData);
    } finally {
      setIsDeleting(false);
    }
  };

  const activePlatforms = getActivePlatforms();
  const availablePlatforms = getAvailablePlatforms();
  const allPlatformsConnected =
    activePlatforms.length === Object.keys(socialPlatforms).length &&
    !selectedPlatform;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Social Profiles
        </h2>
        <p className="text-sm text-muted-foreground">
          Connect your organization&apos;s social media accounts.
        </p>
      </div>

      <div className="space-y-6">
        {!allPlatformsConnected && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Select
                value={selectedPlatform}
                onValueChange={handlePlatformSelect}
              >
                <SelectTrigger className="w-[300px] border dark:border-gray-400 rounded-md">
                  <SelectValue placeholder="Add social platform" />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-[200px]">
                    {availablePlatforms.map((platform) => {
                      const {
                        name,
                        icon: Icon,
                        color,
                      } = socialPlatforms[platform];
                      return (
                        <SelectItem key={platform} value={platform}>
                          <div className="flex items-center gap-2">
                            <Icon className={cn("w-4 h-4", color)} />
                            <span>{name}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>

            {selectedPlatform && (
              <Card
                className={cn(
                  "border",
                  socialPlatforms[selectedPlatform].bgColor
                )}
              >
                <CardContent className="p-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      {React.createElement(
                        socialPlatforms[selectedPlatform].icon,
                        {
                          className: cn(
                            "w-5 h-5",
                            socialPlatforms[selectedPlatform].color
                          ),
                        }
                      )}
                      <span className="font-medium">
                        {socialPlatforms[selectedPlatform].name}
                      </span>
                    </div>
                    <Input
                      value={tempFormData[selectedPlatform] || ""}
                      onChange={(e) =>
                        setTempFormData({
                          ...tempFormData,
                          [selectedPlatform]: e.target.value,
                        })
                      }
                      placeholder={
                        socialPlatforms[selectedPlatform].placeholder
                      }
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          setSelectedPlatform("");
                          setTempFormData({});
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Save</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activePlatforms.length === 0 && !selectedPlatform && (
          <Card className="bg-gray-50 dark:bg-gray-900">
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <Plus className="w-8 h-8 text-gray-400" />
                <h3 className="font-medium">No Social Platforms Connected</h3>
                <p className="text-sm text-muted-foreground">
                  Select a platform above to start connecting your social media
                  accounts.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {allPlatformsConnected && (
          <Card className="bg-green-50 dark:bg-green-900/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <div>
                  <h3 className="font-medium text-green-700 dark:text-green-300">
                    All Platforms Connected
                  </h3>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Your organization is connected to all available social
                    platforms.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {activePlatforms.map((platform) => {
            const {
              name,
              icon: Icon,
              color,
              placeholder,
              bgColor,
            } = socialPlatforms[platform];

            const isEditing = editingPlatform === platform;

            return (
              <Card
                key={platform}
                className={cn(
                  "transition-all duration-200 shadow-none",
                  isEditing
                    ? bgColor
                    : "hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
              >
                <CardContent className="p-4 border dark:border-gray-400 rounded-md">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className={cn("w-5 h-5", color)} />
                        <span className="font-medium">{name}</span>
                        {formData[platform] && !isEditing && (
                          <Badge
                            variant="ghost"
                            className="ml-4 hidden sm:inline-flex"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Connected
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {!isEditing ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingPlatform(platform)}
                          >
                            Edit
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingPlatform("")}
                          >
                            Cancel
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemovePlatform(platform)}
                          disabled={isDeleting}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {isEditing && (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                          value={formData[platform] || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [platform]: e.target.value,
                            })
                          }
                          placeholder={placeholder}
                        />
                        <div className="flex justify-end">
                          <Button type="submit" size="sm">
                            Save
                          </Button>
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

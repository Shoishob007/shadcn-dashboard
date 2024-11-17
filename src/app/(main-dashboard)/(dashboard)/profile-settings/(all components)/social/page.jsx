"use client";
import PageTitle from "@/components/PageTitle";
import FormatTitle from "@/components/TitleFormatter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSocialStore from "@/stores/profile-settings/useSocialStore";
import {
  Github,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function SocialSettings() {
  const { formData, setFormData, saveSocial } = useSocialStore();
  const pathname = usePathname();
  const pageTitle = FormatTitle(pathname);

  const handleSubmit = (e) => {
    e.preventDefault();
    const socialLinks = Object.entries(formData).map(([title, url]) => ({
      socialMedia: { title },
      socialMediaUrl: url,
    }));
    saveSocial({ socialLinks });
  };

  const socialLinks = [
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

  const iconColors = {
    github: "text-gray-800",
    twitter: "text-blue-400",
    linkedin: "text-sky-600",
    facebook: "text-blue-600",
    instagram: "text-pink-500",
    youtube: "text-red-600",
  };

  return (
    <>
      <PageTitle title={pageTitle} className={"pb-4 ml-2"} />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mr-2 dark:text-gray-200">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Social Profiles
            </h2>
            <p className="text-sm text-muted-foreground">
              Connect your organization&apos;s social media accounts.
            </p>
          </div>

          <div className="space-y-4">
            {socialLinks.map(({ name, icon: Icon, placeholder }) => (
              <div key={name} className="space-y-2">
                <Label htmlFor={name} className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ml-2 ${iconColors[name]}`} />
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Label>
                <Input
                  id={name}
                  value={formData[name]}
                  onChange={(e) => setFormData({ [name]: e.target.value })}
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
    </>
  );
}

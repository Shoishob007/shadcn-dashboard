"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";

export default function ProfileSettings() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    location: "",
    bio: "",
    website: "",
    company: "",
    position: "",
    achievements: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Profile updated:", formData);
    toast
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mr-2">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">Edit Profile</h2>
          <p className="text-sm text-muted-foreground">
            Customize your public profile information.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Image
            src={session?.user?.picture || "https://github.com/shadcn.png"}
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full"
          />
          <Button variant="outline">Change Avatar</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder={session?.user.name}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder={session?.user.email}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="City, Country"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Personal Website</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              placeholder="https://example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) =>
                setFormData({ ...formData, position: e.target.value })
              }
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              placeholder="Tell us about yourself"
              rows={4}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="achievements">Achievements</Label>
            <Textarea
              id="achievements"
              value={formData.achievements}
              onChange={(e) =>
                setFormData({ ...formData, achievements: e.target.value })
              }
              placeholder="List your major achievements"
              rows={4}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save Profile</Button>
        </div>
      </form>
    </div>
  );
}

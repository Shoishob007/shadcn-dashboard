/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import useProfileStore from "@/stores/profile-settings/useProfileStore";
import { useEffect } from "react";

export default function ProfileSettings() {
  const { data: session } = useSession();
  const { formData, setFormData, saveProfile, loading } =
    useProfileStore();

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
      });
    }
  }, [session]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", formData);
    saveProfile(session.user);
    toast;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mr-2">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Edit Profile
          </h2>
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
              onChange={(e) => setFormData({ name: e.target.value })}
              placeholder={session?.user.name}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ email: e.target.value })}
              placeholder={session?.user.email}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ location: e.target.value })}
              placeholder="City, Country"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Personal Website</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => setFormData({ website: e.target.value })}
              placeholder="https://example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ company: e.target.value })}
              placeholder="XYZ"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => setFormData({ position: e.target.value })}
              placeholder="Example Developer"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ bio: e.target.value })}
              placeholder="Tell us about your organization"
              rows={4}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="achievements">Achievements</Label>
            <Textarea
              id="achievements"
              value={formData.achievements}
              onChange={(e) => setFormData({ achievements: e.target.value })}
              placeholder="List your major achievements"
              rows={4}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
}

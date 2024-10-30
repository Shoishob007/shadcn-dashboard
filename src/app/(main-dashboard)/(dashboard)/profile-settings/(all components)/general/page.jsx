/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGeneralStore from "@/stores/profile-settings/useGeneralStore";
import { useEffect } from "react";

export default function GeneralSettings() {
  const { data: session } = useSession();
  const { formData, setFormData, saveInfo } = useGeneralStore();

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
    // Handle form submission
    saveInfo(session.user);
  };

  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">
            General Settings
          </h2>
          <p className="text-sm text-muted-foreground">
            Update your basic account information.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ name: e.target.value })
              }
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ email: e.target.value })
              }
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}

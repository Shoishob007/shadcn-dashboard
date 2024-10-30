/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import usePasswordStore from "@/stores/profile-settings/usePasswordStore";

export default function PasswordSettings() {
  const { formData, setFormData, savePassword, resetFormData } =
    usePasswordStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }
    savePassword(formData);
    resetFormData();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mr-2">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Change Password
          </h2>
          <p className="text-sm text-muted-foreground">
            Update your password to keep your account secure.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({ currentPassword: e.target.value })}
              placeholder="******"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ newPassword: e.target.value })}
              placeholder="******"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ confirmPassword: e.target.value })}
              placeholder="******"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Update Password</Button>
        </div>
      </form>
    </div>
  );
}

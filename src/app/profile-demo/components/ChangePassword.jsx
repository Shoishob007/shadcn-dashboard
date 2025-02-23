"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import usePasswordStore from "@/stores/applicant-profile/usePasswordStore";

const ChangePassword = () => {
    const { formData, setFormData, savePassword, resetFormData } =
    usePasswordStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast({ title: "Passwords do not match", variant: "ourDestructive" });
      return;
    }
    savePassword(formData);
    resetFormData();
  };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg dark:text-gray-200">
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">
              Change Password
            </h2>
            <p className="text-sm text-muted-foreground">
              Update your password to keep your account secure.
            </p>
          </div>

          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label className="text-base" htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={(e) =>
                  setFormData({ currentPassword: e.target.value })
                }
                placeholder="******"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base" htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ newPassword: e.target.value })}
                placeholder="******"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base" htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ confirmPassword: e.target.value })
                }
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
};

export default ChangePassword;
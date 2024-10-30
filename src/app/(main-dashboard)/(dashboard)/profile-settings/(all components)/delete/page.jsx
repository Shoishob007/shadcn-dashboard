"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";
import useDeleteProfileStore from "@/stores/profile-settings/useDeleteProfileStore";

export default function DeleteAccount() {
  const { formData, setFormData, deleteProfile, resetFormData } =
    useDeleteProfileStore();

  const handleDelete = (e) => {
    e.preventDefault();
    // Handle account deletion
    deleteProfile(formData.password);
    resetFormData();
  };

  return (
    <div className="p-4">
      <Card className="border-destructive/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">Delete Account</CardTitle>
          </div>
          <CardDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDelete} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">
                Please enter your password to confirm:
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ password: e.target.value })}
                placeholder="Enter your password"
                className="max-w-md"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!formData.password}
            type="submit"
          >
            Delete Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

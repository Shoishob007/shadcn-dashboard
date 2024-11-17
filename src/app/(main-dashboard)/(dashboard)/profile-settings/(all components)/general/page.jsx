"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGeneralStore from "@/stores/profile-settings/useGeneralStore";

export default function GeneralSettings() {
  const { data: session } = useSession();
  const {
    orgDetails,
    formData,
    setFormData,
    fetchOrgDetails,
    saveInfo,
    loading,
  } = useGeneralStore();

  const accessToken = session?.access_token;
  const organizationId = session?.organizationId;

  // Fetch organization details on component load
  useEffect(() => {
    if (accessToken && organizationId) {
      fetchOrgDetails(accessToken, organizationId);
    }
  }, [accessToken, organizationId, fetchOrgDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (accessToken && organizationId) {
      await saveInfo(accessToken, organizationId);
    }
  };

  if (!orgDetails) {
    return <div>Loading organization details...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">
            General Settings
          </h2>
          <p className="text-sm text-muted-foreground">
            Update your basic organization information.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="orgName">Organization Name</Label>
            <Input
              id="orgName"
              value={formData.orgName}
              onChange={(e) => setFormData({ orgName: e.target.value })}
              placeholder="Organization name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="orgEmail">Organization Email</Label>
            <Input
              id="orgEmail"
              type="email"
              value={formData.orgEmail}
              onChange={(e) => setFormData({ orgEmail: e.target.value })}
              placeholder="organization@example.com"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useProfileStore from "@/stores/profile-settings/useProfileStore";
import { Pencil, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ProfileOverview() {
  const { data: session } = useSession();

  const {
    profileDetails,
    formData,
    setFormData,
    fetchProfile,
    saveProfile,
    loading,
  } = useProfileStore();


  const [isEditing, setIsEditing] = useState(false);

  const accessToken = session?.access_token;
  const organizationId = session?.organizationId;

  useEffect(() => {
    if (accessToken && organizationId) {
      fetchProfile(accessToken, organizationId);
    }
  }, [accessToken, organizationId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (accessToken && organizationId) {
      saveProfile(accessToken, organizationId);
      setIsEditing(false);
    }
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData(profileDetails);
  };

  if (loading && !profileDetails) {
    return <div>Loading profile details...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg dark:text-gray-200">
      <div className="flex justify-between items-center p-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Organization Profile
          </h2>
          <p className="text-sm text-muted-foreground">
            Update your profile information as per choice.
          </p>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(!isEditing)}
                className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {isEditing ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Pencil className="w-5 h-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isEditing ? <p>Cancel Editing</p> : <p>Click to edit</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`px-6 py-2 space-y-6 ${
          isEditing ? "" : "pointer-events-none"
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Organization Name */}
          <Field label="Organization Name" id="orgName" isEditing={isEditing}>
            {isEditing ? (
              <Input
                id="orgName"
                value={formData.orgName}
                onChange={(e) => setFormData({ orgName: e.target.value })}
              />
            ) : (
              formData.orgName || "Not provided"
            )}
          </Field>

          {/* Organization Email */}
          <Field label="Organization Email" id="orgEmail" isEditing={isEditing}>
            {isEditing ? (
              <Input
                id="orgEmail"
                type="email"
                value={formData.orgEmail}
                onChange={(e) => setFormData({ orgEmail: e.target.value })}
              />
            ) : (
              formData.orgEmail || "Not provided"
            )}
          </Field>

          {/* Address */}
          <Field label="Address" id="orgAddress" isEditing={isEditing}>
            {isEditing ? (
              <Input
                id="orgAddress"
                value={formData.orgAddress}
                onChange={(e) => setFormData({ orgAddress: e.target.value })}
              />
            ) : (
              formData.orgAddress || "Not provided"
            )}
          </Field>

          {/* Website */}
          <Field label="Website" id="orgWebsiteUrl" isEditing={isEditing}>
            {isEditing ? (
              <Input
                id="orgWebsiteUrl"
                value={formData.orgWebsiteUrl}
                onChange={(e) => setFormData({ orgWebsiteUrl: e.target.value })}
              />
            ) : (
              formData.orgWebsiteUrl || "Not provided"
            )}
          </Field>

          {/* Phone */}
          <Field label="Phone" id="orgPhone" isEditing={isEditing}>
            {isEditing ? (
              <Input
                id="orgPhone"
                value={formData.orgPhone}
                onChange={(e) => setFormData({ orgPhone: e.target.value })}
              />
            ) : (
              formData.orgPhone || "Not provided"
            )}
          </Field>

          {/* Established Year */}
          <Field
            label="Established Year"
            id="orgEstablishedYear"
            isEditing={isEditing}
          >
            {isEditing ? (
              <Input
                id="orgEstablishedYear"
                type="number"
                value={formData.orgEstablishedYear}
                onChange={(e) =>
                  setFormData({
                    orgEstablishedYear: parseInt(e.target.value) || "",
                  })
                }
              />
            ) : (
              formData.orgEstablishedYear || "Not provided"
            )}
          </Field>

          {/* Tagline */}
          <Field
            label="Tagline"
            id="orgTagline"
            isEditing={isEditing}
            mdColSpan
          >
            {isEditing ? (
              <Input
                id="orgTagline"
                className="text-xs sm:text-sm"
                value={formData.orgTagline}
                onChange={(e) => setFormData({ orgTagline: e.target.value })}
              />
            ) : (
              formData.orgTagline || "Not provided"
            )}
          </Field>

          {/* Mission */}
          <Field
            label="Mission"
            id="orgMission"
            isEditing={isEditing}
            mdColSpan
          >
            {isEditing ? (
              <Textarea
                id="orgMission"
                value={formData.orgMission}
                onChange={(e) => setFormData({ orgMission: e.target.value })}
                rows={4}
              />
            ) : (
              formData.orgMission || "Not provided"
            )}
          </Field>

          {/* Vision */}
          <Field label="Vision" id="orgVision" isEditing={isEditing} mdColSpan>
            {isEditing ? (
              <Textarea
                id="orgVision"
                value={formData.orgVision}
                onChange={(e) => setFormData({ orgVision: e.target.value })}
                rows={4}
              />
            ) : (
              formData.orgVision || "Not provided"
            )}
          </Field>
        </div>

        {isEditing && (
          <div className="flex justify-end mt-4 space-x-4">
            <Button type="button" variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button type="submit" variant='outline' className="text-sm bg-white text-emerald-500 border-emerald-400 hover:text-white hover:bg-emerald-400" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

const Field = ({ label, id, children, isEditing, mdColSpan }) => {
  return (
    <div
      className={`space-y-1 ${mdColSpan ? "md:col-span-3 sm:col-span-2" : ""}`}
    >
      <Label className="text-base" htmlFor={id}>
        {label}
      </Label>
      {isEditing ? (
        children
      ) : (
        <p className="text-gray-800 dark:text-gray-300 text-sm ">{children}</p>
      )}
    </div>
  );
};

/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combo-box";
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
import { useEffect, useMemo, useState } from "react";

export default function ProfileOverview() {
  const { data: session } = useSession();
  const [isSaving, setIsSaving] = useState(false);

  const {
    profileDetails,
    formData,
    setFormData,
    fetchProfile,
    saveProfile,
    loading,
    industryTypes,
    fetchIndustryTypes,
  } = useProfileStore();

  const [isEditing, setIsEditing] = useState(false);

  const accessToken = session?.access_token;
  const organizationId = session?.organizationId;

  console.log("Profile ::: ", profileDetails)

  useEffect(() => {
    if (accessToken && organizationId) {
      // First fetching industry then profile
      fetchIndustryTypes(accessToken)
        .then(() => {
          return fetchProfile(accessToken, organizationId);
        })
        .catch(console.error);
    }
  }, [accessToken, organizationId]);

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (accessToken && organizationId) {
      setIsSaving(true);
      try {
        await saveProfile(accessToken, organizationId);
        setIsEditing(false);
      } catch (error) {
        console.error("Error saving profile:", error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData(profileDetails);
  };

  // selection changes
  const handleIndustryTypeChange = (selectedIds) => {
    setFormData({
      ...formData,
      industryType: selectedIds || [],
    });
  };

  // Industry types for Combobox
  const industryOptions = useMemo(() => {
    return industryTypes.map((industry) => ({
      label: industry.title,
      value: industry.id,
    }));
  }, [industryTypes]);

  // currently selected industry
  const selectedIndustryValues = useMemo(() => {
    const industryTypeIds = formData.industryType || [];

    const filteredIds = industryTypeIds.filter((id) => {
      const exists = industryTypes.some(
        (industry) => industry.id.toString() === id.toString()
      );
      return exists;
    });

    return filteredIds;
  }, [formData.industryType, industryTypes]);

  // console.log("selectedIndustryValues :: ", selectedIndustryValues);
  // console.log("formData.industryType :: ", formData.industryType);
  // console.log("industryTypes :: ", industryTypes);


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
                onChange={(e) =>
                  setFormData({ ...formData, orgName: e.target.value })
                }
                placeholder="Enter organization name"
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
                onChange={(e) =>
                  setFormData({ ...formData, orgEmail: e.target.value })
                }
                placeholder="Enter organization email"
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
                onChange={(e) =>
                  setFormData({ ...formData, orgAddress: e.target.value })
                }
                placeholder="Enter address"
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
                onChange={(e) =>
                  setFormData({ ...formData, orgWebsiteUrl: e.target.value })
                }
                placeholder="Enter website URL"
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
                onChange={(e) =>
                  setFormData({ ...formData, orgPhone: e.target.value })
                }
                placeholder="Enter organization phone"
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
                value={formData.orgEstablishedYear || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    orgEstablishedYear: parseInt(e.target.value) || null,
                  })
                }
                placeholder="Put your established year"
              />
            ) : (
              formData.orgEstablishedYear || "Not provided"
            )}
          </Field>

          {/* Industry type */}
          <Field
            label="Industry Type"
            id="industryType"
            isEditing={isEditing}
            mdColSpan
          >
            {isEditing ? (
              <Combobox
                options={industryOptions}
                value={selectedIndustryValues}
                onChange={handleIndustryTypeChange}
                placeholder="Select industries..."
                multiple={true}
                isEditing={isEditing}
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {isSaving ? (
                  <Badge variant="secondary">Updating...</Badge>
                ) : (
                  selectedIndustryValues.map((industryId) => {
                    const industry = industryTypes.find(
                      (t) => t.id.toString() === industryId.toString()
                    );
                    return (
                      <Badge
                        key={industryId}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {industry?.title || "Unknown Industry"}
                      </Badge>
                    );
                  })
                )}
                {!selectedIndustryValues.length && "Not provided"}
              </div>
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
                onChange={(e) =>
                  setFormData({ ...formData, orgVision: e.target.value })
                }
                rows={4}
                placeholder="Enter organization vision"
              />
            ) : (
              formData?.orgVision || "Not provided"
            )}
          </Field>
        </div>

        {isEditing && (
          <div className="flex justify-end mt-4 space-x-4">
            <Button type="button" variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outline"
              className="text-sm bg-white text-emerald-500 border-emerald-400 hover:text-white hover:bg-emerald-400"
              disabled={loading}
            >
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

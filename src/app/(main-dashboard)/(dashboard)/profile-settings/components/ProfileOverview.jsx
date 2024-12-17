/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import useProfileStore from "@/stores/profile-settings/useProfileStore";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import FormatTitle from "@/components/TitleFormatter";
import PageTitle from "@/components/PageTitle";

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
    }
  };

  // const handleLogoChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const success = await uploadLogoImage(file);
  //     if (success) {
  //       console.log("Profile picture updated successfully");
  //     }
  //   }
  // };

  if (loading && !profileDetails) {
    return <div>Loading profile details...</div>;
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg dark:text-gray-200">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Edit Organization Profile
            </h2>
            <p className="text-sm text-muted-foreground">
              Customize your organization&apos;s public profile information.
            </p>
          </div>
{/* 
          <div className="flex items-center space-x-4">
            <Image
              src={session?.user?.image}
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full"
            />
            <label htmlFor="logo-upload" className="cursor-pointer">
              <Button variant="outline">Change Logo</Button>
            </label>
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              // onChange={handleLogoChange}
            />
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="space-y-2">
              <Label htmlFor="orgAddress">Address</Label>
              <Input
                id="orgAddress"
                value={formData.orgAddress}
                onChange={(e) => setFormData({ orgAddress: e.target.value })}
                placeholder="Organization Address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="orgWebsiteUrl">Website</Label>
              <Input
                id="orgWebsiteUrl"
                value={formData.orgWebsiteUrl}
                onChange={(e) => setFormData({ orgWebsiteUrl: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="orgPhone">Phone</Label>
              <Input
                id="orgPhone"
                value={formData.orgPhone}
                onChange={(e) => setFormData({ orgPhone: e.target.value })}
                placeholder="Organization Phone"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="orgEstablishedYear">Established Year</Label>
              <Input
                id="orgEstablishedYear"
                type="number"
                value={formData.orgEstablishedYear}
                onChange={(e) =>
                  setFormData({ orgEstablishedYear: parseInt(e.target.value) })
                }
                placeholder="Year established"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="orgTagline">Tagline</Label>
              <Input
                id="orgTagline"
                value={formData.orgTagline}
                onChange={(e) => setFormData({ orgTagline: e.target.value })}
                placeholder="Organization tagline"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="orgMission">Mission</Label>
              <Textarea
                id="orgMission"
                value={formData.orgMission}
                onChange={(e) => setFormData({ orgMission: e.target.value })}
                placeholder="Organization mission"
                rows={4}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="orgVision">Vision</Label>
              <Textarea
                id="orgVision"
                value={formData.orgVision}
                onChange={(e) => setFormData({ orgVision: e.target.value })}
                placeholder="Organization vision"
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
    </>
  );
}

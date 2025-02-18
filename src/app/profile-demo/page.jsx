"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { House } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import ProfileTabs from "./components/ProfileTabs";

const ProfileDemo = () => {
  const [profileData, setProfileData] = useState(null);
  const { data: session } = useSession();
  const accessToken = session?.access_token;
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/applicants`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProfileData(data?.docs);
        console.log("Profile data: ", data.docs);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    getProfileData();
  }, [accessToken]);

  return (
    <>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <House className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/profile-demo">My Profile</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className=" bg-white p-4 shadow-lg rounded-md">
        {/* Profile Header */}
        <ProfileHeader profileData={profileData} />
        <section className="my-8">
          <Separator />
        </section>
        <section>
          <ProfileTabs profileData={profileData} />
        </section>
      </section>
    </>
  );
};

export default ProfileDemo;

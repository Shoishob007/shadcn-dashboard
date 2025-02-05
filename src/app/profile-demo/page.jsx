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
import { useEffect, useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import ProfileTabs from "./components/ProfileTabs";

const ProfileDemo = () => {
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await fetch(
          `https://hhapi.nakhlah.xyz/api/applicants`,
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer " +
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk4ZDExZTIwLTNmYmUtNDFlYy1hMDM3LTYyYjM4ZDkxMzc3ZCIsImNvbGxlY3Rpb24iOiJ1c2VycyIsImVtYWlsIjoidm9yaWI1NzU5NkBndWZ1dHUuY29tIiwicHJvdmlkZXIiOiJjcmVkZW50aWFscyIsImlhdCI6MTczODY2OTM4NywiZXhwIjoyMTcwNjY5Mzg3fQ.fe3iQX-eeRNvtOa5SPa0y_r4wOvRyYP5EC6urB-aeUs",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProfileData(data.docs);
        // console.log("Profile data: ", data.docs);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    getProfileData();
  }, []);

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

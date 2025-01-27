"use client";

import { Separator } from "@/components/ui/separator";
import ProfileHeader from "./components/ProfileHeader.jsx";
import ProfileTabs from "./components/ProfileTabs.jsx";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { House } from "lucide-react";

const ProfileDemo = () => {

  return (
    <div>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <House className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/profile-settings">
              Profile Settings
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="bg-white dark:bg-gray-900 p-6 shadow-md rounded-md">
        {/* Profile Header */}
        <ProfileHeader />
        <section className="mb-8">
          <Separator />
        </section>
        <section>
          <ProfileTabs />
        </section>
      </section>
    </div>
  );
};

export default ProfileDemo;

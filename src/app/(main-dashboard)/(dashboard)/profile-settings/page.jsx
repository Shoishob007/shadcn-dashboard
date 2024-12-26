"use client";

import { Separator } from "@/components/ui/separator";
import ProfileHeader from "./components/ProfileHeader.jsx";
import ProfileTabs from "./components/ProfileTabs.jsx";
import PageTitle from "@/components/PageTitle.jsx";
import { usePathname } from "next/navigation";
import FormatTitle from "@/components/TitleFormatter.js";
import { useSession } from "next-auth/react";

const ProfileDemo = () => {
  const pathname = usePathname();
  const pageTitle = FormatTitle(pathname);

  return (
    <div>
      <PageTitle title={pageTitle} className={"pb-4 ml-2"} />
      <section className="bg-white dark:bg-gray-900 p-4 shadow-md rounded-md">
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

"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileOverview from "./ProfileOverview.jsx";
import Socials from "./Socials.jsx";
import HiringStages from "./HiringStages.jsx";
import Password from "./Password.jsx";
import User from "./User.jsx";
import Delete from "./Delete.jsx";

const ProfileTabs = () => {
  const { data: session } = useSession();
  const accessToken = session?.access_token;
  const orgId = session?.organizationId;
  const [imageId, setImageId] = useState(null);

  return (
    <div>
      <Tabs defaultValue="overview" className="">
        <TabsList className="bg-transparent">
          <TabsTrigger className="" value="overview">
            Account Details
          </TabsTrigger>
          <TabsTrigger className="ml-8" value="password">
            Change Password
          </TabsTrigger>
          <TabsTrigger className="ml-8" value="socials">
            Our Social Media
          </TabsTrigger>
          {/* <TabsTrigger className="ml-8" value="branches">
            Branches
          </TabsTrigger> */}
          <TabsTrigger className="ml-8" value="hiringStages">
            Hiring Stages
          </TabsTrigger>
          <TabsTrigger className="ml-8" value="user">
            User Management
          </TabsTrigger>
          <TabsTrigger className="ml-8" value="delete">
            Delete Account
          </TabsTrigger>
        </TabsList>

        {/* Tabs content */}
        <div className="mt-6 w-full">
          <TabsContent value="overview">
            <ProfileOverview />
          </TabsContent>
          <TabsContent value="password">
            <Password />
          </TabsContent>
          <TabsContent value="socials">
            <Socials imageId={imageId} />
          </TabsContent>
          {/* <TabsContent value="branches">
            <Branches />
          </TabsContent> */}
          <TabsContent value="hiringStages">
            <HiringStages />
          </TabsContent>
          <TabsContent value="user">
            <User />
          </TabsContent>
          <TabsContent value="delete">
            <Delete />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;

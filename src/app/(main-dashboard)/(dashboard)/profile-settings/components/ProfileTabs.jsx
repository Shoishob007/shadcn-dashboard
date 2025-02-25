"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileOverview from "./ProfileOverview.jsx";
import Socials from "./Socials.jsx";
import HiringStages from "./HiringStages.jsx";
import Password from "./Password.jsx";
import User from "./User.jsx";
import Delete from "./Delete.jsx";

const ProfileTabs = () => {
  const [imageId, setImageId] = useState(null);

  return (
    <div>
      <Tabs defaultValue="overview" className="">
        <TabsList className="bg-transparent flex gap-8 justify-start px-6 py-2">
          <TabsTrigger className="" value="overview">
            Account Details
          </TabsTrigger>
          {/* <TabsTrigger className="" value="password">
            Change Password
          </TabsTrigger> */}
          <TabsTrigger className="" value="socials">
            Our Social Media
          </TabsTrigger>
          {/* <TabsTrigger className="" value="branches">
            Branches
          </TabsTrigger> */}
          <TabsTrigger className="" value="hiringStages">
            Hiring Stages
          </TabsTrigger>
          <TabsTrigger className="" value="user">
            User Management
          </TabsTrigger>
          <TabsTrigger className="" value="delete">
            Delete Account
          </TabsTrigger>
        </TabsList>

        {/* Tabs content */}
        <div className="mt-6 w-full">
          <TabsContent value="overview">
            <ProfileOverview />
          </TabsContent>
          {/* <TabsContent value="password">
            <Password />
          </TabsContent> */}
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

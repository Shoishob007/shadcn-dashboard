import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileOverview from "./ProfileOverview.jsx";
import Socials from "./Socials.jsx";
import Password from "./Password.jsx";
import Branches from "./Branches.jsx";
import User from "./User.jsx";
import Delete from "./Delete.jsx";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ProfileTabs = () => {
  const { data: session } = useSession();
  const accessToken = session?.access_token;
  const organizationId = session?.organizationId;
  const [imageId, setImageId] = useState(null); 

  useEffect(() => {
    const fetchImageId = async () => {
      if (accessToken && organizationId) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${organizationId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setImageId(data.img?.id || null);
          } else {
            console.error("Failed to fetch organization data.");
          }
        } catch (error) {
          console.error("Error fetching organization data:", error);
        }
      }
    };

    fetchImageId();
  }, [session, accessToken, organizationId]);


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
          <TabsContent value="user">
            <User />
          </TabsContent>
          <TabsContent value="delete">
            <Delete />{" "}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;

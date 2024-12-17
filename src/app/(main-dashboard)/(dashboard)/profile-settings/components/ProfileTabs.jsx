import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileOverview from "./ProfileOverview.jsx";
import Socials from "./Socials.jsx";
import Password from "./Password.jsx";
import Branches from "./Branches.jsx";
import User from "./User.jsx";
import Delete from "./Delete.jsx";

// import Skills from "./Skills";

const ProfileTabs = () => {
  return (
    <div>
      <Tabs defaultValue="overview" className="">
        <TabsList className="bg-transparent">
          <TabsTrigger className="" value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger className="ml-8" value="password">
            Password
          </TabsTrigger>
          <TabsTrigger className="ml-8" value="socials">
            Socials
          </TabsTrigger>
          <TabsTrigger className="ml-8" value="branches">
            Branches
          </TabsTrigger>
          <TabsTrigger className="ml-8" value="user">
            Users
          </TabsTrigger>
          <TabsTrigger className="ml-8" value="delete">
            Delete
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
            <Socials />
          </TabsContent>
          <TabsContent value="branches">
            <Branches />
          </TabsContent>
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

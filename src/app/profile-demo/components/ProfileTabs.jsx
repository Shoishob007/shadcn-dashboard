import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileOverview from "./ProfileOverview";
import Projects from "./Projects";
import Skills from "./Skills";

const ProfileTabs = () => {
  return (
    <div>
      <Tabs defaultValue="overview" className="">
        <TabsList className="bg-transparent">
          <TabsTrigger className="" value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger className="ml-8" value="skills">
            Skills
          </TabsTrigger>
          <TabsTrigger className="ml-8" value="projects">
            Projects
          </TabsTrigger>
          <TabsTrigger className="ml-8" value="documents">
            Documents
          </TabsTrigger>
          <TabsTrigger className="ml-8" value="activity">
            Activity
          </TabsTrigger>
        </TabsList>

        {/* Tabs content */}
        <div className="mt-6 w-full">
          <TabsContent value="overview">
            <ProfileOverview />
          </TabsContent>
          <TabsContent value="skills">
            <Skills />
          </TabsContent>
          <TabsContent value="projects">
            <Projects />
          </TabsContent>
          <TabsContent value="documents">
            <h1>Documents</h1>
          </TabsContent>
          <TabsContent value="activity">
            <h1>Activity</h1>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;

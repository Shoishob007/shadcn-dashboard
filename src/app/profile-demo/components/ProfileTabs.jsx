import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChangePassword from "./ChangePassword";
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
          <TabsTrigger className="ml-8" value="resume">
            Resume
          </TabsTrigger>
          <TabsTrigger className="ml-8" value="educations">
            Educations
          </TabsTrigger>
          <TabsTrigger className="ml-8" value="experiences">
            Experiences
          </TabsTrigger>
          <TabsTrigger className="ml-8" value="skills">
            Skills
          </TabsTrigger>
          
          <TabsTrigger className="ml-8" value="projects">
            Projects
          </TabsTrigger>
          <TabsTrigger className="ml-8" value="changePassword">
            Change Password
          </TabsTrigger>
        </TabsList>

        {/* Tabs content */}
        <div className="mt-6 w-full">
          <TabsContent value="overview">
            <ProfileOverview />
          </TabsContent>
          <TabsContent value="resume">
            <h1>Resume</h1>
          </TabsContent>
          <TabsContent value="educations">
            <h1>Educations</h1>
          </TabsContent>
          <TabsContent value="experiences">
            <h1>Experiences</h1>
          </TabsContent>
          <TabsContent value="skills">
            <Skills />
          </TabsContent>
          <TabsContent value="projects">
            <Projects />
          </TabsContent>
          <TabsContent value="changePassword">
            <ChangePassword/>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;

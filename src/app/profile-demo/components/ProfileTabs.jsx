import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChangePassword from "./ChangePassword";
import Educations from "./Educations";
import Experiences from "./Experiences";
import ProfileOverview from "./ProfileOverview";
import Projects from "./Projects";
import Resume from "./Resume";
import Skills from "./Skills";

const ProfileTabs = ({profileData = []}) => {
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
          {/* <TabsTrigger className="ml-8" value="experiences">
            Experiences
          </TabsTrigger> */}
          <TabsTrigger className="ml-8" value="skills">
            Skills
          </TabsTrigger>
          
          {/* <TabsTrigger className="ml-8" value="projects">
            Projects
          </TabsTrigger> */}
          <TabsTrigger className="ml-8" value="changePassword">
            Change Password
          </TabsTrigger>
        </TabsList>

        {/* Tabs content */}
        <div className="mt-6 w-full">
          <TabsContent value="overview">
            {
                profileData?.map((data) => <ProfileOverview key={data.id} profileData={profileData} data={data} />)
            }
          </TabsContent>
          <TabsContent value="resume">
            <Resume/>
          </TabsContent>
          <TabsContent value="educations">
            <Educations/>
          </TabsContent>
          {/* <TabsContent value="experiences">
            <Experiences/>
          </TabsContent> */}
          <TabsContent value="skills">
            <Skills />
          </TabsContent>
          {/* <TabsContent value="projects">
            <Projects />
          </TabsContent> */}
          <TabsContent value="changePassword">
            <ChangePassword/>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowDown, Pencil } from "lucide-react";
import { useState } from "react";
import BasicDetails from "./(UpdateProfile)/BasicDetails";
import ResumeUploader from "./(UpdateProfile)/ResumeUploader";
import UpdateAbout from "./(UpdateProfile)/UpdateAbout";
import UpdateEducation from "./(UpdateProfile)/UpdateEducation";
import UpdateExperience from "./(UpdateProfile)/UpdateExperience";
import UpdateProjects from "./(UpdateProfile)/UpdateProjects";
import UpdateSkills from "./(UpdateProfile)/UpdateSkills";
import UpdateSocials from "./(UpdateProfile)/UpdateSocials";

const ProfileUpdatePage = () => {
  const [activeSection, setActiveSection] = useState("basic");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button onClick={() => setIsSheetOpen(true)}>
            <span>
              <Pencil />
            </span>
            <span>Edit Profile</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="bottom"
          className="w-full h-full overflow-hidden p-0 pb-10"
        >
          <div>
            <div className="flex gap-2.5 items-center h-[70px] pl-[30px] border-b border-[#ddd] shadow">
              <Button
                onClick={() => setIsSheetOpen(false)}
                className="h-[30px] w-[30px]  flex items-center justify-center rounded-full cursor-pointer"
                variant="outline"
              >
                <ArrowDown size={16} />
              </Button>
              <h1 className="text-lg font-medium">Edit Profile</h1>
            </div>
          </div>
          <div className="flex h-full px-4 pt-4">
            {/* Sidebar */}
            <div className="w-72 bg-[#f6f6f6] border-r h-full sticky top-0">
              <nav className="flex flex-col p-4 gap-2">
                <Button
                  variant={activeSection === "basic" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setActiveSection("basic")}
                >
                  Basic Details
                </Button>
                <Button
                  variant={activeSection === "resume" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setActiveSection("resume")}
                >
                  Resume
                </Button>
                <Button
                  variant={activeSection === "about" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setActiveSection("about")}
                >
                  About
                </Button>
                <Button
                  variant={activeSection === "skills" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setActiveSection("skills")}
                >
                  Skills
                </Button>
                <Button
                  variant={
                    activeSection === "education" ? "default" : "outline"
                  }
                  className="justify-start"
                  onClick={() => setActiveSection("education")}
                >
                  Education
                </Button>
                <Button
                  variant={
                    activeSection === "experience" ? "default" : "outline"
                  }
                  className="justify-start"
                  onClick={() => setActiveSection("experience")}
                >
                  Work Experience
                </Button>
                <Button
                  variant={activeSection === "socials" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setActiveSection("socials")}
                >
                  Social Links
                </Button>
                <Button
                  variant={activeSection === "projects" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setActiveSection("projects")}
                >
                  Projects
                </Button>
              </nav>
            </div>

            {/* Right Content */}
            <div className="flex-1 pb-10 overflow-y-auto">
              {activeSection === "basic" && <BasicDetails />}
              {activeSection === "resume" && <ResumeUploader />}
              {activeSection === "about" && <UpdateAbout />}
              {activeSection === "skills" && <UpdateSkills />}
              {activeSection === "education" && <UpdateEducation />}
              {activeSection === "experience" && <UpdateExperience />}
              {activeSection === "socials" && <UpdateSocials />}
              {activeSection === "projects" && <UpdateProjects />}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProfileUpdatePage;

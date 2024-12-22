import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Pencil } from "lucide-react";
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

  return (
    <div className="">
      <Sheet>
        <SheetTrigger asChild>
          <Button>
            <span>
              <Pencil />
            </span>
            <span>Edit Profile</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="bottom"
          className="w-full h-[95%] overflow-hidden p-0"
        >
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-72 bg-gray-100 border-r h-full sticky top-0">
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
            <div className="flex-1 p-6 overflow-y-auto">
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

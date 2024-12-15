"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Shadcn UI Sheet
import { useState } from "react";

const EditProfileSheet = () => {
  const [activeSection, setActiveSection] = useState("basic");

  return (
    <div className="p-4">
      {/* Trigger Button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button>Edit Profile</Button>
        </SheetTrigger>

        {/* Sheet Content */}
        <SheetContent side="bottom" className="w-full h-full px-4 pt-4">
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-72 bg-gray-100 border-r">
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
            <div className="w-2/3">
              {activeSection === "basic" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Basic Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="First Name"
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Email</label>
                      <input
                        type="email"
                        placeholder="example@gmail.com"
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                  </div>
                </div>
              )}
              {activeSection === "resume" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Resume</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="First Name"
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Email</label>
                      <input
                        type="email"
                        placeholder="example@gmail.com"
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "about" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">About</h2>
                  <textarea
                    rows="4"
                    placeholder="Add your skills here..."
                    className="w-full border rounded-md p-2"
                  ></textarea>
                </div>
              )}
              {activeSection === "skills" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Skills</h2>
                  <textarea
                    rows="4"
                    placeholder="Add your skills here..."
                    className="w-full border rounded-md p-2"
                  ></textarea>
                </div>
              )}

              {activeSection === "education" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Education</h2>
                  <input
                    type="text"
                    placeholder="Add your education details"
                    className="w-full border rounded-md p-2"
                  />
                </div>
              )}

              {activeSection === "experience" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Work Experience
                  </h2>
                  <textarea
                    rows="4"
                    placeholder="Add your work experience"
                    className="w-full border rounded-md p-2"
                  ></textarea>
                </div>
              )}
              {activeSection === "socials" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Social Links</h2>
                  <textarea
                    rows="4"
                    placeholder="Add your work experience"
                    className="w-full border rounded-md p-2"
                  ></textarea>
                </div>
              )}
              {activeSection === "projects" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Projects</h2>
                  <textarea
                    rows="4"
                    placeholder="Add your work experience"
                    className="w-full border rounded-md p-2"
                  ></textarea>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditProfileSheet;

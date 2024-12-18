"use client";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import Educations from "./components/Educations";
import ProfileAbout from "./components/ProfileAbout";
import ProfileHeader from "./components/ProfileHeader";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Skills from "./components/Skills";
import SocialLinks from "./components/SocialLinks";
import WorkExperience from "./components/WorkExperience";

const ApplicantProfile = () => {
  const [profileInfo, setProfileInfo] = useState([]);
  useEffect(() => {
    const getProfileData = async () => {
      const res = await fetch("./applicant-profile.json");
      const data = await res.json();
      //   console.log(data.docs);
      setProfileInfo(data.docs);
    };
    getProfileData();
  }, []);
  return (
    <div>
      {/* Profile Headaer part */}
      <ProfileHeader profileInfo={profileInfo} />
      <div className="bg-white shadow-sm p-6 rounded-[12px] mt-3">
        <ProfileAbout profileInfo={profileInfo} />
        <Separator className="my-6" />
        <Resume />
        <Separator className="my-6" />
        <Skills profileInfo={profileInfo} />
        <Separator className="my-6" />
        <WorkExperience />
        <Separator className="my-6" />
        <Educations profileInfo={profileInfo} />
        <Separator className="my-6" />
        <Projects />
        <Separator className="my-6" />
        <SocialLinks />
      </div>
    </div>
  );
};

export default ApplicantProfile;

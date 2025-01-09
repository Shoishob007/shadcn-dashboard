"use client";
// import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
// import Educations from "./components/Educations";
// import ProfileAbout from "./components/ProfileAbout";
import ProfileHeader from "./components/ProfileHeader";
// import Projects from "./components/Projects";
// import Resume from "./components/Resume";
// import Skills from "./components/Skills";
// import SocialLinks from "./components/SocialLinks";
// import WorkExperience from "./components/WorkExperience";

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

  const { data: session } = useSession();
  console.log("current session::", session);
  const [profileImage, setProfileImage] = useState(session?.user?.image || "");
  console.log("profile image", profileImage);
  const [coverImage, setCoverImage] = useState("");

  useEffect(() => {
    setProfileImage(session?.user?.image || "");
  }, [session]);
  return (
    <div>
      {/* Profile Headaer part */}
      <ProfileHeader profileInfo={profileInfo} />

      <div className=" mt-3">
        <h1>Here I will added tab section</h1>
      </div>

      {/*  
      <div className="bg-white dark:bg-gray-800 shadow-sm p-6 rounded-[12px] mt-3">
        <ProfileAbout profileInfo={profileInfo} />
        <Separator className="my-6 dark:bg-gray-200" />
        <Resume />
        <Separator className="my-6 dark:bg-gray-200" />
        <Skills profileInfo={profileInfo} />
        <Separator className="my-6 dark:bg-gray-200" />
        <WorkExperience />
        <Separator className="my-6 dark:bg-gray-200" />
        <Educations profileInfo={profileInfo} />
        <Separator className="my-6 dark:bg-gray-200" />
        <Projects />
        <Separator className="my-6 dark:bg-gray-200" />
        <SocialLinks />
      </div>
      */}
    </div>
  );
};

export default ApplicantProfile;

import { Button } from "@/components/ui/button";
import { FileUser, Pencil, Settings, University } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import applicant from "../../../../../../public/assests/applicant.png";
import banner from "../../../../../../public/assests/profile-banner.png";
import ProfileShareBtn from "./ProfileShareBtn";
import ProfileUpdatePage from "./ProfileUpdatePage";

const ProfileHeader = ({ profileInfo }) => {
  return (
    <section>
      <div className="relative">
        <Image
          src={banner}
          alt="profile banner"
          priority
          className="rounded-t-lg"
        />
        <div className="absolute top-3 right-3 cursor-pointer">
          <Button variant="outline" className="rounded-full">
            <Pencil size={16} />
          </Button>
        </div>
      </div>
      <div className="bg-white shadow-sm p-6 rounded-b-[12px]">
        {profileInfo.map((info) => (
          <div key={info.id} className="flex justify-between">
            <div className="flex gap-5">
              <div>
                <Image
                  src={applicant}
                  alt="profile image"
                  width={100}
                  height={100}
                  className="border-2 border-[#f3f3f3] rounded-full"
                />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">{info.name}</h1>
                <span className="text-sm text-[#727272]">{info.email}</span>
                <div className="flex flex-col gap-1.5 mt-3">
                  <div className="flex space-x-2.5 text-sm">
                    <span className="h-7 w-7 shadow rounded-lg border border-[#e2e2e2] flex items-center justify-center">
                      <University size={16} />
                    </span>
                    <div>
                      {info.educations.map((edu) => (
                        <p key={edu.id}>{edu.instituteName}</p>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2.5 text-sm">
                    <span className="h-7 w-7 shadow rounded-lg border border-[#e2e2e2] flex items-center justify-center">
                      <FileUser size={16} />
                    </span>
                    <Link className="text-blue-400" href={info.cv}>
                      Resume
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex gap-3">
                <ProfileShareBtn profileInfo={profileInfo} />
                <Button variant="outline">
                  <Settings size={16} />
                </Button>
              </div>
              <div>
                <ProfileUpdatePage/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfileHeader;

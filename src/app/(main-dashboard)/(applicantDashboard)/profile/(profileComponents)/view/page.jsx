// This page design is temporary. I will be modify this page design.

"use client";
import SettingsContainer from "@/app/(main-dashboard)/(dashboard)/profile-settings/components/SettingsContainer";
import SettingsNav from "@/app/(main-dashboard)/(dashboard)/profile-settings/components/SettingsNav";
import Image from "next/image";
import { usePathname } from "next/navigation";

const ViewProfile = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-10 justify-center h-full">
      <div className="bg-white p-6 rounded-lg shadow-md mx-2">
        <div className="flex gap-3 md:gap-0 flex-col-reverse md:flex-row md:justify-between items-center p-6">
          <div className="flex gap-4 items-center">
            <Image
              src="/assests/checkmark.png"
              alt="Checkmark"
              width={60}
              height={60}
              className="text-center mx-auto"
            />
            <div className="flex flex-col">
              <h1 className="font-semibold text-lg text-gray-600">
                Emam Khalid Jion
              </h1>
              <p className="text-sm text-gray-600">Full Stack Developer</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 text-gray-600 p-4">
          <div className="col-span-1">
            <SettingsNav currentPath={pathname} />
          </div>
          <div className="col-span-2">
            <SettingsContainer currentPath={pathname} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;

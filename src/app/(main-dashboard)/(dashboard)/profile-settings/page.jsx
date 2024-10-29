"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SettingsNav from "./components/SettingsNav";
import SettingsContainer from "./components/SettingsContainer";
import Image from "next/image";
import { usePathname } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import FormatTitle from "@/components/TitleFormatter";

const ProfileSetting = () => {
  const pathname = usePathname();
  const { status, data: session } = useSession();
  const [formData, setFormData] = useState({
    name: session?.user?.name,
    email: session?.user?.email,
    password: "",
    image: session?.user?.image,
  });

  const pageTitle = FormatTitle(pathname);
  // useEffect(() => {
  //   console.log(session);
  //   console.log("Form Data Email:", session?.user?.email);
  //   console.log(status);
  // }, [session, status]);

  return (
    <>
      <PageTitle title={pageTitle} className={"pb-4"} />

      <div className="flex flex-col gap-10 justify-center h-full">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex gap-3 md:gap-0 flex-col-reverse md:flex-row md:justify-between items-center p-6">
            <div className="flex gap-4 items-center">
              <Image
                src="/assests/hh-logo.png"
                alt="Checkmark"
                width={80}
                height={80}
                className="text-center mx-auto"
              />
              <div className="flex flex-col">
                <h1 className="font-semibold text-base md:text-lg text-gray-600">
                  {formData.name} / Settings
                </h1>
                <p className="text-sm text-gray-600">
                  Update your profile information
                </p>
              </div>
            </div>
            <div className="group text-gray-600 hover:text-white px-10 py-2 flex flex-col items-center bg-white bg-gradient-to-tr from-white to-white rounded-md border-[1px] border-red-700 hover:from-rose-500 hover:to-orange-500 cursor-pointer">
              <h2 className="text-sm font-semibold">
                Go{" "}
                <span className="text-red-500 group-hover:text-white">Pro</span>
              </h2>
              <p className="text-xs">Get 3x more facilities</p>
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
    </>
  );
};

export default ProfileSetting;

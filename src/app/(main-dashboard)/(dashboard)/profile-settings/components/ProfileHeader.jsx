"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { uploadCoverImage, uploadLogoImage } from "./imageUpload.js";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ProfileSetting = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [coverPhoto, setCoverPhoto] = useState("");
  const [loadingCoverPhoto, setLoadingCoverPhoto] = useState(true);
  const [profileImage, setProfileImage] = useState(session?.user?.image || "");

  const accessToken = session?.access_token;
  const organizationId = session?.organizationId;

  // console.log("session :: ", session);

  useEffect(() => {
    const fetchUserCoverPhoto = async () => {
      if (accessToken && session) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${organizationId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );


          if (response.ok) {
            const userData = await response.json();
            console.log("User data ::: ", userData)
            const fullImageUrl = `${process.env.NEXT_PUBLIC_API_URL}${userData?.img?.url}`;
            setCoverPhoto(fullImageUrl || "");
            setLoadingCoverPhoto(false);
          } else {
            console.error("Failed to fetch user cover photo.");
            setLoadingCoverPhoto(false);
          }
        } catch (error) {
          console.error("Error fetching user cover photo:", error);
          setLoadingCoverPhoto(false);
        }
      }
    };

    fetchUserCoverPhoto();
  }, [accessToken, session, organizationId]);

  useEffect(() => {
    setProfileImage(session?.user?.image || "");
  }, [session, organizationId, accessToken]);

  const handleCoverChange = async (e) => {
    const file = e.target?.files?.[0];
    if (file) {
      const newCoverPhoto = await uploadCoverImage(
        file,
        accessToken,
        organizationId
      );
      if (newCoverPhoto) {
        setCoverPhoto(newCoverPhoto);
        setLoadingCoverPhoto(false);
      } else {
        console.error("Failed to upload cover photo.");
      }
    } else {
      console.warn("No file selected.");
    }
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = await uploadLogoImage(
        file,
        accessToken,
        session,
        update,
      );
      if (imageURL) {
        // Updating the local state
        setProfileImage(imageURL);
      } else {
        console.error("Failed to upload logo.");
      }
    }
  };


  useEffect(() => {
    const handleSessionUpdate = (event) => {
      const { updatedImage } = event.detail;
      if (updatedImage) {
        setProfileImage(updatedImage);
      }
    };

    window.addEventListener("sessionUpdated", handleSessionUpdate);
    return () => {
      window.removeEventListener("sessionUpdated", handleSessionUpdate);
    };
  }, []);

  const handleClick = () => {
    router.push("/Billings/pricing");
  };

  return (
    <>
      <div className="flex flex-col gap-4 justify-center h-full bg-white dark:bg-gray-800 rounded-lg">
        <div className="relative w-full max-w-screen-2xl border m-0 p-2">
          <div className="flex flex-col">
            {loadingCoverPhoto ? (
              <Skeleton className="w-full h-48 md:h-64 lg:h-72" />
            ) : (
              <Image
                src={coverPhoto}
                alt="cover photo"
                width={1200}
                height={360}
                className="w-full h-48 md:h-64 lg:h-72 rounded-lg object-cover"
              />
            )}
            <label htmlFor="cover-upload" className="absolute bottom-8 right-8">
              <div className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900 flex flex-row px-2 py-1 gap-1 items-center text-xs md:text-sm  rounded-md">
                <Camera
                  className="w-8 h-8 p-2 rounded-full cursor-pointer "
                  strokeWidth={2.5}
                />

                <p className="font-semibold hidden sm:block">
                  Change photo
                </p>
              </div>
            </label>
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverChange}
            />
          </div>

          {/* Profile Logo */}
          {/* <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 md:left-16 md:translate-x-0 flex flex-col items-center">
            <Avatar className="w-24 h-24 border-2">
              <AvatarImage src={profileImage} alt="Profile logo" />
              <AvatarFallback>
                {session?.user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <label htmlFor="logo-upload" className="absolute bottom-0 right-0">
              <Camera
                className="w-8 h-8 text-white bg-gray-700 p-2 rounded-full cursor-pointer"
                strokeWidth={2.5}
              />
            </label>
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoChange}
            />
          </div> */}
        </div>
        <div className="p-4 rounded-lg">
          <div className="flex gap-3 md:gap-0 flex-col-reverse md:flex-row md:justify-between items-center p-6">
            <div className="flex gap-4 items-center">
              <div className="flex flex-col text-gray-600 dark:dark:text-gray-200">
                <h1 className="font-semibold text-base md:text-lg">
                  {session?.user?.name || "Your"} / Settings
                </h1>
                <p className="text-sm">
                  Manage your profile profile information and settings
                </p>
              </div>
            </div>
            <div
              onClick={handleClick}
              className="group text-gray-600 dark:text-gray-200 hover:text-white px-10 py-2 flex flex-col items-center bg-white bg-gradient-to-tr from-white to-white dark:from-gray-800 dark:to-gray-800 rounded-md border-[1px] border-red-700 hover:from-rose-500 hover:to-orange-500 dark:hover:from-rose-600 dark:hover:to-orange-600 cursor-pointer"
            >
              <h2 className="text-sm font-semibold">
                Go{" "}
                <span className="text-red-500 group-hover:text-white dark:group-hover:text-gray-300">
                  Pro
                </span>
              </h2>
              <p className="text-xs">Get 3x more facilities</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSetting;

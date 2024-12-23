"use client";

import { Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import profileImg from "../../../../../public/assests/applicant.png";
import coverPhoto from "../../../../../public/assests/profile-banner.png";

const ImageUp = () => {
  const [coverPreview, setCoverPreview] = useState(coverPhoto); // Cover photo preview state
  const [profilePreview, setProfilePreview] = useState(profileImg); // Profile logo preview state

  // Handle cover photo upload
  const handleCoverUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file)); // Set preview for cover photo
    }
  };

  // Handle profile logo upload
  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePreview(URL.createObjectURL(file)); // Set preview for profile logo
    }
  };

  return (
    <div className="space-y-4">
      {/* Cover Photo Section */}
      <div className="relative group">
        <Image
          src={coverPreview}
          alt="Cover Photo"
          width={1200}
          height={360}
          className="w-full h-48 md:h-64 lg:h-72 rounded-lg object-cover"
        />
        <label
          htmlFor="cover-upload"
          className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <div className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900 flex items-center px-3 py-2 gap-2 rounded-md cursor-pointer">
            <Camera className="w-5 h-5" strokeWidth={2.5} />
            <p className="font-semibold hidden sm:block">Change cover photo</p>
          </div>
        </label>
        <input
          id="cover-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCoverUpload}
        />
      </div>

      {/* Profile Logo Section */}
      <div className="relative group flex justify-center">
        <div className="relative">
          <Image
            src={profilePreview}
            alt="Profile Logo"
            width={100}
            height={100}
            className="rounded-full border-4 border-white"
          />
          <label
            htmlFor="logo-upload"
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            <Camera className="w-6 h-6 text-white" strokeWidth={2.5} />
          </label>
          <input
            id="logo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfileUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUp;

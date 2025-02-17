"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import ApplicantImgUpload from "./ApplicantImgUpload";

const ProfileHeader = ({ profileData }) => {
  console.log("profile data", profileData);
    return (
      <div>
        {profileData?.map((pd) => (
          <div key={pd.id} className="flex gap-4 items-center">
            {/* Applicant image upload */}
            <ApplicantImgUpload docId={pd.id} data={pd} />

            {/* Applicant header info */}
            <div>
              <h1 className="text-xl font-semibold">
                {pd?.name === null ? "Set your name" : pd?.name}
              </h1>
            </div>
          </div>
        ))}
      </div>
    );
};

export default ProfileHeader;

"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import ApplicantImgUpload from "./ApplicantImgUpload";

const ProfileHeader = ({ profileData }) => {
//   console.log("profile data", profileData?.applicant);

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
            <h4 className="mb-3 text-sm">
              {pd?.designation?.title === null
                ? "set designation"
                : pd?.designation?.title}
            </h4>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1 text-sm">
                <Mail size={15} />
                <span>
                  {pd?.applicant?.email ? pd?.applicant?.email : "not set"}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Phone size={15} />
                <span>{pd?.phone === null ? "set phone" : pd?.phone}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <MapPin size={15} />
                <span>
                  {pd?.address === null ? "set address" : pd?.address}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm max-w-[560px] text-gray-400">
                A creative and detail-oriented Frontend Developer with a strong
                focus on user experience and design aesthetics. Dedicated to
                crafting visually appealing, responsive, and user-friendly
                interfaces that enhance engagement.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileHeader;

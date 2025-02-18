import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import ProfileField from "./ProfileField";

const BasicDetails = ({ profileData, data }) => {
  const [isEditing, setIsEditing] = useState(false);
//   console.log("profile Basic Details: ", data?.applicant?.email);
  return (
    <div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">
            Basic Details
          </h1>
          <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
            {isEditing ? (
              <span className="" title="Edit">
                <X size={16} />
              </span>
            ) : (
              <span className="" title="Edit">
                <Pencil size={16} />
              </span>
            )}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          The Basic Details section is your opportunity to share your details.
        </p>
      </div>

      {/* Profile info field */}
      {isEditing ? (
        <ProfileField profileData={profileData} data={data} />
      ) : (
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-5 py-4 mt-2.5 rounded-lg">
                <span className="text-[#696969] text-sm">
                  {data?.name === null ? "Pikachu" : data?.name}
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="designation">Designation</Label>
              <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-5 py-4 mt-2.5 rounded-lg">
                <span className="text-[#696969] text-sm">
                  Frontend Designer
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="designation">Phone</Label>
              <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-5 py-4 mt-2.5 rounded-lg">
                <span className="text-[#696969] text-sm">
                  {data?.phone === null ? "123 456 789" : data?.phone}
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="designation">Email address</Label>
              <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-5 py-4 mt-2.5 rounded-lg">
                <span className="text-[#696969] text-sm">
                  {data?.email === null ? "your@email.com" : data?.email}
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="designation">Experience</Label>
              <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-5 py-4 mt-2.5 rounded-lg">
                <span className="text-[#696969] text-sm">1 Year</span>
              </div>
            </div>
            <div>
              <Label htmlFor="designation">Blood Group</Label>
              <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-5 py-4 mt-2.5 rounded-lg">
                <span className="text-[#696969] text-sm">
                  {data?.bloodGroup === null ? "B+" : data?.bloodGroup}
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="designation">Higest Education</Label>
              <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-5 py-4 mt-2.5 rounded-lg">
                <span className="text-[#696969] text-sm">B.Sc</span>
              </div>
            </div>
            <div>
              <Label htmlFor="designation">Address</Label>
              <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-5 py-4 mt-2.5 rounded-lg">
                <span className="text-[#696969] text-sm">
                  {data?.address === null ? "Dhaka, Bangladesh" : data?.address}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Label htmlFor="designation">Description</Label>
            <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-8 py-10 mt-2.5 rounded-lg">
              <span className="text-[#696969] text-sm">
                A creative and detail-oriented Frontend Developer with a strong
                focus on user experience and design aesthetics. Dedicated to
                crafting visually appealing, responsive, and user-friendly
                interfaces that enhance engagement. Skilled in turning ideas
                into functional web solutions while maintaining a commitment to
                delivering quality and meeting project goals effectively.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicDetails;

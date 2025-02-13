"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import BasicDetails from "./BasicDetails";
import SocialLinks from "./SocialLinks";

const ProfileOverview = ({profileData , data}) => {
  const [isEditing, setIsEditing] = useState(false);
//  console.log("Profile overview data: ", data);
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg dark:text-gray-200">
      <div className="p-4 space-y-4 w-full">
        <BasicDetails profileData={profileData} data={data} />
        <Separator className="my-8" />
        {/* Socials links */}
        <div className="">
          <div className="flex items-center justify-between">
            <h1 className="font-medium mb-4">Social Networks</h1>
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
          <div className="mt-4">
            {isEditing ? (
              <SocialLinks />
            ) : (
              // Social links view mode
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Facebook</Label>
                  <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-5 py-4 mt-2.5 rounded-lg">
                    <span className="text-[#696969] text-sm">
                      www.facebook.com/
                    </span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="name">LinkedIn</Label>
                  <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-5 py-4 mt-2.5 rounded-lg">
                    <span className="text-[#696969] text-sm">
                      www.linkedIn.com/
                    </span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="name">GitHub</Label>
                  <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-5 py-4 mt-2.5 rounded-lg">
                    <span className="text-[#696969] text-sm">
                      www.github.com/
                    </span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="name">Twitter</Label>
                  <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-5 py-4 mt-2.5 rounded-lg">
                    <span className="text-[#696969] text-sm">
                      www.twitter.com/
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileOverview;

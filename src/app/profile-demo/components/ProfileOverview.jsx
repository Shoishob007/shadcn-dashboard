import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";

const ProfileOverview = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className=" font-medium">Basic Information</h1>
        <div className="bg-gray-100 hover:bg-gray-200 duration-300 h-8 w-8 flex items-center justify-center rounded-md cursor-pointer">
          <span className="" title="Edit">
            <Pencil size={15} />
          </span>
        </div>
      </div>
      {/* Profile info field */}
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-5 py-4 mt-2.5 rounded-lg">
              <span className="text-[#696969] text-sm">Emam Jion</span>
            </div>
          </div>
          <div>
            <Label htmlFor="designation">Designation</Label>
            <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-5 py-4 mt-2.5 rounded-lg">
              <span className="text-[#696969] text-sm">Frontend Designer</span>
            </div>
          </div>
          <div>
            <Label htmlFor="designation">Phone</Label>
            <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-5 py-4 mt-2.5 rounded-lg">
              <span className="text-[#696969] text-sm">123 456 789</span>
            </div>
          </div>
          <div>
            <Label htmlFor="designation">Email address</Label>
            <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-5 py-4 mt-2.5 rounded-lg">
              <span className="text-[#696969] text-sm">demo@example.com</span>
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
              <span className="text-[#696969] text-sm">B+</span>
            </div>
          </div>
          <div>
            <Label htmlFor="designation">Higest Education</Label>
            <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-5 py-4 mt-2.5 rounded-lg">
              <span className="text-[#696969] text-sm">B.Sc</span>
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
              interfaces that enhance engagement. Skilled in turning ideas into
              functional web solutions while maintaining a commitment to
              delivering quality and meeting project goals effectively.
            </span>
          </div>
        </div>
      </div>
      <Separator className='my-8' />
      {/* Socials links */}
      <div className="">
        <h1 className="font-medium mb-4">Social Networks</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Facebook</Label>
            <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-5 py-4 mt-2.5 rounded-lg">
              <span className="text-[#696969] text-sm">www.facebook.com/</span>
            </div>
          </div>
          <div>
            <Label htmlFor="name">LinkedIn</Label>
            <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-5 py-4 mt-2.5 rounded-lg">
              <span className="text-[#696969] text-sm">www.linkedIn.com/</span>
            </div>
          </div>
          <div>
            <Label htmlFor="name">GitHub</Label>
            <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-5 py-4 mt-2.5 rounded-lg">
              <span className="text-[#696969] text-sm">www.github.com/</span>
            </div>
          </div>
          <div>
            <Label htmlFor="name">Twitter</Label>
            <div className="bg-[#f0f5f7] border border-[#f0f5f7] px-5 py-4 mt-2.5 rounded-lg">
              <span className="text-[#696969] text-sm">www.twitter.com/</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
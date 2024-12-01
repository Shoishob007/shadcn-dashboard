import { Label } from "@/components/ui/label";

const ProfileInputFiled = () => {
  return (
    <div>
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
  );
};

export default ProfileInputFiled;

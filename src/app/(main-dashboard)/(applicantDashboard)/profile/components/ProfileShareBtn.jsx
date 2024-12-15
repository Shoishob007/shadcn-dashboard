import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link, Share2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import profileLogo from "../../../../../../public/assests/applicant.png";

const ProfileShareBtn = ({ profileInfo }) => {
  const [copied, setCopied] = useState(false);
  const linkToShare = "https://yourwebsite.com/profile";

  const handleCopy = () => {
    navigator.clipboard.writeText(linkToShare);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <Share2 size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share your Hire Hub Profile</DialogTitle>
          <DialogDescription>
            <div>
              {profileInfo.map((info) => {
                return (
                  <div key={info.id} className="mt-4 flex items-center gap-2">
                    <Image
                      src={profileLogo}
                      alt="profile image"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h1 className="text-sm text-[#383838] font-semibold">
                        {info.name}
                      </h1>
                      <span className="mt-1 text-[#727272] text-[12px]">
                        {info.email}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-[30px]">
              <h1 className="text-[#727272] text-[12px] text-left">
                Share by Link
              </h1>
              <div className="mt-2.5 flex items-center justify-between border border-gray-300 rounded-md p-2 bg-gray-50">
                <span className="text-sm text-gray-800 truncate">
                  {linkToShare}
                </span>
                <Button onClick={handleCopy} variant="outline">
                  {copied ? "Copied!" : <Link />}
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileShareBtn;

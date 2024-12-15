"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Pencil } from "lucide-react";

const ProfileUpdatePage = () => {
  return (
    <div className="">
      <Sheet>
        <SheetTrigger asChild>
          <Button>
            <span>
              <Pencil />
            </span>
            <span>Edit Profile</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="w-full h-full p-4 bg-white shadow-lg border-t border-gray-300"
        >
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold ">
              Edit Your Profile
            </SheetTitle>
            <SheetDescription className="text-sm text-gray-600"></SheetDescription>
          </SheetHeader>
          <div className="py-4 bg-[#f6f6f6] h-full w-full px-4">content </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProfileUpdatePage;

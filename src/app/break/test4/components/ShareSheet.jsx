"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const ShareSheet = () => {
  const [copied, setCopied] = useState(false);
  const linkToShare = "https://yourwebsite.com/profile";

  const handleCopy = () => {
    navigator.clipboard.writeText(linkToShare);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="flex justify-center items-center">
      <Sheet>
        <SheetTrigger asChild>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Share Profile
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-72 p-4 bg-white shadow-lg border border-gray-300 rounded-md"
        >
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">
              Share Your Profile
            </SheetTitle>
            <SheetDescription className="text-sm text-gray-600">
              Copy the link below to share your profile.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4">
            <div className="flex items-center justify-between border border-gray-300 rounded-md p-2 bg-gray-50">
              <span className="text-sm text-gray-800 truncate">
                {linkToShare}
              </span>
              <button
                onClick={handleCopy}
                className="ml-2 px-3 py-1 text-sm bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ShareSheet;

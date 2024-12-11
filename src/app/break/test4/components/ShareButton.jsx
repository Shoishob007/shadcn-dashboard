"use client";

import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);
  const linkToShare = "https://yourwebsite.com/profile";

  const handleCopy = () => {
    navigator.clipboard.writeText(linkToShare);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="flex justify-center items-center">
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Share Profile
          </button>
        </Popover.Trigger>
        <Popover.Content
          className="p-4 bg-white border border-gray-300 rounded-md shadow-lg w-64"
          sideOffset={8}
        >
          <p className="text-sm text-gray-600 mb-2">Copy your profile link:</p>
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
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}

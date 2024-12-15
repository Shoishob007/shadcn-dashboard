"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export default function ProfileUpdateSidebar() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", formData);
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Sheet>
        <SheetTrigger asChild>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Update Profile
          </button>
        </SheetTrigger>
        <SheetContent
          side="bottom" // This makes it a sidebar
          className="w-full h-full p-6  shadow-lg border-r border-gray-300"
        >
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">
              Update Profile
            </SheetTitle>
          </SheetHeader>
          <div className="flex gap-2 h-screen ">
            <div className="bg-orange-400 h-full w-72 overflow-auto ">
              sidebar
            </div>
            <div className="h-full w-full overflow-y-scroll p-4">content</div>
          </div>
          <div>Hello world</div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

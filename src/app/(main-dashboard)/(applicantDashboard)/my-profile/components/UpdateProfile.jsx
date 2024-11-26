"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ProfileUpdatePopup() {
  const { register, handleSubmit, reset } = useForm();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (data) => {
    console.log("Updated Profile Data:", data);
    alert("Profile updated successfully!");
    reset(); // Clear form fields after submission
    setIsOpen(false); // Close popover after submission
  };

  return (
    <div>
      {/* Popover Trigger Button */}
      <Popover onOpenChange={(open) => setIsOpen(open)}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="mt-4">
            Update Profile
          </Button>
        </PopoverTrigger>

        {/* Popover Content with Background Blur */}
        {isOpen && (
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
        )}

        <PopoverContent className="w-[400px] p-6 z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Update Profile</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <Input
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <Input
                type="text"
                placeholder="Enter your phone number"
                {...register("phone", { required: "Phone is required" })}
              />
            </div>

            {/* Address Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <Textarea
                placeholder="Enter your address"
                {...register("address")}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}

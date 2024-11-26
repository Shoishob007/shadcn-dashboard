import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ProfileUpdatePopup() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Updated Profile Data:", data);
    alert("Profile updated successfully!");
    reset(); // Clear form fields after submission
  };

  return (
    <Popover>
      {/* Trigger Button */}
      <PopoverTrigger asChild>
        <Button variant="outline" className="mt-4">
          Update Profile
        </Button>
      </PopoverTrigger>

      {/* Popover Content */}
      <PopoverContent className="w-80 p-6">
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
          <Button type="submit" className="w-full bg-blue-600 text-white">
            Save Changes
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}

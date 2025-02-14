"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Camera, Mail, MapPin, Phone } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import profileImg from "../../../../public/assests/profile-pic.jpg";

const ProfileHeader = ({ profileData = [] }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(profileImg);
  const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    const accessToken = session?.access_token;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("file: ", file);
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }
    console.log("selected image: ", selectedImage.name);

    const formData = new FormData();
    console.log("Formdata : ", formData);
    formData.append("img", selectedImage);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media-images`, {
      method: 'POST',
      headers: {
         Authorization: `Bearer ${accessToken}`
      },
      body : formData  
    });
    const imageData = await response.json();
    console.log("Image upload data: ", imageData);

    // alert("Profile image uploaded successfully!");
    setOpen(false);
  };

  return (
    <div>
      {profileData?.map((data) => (
        <div key={data.id} className="flex gap-4 items-center">
          <div className="relative w-[163px] h-[163px]">
            <Image
              src={preview}
              alt="Profile"
              width={163}
              height={163}
              className="rounded-2xl border-4 border-white object-cover"
            />
            
            {/* Camera Icon with Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <label className="absolute bottom-2 right-2 bg-slate-600 p-2 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer shadow-lg">
                  <Camera size={18} className="text-white" />
                </label>
              </DialogTrigger>
              <DialogContent className="p-6">
                <DialogHeader>
                  <DialogTitle>Upload Profile Image</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4">
                  {/* Image Preview */}
                  <div className="w-32 h-32 border rounded-lg overflow-hidden">
                    <Image
                      src={selectedImage ? preview : profileImg}
                      alt="Preview"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* File Input */}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="fileInput"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="fileInput"
                    className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer text-sm"
                  >
                    Choose File
                  </label>

                  {/* Upload Button */}
                  <Button onClick={handleProfileUpload} className="w-full">
                    Upload
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Profile Details */}
          <div>
            <h1 className="text-xl font-semibold">{data?.name || "No Name"}</h1>
            <h4 className="mb-3 text-sm">{data?.designation || "Frontend Designer"}</h4>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1 text-sm">
                <Mail size={15} />
                <span>{data?.applicant?.email || "Not Available"}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Phone size={15} />
                <span>{data?.phone || "123 456 789"}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <MapPin size={15} />
                <span>{data?.address || "420 City Path, AU 123-456"}</span>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm max-w-[560px] text-gray-400">
                A creative and detail-oriented Frontend Developer with a strong
                focus on user experience and design aesthetics. Dedicated to
                crafting visually appealing, responsive, and user-friendly
                interfaces that enhance engagement.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileHeader;

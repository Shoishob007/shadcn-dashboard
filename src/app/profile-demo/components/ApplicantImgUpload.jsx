"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Camera } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const ApplicantImgUpload = ({ docId, data }) => {
  const { data: session } = useSession();
  const accessToken = session?.access_token;
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileUpload = async () => {
    if (!selectedImage) {
      toast({
        title: "Warning",
        description: "Please select an image first!",
        variant: "warning",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/media-images`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );
    const imageData = await response.json();

    if (imageData.doc.id) {
      const mediaImgId = imageData.doc.id;

      // Implement get API method for updating the applicant's image
      const imgResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicants/${docId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            img: mediaImgId,
          }),
        }
      );
      const imgUploadData = await imgResponse.json();
      if (imgUploadData.doc.img.id) {
        toast({
          title: "Success",
          description: imageData?.message,
          variant: "success",
        });
        const publicUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
        const imgUrl = publicUrl.concat(imgUploadData.doc.img.url);
        setImage(imgUrl);
      }
    }

    setOpen(false);
  };

  useEffect(() => {
    const publicUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
    const getImgUrl = data.img.url;
    const imgUrl = publicUrl.concat(getImgUrl);
    setImage(imgUrl);
  }, [data.img.url]);

  return (
    <div className="relative ">
      <Image
        src={image}
        alt="Profile"
        width={163}
        height={163}
        className="rounded-2xl border-4 border-white object-cover"
      />

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
                src={selectedImage ? preview : image}
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
  );
};

export default ApplicantImgUpload;

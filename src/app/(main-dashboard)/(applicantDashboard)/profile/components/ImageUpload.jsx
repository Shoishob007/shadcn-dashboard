"use client";
import { useState } from "react";

export default function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col w-full max-w-md  rounded-lg">
      <h2 className="mb-4 font-medium text-gray-700">
        Upload an Image
      </h2>

      <div
        className={`flex items-center justify-center w-[200px] h-[120px] border-2 border-dashed rounded-lg hover:border-dashed hover:border-black duration-300 ${
          selectedImage ? "border-green-500" : "border-gray-300"
        }`}
      >
        {selectedImage ? (
          <div className="relative w-full h-full">
            <img
              src={selectedImage}
              alt="Uploaded preview"
              className="object-cover w-full h-full rounded-lg"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute px-3 py-1 text-sm text-white bg-red-500 rounded top-2 right-2 hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ) : (
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16V8m0 0a4 4 0 118 0m-4 8a4 4 0 100-8m0 8v2m0-10V4m0 8a4 4 0 11-4 0m4 4a4 4 0 104-4"
              />
            </svg>
            <span className="mt-2 text-sm text-gray-500">
              Browse Photo
            </span>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
}

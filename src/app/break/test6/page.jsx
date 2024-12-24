"use client";

import { useEffect, useState } from "react";

const DemoProfilePage = () => {
  const [profileImage, setProfileImage] = useState("");
  useEffect(() => {
    const getImageData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicants`
      );
      const data = await response.json();
      console.log(data);
    };
    getImageData();
  }, []);
  return (
    <div>
      <h1>Demo Profile page</h1>
    </div>
  );
};

export default DemoProfilePage;

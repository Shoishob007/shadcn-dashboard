import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const VerificationSent = ({ onBackToLogin }) => {
  return (
    <div className="text-center dark:text-gray-200">
      <Image
        src="/assests/checkmark.png"
        alt="Checkmark"
        width={80}
        height={80}
        className="text-center mx-auto"
      />
      <h2 className="text-xl font-semibold mb-2">Check Your Email</h2>
      <p className="mb-4">
        A verification link has been sent to your email. Please check your inbox
        and follow the instructions as written in the email.
      </p>
      <Button onClick={onBackToLogin} className="w-full">
        Back to Login
      </Button>
    </div>
  );
};

export default VerificationSent;

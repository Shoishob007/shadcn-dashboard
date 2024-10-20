"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import VerificationSent from "./VerificationSent";
import { useRouter } from "next/navigation";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://hhapi.codemonks.xyz/api/users/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Email submission failed.");
      }

      toast({
        title: "Success",
        description: "A verification link was sent to your email",
        variant: "success",
      });

      setEmail("");
      setEmailSent(true);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  return (
    <>
      {emailSent ? (
        <VerificationSent onBackToLogin={handleBackToLogin} />
      ) : (
        <form onSubmit={handleEmailSubmit} className="grid gap-4">
          <div>
            <Label htmlFor="password">Put your accessible email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="max@example.com"
              className="mt-1"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      )}
    </>
  );
};

export default ForgotPasswordForm;

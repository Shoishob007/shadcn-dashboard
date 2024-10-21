"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import VerificationSent from "./VerificationSent";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassSchema } from "../schemas/formSchemas";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPassSchema),
  });

  const onSubmit = async (data) => {
    const { email } = data;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/forgot-password`,
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
      console.error("Error:", error);
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
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div>
            <Label htmlFor="password">Put your accessible email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="max@example.com"
              className="mt-1"
              required
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
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

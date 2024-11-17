"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { forgotPassSchema } from "../schemas/formSchemas";
import VerificationSent from "./VerificationSent";
import useForgotPasswordStore from "@/stores/authStore/useForgotPasswordStore";

const ForgotPasswordForm = () => {
  const { email, emailSent, setEmail, sendVerificationEmail, resetState } =
    useForgotPasswordStore();
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
    setEmail(email);
    await sendVerificationEmail(email);
  };

  const handleBackToLogin = () => {
    resetState();
    router.push("/login");
  };

  return (
    <>
      {emailSent ? (
        <VerificationSent onBackToLogin={handleBackToLogin} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div>
            <Label htmlFor="password" className="font-medium">
              Put your accessible email
            </Label>
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

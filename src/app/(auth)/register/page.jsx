"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/formSchemas";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import VerificationSent from "../components/VerificationSent";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    const { name, email, password, role } = data;
    const provider = "credentials";
    try {
      const payload = {
        name,
        provider,
        email,
        password,
        role,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // console.log("Registration Successful", response);
      toast({ title: "Registration Successful" });

      setSubmitted(true);
    } catch (error) {
      console.error("Registration Failed:", error);
      toast({ title: "Registration Failed", description: error.message });
    }
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  return (
    <>
      {submitted ? (
        <main className="flex justify-center items-center h-full">
          <div className="max-w-md w-full p-4 border-2 rounded-lg shadow-md bg-white">
            <div className="flex justify-center text-center gap-2">
              <VerificationSent onBackToLogin={handleBackToLogin} />
            </div>
          </div>
        </main>
      ) : (
        <main className="flex justify-center items-center h-full">
          <Card className="mx-auto max-w-sm shadow-md">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your account information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="provider">Full Name</Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Max Verstappen"
                      required
                    />
                    {errors.name && (
                      <span className="text-xs text-red-500">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      {...register("email", { required: true })}
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                    {errors.email && (
                      <span className="text-xs text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      {...register("password", { required: true })}
                      type="password"
                      placeholder="******"
                    />
                    {errors.password && (
                      <span className="text-xs text-red-500">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <div className="grid gap-2 text-sm">
                    <Label htmlFor="role">Select your role</Label>
                    <select
                      id="role"
                      defaultValue="org"
                      {...register("role", { required: true })}
                      className="border rounded-md p-2 w-full bg-white"
                    >
                      <option value="org">Organization</option>
                      <option value="applicant">Applicant</option>
                    </select>
                    {errors.role && <span>{errors.role.message}</span>}
                  </div>
                  <Button type="submit" className="w-full">
                    Create an account
                  </Button>
                  <Button
                    className="w-full bg-red-500 hover:bg-red-400 flex items-center justify-center gap-5"
                    onClick={() => signIn("google")}
                  >
                    Sign up with Google
                    <Image
                      src="/assests/google-logo.jpg"
                      alt="Google Logo"
                      width={25}
                      height={25}
                      className="mr-2 rounded-full"
                    />
                  </Button>
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-400 flex items-center justify-center gap-5"
                    onClick={() => signIn("github")}
                  >
                    Sign up with GitHub
                    <Image
                      src="/assests/github-logo.png"
                      alt="GitHub Logo"
                      width={25}
                      height={25}
                      className="mr-2 rounded-full"
                    />
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="hover:underline">
                    Sign in
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      )}
    </>
  );
}

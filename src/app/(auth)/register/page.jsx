"use client";
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
import useRegisterStore from "@/stores/authStore/useRegisterStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import VerificationSent from "../components/VerificationSent";
import { registerSchema } from "../schemas/formSchemas";

export default function RegisterForm() {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();
  const { formData, setFormData, registerUser, submitted, resetFormData } =
    useRegisterStore();

  const onSubmit = async (data) => {
    console.log("submitted", data);
    setFormData(data);
    await registerUser(data);
  };

  const handleBackToLogin = () => {
    resetFormData();
    router.push("/login");
  };

  return (
    <>
      {submitted ? (
        <main className="flex justify-center items-center h-full">
          <div className="max-w-md w-full p-4 border-2 rounded-lg shadow-md bg-white dark:bg-gray-800">
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
                <div className="grid gap-3">
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
                      className="border rounded-md p-2 w-full bg-white dark:bg-gray-800"
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
                    className="w-full bg-red-500 hover:bg-red-400 flex items-center justify-center gap-4"
                    onClick={() => signIn("google")}
                  >
                    Sign up with Google
                    <Image
                      src="/assests/google-logo.jpg"
                      alt="Google Logo"
                      width={20}
                      height={20}
                      className="mr-2 rounded-full"
                    />
                  </Button>
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-400 flex items-center justify-center gap-4"
                    onClick={() => signIn("github")}
                  >
                    Sign up with GitHub
                    <Image
                      src="/assests/github-logo.png"
                      alt="GitHub Logo"
                      width={20}
                      height={20}
                      className="mr-2 rounded-full"
                    />
                  </Button>
                </div>
                <div className="mt-2 text-center text-sm">
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

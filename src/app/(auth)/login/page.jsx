"use client";
import React from "react";
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
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "../../../hooks/use-toast";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { toast } = useToast();
  const [error, setError] = React.useState("");

  const onSubmit = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });

    toast({
      title: "Signed In!",
      description: "You have signed in successfully.",
      variant: "success",
    });

    if (result?.error) {
      setError(result.error);
    } else if (result?.url) {
      router.push(result.url);
    }
  };

  return (
    <main className="flex justify-center items-center h-full">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign In</CardTitle>
          <CardDescription>
            Enter your email below to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="******"
                  {...register("password")}
                />
                <Link
                  href="#"
                  className="ml-auto inline-block text-xs hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/forgot-password");
                  }}
                >
                  Forgot your password?
                </Link>
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
              <Button
                className="w-full bg-red-500 hover:bg-red-400 flex items-center justify-center gap-5"
                onClick={() => signIn("google")}
              >
                Sign in with Google
                <Image
                  src="/assests/google-logo.jpg"
                  alt="Google Logo"
                  width={25}
                  height={25}
                  className="mr-2 rounded-full"
                />
              </Button>
              <Button
                className="w-full bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center gap-5"
                onClick={() => signIn("github")}
              >
                Sign in with GitHub
                <Image
                  src="/assests/github-logo.png"
                  alt="GitHub Logo"
                  width={25}
                  height={25}
                  className="mr-2 rounded-full"
                />
              </Button>
              <Button
                className="w-full bg-sky-600 hover:bg-sky-500 flex items-center justify-center gap-5"
                onClick={() => signIn("linkedin")}
              >
                Sign in with LinkedIn
                <Image
                  src="/assests/linkedIn-logo.png"
                  alt="LinkedIn Logo"
                  width={25}
                  height={25}
                  className="mr-2 rounded-full"
                />
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

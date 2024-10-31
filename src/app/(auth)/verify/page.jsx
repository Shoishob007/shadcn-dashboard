"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async () => {
    if (!token) {
      toast({
        title: "Error",
        description: "No token found for verification.",
        variant: "ourDestructive",
      });
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/verify/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Verification failed.");
      }

      toast({
        title: "Success",
        description: "Verification success!",
        variant: "ourSuccess",
      });

      router.push("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "ourDestructive",
      });
    }
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full p-6 border-2 rounded-lg text-center bg-white">
        <h1 className="text-2xl font-bold text-center mb-2">Verify Account</h1>
        <p className="text-sm font-semi-bold text-center mb-4">
          Click the button to verify your account
        </p>
        <Button
          onClick={handleSubmit}
          variant="default"
          className="text-center mx-auto items-center"
        >
          Verify Email
        </Button>
      </div>
    </main>
  );
}

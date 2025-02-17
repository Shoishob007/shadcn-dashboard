"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function VerifyPage() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token"), [searchParams]);
  console.log("Token: ", token); // Log the token immediately after retrieval
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log("handleSubmit triggered"); // Log when handleSubmit is called

    if (!token) {
      console.log("No token found, displaying error toast");
      toast({
        title: "Error",
        description: "No token found for verification.",
        variant: "ourDestructive",
      });
      return;
    }

    if (loading) {
      console.log("Already loading, exiting handleSubmit");
      return;
    }
    setLoading(true);
    console.log("Set loading to true");

    try {
      console.log("Attempting to fetch verification API");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email/${token}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Verification API request sent");

      if (!response.ok) {
        console.error("Verification API request failed");
        const errorData = await response.json();
        console.error("Error data:", errorData);
        throw new Error(errorData.message || "Verification failed.");
      }

      console.log("Verification API request successful");
      const data = await response.json();
      console.log("Verification API response data:", data);

      console.log("Attempting to sign in");
      await signIn("credentials", {
        email: data.user.email,
        token: token,
        redirect: false,
      });

      console.log("Sign in successful");
      toast({
        title: "Success",
        description: "Verification successful! You are now logged in.",
        variant: "ourSuccess",
      });

      console.log("Redirecting to home page");
      router.push("/");
    } catch (error) {
      console.error("Error during verification process:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "ourDestructive",
      });
    } finally {
      setLoading(false);
      console.log("Set loading to false");
    }
  };

  return (
    <main className="flex justify-center items-center h-screen dark:text-gray-200">
      {token ? (
        <div className="max-w-md w-full p-6 border-2 rounded-lg text-center bg-white dark:bg-gray-800">
          <h1 className="text-2xl font-bold text-center mb-2">
            Verify Account
          </h1>
          <p className="text-sm font-semi-bold text-center mb-4">
            Click the button to verify your account
          </p>
          <Button
            onClick={handleSubmit}
            variant="default"
            className="text-center mx-auto items-center"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </Button>
        </div>
      ) : (
        <div>Token not found or verification failed.</div>
      )}
    </main>
  );
}

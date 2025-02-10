"use client"
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function VerifyPage() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token"), [searchParams]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!token) {
      toast({
        title: "Error",
        description: "No token found for verification.",
        variant: "ourDestructive",
      });
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email/${token}`,
        {
          method: "GET",
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Verification failed.");
      }

      const data = await response.json();

      await signIn("credentials", {
        email: data.user.email,
        token: data.token,
        redirect: false,
      });

      toast({
        title: "Success",
        description: "Verification successful! You are now logged in.",
        variant: "ourSuccess",
      });

      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "ourDestructive",
      });
    } finally {
      setLoading(false);
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

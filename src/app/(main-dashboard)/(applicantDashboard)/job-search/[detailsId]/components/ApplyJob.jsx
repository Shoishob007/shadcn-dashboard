"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SendHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const ApplyJob = ({ id }) => {
  const { data: session } = useSession();
  const [isApply, setIsApply] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const accessToken = session?.access_token;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!session || !accessToken) {
      toast({
        title: "Error",
        description: "No access token found! Please log in first.",
        variant: "ourDestructive",
      });
      return;
    }

    const applyInfo = { jobDetails: id };
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(applyInfo),
        }
      );

      const responseData = await response.json();
      console.log("apply response: ", responseData);

      if (response.ok) {
        setIsApply(true);
        toast({
          title: "Success",
          description: responseData?.message,
          variant: "ourSuccess",
        });
      } else {
        if (
          responseData.errors &&
          responseData.errors[0]?.message ===
            "You have already applied to this job."
        ) {
          toast({
            title: "Error",
            description: responseData.errors[0]?.message,
            variant: "ourDestructive",
          });
          setIsApply(true);
        } else {
          toast({
            title: "Error",
            description: "Failed to apply job",
            variant: "ourDestructive",
          });
        }
      }
    } catch (error) {
      console.log("Error in applying job: ", error.message);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "ourDestructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isApply ? (
        <Button disabled>Applied</Button>
      ) : (
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Applying..." : "Apply Now"}
          <SendHorizontal size={16} />
        </Button>
      )}
    </div>
  );
};

export default ApplyJob;

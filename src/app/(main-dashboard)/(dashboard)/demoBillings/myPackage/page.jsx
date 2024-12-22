"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const MyPackage = () => {
    const { toast } = useToast();
    const router = useRouter()
  const currentPlan = {
    title: "Standard",
    price: "2850",
    features: {
      "Organization Login": true,
      "Organization Registration with mail": true,
      "Dynamic Dashboard with Report": true,
      "Meeting link create & Share": true,
      "Calendar / Event / Schedule": true,
      "API Integration": false,
      "Parameter wise Dynamic CV Scoring": false,
    },
    description: "Perfect for growing organizations needing advanced tools.",
  };

  const availableFeatures = Object.entries(currentPlan.features).filter(
    ([, available]) => available
  );
  const unavailableFeatures = Object.entries(currentPlan.features).filter(
    ([, available]) => !available
  );

  const handleCancel = () => {
    console.log("Clicked");
  };

  const handleNavigateToPackages = () => {
    router.push("/demoBillings/pricing");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="shadow-none border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
            {currentPlan.title} Package
          </CardTitle>
          <div className="flex justify-between items-center">
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {currentPlan.description}
            </CardDescription>
            <Button
              variant="link"
              size="sm"
              className="hover:scale-105 transition-all duration-300"
              onClick={handleNavigateToPackages}
            >
              View All Packages {" >> "}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Available Features */}
            <div>
              <ul className="pl-5 space-y-2 text-sm">
                {availableFeatures.map(([feature]) => (
                  <li
                    key={feature}
                    className="text-gray-600 dark:text-gray-400"
                  >
                    <span className="text-emerald-500 mr-2">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            {/* Unavailable Features */}
            <div>
              <ul className="pl-5 space-y-2 text-sm">
                {unavailableFeatures.map(([feature]) => (
                  <li
                    key={feature}
                    className="text-gray-500 dark:text-gray-400"
                  >
                    <span className="text-red-500 mr-2">✘</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-center justify-end gap-4">
          <div className="flex space-x-2">
            <Button size="sm" onClick={() =>
              router.push(
                `/demoBillings/pricing/payment?amount=${currentPlan.price}`
              )}>Renew Subscription</Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() =>
                toast({
                  title: "Subscription Cancelled",
                  description: "You have cancelled your current subscription",
                  variant: "ourDestructive",
                })
              }
            >
              Cancel Subscription
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MyPackage;

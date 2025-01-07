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
  const router = useRouter();
  const currentPlan = {
    title: "Standard",
    price: "2850",
    features: {
      "Organization Login": true,
      "Organization Registration with mail": true,
      "Dynamic Dashboard with Report": true,
      "Meeting link create & Share": true,
      "Calendar / Event / Schedule": true,
      "CV parsing and scoring": true,
      "Customizable Pipeline": true,
      "API Integration": false,
      "Parameter wise Dynamic CV Scoring": false,
    },
    description:
      "This package suits perfect for growing organizations needing advanced tools. It offers useful features very handy for rapid growth of your organization.",
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
    <div className="mx-auto max-w-5xl flex flex-col items-center bg-white dark:bg-gray-800">
      <Card className="grid grid-cols-1 sm:grid-cols-3 gap-2 shadow-none border-none">
        {/* Left Section */}
        <div className="col-span-1 flex flex-col justify-center space-y-2 p-4">
          <p className="text-emerald-500 text-sm font-semibold capitalize">
            Current Package
          </p>
          <CardTitle className="text-base sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 leading-tight">
            {currentPlan.title} Package
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 text-xs">
            {currentPlan.description}
          </CardDescription>
          <div className="flex flex-col justify-start space-y-2">
            <Button
              variant="default"
              size="sm"
              className="hover:scale-105 transition-all duration-300"
              onClick={handleNavigateToPackages}
            >
              View All Packages {" > "}
            </Button>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-2 flex flex-col space-y-2 p-4 gap-2">
          <h2 className="capitalize text-center text-gray-700 font-semibold underline underline-offset-2 dark:text-gray-300">
            Features you have
          </h2>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Organization Login and Registration",
                description:
                  "You'll get a robust login and registration system for your organization.",
                icon: "🔐",
              },
              {
                title: "Dynamic Dashboard with Report",
                description:
                  "You'll have the privilege to access a dynamic dashboard along with the report.",
                icon: "📊",
              },
              {
                title: "Easy Meeting",
                description:
                  "You will find everything to create meeting links and share them as needed.",
                icon: "🤝",
              },
              {
                title: "Calendar / Event / Schedule",
                description:
                  "You can easily manage events and schedules with the integrated calendar.",
                icon: "📆",
              },
              {
                title: "CV parsing and scoring",
                description:
                  "You can parse and score CVs with ease using the built-in services.",
                icon: "📄",
              },
              {
                title: "Customizable Pipeline",
                description:
                  "Current package offers a customizable hiring pipeline according to company needs.",
                icon: "🔧",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-start space-y-1 p-3 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-2">
                  <div className="text-lg">{feature.icon}</div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <div className="flex items-center justify-end space-x-1 w-full p-2">
        <Button
          size="sm"
          onClick={() =>
            router.push(
              `/demoBillings/pricing/payment?amount=${currentPlan.price}`
            )
          }
        >
          Renew Subscription
        </Button>
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
    </div>
  );
};

export default MyPackage;

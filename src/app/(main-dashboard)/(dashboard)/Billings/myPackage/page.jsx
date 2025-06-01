"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { plansData } from "../components/subscriptionData";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const MyPackage = () => {
  const { toast } = useToast();
  const router = useRouter();

  // Determining the best plan's features by sorting by price
  const determineBestPlan = (plans) => {
    plans.sort((a, b) => b.price - a.price);

    return plans[0].features;
  };

  const [activePlans, setActivePlans] = useState(plansData.docs[0].plans);
  const multiplePlans = plansData.docs[0].plans;
  const bestPlanFeatures = determineBestPlan(multiplePlans);

  const handleNavigateToPackages = () => {
    router.push("/Billings/pricing");
  };

  const handleRenewPlan = (plan) => {
    router.push(`/Billings/pricing/payment?amount=${plan.price}`);
  };

  const handleCancelPlan = (plan) => {
    toast({
      title: `${plan.title} Subscription Cancelled`,
      description: `You have cancelled your ${plan.title} subscription`,
      variant: "ourDestructive",
    });

    setActivePlans((prevPlans) => prevPlans.filter((p) => p.id !== plan.id));
  };

  return (
    <div className="max-w-6xl flex flex-col items-center bg-white dark:bg-gray-800">
      <Card className="grid grid-cols-1 sm:grid-cols-3 gap-2 shadow-none border-none">
        {/* Left Section */}
        <div className="col-span-1 flex flex-col space-y-2 p-4">
          <p className="text-emerald-600 text-base font-semibold capitalize">
            Current Packages
          </p>
          <ol className="list-decimal ml-4 space-y-2">
            {activePlans.map((plan) => (
              <li key={plan.id}>
                <CardTitle className="text-base sm:text-xl font-semibold text-gray-800 dark:text-gray-100 leading-tight">
                  {plan.title} Package
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 text-xs">
                  {plan.description}
                </CardDescription>
              </li>
            ))}
          </ol>

          <div className="flex flex-col justify-start space-y-2">
            <Button
              variant="default"
              size="sm"
              className="mt-2 hover:scale-105 transition-all duration-300"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bestPlanFeatures.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-start space-y-1 px-3 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm"
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
        {/* Renew Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm">Renew Subscription</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            {multiplePlans.map((plan) => (
              <DropdownMenuItem
                key={plan.id}
                onClick={() => handleRenewPlan(plan)}
              >
                {plan.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Cancel Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="destructive" size="sm">
              Cancel Subscription
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            {multiplePlans.map((plan) => (
              <DropdownMenuItem
                key={plan.id}
                onClick={() => handleCancelPlan(plan)}
              >
                {plan.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MyPackage;

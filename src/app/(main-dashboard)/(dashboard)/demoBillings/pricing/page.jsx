"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { plans } from "../components/subscriptionData";
import { orgSettings } from "@/app/(main-dashboard)/(dashboard)/demoAppList/components/org-settings";
import { useEffect, useState } from "react";

const enterprisePlan = plans.find((plan) => plan.title === "Enterprise");
const allFeatures = enterprisePlan.features.map((feature) => feature.title);

const PricingCards = () => {
  const router = useRouter();

  const [currentPlan, setCurrentPlan] = useState(null);
  const currentSubscriptionId = orgSettings.docs[0]?.subscriptionId;

  useEffect(() => {
    const current = plans.find((plan) => plan.id === currentSubscriptionId);
    setCurrentPlan(current);
  }, [currentSubscriptionId]);

  if (!currentPlan) return null;

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {plans.map((plan, index) => (
        <div
          key={plan.id}
          className={`relative rounded-lg transition-all duration-200 hover:scale-105 bg-white dark:bg-gray-800 border w-72 shadow-lg ${
            plan.recommended
              ? "border-blue-500 dark:border-blue-600"
              : "border-gray-700 dark:border-gray-500"
          }`}
        >
          {currentPlan.id === plan.id && (
            <div className="absolute top-1 right-1">
              <span className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white py-1 px-2 rounded-full text-[10px] font-bold shadow-sm">
                Current Package
              </span>
            </div>
          )}

          <div
            className={`text-white rounded-t-lg border-b border-gray-200 dark:border-gray-600 ${
              plan.recommended
                ? "bg-blue-500 dark:bg-blue-600"
                : "bg-gray-700 dark:border-gray-800"
            }`}
          >
            <div className="px-6 pt-4 pb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-center mb-2">
                {plan.title}
              </h3>
              <p className="text-center text-base font-semibold mb-4">
                {plan.price} BDT/
                <span className="text-sm">month</span>
              </p>
              <p className="text-xs text-center">{plan.description}</p>
            </div>
          </div>

          <div className="px-6 pb-4 pt-2">
            <ul className="mb-6 text-[13px]">
              {allFeatures.map((feature) => {
                const isFeatureAvailable = plan.features.some(
                  (f) => f.title === feature
                );

                return (
                  <li key={feature} className="flex items-center mb-2">
                    <span
                      className={`mr-2 ${
                        isFeatureAvailable ? "text-emerald-500" : "text-red-500"
                      }`}
                    >
                      {isFeatureAvailable ? "✔" : "✘"}
                    </span>
                    {feature}
                  </li>
                );
              })}
            </ul>
            <Button
              onClick={() =>
                router.push(
                  `/demoBillings/pricing/payment?amount=${plan.price}`
                )
              }
              className={`w-full py-2 text-white rounded-md font-normal text-sm ${
                plan.recommended
                  ? "bg-blue-500 dark:bg-blue-600 hover:bg-blue-500 hover:dark:bg-blue-500"
                  : "bg-gray-700 dark:border-gray-800 hover:bg-gray-800 dark:hover:bg-gray-600"
              }`}
            >
              {plan.recommended
                ? `Choose ${plan.title} (Recommended)`
                : `Choose ${plan.title}`}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingCards;

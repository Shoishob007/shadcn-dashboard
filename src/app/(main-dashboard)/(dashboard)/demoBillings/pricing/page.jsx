"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { plans } from "../components/subscriptionData";

const enterprisePlan = plans.find((plan) => plan.title === "Enterprise");
const allFeatures = enterprisePlan.features.map((feature) => feature.title);


const PricingCards = () => {
  const router = useRouter();

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {plans.map((plan, index) => (
        <div
          key={plan.id}
          className={`rounded-lg p-6 transition-all duration-200 hover:scale-105 bg-white dark:bg-gray-800 border-gray-700 w-72 shadow-lg`}
        >
          <h3 className="text-lg sm:text-xl font-semibold text-center mb-2">
            {plan.title}
          </h3>
          <p className="text-center text-base font-semibold mb-4 pb-2">
            {plan.price} BDT/
            <span className="text-sm text-gray-500">month</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 text-center">
            {plan.description}
          </p>
          <ul className="mb-6 text-sm">
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
              router.push(`/demoBillings/pricing/payment?amount=${plan.price}`)
            }
            className={`w-full py-2 rounded-md font-normal text-sm ${
              plan.recommended
                ? "bg-blue-500 dark:bg-blue-400 hover:bg-blue-600 hover:dark:bg-blue-300"
                : ""
            }`}
          >
            {plan.recommended
              ? `Choose ${plan.title} (Recommended)`
              : `Choose ${plan.title}`}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PricingCards;

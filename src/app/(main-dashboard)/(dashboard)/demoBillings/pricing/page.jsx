"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const plans = [
  {
    title: "Free",
    price: "0",
    features: {
      "Organization Login": true,
      "Organization Registration with mail": true,
      "Dynamic Dashboard with Report": false,
      "Meeting link create & Share": false,
      "Calendar / Event / Schedule": false,
      "API Integration": false,
      "Parameter wise Dynamic CV Scoring": false,
    },
  },
  {
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
    recommended: true,
  },
  {
    title: "Enterprise",
    price: "5900",
    features: {
      "Organization Login": true,
      "Organization Registration with mail": true,
      "Dynamic Dashboard with Report": true,
      "Meeting link create & Share": true,
      "Calendar / Event / Schedule": true,
      "API Integration": true,
      "Parameter wise Dynamic CV Scoring": true,
    },
  },
];

const PricingCards = () => {
    const router = useRouter()
  
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`rounded-lg p-6 hover:shadow-md transition-all duration-200 hover:scale-105 bg-white dark:bg-gray-800 border-gray-700 w-72 shadow-lg`}
        >
          <h3 className="text-lg sm:text-xl font-semibold text-center mb-2">
            {plan.title}
          </h3>
          <p className="text-center text-base font-semibold mb-4 pb-2">
            {plan.price} BDT/<span className="text-sm text-gray-500">month</span>
          </p>
          <ul className="mb-6 text-sm">
            {Object.entries(plan.features).map(([feature, available]) => (
              <li key={feature} className="flex items-center mb-2">
                <span
                  className={`mr-2 ${
                    available ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {available ? "✔" : "✘"}
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <Button
            onClick={() =>
              router.push(
                `/demoBillings/pricing/payment?amount=${plan.price}`
              )
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

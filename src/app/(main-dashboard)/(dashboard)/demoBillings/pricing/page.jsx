import { Button } from "@/components/ui/button";

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
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`border rounded-lg p-6 hover:shadow-md transition-all duration-200 hover:scale-105 bg-white dark:bg-gray-800 ${
            plan.recommended
              ? "hover:border-blue-500"
              : "border-gray-200 hover:border-gray-500"
          } w-72`}
        >
          {plan.recommended && (
            <div className="bg-blue-500 dark:bg-blue-400 text-white text-center py-1 rounded-lg text-sm">
              Recommended
            </div>
          )}
          <h3 className="text-lg sm:text-xl font-semibold text-center mb-4">
            {plan.title}
          </h3>
          <p className="text-center text-base font-semibold mb-4 border-b-2 pb-2 border-gray-600 border-dashed">
            {plan.price} BDT
          </p>
          <ul className="mb-6 text-sm">
            {Object.entries(plan.features).map(([feature, available]) => (
              <li key={feature} className="flex items-center mb-2">
                <span
                  className={`mr-2 ${
                    available ? "text-green-500" : "text-gray-400"
                  }`}
                >
                  {available ? "✔" : "✘"}
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <Button className="w-full py-2 rounded-md font-normal text-sm">
            Choose {plan.title}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PricingCards;

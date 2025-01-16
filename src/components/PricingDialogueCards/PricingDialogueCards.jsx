"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { plans } from "@/app/(main-dashboard)/(dashboard)/demoBillings/components/subscriptionData";
import { orgSettings } from "@/app/(main-dashboard)/(dashboard)/demoAppList/components/org-settings";

const PricingDialogueCards = () => {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);
  const currentSubscriptionId = orgSettings.docs[0]?.subscriptionId;

  useEffect(() => {
    const current = plans.find((p) => p.id === currentSubscriptionId);
    setCurrentPlan(current);
    setSelectedPlan(current);
  }, [currentSubscriptionId]);

  if (!currentPlan || !selectedPlan) return null;

  const getAvailableFeatures = (plan) => {
    const planIndex = plans.findIndex((p) => p.id === plan.id);
    return plans
      .slice(0, planIndex + 1)
      .flatMap((p) => p.features)
      .map((feature) => feature.title)
      .filter((value, index, self) => self.indexOf(value) === index);
  };

  const availableFeatures = getAvailableFeatures(selectedPlan);
  const isUpgrade = selectedPlan.id > currentPlan.id;
  const isDowngrade = selectedPlan.id < currentPlan.id;

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Upgrade to access</h2>

      <div className="h-[220px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPlan.id}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            className="grid grid-cols-2 gap-4"
          >
            {availableFeatures.map((feature) => (
              <motion.div
                key={feature}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex items-center space-x-2"
              >
                <Check className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {plans.map((plan) => {
          const isCurrentPlan = currentPlan.id === plan.id;
          const isSelected = selectedPlan.id === plan.id;
          const isPlanUpgrade = plan.id > currentPlan.id;

          return (
            <motion.div
              key={plan.id}
              onClick={() => setSelectedPlan(plan)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-4 rounded-lg border-2 transition-all cursor-pointer ${
                isSelected
                  ? "border-primary bg-primary/5 dark:border-gray-500"
                  : "border-border hover:border-primary/50 dark:border-gray-500"
              }`}
            >
              {isCurrentPlan && (
                <div className="absolute dark:bg-gray-800 -top-3 left-1/2 -translate-x-1/2 bg-secondary px-2 py-0.5 rounded text-xs">
                  Current Plan
                </div>
              )}
              <div className="text-sm font-medium mb-2">{plan.title}</div>
              <div className="flex items-baseline mb-4">
                <span className="text-sm font-bold">BDT</span>
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground ml-1">
                  /per month
                </span>
              </div>
              <Button
                className={`w-full ${
                  isCurrentPlan
                    ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    : "bg-primary text-primary-foreground"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isCurrentPlan) {
                    router.push(
                      `/demoBillings/pricing/payment?amount=${plan.price}`
                    );
                  }
                }}
                disabled={isCurrentPlan}
              >
                {isCurrentPlan
                  ? "Current Plan"
                  : isPlanUpgrade
                  ? "Upgrade"
                  : "Downgrade"}
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* Warning/Info Message */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedPlan.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-sm text-muted-foreground mb-6"
        >
          {isUpgrade
            ? `Upgrade to ${selectedPlan.title} to access additional features and capabilities.`
            : isDowngrade
            ? `Are you sure you want to downgrade? This will remove any ${
                currentPlan.title
              } plan privileges. 
            Your account will switch to the ${
              selectedPlan.title
            } plan on ${new Date().toLocaleDateString()}.`
            : `You are currently on the ${currentPlan.title} plan.`}
        </motion.div>
      </AnimatePresence>

      {/* Compare Plans Link */}
      <div className="flex justify-between items-center">
        <Button
          variant="link"
          className="text-sm text-primary hover:underline p-0"
        >
          Compare plans and pricing options →
        </Button>
      </div>
    </div>
  );
};

export default PricingDialogueCards;

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";
import PricingDialogueCards from "@/components/PricingDialogueCards/PricingDialogueCards";

const PricingDialogue = ({ onClose }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black/20" />
      <DialogContent
        className="fixed max-w-4xl w-full max-h-[90vh] overflow-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 sm:p-8"
      >
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Upgrade Your Subscription Plan
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-sm mb-2 sm:px-10 md:px-20">
            You&apos;ve reached the limit of your current plan. Choose a plan that best fits 
            your organization’s needs and unlock exclusive features to enhance your experience.
          </p>
        </div>
        
        <div className="">
          <PricingDialogueCards />
        </div>

        <div className="mt-2 text-center">
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            Still not sure? Contact our team for a customized plan tailored to your organization&apos;s needs.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingDialogue;

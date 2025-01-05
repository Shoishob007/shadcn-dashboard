"use client";

import { useState } from "react";
import { ApplicationStepper } from "./components/ApplicationStepper";
import { Button } from "@/components/ui/button";
// import { ApplicationStep } from "@/components/application/types";
import { motion } from "framer-motion";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: 1,
      label: "Application Submitted",
      description: "Your application has been received and is being reviewed by our team.",
      icon: "Send",
      status: currentStep > 1 ? "completed" : currentStep === 1 ? "current" : "upcoming",
    },
    {
      id: 2,
      label: "Resume Shortlisted",
      description: "Congratulations! Your profile matches our requirements.",
      icon: "FileCheck",
      status: currentStep > 2 ? "completed" : currentStep === 2 ? "current" : "upcoming",
    },
    {
      id: 3,
      label: "Technical Assessment",
      description: "Complete the coding challenge to showcase your skills.",
      icon: "Code",
      status: currentStep > 3 ? "completed" : currentStep === 3 ? "current" : "upcoming",
    },
    {
      id: 4,
      label: "Interview Round",
      description: "Meet with our team to discuss your experience and expertise.",
      icon: "Users",
      status: currentStep > 4 ? "completed" : currentStep === 4 ? "current" : "upcoming",
    },
    {
      id: 5,
      label: "Final Decision",
      description: "Review of your complete application and final outcome.",
      icon: "CheckCircle",
      status: currentStep === 5 ? "current" : "upcoming",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
        >
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Application Status
              </h1>
              <p className="text-muted-foreground mt-2">
                Track your application progress in real-time
              </p>
            </div>
            
            <ApplicationStepper steps={steps} currentStep={currentStep} />
            
            <div className="flex justify-between pt-4 border-t dark:border-gray-700">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous Step
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentStep === steps.length}
              >
                Next Step
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
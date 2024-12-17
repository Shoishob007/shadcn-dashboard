"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ChevronLeft, CreditCard, ShieldCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { formatCardNumber, formatExpiryDate } from "./components/helper";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "0 BDT";

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = () => {
    toast({
        title: "Success!",
        description: "You have paid for the package successfully.",
        variant: "ourSuccess",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center dark:bg-gray-900 p-6 rounded-md">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">Payment Gateway</h2>
        </div>

        <div className="mb-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">Amount to Pay:</p>
          <p className="text-base md:text-lg font-semibold text-gray-800">{amount}</p>
        </div>

        {/* Payment Form */}
        <div className="space-y-4">
          <div>
            <label className="text-gray-700 text-sm dark:text-gray-300 font-medium">Card Number</label>
            <div className="relative mt-1">
              <Input
                type="text"
                placeholder="XXXX XXXX XXXX XXXX"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
                className="dark:border dark:border-gray-400"
              />
              <CreditCard className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Expiry Date */}
          <div>
            <label className="text-gray-700 text-sm dark:text-gray-300 font-medium">Expiry Date</label>
            <Input
              type="text"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
              maxLength={5}
              className="dark:border dark:border-gray-400 mt-1"
            />
          </div>

          {/* CVV */}
          <div>
            <label className="text-gray-700 text-sm dark:text-gray-300 font-medium">CVV</label>
            <Input
              type="password"
              placeholder="***"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength={3}
              className="dark:border dark:border-gray-400 mt-1"
            />
          </div>
        </div>

        {/* Security & Payment Button */}
        <div className="mt-6">
          {/* <p className="flex items-center text-gray-500 text-sm mb-4">
            <ShieldCheck className="w-5 h-5 mr-2 text-green-500" />
            Secure Payment
          </p> */}
          <Button
            className="w-full font-semibold"
            onClick={handlePayment}
          >
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
}

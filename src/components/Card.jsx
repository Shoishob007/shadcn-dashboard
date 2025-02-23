"use client";

import React from "react";
import { cn } from "@/lib/utils";
import CountUp from "react-countup";

export default function Card({ label, icon: Icon, amount, discription, header }) {
  return (
    <CardContent className="bg-white dark:bg-gray-800 hover:shadow-sm hover:scale-105 transition-all duration-300 dark:hover:shadow-sm">
      <section className="flex justify-between gap-2">
        <p className="text-sm dark:text-gray-200">{label}</p>
        <Icon className="h-6 w-6 text-gray-400" />
      </section>
      <section className="flex flex-col gap-2">
        <h2 className="text-sm flex items-center justify-between text-gray-700">
          {/* <span>{header}</span> */}
          <span className="text-2xl font-semibold dark:text-gray-200">
            <CountUp start={0} end={amount} duration={2} delay={1} />
          </span>
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-200">
          {discription}
        </p>
      </section>
    </CardContent>
  );
}

export function CardContent(props) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full flex-col rounded-xl border p-5 shadow",
        props.className
      )}
    />
  );
}

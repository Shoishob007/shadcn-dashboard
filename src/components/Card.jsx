"use client";

import React from "react";
import { cn } from "@/lib/utils";

export default function Card({ label, icon: Icon, amount, discription }) {
  return (
    <CardContent className="bg-white dark:bg-gray-800 hover:shadow-sm hover:scale-105 transition-all duration-300 dark:hover:shadow-sm">
      <section className="flex justify-between gap-2">
        <p className="text-sm dark:text-gray-200">{label}</p>
        <Icon className="h-6 w-6 text-gray-300" />
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold dark:text-gray-200">{amount}</h2>
        {/* <p className="text-xs text-gray-500 dark:text-gray-200">
          {discription}
        </p> */}
      </section>
    </CardContent>
  );
}

export function CardContent(props) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full flex-col gap-3 rounded-xl border p-5 shadow",
        props.className
      )}
    />
  );
}

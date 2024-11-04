"use client";

import React from "react";
import { cn } from "@/lib/utils";

export default function Card({ label, icon: Icon, amount, discription }) {
  return (
    <CardContent className="bg-white dark:bg-gray-700 hover:border-gray-950 dark:hover:border-gray-200">
      <section className="flex justify-between gap-2">
        <p className="text-sm dark:text-gray-200">{label}</p>
        <Icon className="h-4 w-4 text-gray-400" />
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold dark:text-gray-200">{amount}</h2>
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
        "flex w-full flex-col gap-3 rounded-xl border p-5 shadow",
        props.className
      )}
    />
  );
}

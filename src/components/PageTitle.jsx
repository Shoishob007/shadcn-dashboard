"use client";
import { cn } from "@/lib/utils";
import React from "react";

export default function PageTitle({ title, className }) {
  return (
    <h1
      className={cn(
        "sm:text-base text-sm font-medium dark:text-gray-200",
        className
      )}
    >
      {title}
    </h1>
  );
}

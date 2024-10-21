"use client";
import { cn } from "@/lib/utils";
import React from "react";

export default function PageTitle({ title, className }) {
  return <h1 className={cn("text-xl font-semibold", className)}>{title}</h1>;
}

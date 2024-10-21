"use client";

import React from "react";
import { cn } from "@/lib/utils";

export default function Card({ label, icon: Icon, amount, discription, href }) {
  return (
    <CardContent className="bg-white">
      <section className="flex justify-between gap-2">
        <p className="text-sm">{label}</p>
        <Icon className="h-4 w-4 text-gray-400" />
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">{amount}</h2>
        <p className="text-xs text-gray-500">{discription}</p>
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

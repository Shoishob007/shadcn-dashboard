/** @format */
"use client";

import "./globals.css";
import { cn } from "../lib/utils";
import SideNavbar from "@/components/SideNavbar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import VerticalNavbar from "@/components/VerticalNavbar";

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen w-full bg-white text-black flex")}>
        <SessionProvider session={session}>
          <SideNavbar />
          <div className="flex flex-col w-full">
            <VerticalNavbar className="p-4" />
            <div className="p-8 w-full">{children}</div>
          </div>

          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}

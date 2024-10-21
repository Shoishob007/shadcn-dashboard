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
      <body className={cn("min-h-screen w-full bg-gray-100 text-black flex")}>
        <SessionProvider session={session}>
          <SideNavbar />
          <div className="flex flex-col w-full min-h-screen">
            <VerticalNavbar className="p-4" />
            <div className="flex-grow p-8 rounded-lg ml-2 mr-4">{children}</div>
          </div>

          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}

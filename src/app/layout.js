/** @format */
"use client";

import { role } from "@/components/RoleManagement";
import SideNavbar from "@/components/SideNavbar";
import { Toaster } from "@/components/ui/toaster";
import VerticalNavbar from "@/components/VerticalNavbar";
import { SessionProvider } from "next-auth/react";
import { cn } from "../lib/utils";
import "./globals.css";


export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen w-full bg-gray-100 text-black flex")}>
        {role === 'applicant' ? (
          <SessionProvider session={session}>
            {/* SideNavbar */}
            <SideNavbar />

            {/* Vertical Navbar */}
            <div className="flex flex-col w-full min-h-screen">
              <VerticalNavbar />

              {/* content area */}
              <div className="flex-grow p-2 rounded-lg ml-2 mr-4">{children}</div>
            </div>
            <Toaster />
          </SessionProvider>
        ) : (
          <SessionProvider session={session}>
            <SideNavbar />
            <div className="flex flex-col w-full min-h-screen">
              <VerticalNavbar className="p-4" />
              <div className="flex-grow p-2 rounded-lg">{children}</div>
            </div>
            <Toaster />
          </SessionProvider>
        )}

      </body>
    </html>
  );
}

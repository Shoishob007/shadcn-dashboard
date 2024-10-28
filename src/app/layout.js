/** @format */
"use client";
 
import { role } from "@/components/RoleManagement";
import SideNavbar from "@/components/SideNavbar";
import { Toaster } from "@/components/ui/toaster";
import VerticalNavbar from "@/components/VerticalNavbar";
import { SessionProvider } from "next-auth/react";
import { cn } from "../lib/utils";
import { usePathname } from "next/navigation";
import "./globals.css";
 
 
export default function RootLayout({ children, session }) {
  const pathName = usePathname();
  const isAuthPage = ["/login", "/register", "/verify", "/reset-password", "/forgot-password"].some((route) =>
    pathName.includes(route)
  ); return (
    <html lang="en">
      <body className={cn("min-h-screen w-full bg-gray-100 text-black")}>
        <SessionProvider session={session}>
          {isAuthPage ? (
            <div className="flex h-screen overflow-hidden">
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4">
                  {children}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-screen overflow-hidden">
              {/* Fixed SideNavbar */}
              <div className="flex-shrink-0">
                <SideNavbar />
              </div>
 
              {/* Scrollable content area */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <VerticalNavbar />
                <div className="flex-1 overflow-y-auto p-4">
                  {children}
                </div>
              </div>
            </div>
          )}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
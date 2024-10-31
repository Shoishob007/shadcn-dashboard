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
import { useEffect } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import useLayoutStore from "@/stores/useLayoutStore";

export default function RootLayout({ children, session }) {
  const pathName = usePathname();
  const isAuthPage = ["/login", "/register", "/verify", "/reset-password", "/forgot-password"].some((route) =>
    pathName.includes(route)
  );

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  const { isCollapsed, isManuallyExpanded, setCollapsed, resetState } = useLayoutStore()

  useEffect(() => {
    if (mobileWidth) {
      if (!isManuallyExpanded) {
        setCollapsed(true);
      }
    } else {
      resetState();
    }
  }, [mobileWidth, isManuallyExpanded, setCollapsed, resetState]);

  return (
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
            <div className="flex h-screen">

              <div className="flex-shrink-0 overflow-hidden">
                <SideNavbar />
              </div>
              <div className="flex flex-col flex-1">
                <div className="sticky top-0">
                  <VerticalNavbar />
                </div>
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
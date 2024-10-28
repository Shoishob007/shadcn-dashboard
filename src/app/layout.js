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
import { useEffect, useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";

export default function RootLayout({ children, session }) {
  const pathName = usePathname();
  const isAuthPage = ["/login", "/register", "/verify", "/reset-password", "/forgot-password"].some((route) =>
    pathName.includes(route)
  );

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);

  useEffect(() => {
    if (mobileWidth && !isManuallyExpanded) {
      setIsCollapsed(true);
    } else if (!mobileWidth) {
      setIsCollapsed(false);
      setIsManuallyExpanded(false);
    }
  }, [mobileWidth, isManuallyExpanded]);

  const toggleSidebar = () => {
    if (isCollapsed) {
      setIsManuallyExpanded(true);
    } else {
      setIsManuallyExpanded(false);
    }
    setIsCollapsed(!isCollapsed);
  };

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
            <div className="flex h-screen overflow-hidden">

              <div className="flex-shrink-0">
                <SideNavbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
              </div>
              <div className="flex flex-col flex-1 overflow-hidden">

                <div className="sticky top-0">
                  <VerticalNavbar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} setIsCollapsed={setIsCollapsed} />
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
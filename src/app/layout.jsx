/** @format */
"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import useLayoutStore from "@/stores/useLayoutStore";
import { useWindowWidth } from "@react-hook/window-size";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import dynamic from 'next/dynamic';
import { cn } from "../lib/utils";
import "./globals.css";

const SideNavbar = dynamic(() => import('@/components/SideNavbar'), {
  ssr: false,
});
const VerticalNavbar = dynamic(() => import('@/components/VerticalNavbar'), {
  ssr: false,
});

export default function RootLayout({ children, session }) {
  const pathName = usePathname();
  const isAuthPage = [
    "/login",
    "/register",
    "/verify",
    "/reset-password",
    "/forgot-password",
  ].some((route) => pathName.includes(route));

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  const { isManuallyExpanded, setCollapsed, resetState } = useLayoutStore();

  useEffect(() => {
    if (mobileWidth) {
      if (!isManuallyExpanded) {
        setCollapsed(true);
      }
    } else {
      resetState();
    }
  }, [mobileWidth, isManuallyExpanded, setCollapsed, resetState]);

  const pathname = usePathname();
  const noSidebarVarticalbar = pathname.includes("/job-details") || pathname.includes("/jobs");
  // const noSidebarVarticalbarWithJObsPage = pathname.includes("/jobs");
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-black dark:text-gray-200"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            {isAuthPage ? (
              <div className="flex h-screen overflow-hidden">
                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="flex-1 overflow-y-auto p-4">{children}</div>
                </div>
              </div>
            ) : (
              <div className="flex h-screen">
                {noSidebarVarticalbar || (
                  <div className="flex-shrink-0 overflow-hidden">
                    <SideNavbar />
                  </div>
                )}

                <div className="flex flex-col flex-1">
                  {noSidebarVarticalbar || (
                    <div className="sticky top-0">
                      <VerticalNavbar />
                    </div>
                  )}
                  <div className="flex-1 overflow-y-auto p-4">{children}</div>
                </div>
              </div>
            )}
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

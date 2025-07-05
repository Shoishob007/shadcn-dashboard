/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../lib/utils";
import { Nav } from "./ui/nav";
import useLayoutStore from "@/stores/useLayoutStore";
import useRoleStore from "@/stores/roleStore/useRoleStore";
import { SidebarLinks } from "./SidebarLinks";
import { LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import StaticSidebar from "./StaticSidebar";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SideNavbar() {
  const { isCollapsed } = useLayoutStore();
  const { currentRole } = useRoleStore();
  const { applicantLinks, organizationLinks } = SidebarLinks();
  const router = useRouter();
  const { data: session } = useSession();
  const accessToken = session?.access_token;
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const filteredLinks =
    currentRole === "applicant"
      ? applicantLinks.filter((link) => link.label !== "Get Started")
      : organizationLinks.filter((link) => link.label !== "Get Started");

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Call your logout API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Call NextAuth signOut
      await signOut({ redirect: false });

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div
      className={cn(
        "h-[calc(100vh-1rem)] sticky border-r bg-white dark:bg-gray-800 my-2 ml-4 shadow-lg rounded-lg transition-all duration-300 ease-in-out flex flex-col py-6",
        isCollapsed ? "w-16" : "w-[200px]"
      )}
    >
      {/* Top section with logo */}
      <StaticSidebar />

      {/* Sidebar links */}
      <div className="flex-grow overflow-y-auto mb-4">
        <Nav isCollapsed={isCollapsed} links={filteredLinks} />
      </div>

      {/* Logout button */}
      <div className="flex justify-center mt-auto mx-4 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900 rounded-md duration-200">
        {isCollapsed ? (
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full cursor-pointer flex items-center justify-center rounded-md p-2 disabled:opacity-50"
                >
                  {isLoggingOut ? (
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></span>
                  ) : (
                    <>
                      <span className="sr-only">Logout</span>
                      <LogOut width={16} height={16} className="rotate-180" />
                    </>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex gap-4 cursor-pointer items-center text-xs font-medium dark:text-gray-200 p-2 disabled:opacity-50"
          >
            {isLoggingOut ? (
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></span>
            ) : (
              <>
                <span className="font-medium rotate-180">
                  <LogOut width={16} height={16} />
                </span>
                <span>Logout</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

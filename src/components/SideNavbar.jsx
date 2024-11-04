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
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SideNavbar() {
  const { status, data: session } = useSession();
  const { isCollapsed } = useLayoutStore();
  const { currentRole } = useRoleStore(); // Access the current role from Zustand store
  const { applicantLinks, organizationLinks } = SidebarLinks();

  if (status === "loading") {
    return (
      <div className="flex flex-col-reverse items-center justify-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Determine which links to display based on the current role
  const filteredLinks =
    currentRole === "applicant"
      ? applicantLinks.filter((link) => link.label !== "Get Started")
      : organizationLinks.filter((link) => link.label !== "Get Started");

  return (
    <div
      className={cn(
        "h-[calc(100vh-1rem)] sticky border-r bg-white dark:bg-gray-700 my-2 ml-4 shadow-md rounded-lg transition-all duration-300 ease-in-out flex flex-col py-6",
        isCollapsed ? "w-16" : "w-[220px]"
      )}
    >
      {/* Top section with logo */}
      <div className="items-center text-center sm:mx-auto mb-4">
        <Link href={"/"}>
          <Image
            src="/assests/hh-logo-png.png"
            alt="Logo"
            width={120}
            height={120}
            className={`rounded-lg items-center text-center inline ${
              isCollapsed ? "p-2" : "p-0"
            }`}
          />
        </Link>
      </div>

      {/* Sidebar links */}
      <div className="flex-grow overflow-y-auto mb-4">
        <Nav isCollapsed={isCollapsed} links={filteredLinks} />
      </div>

      {/* Logout button */}
      <div className="flex justify-center mt-auto mx-4 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900 rounded-md duration-200">
        {isCollapsed ? (
          <span
            onClick={signOut}
            className="w-full cursor-pointer flex items-center justify-center rounded-md"
          >
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <span className="sr-only">Logout</span>
                  <LogOut width={16} height={16} />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* <span className="sr-only">Logout</span>
            <LogOut width={16} height={16} /> */}
          </span>
        ) : (
          <button
            onClick={signOut}
            className="w-full flex justify-center gap-4 cursor-pointer items-center text-xs font-medium dark:text-gray-200 p-2"
          >
            <span className="font-medium">
              <LogOut width={16} height={16} />
            </span>
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );
}
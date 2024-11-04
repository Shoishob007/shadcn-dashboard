"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../lib/utils";
import { role } from "./RoleManagement";
import { Nav } from "./ui/nav";
import useLayoutStore from "@/stores/useLayoutStore";
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
  const { applicantLinks, organizationLinks } = SidebarLinks();

  if (status === "loading") {
    return (
      <div className="flex flex-col-reverse items-center justify-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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

      <div className="flex-grow overflow-y-auto mb-4">
        <Nav
          isCollapsed={isCollapsed}
          links={
            role === "applicant"
              ? applicantLinks.filter((link) => link.label !== "Get Started")
              : organizationLinks.filter((link) => link.label !== "Get Started")
              ? applicantLinks.filter((link) => link.label !== "Get Started")
              : organizationLinks.filter((link) => link.label !== "Get Started")
          }
        />
      </div>
      <TooltipProvider>
        <div className="flex justify-center mt-auto px-4 hover:scale-105 duration-200 dark:text-white">
          {isCollapsed ? (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <span
                  onClick={signOut}
                  className="w-full cursor-pointer flex items-center justify-center dark:hover:bg-muted p-2 rounded-md"
                >
                  <span className="sr-only dark:text-gray-200">Logout</span>
                  <LogOut width={16} height={16} />
                </span>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="tooltip-content flex items-center gap-4"
              >
                <span className="ml-auto text-muted-foreground">Logout</span>
              </TooltipContent>
            </Tooltip>
          ) : (
            <button
              onClick={signOut}
              className="w-full flex gap-4 cursor-pointer items-center text-xs font-medium ml-4 "
            >
              <span className="font-medium">
                <LogOut width={12} height={12} />
              </span>
              <span>Logout</span>
            </button>
          )}
        </div>
      </TooltipProvider>
    </div>
  );
}

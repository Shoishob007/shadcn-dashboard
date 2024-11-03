"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../lib/utils";
import { role } from "./RoleManagement";
import { Nav } from "./ui/nav";
import useLayoutStore from "@/stores/useLayoutStore";
import { SidebarLinks } from "./SidebarLinks";

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
    <>
      <div
        className={cn(
          "h-[calc(100vh-1rem)] sticky border-r pb-10 pt-6 bg-white dark:bg-gray-700 my-2 ml-4 shadow-md rounded-lg transition-all duration-300 ease-in-out overflow-y-auto",
          isCollapsed ? "w-16" : "w-[220px]"
        )}
      >
        <div className="items-center text-center sm:mx-auto">
          <Link href={"/"}>
            <Image
              src="/assests/hh-logo.png"
              alt="Logo"
              width={120}
              height={120}
              className={`rounded-lg items-center text-center inline ${
                isCollapsed ? "p-2" : "p-0"
              }`}
            />
          </Link>
        </div>
        <Nav
          isCollapsed={isCollapsed}
          links={role === "applicant" ? applicantLinks : organizationLinks}
        />
      </div>
    </>
  );
}

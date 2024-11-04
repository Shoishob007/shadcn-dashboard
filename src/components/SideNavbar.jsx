"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../lib/utils";
import { role } from "./RoleManagement";
import { Nav } from "./ui/nav";
import useLayoutStore from "@/stores/useLayoutStore";
import { SidebarLinks } from "./SidebarLinks";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "./ui/button";

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
          }
        />
      </div>

      <div className="flex justify-center mt-auto px-4">
        {isCollapsed ? (
          <Button onClick={session ? signOut : signIn} className="w-full">
            <span className="sr-only">{session ? "Logout" : "Login"}</span>
            {/* You can use an icon here for login/logout */}
            {session ? (
              <LogOut width={20} height={20} />
            ) : (
              <LogIn width={20} height={20} />
            )}
          </Button>
        ) : (
          <Button onClick={session ? signOut : signIn} className="w-full">
            {session ? "Logout" : "Login"}
          </Button>
        )}
      </div>
    </div>
  );
}

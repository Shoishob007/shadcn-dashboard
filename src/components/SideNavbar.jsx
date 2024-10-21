/** @format */
"use client";

import { useWindowWidth } from "@react-hook/window-size";
import {
  CalendarDays,
  ChevronRight,
  KeyRound,
  LayoutDashboard,
  Newspaper,
  Settings,
  UsersRound
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import { Nav } from "./ui/nav";

export default function SideNavbar() {
  const { toast } = useToast();
  const { status, data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 850;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);
  }, [session, status]);

  // By adding a loading state and ensuring session data is consistent, I can mitigate the risk of hydration issues.

  if (status === "loading") {
    return <div>Loading...</div>; 
  }

  return (
    <div className="relative min-w-[80px] border-r px-4 pb-10 pt-6">
      <div className="items-center text-center mx-auto">
        <Image
          src="/assests/hh-logo.png"
          alt="Google Logo"
          width={100}
          height={100}
          className="mr-2 rounded-full items-center text-center inline"
        />
      </div>
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-16">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Applicants",
            href: "/applicants",
            icon: UsersRound,
            variant: "ghost",
            submenu: [
              {
                title: "View Applicants",
                href: "/applicants/view-all",
                icon: UsersRound,
              },
              {
                title: "Shortlisted Applicants",
                href: "/applicants/shortlisted",
                icon: UsersRound,
              },
            ],
          },
          // {
          //   title: "Organizations",
          //   href: "/organizations",
          //   icon: BriefcaseBusiness,
          //   variant: "ghost",
          // },
          {
            title: "Jobs",
            href: "#",
            icon: Newspaper,
            variant: "ghost",
            submenu: [
              {
                title: "View All Jobs",
                href: "/jobs",
                icon: Newspaper,
              },
              {
                title: "Create Job",
                href: "/jobs/create",
                icon: Newspaper,
              },
            ],
          },
          {
            title: "Interviews",
            href: "/interviews",
            icon: CalendarDays,
            variant: "ghost",
            submenu: [
              {
                title: "Schedule Interview",
                href: "/interviews/schedule",
                icon: CalendarDays,
              },
              {
                title: "Upcoming Interviews",
                href: "/interviews/upcoming",
                icon: CalendarDays,
              },
            ],
          },
          {
            title: "Profile",
            href: "#",
            icon: Settings,
            variant: "ghost",
            submenu: [
              {
                title: "Profile Settings",
                href: "/profile-settings",
                icon: Settings,
              },
            ],
          },
          // Auth
          status === "authenticated"
            ? {
                title: "Logout",
                href: "#",
                icon: KeyRound,
                variant: "ghost",
                onClick: () => {
                  signOut({ redirect: false });
                  toast({
                    title: "Signed Out!",
                    description: "You have signed out successfully.",
                    variant: "success",
                  });
                },
                isActive: false,
              }
            : {
                title: "Get Started",
                href: "#",
                icon: KeyRound,
                variant: "ghost",
                submenu: [
                  {
                    title: "Login",
                    href: "/login",
                    icon: KeyRound,
                    isActive: pathname === "/login",
                  },
                  {
                    title: "Register",
                    href: "/register",
                    icon: KeyRound,
                    isActive: pathname === "/register",
                  },
                ],
              },
        ]}
      />
    </div>
  );
}

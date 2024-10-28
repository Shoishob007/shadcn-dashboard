/** @format */
"use client";
import { useWindowWidth } from "@react-hook/window-size";
import {
  Bell,
  BriefcaseBusiness,
  Calendar,
  CalendarDays,
  ChevronRight,
  KeyRound,
  LayoutDashboard,
  Search,
  Settings,
  TableOfContents,
  UsersRound,
  Circle
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import { cn } from "../lib/utils";
import { role } from "./RoleManagement";
import { Nav } from "./ui/nav";
 
export default function SideNavbar() {
  const { toast } = useToast();
  const { status, data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
 
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;
 
  useEffect(() => {
    setIsCollapsed(mobileWidth);
  }, [mobileWidth]);
 
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      console.log("Sign out clicked");
      toast({
        title: "Signed Out!",
        description: "You have signed out successfully.",
        variant: "success",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };
 
  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }
 
  // useEffect(() => {
  //   console.log("Session status:", status);
  //   console.log("Session data:", session);
  // }, [session, status]);
 
  // By adding a loading state and ensuring session data is consistent, I can mitigate the risk of hydration issues.
 
  if (status === "loading") {
    return (
      <div className="flex flex-col-reverse items-center justify-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
 
  const getAuthLinks = () => {
    if (status === "authenticated") {
      return {
        title: "Logout",
        href: "#",
        icon: KeyRound,
        variant: "ghost",
        onClick: handleSignOut,
      };
    }
    return {
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
    };
  };
  const applicantLinks = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      variant: "default",
      submenu: [
        {
          title: "Applicants overview",
          href: "/overview",
          icon: TableOfContents,
        },
        {
          title: "Upcoming interviews",
          href: "/upcoming-interviews",
          icon: BriefcaseBusiness,
        },
        {
          title: "Recent job postings",
          href: "/job-postings",
          icon: BriefcaseBusiness,
        },
      ],
    },
    {
      title: "Profile management",
      href: "#",
      icon: UsersRound,
      variant: "ghost",
      submenu: [
        {
          title: "Profile",
          href: "/profile/view",
          icon: UsersRound,
        },
      ],
    },
    {
      title: "Job Search",
      href: "#",
      icon: Search,
      variant: "ghost",
      submenu: [
        {
          title: "Search for Jobs",
          href: "/search",
          icon: Search,
        },
      ],
    },
    {
      title: "My Applications",
      href: "/applications",
      icon: CalendarDays,
      variant: "ghost",
      submenu: [
        {
          title: "View Applications",
          href: "/applications/view",
          icon: Search,
        },
      ],
    },
    {
      title: "Interview Schedule",
      href: "/interview-schedule",
      icon: Calendar,
      variant: "ghost",
      submenu: [
        {
          title: "View up interviews",
          href: "/interview-schedule/upcoming",
          icon: Calendar,
        },
      ],
    },
    {
      title: "Notifications",
      href: "/notification",
      icon: Bell,
      variant: "ghost",
      submenu: [
        {
          title: "View Notifications",
          href: "/notification/view",
          icon: Bell,
        },
        {
          title: "Notification settings",
          href: "/notification/settings",
          icon: Settings,
        },
      ],
    },
    getAuthLinks(),
  ];
 
  const organizationLinks = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      variant: "default",
    },
    {
      title: "Applicants",
      href: "#",
      icon: UsersRound,
      variant: "ghost",
      submenu: [
        {
          title: "Applicants Dashboard",
          href: "/applicants",
          icon: UsersRound,
        },
        {
          title: "View All Applicants",
          href: "/applicants/view",
          icon: UsersRound,
        },
        {
          title: "Shortlisted Applicants",
          href: "/applicants/view/shortlisted",
          icon: UsersRound,
        },
      ],
    },
    {
      title: "Jobs",
      href: "#",
      icon: BriefcaseBusiness,
      variant: "ghost",
      submenu: [
        {
          title: "Jobs Dashboard",
          href: "/jobs",
          icon: BriefcaseBusiness,
        },
        {
          title: "View All Jobs",
          href: "/jobs/view",
          icon: BriefcaseBusiness,
        },
        {
          title: "Create Job",
          href: "/jobs/create",
          icon: BriefcaseBusiness,
        },
      ],
    },
    {
      title: "Interviews",
      href: "#",
      icon: CalendarDays,
      variant: "ghost",
      submenu: [
        {
          title: "Interview Dates",
          href: "/interviews",
          icon: CalendarDays,
        },
        {
          title: "Upcoming Interviews",
          href: "/interviews/upcoming",
          icon: CalendarDays,
        },
        {
          title: "Schedule Interview",
          href: "/interviews/schedule",
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
    getAuthLinks(),
  ];
 
  return (
    <>
      <div
        className={cn(
          "h-screen sticky top-0 border-r px-4 pb-10 pt-6 bg-white my-2 mr-2 ml-4 shadow-md rounded-lg transition-all duration-300 ease-in-out overflow-y-auto",
          isCollapsed ? "w-20" : "w-56"
        )}
      >
        <div className="items-center text-center mx-auto">
          <Link href={'/'}>
            <Image
              src="/assests/hh-logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="mr-2 rounded-full items-center text-center inline"
            />
          </Link>
        </div>
        {!mobileWidth && (
          <Button
            onClick={toggleSidebar}
            variant="none"
            className="absolute -right-[-3px] top-16 rounded-full p-1 transition-transform duration-200"
            style={{
              transform: `translateX(${isCollapsed ? "0" : "0"}) rotate(${
                isCollapsed ? "0" : "180deg"
              })`,
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
        <Nav
          isCollapsed={mobileWidth ? true : isCollapsed}
          links={role === "applicant" ? applicantLinks : organizationLinks}
        />
      </div>
    </>
  );
}
 
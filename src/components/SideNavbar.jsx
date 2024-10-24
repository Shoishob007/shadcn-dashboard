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
  UsersRound,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
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
    return <div>Loading...</div>;
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
          title: "Application overview",
          href: "/jobs",
          icon: BriefcaseBusiness,
        },
        {
          title: "Upcoming interviewers",
          href: "/jobs/applied",
          icon: BriefcaseBusiness,
        },
        {
          title: "Recent job postings",
          href: "/jobs/applied",
          icon: BriefcaseBusiness,
        },
      ],
    },
    {
      title: "Profile management",
      href: "/profile-management",
      icon: UsersRound,
      variant: "ghost",
      submenu: [
        {
          title: "View profile",
          href: "/jobs",
          icon: BriefcaseBusiness,
        },
        {
          title: "Edit profile",
          href: "/jobs/applied",
          icon: BriefcaseBusiness,
        },
      ],
    },
    {
      title: "Job Search",
      href: "/job-search",
      icon: BriefcaseBusiness,
      variant: "ghost",
      submenu: [
        {
          title: "Search for Jobs",
          href: "/job-search",
          icon: Search,
        },
      ],
    },
    {
      title: "My Applications",
      href: "/interviews",
      icon: CalendarDays,
      variant: "ghost",
      submenu: [
        {
          title: "View Applications",
          href: "/interviews/upcoming",
          icon: Search,
        },
      ],
    },
    {
      title: "Interview Schedule",
      href: "#",
      icon: Calendar,
      variant: "ghost",
      submenu: [
        {
          title: "View up interviews",
          href: "/interviews/upcoming",
          icon: Calendar,
        },
      ],
    },
    {
      title: "Notifications",
      href: "#",
      icon: Bell,
      variant: "ghost",
      submenu: [
        {
          title: "View Notifications",
          href: "/notifications",
          icon: Bell,
        },
        {
          title: "Notification settings",
          href: "/notifications/settings",
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
    getAuthLinks(),
  ];

  return (
    <>
      <div
        className={cn(
          "relative border-r px-4 pb-10 pt-6 bg-white my-2 mr-2 ml-4 shadow-md rounded-lg transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-56"
        )}
      >
        <div className="items-center text-center mx-auto">
          <Image
            src="/assests/hh-logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="mr-2 rounded-full items-center text-center inline"
          />
        </div>
        {!mobileWidth && (
          <div className="absolute right-[-20px] top-16">
            <Button
              onClick={toggleSidebar}
              variant="secondary"
              className="rounded-full p-2"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        )}
        <Nav
          isCollapsed={mobileWidth ? true : isCollapsed}
          links={role === "applicant" ? applicantLinks : organizationLinks}
        />
      </div>
    </>
  );
}

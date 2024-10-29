"use client";
import { useWindowWidth } from "@react-hook/window-size";
import {
  Bell,
  BriefcaseBusiness,
  Calendar,
  CalendarDays,
  Circle,
  KeyRound,
  LayoutDashboard,
  Search,
  Settings,
  UsersRound,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useToast } from "../hooks/use-toast";
import { cn } from "../lib/utils";
import { role } from "./RoleManagement";
import { Nav } from "./ui/nav";

export default function SideNavbar({ isCollapsed }) {
  const { toast } = useToast();
  const { status, data: session } = useSession();
  const pathname = usePathname();
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

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
          icon: Circle,
          isActive: pathname === "/login",
        },
        {
          title: "Register",
          href: "/register",
          icon: Circle,
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
          icon: Circle,
        },
        {
          title: "Upcoming interviews",
          href: "/upcoming-interviews",
          icon: Circle,
        },
        {
          title: "Recent job postings",
          href: "/job-postings",
          icon: Circle,
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
          icon: Circle,
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
          icon: Circle,
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
          icon: Circle,
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
          href: "/interview-schedule",
          icon: Circle,
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
          icon: Circle,
        },
        {
          title: "Notification settings",
          href: "/notification/settings",
          icon: Circle,
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
          icon: Circle,
        },
        {
          title: "View All Applicants",
          href: "/applicants/view",
          icon: Circle,
        },
        {
          title: "Shortlisted Applicants",
          href: "/applicants/view/shortlisted",
          icon: Circle,
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
          icon: Circle,
        },
        {
          title: "View All Jobs",
          href: "/jobs/view",
          icon: Circle,
        },
        {
          title: "Create Job",
          href: "/jobs/create",
          icon: Circle,
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
          icon: Circle,
        },
        {
          title: "Upcoming Interviews",
          href: "/interviews/upcoming",
          icon: Circle,
        },
        {
          title: "Schedule Interview",
          href: "/interviews/schedule",
          icon: Circle,
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
          icon: Circle,
        },
      ],
    },
    getAuthLinks(),
  ];

  return (
    <>
      <div
        className={cn(
          "h-[calc(100vh-1rem)] sticky border-r pb-10 pt-6 bg-white my-2 ml-4 shadow-md rounded-lg transition-all duration-300 ease-in-out overflow-y-auto",
          isCollapsed ? "w-16" : "w-56"
        )}
      >
        <div className="items-center text-center sm:mx-auto">
          <Link href={"/"} className="rounded-full">
            <Image
              src="/assests/hh-logo.png"
              alt="Logo"
              width={120}
              height={120}
              className="rounded-full items-center text-center inline"
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

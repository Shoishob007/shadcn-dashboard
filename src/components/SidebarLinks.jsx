import {
  BriefcaseBusiness,
  CalendarDays,
  Circle,
  LayoutDashboard,
  ReceiptText,
  Search,
  Settings,
  UsersRound,
} from "lucide-react";

export const SidebarLinks = () => {

  const applicantLinks = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      variant: "default",
    },
    {
      title: "My Applications",
      href: "/my-applications",
      icon: CalendarDays,
      variant: "ghost",
    },
    {
      title: "Search for Jobs",
      href: "/job-search",
      icon: Search,
      variant: "ghost",
    },
    {
      title: "Profile",
      href: "/profile",
      icon: UsersRound,
      variant: "ghost",
    },
  ];

  const organizationLinks = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      variant: "default",
    },
    {
      title: "Jobs",
      href: "#",
      icon: BriefcaseBusiness,
      variant: "ghost",
      submenu: [
        {
          title: "Create Job",
          href: "/demoJobFormCreate",
          icon: Circle,
        },
        {
          title: "View All Jobs",
          href: "/demoJobList",
          icon: Circle,
        },
      ],
    },
    {
      title: "Applicants",
      href: "/demoAppList",
      icon: UsersRound,
      variant: "ghost",
    },

    {
      title: "Schedule",
      href: "/demoSchedule",
      icon: CalendarDays,
      variant: "ghost",
    },
    {
      title: "My Billings",
      href: "/demoBillings",
      icon: ReceiptText,
      variant: "default",
    },
    {
      title: "Profile",
      href: "/profile-settings",
      icon: Settings,
      variant: "ghost",
    },
  ];

  return { applicantLinks, organizationLinks };
};

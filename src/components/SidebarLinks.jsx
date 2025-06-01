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
      href: "/profile-demo",
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
          href: "/JobCreateForm",
          icon: Circle,
        },
        {
          title: "View All Jobs",
          href: "/JobList",
          icon: Circle,
        },
      ],
    },
    {
      title: "Applicants",
      href: "/ApplicantList",
      icon: UsersRound,
      variant: "ghost",
    },

    {
      title: "Schedule",
      href: "/Schedules",
      icon: CalendarDays,
      variant: "ghost",
    },
    {
      title: "My Billings",
      href: "/Billings",
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

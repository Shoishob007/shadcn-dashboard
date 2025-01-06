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
  {
    /*
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
    //   title: "Get Started",
    //   href: "#",
    //   icon: KeyRound,
    //   variant: "ghost",
    //   submenu: [
    //     {
    //       title: "Login",
    //       href: "/login",
    //       icon: Circle,
    //       isActive: pathname === "/login",
    //     },
    //     {
    //       title: "Register",
    //       href: "/register",
    //       icon: Circle,
    //       isActive: pathname === "/register",
    //     },
    //   ],
    // };
  };*/
  }

  const applicantLinks = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      variant: "default",
      //   submenu: [
      //     {
      //       title: "Applicants overview",
      //       href: "/overview",
      //       icon: Circle,
      //     },
      //     {
      //       title: "Upcoming interviews",
      //       href: "/upcoming-interviews",
      //       icon: Circle,
      //     },
      //     {
      //       title: "Recent job postings",
      //       href: "/recent-job",
      //       icon: Circle,
      //     },
      //   ],
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

    // {
    //   title: "Interview Schedule",
    //   href: "#",
    //   icon: Calendar,
    //   variant: "ghost",
    //   submenu: [
    //     {
    //       title: "View up interviews",
    //       href: "/interview-schedule",
    //       icon: Circle,
    //     },
    //   ],
    // },
    // {
    //   title: "Notifications",
    //   href: "/notification",
    //   icon: Bell,
    //   variant: "ghost",
    //   submenu: [
    //     {
    //       title: "View Notifications",
    //       href: "/notification/view",
    //       icon: Circle,
    //     },
    //     {
    //       title: "Notification settings",
    //       href: "/notification/settings",
    //       icon: Circle,
    //     },
    //   ],
    // },
    // getAuthLinks(),
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
      // submenu: [
      //   {
      //     title: "Applicants Status",
      //     href: "/applicants",
      //     icon: Circle,
      //   },
      // ],
    },

    {
      title: "Schedule",
      href: "/demoSchedule",
      icon: CalendarDays,
      variant: "ghost",
      // submenu: [
      //   {
      //     title: "Interview Dates",
      //     href: "/interviews",
      //     icon: Circle,
      //   },
      //   {
      //     title: "Upcoming Interviews",
      //     href: "/interviews/upcoming",
      //     icon: Circle,
      //   },
      //   {
      //     title: "Scheduled Interview",
      //     href: "/interviews/schedule",
      //     icon: Circle,
      //   },
      // ],
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
      // submenu: [
      //   {
      //     title: "Profile Settings",
      //     href: "/profile-settings",
      //     icon: Circle,
      //   },
      // ],
    },
    // getAuthLinks(),
  ];

  return { applicantLinks, organizationLinks };
};

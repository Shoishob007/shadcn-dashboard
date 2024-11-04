import {
  Bell,
  BriefcaseBusiness,
  Calendar,
  CalendarDays,
  Circle,
  LayoutDashboard,
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
          href: "/recent-job",
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
          href: "/job-search",
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
      href: "#",
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
      title: "Applicants",
      href: "#",
      icon: UsersRound,
      variant: "ghost",
      submenu: [
        // {
        //   title: "Applicants Dashboard",
        //   href: "/applicants",
        //   icon: Circle,
        // },
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
        {
          title: "Hired Applicants",
          href: "/applicants/view/hired",
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
        // {
        //   title: "Jobs Dashboard",
        //   href: "/jobs",
        //   icon: Circle,
        // },
        {
          title: "View All Jobs",
          href: "/jobs/view",
          icon: Circle,
        },
        {
          title: "View Open Jobs",
          href: "/jobs/view/open",
          icon: Circle,
        },
        {
          title: "View Closed Jobs",
          href: "/jobs/view/closed",
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
    // getAuthLinks(),
  ];

  return { applicantLinks, organizationLinks };
};
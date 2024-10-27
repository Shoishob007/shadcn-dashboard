"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Settings,
  User,
  Lock,
  Share2,
  Users,
  Building2,
  Trash2,
} from "lucide-react";

const SettingsNav = ({ currentPath }) => {
  const navItems = [
    {
      href: "/profile-settings",
      label: "General",
      icon: Settings,
    },
    {
      href: "/profile-settings/profile",
      label: "Edit Profile",
      icon: User,
    },
    {
      href: "/profile-settings/password",
      label: "Password",
      icon: Lock,
    },
    {
      href: "/profile-settings/social",
      label: "Social Profiles",
      icon: Share2,
    },
    {
      href: "/applicants/view",
      label: "Applications",
      icon: Users,
    },
    {
      href: "/profile-settings/branches",
      label: "Branch Info",
      icon: Building2,
    },
    {
      href: "/profile-settings/delete",
      label: "Delete Account",
      icon: Trash2,
      danger: true,
    },
  ];

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = currentPath === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-100",
              isActive ? " text-primary font-bold" : "text-gray-600",
              item.danger && "text-red-600 hover:bg-red-50"
            )}
          >
            <Icon className="w-4 h-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default SettingsNav;

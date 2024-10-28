/** @format */
"use client";

import { useWindowWidth } from "@react-hook/window-size";
import { Bell, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import { cn } from "../lib/utils";
import SearchComponent from "./SearchComponent";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const VerticalNavbar = ({ isCollapsed, toggleSidebar }) => {
  const { status, data: session } = useSession();

  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  if (status === "loading") {
    return (
      <div className="flex flex-col-reverse items-center justify-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <nav
      className={`bg-white ml-2 my-2 mr-4 py-2 px-6 rounded-lg text-gray-400 shadow-md border-t-2 text-sm flex items-center
        ${mobileWidth ? "justify-start" : "justify-between"}`}
    >
      <div
        className={`flex flex-col space-y-2 transition-all duration-300 ease-in-out`}
      >
        <ul className="flex space-x-8 items-center">
          <li className="items-center text-center">
            <Button
              onClick={toggleSidebar}
              variant="ghost"
              size="icon"
              className="p-0 h-auto hover:bg-transparent"
            >
              <ArrowRight
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isCollapsed ? "" : "rotate-180"
                )}
              />
            </Button>
          </li>
          {!mobileWidth && (
            <>
              <li>
                <Link href="/" className={cn("hover:underline")}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/profile-settings"
                  className={cn("hover:underline")}
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link href="/contact" className={cn("hover:underline")}>
                  Contact Us
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div
        className={`flex items-center gap-5 transition-all duration-300 ease-in-out`}
      >
        <SearchComponent onSearch={handleSearch} />
        {/* Notification dropdown */}
        <section>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Bell className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Notification</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Notifications</DropdownMenuItem>
              <DropdownMenuItem>Notification Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
        <User className="w-5 h-5" />
      </div>

      {/* {mobileWidth && (
        <div className={`absolute left-0 top-full bg-white w-full transition-all duration-300 ease-in-out`}>
        </div>
      )} */}
    </nav>
  );
};

export default VerticalNavbar;

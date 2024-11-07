/** @format */
"use client";

import { useWindowWidth } from "@react-hook/window-size";
import { Bell, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { cn } from "../lib/utils";
// import SearchComponent from "./SearchComponent";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ThemeToggle } from "@/components/theme-toggle.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useRoleStore from "@/stores/roleStore/useRoleStore";
import useLayoutStore from "@/stores/useLayoutStore";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

const VerticalNavbar = () => {
  const { status, data: session } = useSession();
  const { isCollapsed, toggleSidebar } = useLayoutStore();

  // const handleSearch = (query) => {
  //   console.log("Searching for:", query);
  // };

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  const { currentRole, setRole } = useRoleStore();

  if (status === "loading") {
    return (
      <div className="flex flex-col-reverse items-center justify-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <nav
      className={`bg-white dark:bg-gray-800 ml-4 my-2 mr-4 py-4 px-2 sm:px-6 rounded-lg text-gray-500 dark:text-gray-200 shadow-md border-t-2 text-sm flex items-center
        ${mobileWidth ? "justify-center" : "justify-between"}`}
    >
      <div>
        <Button
          onClick={toggleSidebar}
          variant="ghost"
          size="icon"
          className="p-2 h-auto"
        >
          {isCollapsed ? (
            <Menu className={cn("h-4 w-4 transition-transform duration-200")} />
          ) : (
            <X className={cn("h-4 w-4 transition-transform duration-200")} />
          )}
        </Button>
      </div>
      <div
        className={`flex flex-col space-y-2 transition-all duration-300 ease-in-out`}
      >
        <ul className="flex space-x-4 items-center">
          <li className="items-center text-center"></li>
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
        className={`flex items-center ml-2 gap-2 sm:gap-5 transition-all duration-300 ease-in-out`}
      >
        {/* <SearchComponent onSearch={handleSearch} /> */}
        <div className="w-full flex items-center space-x-2">
          <Select onValueChange={(value) => setRole(value)} value={currentRole}>
            <SelectTrigger className="w-[180px] dark:border-white">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="applicant">Applicant</SelectItem>
                <SelectItem value="organization">Organization</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full flex items-center">
          <ThemeToggle className="w-4 h-4 sm:w-5 sm:h-5 p-0 m-0" />
        </div>

        {/* Notification dropdown */}
        <section>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative w-5 h-5 flex items-center justify-center">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 p-0 m-0 " />
                <div className="absolute bg-black dark:bg-gray-200 rounded-full w-5 text-white dark:text-black -top-3 -right-2 flex items-center justify-center">
                  <span className="">1</span>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuLabel>Notification</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Notifications</DropdownMenuItem>
              <DropdownMenuItem>Notification Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        <section>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className=" w-5 h-5 flex items-center justify-center">
                <User className="w-4 h-4 sm:w-5 sm:h-5 p-0 m-0" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-6">
              <DropdownMenuLabel>User Profile</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile-settings">View Profile Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/profile-settings/password">Change password</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#">Try Enterprize</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  className="w-32 h-8 shadow-none border-none"
                  variant="outline"
                  onClick={() => {
                    signOut();
                  }}
                  disabled={status === "unauthenticated"}
                >
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </div>

      {/* {mobileWidth && (
        <div className={`absolute left-0 top-full bg-white w-full transition-all duration-300 ease-in-out`}>
        </div>
      )} */}
    </nav>
  );
};

export default VerticalNavbar;

/** @format */
"use client";

import { useWindowWidth } from "@react-hook/window-size";
import { Menu, X } from "lucide-react";
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

import useRoleStore from "@/stores/roleStore/useRoleStore";
import useLayoutStore from "@/stores/useLayoutStore";
import { useSession } from "next-auth/react";
import ProfileAvater from "./ProfileAvater";
import NotificationComponent from "./NotificationComponent";
import ThemeToggleComponent from "./ThemeToggleComponent";
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

  return (
    <nav
      className={`bg-white dark:bg-gray-800 ml-4 my-2 mr-4 py-4 px-2 sm:px-8 rounded-lg text-gray-500 dark:text-gray-200 shadow-md text-sm flex items-center
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
                  href={`${
                    currentRole === "organization"
                      ? "/profile-settings"
                      : "/profile"
                  }`}
                  className={cn("hover:underline")}
                >
                  {currentRole === "organization" ? "Settings" : "Profile"}
                </Link>
              </li>
              <li>
                {currentRole == "organization" ? (
                  <Link
                    href="/demoJobFormCreate"
                    className={cn("hover:underline")}
                  >
                    Post Job
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/my-applications"
                      className={cn("hover:underline")}
                    >
                      View Applications
                    </Link>
                  </>
                )}
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
          {/* <ThemeToggle
            className="w-4 h-4 sm:w-6 sm:h-5 p-0 m-0"
            strokeWidth={3}
          /> */}
        </div>
        <section>
          <ThemeToggleComponent />
        </section>

        {/* Notification dropdown */}
        <section>
          <NotificationComponent />
        </section>

        <section>
          <ProfileAvater />
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
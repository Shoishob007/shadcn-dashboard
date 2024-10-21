/** @format */
"use client";

import Link from "next/link";
import { cn } from "../lib/utils";
import SearchComponent from "./SearchComponent";
import { Bell, User } from "lucide-react";
import { useWindowWidth } from "@react-hook/window-size";

const VerticalNavbar = () => {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  return (
    <nav
      className={`bg-white ml-2 my-2 mr-4 py-2 px-6 rounded-lg text-gray-400 shadow-md border-t-2 text-sm flex items-center
        ${mobileWidth ? "justify-start" : "justify-between"}`}
    >
      <div
        className={`flex flex-col space-y-2 transition-all duration-300 ease-in-out ${
          mobileWidth ? "max-h-0 w-0 opacity-0" : "max-h-20 opacity-100"
        }`}
      >
        <ul className="flex space-x-8">
          <li>
            <Link href="/" className={cn("hover:underline")}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/profile-settings" className={cn("hover:underline")}>
              Settings
            </Link>
          </li>
          <li>
            <Link href="/contact" className={cn("hover:underline")}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      <div
        className={`flex items-center gap-5 transition-all duration-300 ease-in-out ${
          mobileWidth ? "opacity-100" : "opacity-100"
        }`}
      >
        <SearchComponent onSearch={handleSearch} />
        <Bell className="w-5 h-5" />
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

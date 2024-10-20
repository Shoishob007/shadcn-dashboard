/** @format */
"use client";

import Link from "next/link";
import { cn } from "../lib/utils";
import SearchComponent from "./SearchComponent";
import { Bell, User } from "lucide-react";

const VerticalNavbar = () => {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  return (
    <nav className="bg-white mx-4 my-2 p-3 rounded-xl text-gray-400 shadow-md border-t-2 text-sm flex justify-between items-center text-center">
      <div>
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
          {/* <li>
            <Link href="/about" className={cn("hover:underline")}>
              About Us
            </Link>
          </li> */}
        </ul>
      </div>
      <div className="flex items-center text-center gap-3">
        <SearchComponent onSearch={handleSearch} />
        <Bell />
        <User />
      </div>
    </nav>
  );
};

export default VerticalNavbar;

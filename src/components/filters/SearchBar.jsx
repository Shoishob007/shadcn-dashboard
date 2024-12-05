import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SearchBar = ({ placeholder, value, onSearch }) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
      <Input
        placeholder={placeholder}
        value={value}
        className="pl-8 h-7 md:h-9 bg-white dark:border-gray-500 dark:bg-gray-900 text-xs min-w-24 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

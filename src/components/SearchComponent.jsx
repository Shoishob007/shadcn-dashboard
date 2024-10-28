"use client";

import { useState } from "react";

import { Search } from "lucide-react";
import { Input } from "./ui/input";

const SearchComponent = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="relative flex items-center text-center">
      <Search
        className="absolute right-3 text-gray-500 text-sm w-5 h-5"
        onClick={onSearch}
      />
      <Input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search..."
        className="border border-gray-300 rounded-md px-2 py-1 w-full max-w-md min-w-[80px] sm:min-w-[200px] md:min-w-[250px] lg:min-w-[300px] focus:outline-none focus:ring-2 focus:ring-gray-900"
      />
    </div>
  );
};

export default SearchComponent;

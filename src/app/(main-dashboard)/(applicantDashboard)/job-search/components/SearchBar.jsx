"use client";

import { Input } from "@/components/ui/input";
import { LoaderCircle, Mic, Search } from "lucide-react";

export default function SearchBar({ value, onChange, isLoading }) {
  return (
    <div className="space-y-2">
      <div className="relative bg-white dark:bg-gray-800">
        <Input
          id="input-27"
          className="peer pe-9 ps-9"
          placeholder="Search..."
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          {isLoading ? (
            <LoaderCircle
              className="animate-spin"
              size={16}
              strokeWidth={2}
              role="status"
              aria-label="Loading..."
            />
          ) : (
            <Search size={16} strokeWidth={2} aria-hidden="true" />
          )}
        </div>
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground"
          aria-label="Press to speak"
          type="button"
        >
          <Mic size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

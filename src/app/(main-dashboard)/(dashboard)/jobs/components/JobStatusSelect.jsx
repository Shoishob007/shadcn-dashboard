"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";

export function JobStatusSelect({ router }) {
  const pathname = usePathname();

  const getSelectedValue = () => {
    if (pathname === "/jobs/view/open") return "open";
    if (pathname === "/jobs/view/closed") return "closed";
    if (pathname === "/jobs/view") return "all";
    return "all";
  };

  return (
    <Select
      value={getSelectedValue()}
      onValueChange={(value) => {
        if (value === "open") {
          router.push("/jobs/view/open");
        } else if (value === "closed") {
          router.push("/jobs/view/closed");
        } else {
          router.push("/jobs/view");
        }
      }}
    >
      <SelectTrigger className="text-center border-none flex justify-center">
        Status
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all" className="flex items-center justify-between">
          All{" "}
        </SelectItem>
        <SelectItem value="open" className="flex items-center justify-between">
          Open{" "}
        </SelectItem>
        <SelectItem
          value="closed"
          className="flex items-center justify-between"
        >
          Closed{" "}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";

export function StatusSelect({ router }) {
  const pathname = usePathname();

  const getSelectedValue = () => {
    if (pathname === "/applicants/view/hired") return "hired";
    if (pathname === "/applicants/view/shortlisted") return "shortlisted";
    if (pathname === "/applicants/view") return "all";
    return "all";
  };

  return (
    <Select
      value={getSelectedValue()}
      onValueChange={(value) => {
        if (value === "hired") {
          router.push("/applicants/view/hired");
        } else if (value === "shortlisted") {
          router.push("/applicants/view/shortlisted");
        } else {
          router.push("/applicants/view");
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
        <SelectItem value="hired" className="flex items-center justify-between">
          Hired{" "}
        </SelectItem>
        <SelectItem
          value="shortlisted"
          className="flex items-center justify-between"
        >
          Shortlisted{" "}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

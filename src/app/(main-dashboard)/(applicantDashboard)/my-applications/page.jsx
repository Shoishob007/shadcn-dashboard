"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { House } from "lucide-react";
import ApplicationTabs from "./components/ApplicationTabs";
import { useSearchParams } from "next/navigation";

const MyApplicationPage = () => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "Applied";
  
  return (
    <div>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <House className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/my-applications">
              My Applications
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Tab section */}
      <ApplicationTabs activeTab={activeTab} />
    </div>
  );
};

export default MyApplicationPage;


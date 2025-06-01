/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import FormatTitle from "@/components/TitleFormatter.js";
import { usePathname } from "next/navigation";
import PricingTabs from "./components/PricingTabs.jsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { House } from "lucide-react";

const test = () => {
  const pathname = usePathname();
  const pageTitle = FormatTitle(pathname);
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
            <BreadcrumbLink href="/Billings">Billings</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="bg-white dark:bg-gray-900 p-4 shadow-md rounded-md">
        <section>
          <PricingTabs />
        </section>
      </section>
    </div>
  );
};

export default test;

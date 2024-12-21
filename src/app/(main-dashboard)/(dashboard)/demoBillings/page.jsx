/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Separator } from "@/components/ui/separator";
import PageTitle from "@/components/PageTitle.jsx";
import FormatTitle from "@/components/TitleFormatter.js";
import { usePathname } from "next/navigation";
import PricingCards from "./pricing/page.jsx";
import BillingTable from "./billing-table/page.jsx";
import PricingTabs from "./components/PricingTabs.jsx";

const test = () => {
  const pathname = usePathname();
  const pageTitle = FormatTitle(pathname);
  return (
    <div>
      <PageTitle title={pageTitle} className={"pb-4 ml-2"} />
      <section className="bg-white dark:bg-gray-900 p-4 shadow-md rounded-md">
        <section>
          <PricingTabs />
        </section>
      </section>
    </div>
  );
};

export default test;

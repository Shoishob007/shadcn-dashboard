/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import PageTitle from "@/components/PageTitle";
import FormatTitle from "@/components/TitleFormatter";
import { usePathname } from "next/navigation";
import JobListings from "./components/JobListings";

const jobs = () => {
  const pathname = usePathname();
  const pageTitle = FormatTitle(pathname);

  return (
    <div>
      <PageTitle title={pageTitle} className={"pb-4 ml-2"} />

      {/* Jobs card */}
      <section className="mt-4">
        <JobListings />
      </section>
    </div>
  );
};

export default jobs;

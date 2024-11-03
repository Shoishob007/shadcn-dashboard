"use client";

import React from "react";
import InterviewUpcoming from "./upcoming/page";
import InterviewSchedule from "./schedule/page";
import { useSession } from "next-auth/react";
import PageTitle from "@/components/PageTitle";
import { usePathname } from "next/navigation";
import FormatTitle from "@/components/TitleFormatter";

const Interviews = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const pageTitle = FormatTitle(pathname);

  if (status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center h-full dark:text-gray-200">
        Please sign in to access your calendar to see interviews
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-start h-full gap-6 dark:text-gray-200">
        <InterviewUpcoming />
        <InterviewSchedule />
      </div>
    </>
  );
};

export default Interviews;

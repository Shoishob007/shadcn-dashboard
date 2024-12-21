"use client";

import {
  Day,
  Inject,
  Month,
  ScheduleComponent,
  ViewDirective,
  ViewsDirective,
} from "@syncfusion/ej2-react-schedule";
import React from "react";
import { useTheme } from "next-themes";

import { applicantsData } from "../applicants/components/applicantsData";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCf0x3TXxbf1x1ZFREal5WTnVZUiweQnxTdEFiW35XcHRXQWRdWEV2Vg=="
);

const Scheduler = () => {
  const { theme } = useTheme();

  const events = applicantsData
    ?.filter((applicant) => {
      const { date, time } = applicant.schedule || {};
      return date && time;
    })
    ?.map((applicant) => {
      const scheduleDate = new Date(applicant.schedule.date);
      const [hours, minutes] = applicant.schedule.time.split(":").map(Number);

      return {
        Id: applicant.id,
        Subject: `${applicant.applicantName} - ${applicant.jobTitle}`,
        Description: `${applicant.applicantName} is ${applicant.status}. He/She will be appearing at ${applicant.steps}\nFurther details will be shared.`,
        StartTime: new Date(
          scheduleDate.getFullYear(),
          scheduleDate.getMonth(),
          scheduleDate.getDate(),
          hours,
          minutes
        ),
        EndTime: new Date(
          scheduleDate.getFullYear(),
          scheduleDate.getMonth(),
          scheduleDate.getDate(),
          hours + 2,
          minutes
        ),
        IsAllDay: false,
      };
    });

  if (!events || events.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-card rounded-lg border">
        <p className="text-muted-foreground">No events available to display</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card">
      <ScheduleComponent
        eventSettings={{
          dataSource: events,
        }}
        cssClass={theme === "dark" ? "dark" : "light"}
      >
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective option="Month" />
        </ViewsDirective>
        <Inject services={[Day, Month]} />
      </ScheduleComponent>
    </div>
  );
};

export default Scheduler;

/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import {
  Day,
  Inject,
  Month,
  ScheduleComponent,
  ViewDirective,
  ViewsDirective,
} from "@syncfusion/ej2-react-schedule";
import { useTheme } from "next-themes";
import { registerLicense } from "@syncfusion/ej2-base";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { House } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCfEx3TXxbf1x1ZFREalxQTnVYUiweQnxTdEBjWH5XcHRVR2RcWEN3Xw=="
);

const Scheduler = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [events, setEvents] = useState([]);
  const { data: session } = useSession();
  const orgId = session?.organizationId;
  const accessToken = session?.access_token;


  const fetchEvents = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications?where[jobDetails.job.organization][equals]=${orgId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched job application data:", data);

        const transformedEvents = await Promise.all(
          data.docs.map(async (application) => {
            const applicantDetails = await fetchApplicantDetails(
              application.applicant
            );
            const status = application.applicationStatus.docs[0];
            if (!status) {
              return null;
            }
            const { timeStamp } = status;
            const scheduleDate = new Date(timeStamp);
            return {
              Id: application.id,
              Subject: `${applicantDetails?.name || "Unknown"} - ${
                application.jobDetails.job.title
              }`,
              Description: `${applicantDetails?.name || "Unknown"} is ${
                status.status
              }.`,
              StartTime: scheduleDate,
              EndTime: new Date(scheduleDate.getTime() + 2 * 60 * 60 * 1000),
              IsAllDay: false,
            };
          })
        );

        // console.log("Transformed events:", transformedEvents);
        setEvents(transformedEvents.filter((event) => event !== null));
      } else {
        console.error(`Failed to fetch events. Status: ${response.status}`);
        throw new Error("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      toast({
        title: "Error!",
        description: "Failed to fetch events. Please try again.",
        variant: "ourDestructive",
      });
    }
  };

  const fetchApplicantDetails = async (applicantId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicants/${applicantId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, 
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        // console.log(
        //   `Successfully fetched applicant details for ID: ${applicantId}`,
        //   data
        // );
        return data;
      } else {
        throw new Error("Failed to fetch applicant details");
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to fetch applicant details. Please try again.",
        variant: "ourDestructive",
      });
      return null;
    }
  };

  useEffect(() => {
    if (session) {
      fetchEvents();
    }
  }, [session]); 

  const eventTemplate = (props) => {
    console.log("Rendering event template with props:", props);
    return (
      <div className="custom-event-card">
        <div className="custom-event-title">{props.Subject}</div>
        <div className="custom-event-description">{props.Description}</div>
      </div>
    );
  };

  if (!events || events.length === 0) {
    console.log("No events available to display.");
    return (
      <div className="flex items-center justify-center h-[400px] bg-card rounded-lg border">
        <p className="text-muted-foreground">No events available to display</p>
      </div>
    );
  }

  console.log("Rendering ScheduleComponent with events:", events);

  return (
    <>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <House className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/demoSchedule">Event Schedule</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="rounded-lg dark:bg-gray-800 border-none dark:border dark:border-gray-400">
        <ScheduleComponent
          currentView="Month"
          eventSettings={{
            dataSource: events,
            template: eventTemplate,
          }}
          cssClass={theme === "dark" ? "dark" : "light"}
          eventRendered={eventTemplate}
        >
          <ViewsDirective>
            <ViewDirective option="Day" />
            <ViewDirective option="Month" />
          </ViewsDirective>
          <Inject services={[Day, Month]} />
        </ScheduleComponent>
      </div>
    </>
  );
};

export default Scheduler;

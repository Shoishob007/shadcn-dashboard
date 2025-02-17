/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import {
  Day,
  Inject,
  Month,
  ScheduleComponent,
  TimelineMonth,
  ViewDirective,
  ViewsDirective,
} from "@syncfusion/ej2-react-schedule";
import { useTheme } from "next-themes";
import { L10n, registerLicense } from "@syncfusion/ej2-base";
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
import { format } from "date-fns";
import EventEditor from "./components/EventEditor";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NMaF1cXmhKYVJ/WmFZfVtgdl9EYVZUQmY/P1ZhSXxWdkdiXn5acnVQT2VbVUE="
);

const Scheduler = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [events, setEvents] = useState([]);
  const [hiringStages, setHiringStages] = useState([]);
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
            const location = application.jobDetails.address;
            const { timeStamp } = status;
            const scheduleDate = new Date(timeStamp);
            return {
              Id: application.id,
              Subject: `${applicantDetails?.name || "Unknown Applicant"} - ${
                application.jobDetails.job.title
              }`,
              Description: `${
                applicantDetails?.name || "Unknown Applicant"
              } is ${status.status}.`,
              Location: `${location}`,
              StartTime: scheduleDate,
              EndTime: new Date(scheduleDate.getTime() + 2 * 60 * 60 * 1000),
              IsAllDay: false,
              applicationData: application,
            };
          })
        );

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

  const fetchHiringStages = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hiring-stages?where[organization.id]=${orgId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setHiringStages(data.docs);
      } else {
        console.error(
          `Failed to fetch hiring stages. Status: ${response.status}`
        );
        throw new Error("Failed to fetch hiring stages");
      }
    } catch (error) {
      console.error("Error fetching hiring stages:", error);
      toast({
        title: "Error!",
        description: "Failed to fetch hiring stages. Please try again.",
        variant: "ourDestructive",
      });
    }
  };

  useEffect(() => {
    if (session) {
      fetchEvents();
      fetchHiringStages();
    }
  }, [session]);

  const eventTemplate = (props) => {
    return (
      <div className="custom-event-card">
        <div className="custom-event-title">{props.Subject}</div>
      </div>
    );
  };

  const handlePopupOpen = (args) => {
    if (args.type === "Editor" && args.data) {
      const eventData = args.data;
      const application = eventData.applicationData;
      setTimeout(() => {
        const order =
          application?.applicationStatus?.docs[0]?.hiringStage?.order;
        const saveButton = document.querySelector(".e-event-save");
        const deleteButton = document.querySelector(".e-event-delete");
        const cancelButton = document.querySelector(".e-event-cancel");

        // Add hiring stages to the form
        const stageSelect = document.createElement("select");
        stageSelect.className = "e-field e-input";
        stageSelect.name = "hiringStage";
        hiringStages.forEach((stage) => {
          const option = document.createElement("option");
          option.value = stage.id;
          option.text = stage.title;
          stageSelect.appendChild(option);
        });

        const formElement = document.querySelector(".e-schedule-form");
        const repeatContainer = formElement.querySelector(".e-editor");
        if (repeatContainer) {
          const repeatLabel = repeatContainer.querySelector(".e-float-line");
          if (repeatLabel) {
            repeatLabel.innerText = "Hiring Stages";
            repeatLabel.classList.add("e-field-label");
          }
          repeatContainer.innerHTML = "";
          repeatContainer.appendChild(repeatLabel);
          repeatContainer.appendChild(document.createElement("br"));
          repeatContainer.appendChild(stageSelect);
        }

        const timezoneParentElement = formElement.querySelector(
          ".e-timezone-container"
        );
        const allDayElement = formElement.querySelector(
          ".e-all-day-time-zone-row"
        );

        if (timezoneParentElement) {
          timezoneParentElement.parentNode.removeChild(timezoneParentElement);
        }

        if (allDayElement) {
          allDayElement.parentNode.removeChild(allDayElement);
        }
        if (saveButton) {
          saveButton.parentNode.removeChild(saveButton);
        }
        if (deleteButton) {
          deleteButton.parentNode.removeChild(deleteButton);
        }
        if (cancelButton) {
          cancelButton.parentNode.removeChild(cancelButton);
        }
      }, 0);
    }
  };

  // Localization for buttons
  L10n.load({
    "en-US": {
      schedule: {
        saveButton: "Schedule",
        deleteButton: "Reject",
      },
    },
  });

  const handleCellClick = (args) => {
    args.cancel = true;

    const clickedDate = new Date(args.startTime);
    const formattedDate = format(clickedDate, "MMMM d, yyyy");
    const formattedTime = format(clickedDate, "h:mm a");
    const dayOfWeek = format(clickedDate, "EEEE");

    const contentElement = document.createElement("div");
    contentElement.className = "p-4 bg-background";
    contentElement.innerHTML = `
      <div class="flex items-center gap-2 font-semibold mb-4">
        <span class="text-lg">No Events Scheduled</span>
      </div>
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2 text-sm">
          <span class="font-medium">${dayOfWeek}</span>
          <span class="text-muted-foreground">
            ${formattedDate} at ${formattedTime}
          </span>
        </div>
        <div class="flex items-start gap-2 text-sm border-t pt-3">
          <div class="space-y-1">
            <p class="text-muted-foreground">
              This time slot is currently available. Events and interviews
              will appear here once they are scheduled.
            </p>
          </div>
        </div>
      </div>
    `;

    // Creating a custom popup
    const customPopup = document.createElement("div");
    customPopup.className = "e-quick-popup-wrapper e-popup";
    customPopup.style.width = "250px";
    customPopup.style.height = "auto";
    customPopup.style.position = "absolute";
    customPopup.style.top = `${
      args.element.getBoundingClientRect().top +
      window.scrollY +
      args.element.offsetHeight
    }px`;
    customPopup.style.left = `${
      args.element.getBoundingClientRect().left + window.scrollX
    }px`;
    customPopup.appendChild(contentElement);

    document.body.appendChild(customPopup);

    // custom popup when clicking outside
    const handleClickOutside = (event) => {
      if (!customPopup.contains(event.target)) {
        document.body.removeChild(customPopup);
        document.removeEventListener("click", handleClickOutside);
      }
    };

    document.addEventListener("click", handleClickOutside);
  };

  if (!events || events.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-card rounded-lg border">
        <p className="text-muted-foreground">No events available to display</p>
      </div>
    );
  }

  const editorTemplate = (props) => {
    const handleClose = () => {
      const scheduleObj =
        document.querySelector(".e-schedule").ej2_instances[0];
      scheduleObj.closeEditor();
    };
    return (
      <EventEditor
        props={props}
        hiringStages={hiringStages}
        accessToken={accessToken}
        onClose={handleClose}
      />
    );
  };
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
          editorTemplate={editorTemplate}
          cssClass={theme === "dark" ? "dark" : "light"}
          eventRendered={eventTemplate}
          popupOpen={handlePopupOpen}
          cellClick={handleCellClick}
        >
          <ViewsDirective>
            <ViewDirective option="Day" />
            <ViewDirective option="Month" />
            {/* <ViewDirective option="TimelineMonth" /> */}
          </ViewsDirective>
          <Inject services={[Day, Month, TimelineMonth]} />
        </ScheduleComponent>
      </div>
    </>
  );
};

export default Scheduler;

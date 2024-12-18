/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import PageTitle from "@/components/PageTitle";
import FormatTitle from "@/components/TitleFormatter";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import useScheduledInterviewsStore from "@/stores/interviews/useScheduledInterviewsStore";
import {
  differenceInDays,
  format,
  isPast,
  isToday,
  isTomorrow,
} from "date-fns";
import { CalendarClock, Calendar as CalendarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const InterviewSchedule = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const pageTitle = FormatTitle(pathname);

  const { allEvents, loading, fetchAllEvents } = useScheduledInterviewsStore();

  useEffect(() => {
    if (status === "authenticated") {
      fetchAllEvents();
    }
  }, [status]);

  const getEventStatus = (eventDate) => {
    if (isPast(eventDate) && !isToday(eventDate)) {
      return {
        label: "Past",
        className: "bg-red-100 text-red-600 hover:bg-red-50",
      };
    }
    if (isToday(eventDate)) {
      return {
        label: "Today",
        className: "bg-green-100 text-green-600 hover:bg-green-50",
      };
    }
    if (isTomorrow(eventDate)) {
      return {
        label: "Tomorrow",
        className: "bg-blue-100 text-blue-600 hover:bg-blue-50",
      };
    }
    const daysAway = differenceInDays(eventDate, new Date());
    return {
      label: `${daysAway} days away`,
    };
  };

  const groupEventsByDate = (events) => {
    const grouped = events.reduce((acc, event) => {
      const date = format(
        new Date(event.start.dateTime || event.start.date),
        "yyyy-MM-dd"
      );
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {});

    return Object.entries(grouped).sort(
      ([dateA], [dateB]) =>
        new Date(dateA).getTime() - new Date(dateB).getTime()
    );
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-full dark:text-gray-200">
        <div className="animate-spin rounded-full h-8 w-8"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center h-full dark:text-gray-200">
        Please sign in to access your calendar to see scheduled interviews
      </div>
    );
  }

  return (
    <>
      {" "}
      <PageTitle title={pageTitle} className={"ml-2 mb-2"} />
      <div className="h-full dark:text-gray-200">
        <Card className="p-4 sm:py-8 sm:px-6 border-none">
          <div className="flex items-center justify-center mb-4 ">
            <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
              <CalendarClock className="h-5 sm:h-6 w-5 sm:w-6" />
              Scheduled Interviews
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8"></div>
            </div>
          ) : allEvents.length > 0 ? (
            <div className="space-y-3">
              {groupEventsByDate(allEvents).map(([date, events]) => (
                <div key={date} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground" />
                    <h3 className="text-sm sm:text-base">
                      {format(new Date(date), "EEEE, MMMM d, yyyy")}
                    </h3>
                  </div>
                  <div className="space-y-2 sm:pl-5">
                    {events.map((event) => {
                      const eventDate = new Date(
                        event.start.dateTime || event.start.date
                      );
                      const status = getEventStatus(eventDate);

                      return (
                        <Card
                          key={event.id}
                          className={cn(
                            "p-3 shadow-none dark:border-white",
                            isPast(eventDate) &&
                              !isToday(eventDate) &&
                              "opacity-75 "
                          )}
                        >
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm sm:text-base">
                                  {event.summary}
                                </h4>
                                <Badge
                                  className={cn(
                                    status.className,
                                    "hover:transition-colors duration-200"
                                  )}
                                >
                                  {status.label}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {format(eventDate, "h:mm a")} -{" "}
                                {format(
                                  new Date(
                                    event.end.dateTime || event.end.date
                                  ),
                                  "h:mm a"
                                )}
                              </p>
                              {event.description && (
                                <p className="text-xs sm:text-sm mt-2">
                                  {event.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No scheduled interviews found
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default InterviewSchedule;

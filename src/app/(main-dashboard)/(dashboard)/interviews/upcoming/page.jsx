/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import PageTitle from "@/components/PageTitle";
import FormatTitle from "@/components/TitleFormatter";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { CalendarDays, Clock, Plus } from "lucide-react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePathname } from "next/navigation";
import EventForm from "./components/EventForm";
import useUpcomingInterviewStore from "@/stores/interviews/useUpcomingInterviewStore";
import { useEffect } from "react";

const InterviewUpcoming = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const pageTitle = FormatTitle(pathname);

  const {
    date,
    events,
    loading,
    newEventTitle,
    newEventDescription,
    startTime,
    endTime,
    isDialogOpen,
    isEditDialogOpen,
    selectedEventId,
    setDate,
    setNewEventTitle,
    setNewEventDescription,
    setStartTime,
    setEndTime,
    setIsDialogOpen,
    setIsEditDialogOpen,
    setSelectedEventId,
    fetchEvents,
    handleCreateEvent,
    handleEditEvent,
    handleDeleteEvent,
  } = useUpcomingInterviewStore();

  useEffect(() => {
    if (status === "authenticated") {
      fetchEvents();
    }
  }, [date, status]);

  if (status === "loading") {
    return <div className="dark:text-gray-200">Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center h-full dark:text-gray-200">
        Please sign in to access your calendar to see upcoming interviews
      </div>
    );
  }

  return (
    <>
      <PageTitle title={pageTitle} className={"pb-4 ml-2"} />
      <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-3 sm:p-6 space-y-4 flex flex-col sm:gap-6">
          <div className="flex items-center justify-center sm:gap-4">
            <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 sm:p-4 p-3 px-4 sm:px-6">
              <CalendarDays className="h-5 sm:h-6 w-5 sm:w-6" />
              Calendar
            </h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-5 sm:w-6" />
                  Add
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Schedule New Interview
                  </DialogTitle>
                </DialogHeader>
                <EventForm
                  title={newEventTitle}
                  setTitle={setNewEventTitle}
                  description={newEventDescription}
                  setDescription={setNewEventDescription}
                  startTime={startTime}
                  setStartTime={setStartTime}
                  endTime={endTime}
                  setEndTime={setEndTime}
                  onSubmit={() => {
                    handleCreateEvent();
                    setIsDialogOpen(false);
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
            className="rounded-md border items-center justify-center flex dark:border-white"
          />
        </Card>

        <Card className="p-4 sm:p-6 ">
          <div className="flex items-center justify-between mb-3 sm:mb-6">
            <h2 className="sm:text-lg text-base font-semibold flex items-center gap-2">
              <Clock className="sm:h-6 sm:w-6 w-5 h-5" />
              Events for {format(date, "MMMM d, yyyy")}
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : events.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {events.map((event) => (
                <Card
                  key={event.id}
                  className="sm:p-4 p-3 border shadow-none flex justify-between dark:border-white"
                >
                  <div>
                    <h3 className="sm:font-semibold text-sm sm:text-base">
                      {event.summary}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {format(
                        new Date(event.start.dateTime || event.start.date),
                        "h:mm a"
                      )}{" "}
                      -
                      {format(
                        new Date(event.end.dateTime || event.end.date),
                        "h:mm a"
                      )}
                    </p>
                    {event.description && (
                      <p className="mt-2 text-sm">{event.description}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button
                      size="sm"
                      variant="editsuccess"
                      onClick={() => {
                        setSelectedEventId(event.id);
                        setNewEventTitle(event.summary);
                        setNewEventDescription(event.description);
                        setStartTime(
                          format(new Date(event.start.dateTime), "HH:mm")
                        );
                        setEndTime(
                          format(new Date(event.end.dateTime), "HH:mm")
                        );
                        setIsEditDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="deletesuccess"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No events scheduled for this date.
            </div>
          )}
        </Card>

        {/* Edit Event Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
            </DialogHeader>
            <EventForm
              title={newEventTitle}
              setTitle={setNewEventTitle}
              description={newEventDescription}
              setDescription={setNewEventDescription}
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
              onSubmit={() => {
                handleEditEvent(); // Call the edit event function
                setIsEditDialogOpen(false); // Close dialog after submission
              }}
              isEditing={true}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default InterviewUpcoming;

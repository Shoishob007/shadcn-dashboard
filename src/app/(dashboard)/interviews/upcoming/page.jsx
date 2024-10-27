/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CalendarDays, Clock, Plus } from "lucide-react";
import {
  loadGoogleUpcomingCalendarEvents,
  createCalendarEvent,
} from "@/lib/googleCalendar";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const InterviewUpcoming = () => {
  const { data: session, status } = useSession();
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetchEvents();
    }
  }, [date, status]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const calendarEvents = await loadGoogleUpcomingCalendarEvents(date);
      setEvents(calendarEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
    setLoading(false);
  };

  const handleCreateEvent = async () => {
    try {
      const startDateTime = new Date(date);
      const [startHours, startMinutes] = startTime.split(":");
      startDateTime.setHours(parseInt(startHours), parseInt(startMinutes));

      const endDateTime = new Date(date);
      const [endHours, endMinutes] = endTime.split(":");
      endDateTime.setHours(parseInt(endHours), parseInt(endMinutes));

      await createCalendarEvent({
        summary: newEventTitle,
        description: newEventDescription,
        start: { dateTime: startDateTime.toISOString() },
        end: { dateTime: endDateTime.toISOString() },
      });

      setNewEventTitle("");
      setNewEventDescription("");
      setStartTime("");
      setEndTime("");
      setIsDialogOpen(false);
      fetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center h-full">
        Please sign in to access your calendar
      </div>
    );
  }

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <Card className="p-6 space-y-4 flex flex-col gap-6">
        <div className="flex items-center justify-around">
          <h2 className="text-xl font-semibold flex items-center gap-2 p-4 px-6">
            <CalendarDays className="h-6 w-6" />
            Calendar
          </h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-6" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule New Interview</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    placeholder="Interview with Candidate"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    value={newEventDescription}
                    onChange={(e) => setNewEventDescription(e.target.value)}
                    placeholder="Interview details..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Time</Label>
                    <Input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Time</Label>
                    <Input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>
                <Button onClick={handleCreateEvent} className="w-full">
                  Create Interview
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => newDate && setDate(newDate)}
          className="rounded-md border items-center justify-center flex"
        />
      </Card>

      <Card className="p-6 ">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Clock className="h-6 w-6" />
            Events for {format(date, "MMMM d, yyyy")}
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : events.length > 0 ? (
          <div className="space-y-4">
            {events.map((event, index) => (
              <Card key={index} className="p-4">
                <h3 className="font-semibold text-lg">{event.summary}</h3>
                <p className="text-sm text-muted-foreground">
                  {format(
                    new Date(event.start.dateTime || event.start.date),
                    "h:mm a"
                  )}{" "}
                  -{" "}
                  {format(
                    new Date(event.end.dateTime || event.end.date),
                    "h:mm a"
                  )}
                </p>
                {event.description && (
                  <p className="mt-2 text-sm">{event.description}</p>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            No events scheduled for this date
          </div>
        )}
      </Card>
    </div>
  );
};

export default InterviewUpcoming;

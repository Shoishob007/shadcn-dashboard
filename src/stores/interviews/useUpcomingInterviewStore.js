import { create } from 'zustand';
import {
    loadGoogleUpcomingCalendarEvents,
    createCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent
} from "@/lib/googleCalendar";

const useUpcomingInterviewStore = create((set, get) => ({
    date: new Date(),
    events: [],
    loading: true,
    newEventTitle: "",
    newEventDescription: "",
    startTime: "",
    endTime: "",
    isDialogOpen: false,
    isEditDialogOpen: false,
    selectedEventId: null,

    setDate: (newDate) => set({ date: newDate }),
    setNewEventTitle: (title) => set({ newEventTitle: title }),
    setNewEventDescription: (description) => set({ newEventDescription: description }),
    setStartTime: (time) => set({ startTime: time }),
    setEndTime: (time) => set({ endTime: time }),
    setIsDialogOpen: (open) => set({ isDialogOpen: open }),
    setIsEditDialogOpen: (open) => set({ isEditDialogOpen: open }),
    setSelectedEventId: (id) => set({ selectedEventId: id }),

    fetchEvents: async () => {
        set({ loading: true });
        try {
            const calendarEvents = await loadGoogleUpcomingCalendarEvents(get().date);
            console.log("Fetched Events:", calendarEvents);
            set({ events: calendarEvents });
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            set({ loading: false });
        }
    },

    handleCreateEvent: async () => {
        const { date, startTime, endTime, newEventTitle, newEventDescription, fetchEvents, resetForm } = get();
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

            resetForm();
            fetchEvents();
        } catch (error) {
            console.error("Error creating event:", error);
        }
    },

    handleEditEvent: async () => {
        const { date, startTime, endTime, newEventTitle, newEventDescription, fetchEvents, resetForm, selectedEventId } = get();
        try {
            const startDateTime = new Date(date);
            const [startHours, startMinutes] = startTime.split(":");
            startDateTime.setHours(parseInt(startHours), parseInt(startMinutes));

            const endDateTime = new Date(date);
            const [endHours, endMinutes] = endTime.split(":");
            endDateTime.setHours(parseInt(endHours), parseInt(endMinutes));

            await updateCalendarEvent(selectedEventId, {
                summary: newEventTitle,
                description: newEventDescription,
                start: { dateTime: startDateTime.toISOString() },
                end: { dateTime: endDateTime.toISOString() },
            });

            resetForm();
            fetchEvents();
        } catch (error) {
            console.error("Error updating event:", error);
        }
    },

    handleDeleteEvent: async (eventId) => {
        const { fetchEvents } = get();
        try {
            await deleteCalendarEvent(eventId);
            fetchEvents();
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    },

    resetForm: () => set({
        newEventTitle: "",
        newEventDescription: "",
        startTime: "",
        endTime: "",
        isDialogOpen: false,
        isEditDialogOpen: false,
        selectedEventId: null
    }),
}));

export default useUpcomingInterviewStore;
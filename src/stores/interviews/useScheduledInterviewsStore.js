import { create } from 'zustand';
import {
    loadGoogleScheduledCalendarEvents
} from "@/lib/googleCalendar"

const useScheduledInterviewsStore = create((set) => ({
    allEvents: [],
    loading: true,

    fetchAllEvents: async () => {
        set({ loading: true });
        try {
            const today = new Date();
            const thirtyDaysFromNow = new Date();
            thirtyDaysFromNow.setDate(today.getDate() + 30);

            const calendarEvents = await loadGoogleScheduledCalendarEvents(today, thirtyDaysFromNow);
            const sortedEvents = calendarEvents.sort((a, b) => {
                return (
                    new Date(a.start.dateTime || a.start.date).getTime() -
                    new Date(b.start.dateTime || b.start.date).getTime()
                );
            });
            set({ allEvents: sortedEvents });
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            set({ loading: false });
        }
    },


}));

export default useScheduledInterviewsStore;
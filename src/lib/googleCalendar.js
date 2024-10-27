// lib/googleCalendar.ts
"use client";

import { getSession } from "next-auth/react";

const CALENDAR_ID = 'primary';

export async function loadGoogleUpcomingCalendarEvents(selectedDate) {
    try {
        const session = await getSession();
        if (!session?.accessToken) {
            throw new Error('Authentication required');
        }

        const timeMin = new Date(selectedDate);
        timeMin.setHours(0, 0, 0, 0);

        const timeMax = new Date(selectedDate);
        timeMax.setHours(23, 59, 59, 999);

        const response = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?` +
            new URLSearchParams({
                timeMin: timeMin.toISOString(),
                timeMax: timeMax.toISOString(),
                singleEvents: 'true',
                orderBy: 'startTime'
            }),
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Failed to fetch events');
        }

        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error('Error loading calendar events:', error);
        throw error;
    }
}

export async function loadGoogleScheduledCalendarEvents(startDate, endDate) {
    try {
        const session = await getSession();
        if (!session?.accessToken) {
            throw new Error('Authentication required');
        }

        const timeMin = new Date(startDate);
        timeMin.setHours(0, 0, 0, 0);

        const timeMax = new Date(endDate);
        timeMax.setHours(23, 59, 59, 999);

        const response = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?` +
            new URLSearchParams({
                timeMin: timeMin.toISOString(),
                timeMax: timeMax.toISOString(),
                singleEvents: 'true',
                orderBy: 'startTime'
            }),
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Failed to fetch events');
        }

        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error('Error loading calendar events:', error);
        throw error;
    }
}

export async function createCalendarEvent(event) {
    try {
        const session = await getSession();
        if (!session?.accessToken) {
            throw new Error('Authentication required');
        }

        const response = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...event,
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                }),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Failed to create event');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating calendar event:', error);
        throw error;
    }
}
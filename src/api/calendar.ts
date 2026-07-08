import { Auth, google } from 'googleapis';
import type { IEventLink } from '@/data/events';

const toISODate = (date?: string | null) => (date ? date.slice(0, 10) : null);

const extractInternalHref = (description?: string | null) => {
    if (!description) return null;

    // looks for /events/anything in the description
    const match = description.match(/\/events\/[a-zA-Z0-9-_]+/);
    return match ? match[0] : null;
};

export async function getCalendarEvents(opts: {
    calendarId: string;
    timeMin: string;
    timeMax: string;
}): Promise<IEventLink[]> {
    const auth = new Auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const res = await calendar.events.list({
        calendarId: opts.calendarId,
        timeMin: opts.timeMin,
        timeMax: opts.timeMax,
        singleEvents: true,
        orderBy: 'startTime',
        maxResults: 250,
    });

    const events: IEventLink[] = [];

    for (const e of res.data.items ?? []) {
        const start = e.start?.dateTime ?? e.start?.date;
        const iso = toISODate(start);
        if (!iso) continue;

        const internalHref = extractInternalHref(e.description);

        events.push({
            title: e.summary ?? '(No title)',
            description: e.description ?? '',
            href: internalHref ?? '',
            internal: false,
            linkText: 'Open →',
            date: new Date(iso),
        });
    }

    return events;
}

export async function getEvents() {
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    if (!calendarId) {
        console.warn('Missing env CALENDAR_ID');
        return [];
    }

    const start = new Date(2022, 0, 1, 0, 0, 0);
    const now = new Date();
    const end = new Date(now.getFullYear() + 3, 11, 31, 23, 59, 59);

    return getCalendarEvents({
        calendarId,
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
    });
}

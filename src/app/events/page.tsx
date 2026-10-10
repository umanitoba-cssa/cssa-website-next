export const revalidate = 86400;

import BlockHeader from '@/components/block-header';
import CalendarClientWrapper from '@/components/calendar/calendar-client-wrapper';
import EventCarousel from '@/components/event-carousel';
import PageHeader from '@/components/page-header';
import { getEvents } from '@/api/calendar';
import { OlderEvents, RecentEvents } from '@/data/events';

export default async function Events() {
    const events = await getEvents();

    return (
        <main className="flex flex-col">
            <PageHeader
                title="Events"
                image="/img/backgrounds/events.jpg"
            />
            <div className="flex flex-col container py-12 gap-12">
                <div
                    id="recent-events"
                    className="flex flex-col gap-8 p-4">
                    <BlockHeader title="Recent Events" />
                    <p>The latest events run by the CSSA.</p>

                    <EventCarousel
                        events={RecentEvents}
                        label="Recent events"
                    />
                </div>

                <div
                    id="older-events"
                    className="flex flex-col gap-8 p-4">
                    <BlockHeader title="Older Events" />
                    <p>Some older events run by the CSSA.</p>

                    <EventCarousel
                        events={OlderEvents}
                        label="Older events"
                    />
                </div>

                <div
                    id="calendar"
                    className="flex flex-col gap-8 p-4">
                    <BlockHeader title="Calendar" />
                    <p>Calendar view of events run by the CSSA.</p>

                    <CalendarClientWrapper events={events ?? []} />
                </div>
            </div>
        </main>
    );
}

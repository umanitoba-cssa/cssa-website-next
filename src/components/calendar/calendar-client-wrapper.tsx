'use client';

import dynamic from 'next/dynamic';
import { IEventLink } from '@/data/events';

const CalendarSection = dynamic(() => import('./calendar-section'), {
    ssr: false,
    loading: () => <div className="max-w-6xl w-full mx-auto px-2 mt-8 min-h-[600px]" />,
});

export default function CalendarClientWrapper({ events }: { events: IEventLink[] }) {
    return <CalendarSection events={events} />;
}

'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { IEventLink } from '@/data/events';
import { useCalendarNavigation } from '@/hooks/calendar/UseCalendarNavigation';
import { useEventsByDate } from '@/hooks/calendar/UseEventsByDate';
import { useMobileWeekNavigation } from '../../hooks/calendar/useMobileWeekNavigation';
import { useDesktopNavigation } from '@/hooks/calendar/useDesktopNavigation';
import { MonthYearPickerModal } from './MonthYearPickerModal';
import EventModal from './EventModal';
import { MobileCalendar } from './CalendarSectionComponents';
import { DesktopCalendar } from './CalendarSectionComponents';

type Props = {
    events: IEventLink[];
};

export default function CalendarSection({ events }: Props) {
    const router = useRouter();
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<IEventLink | null>(null);

    const {
        year,
        month,
        grid,
        monthLabel,
        isCurrentMonth,
        goToPrevMonth,
        goToNextMonth,
        goToToday,
        goToMonth,
    } = useCalendarNavigation();

    const eventsByIso = useEventsByDate(events, grid);

    const mobileNav = useMobileWeekNavigation(
        grid,
        isCurrentMonth,
        month,
        year,
        goToPrevMonth,
        goToNextMonth,
    );

    const desktopNav = useDesktopNavigation(month, year, goToPrevMonth, goToNextMonth, goToToday);

    const handleEventClick = useCallback((event: IEventLink) => {
        setSelectedEvent(event);
    }, []);

    const handleViewEventPage = useCallback(() => {
        if (selectedEvent?.href) {
            router.push(selectedEvent.href);
        }
    }, [selectedEvent, router]);

    return (
        <div className="max-w-6xl w-full mx-auto px-2 mt-8">
            <MobileCalendar
                monthLabel={monthLabel}
                year={year}
                eventsByIso={eventsByIso}
                onEventClick={handleEventClick}
                openPicker={() => setIsPickerOpen(true)}
                goToToday={goToToday}
                {...mobileNav}
            />

            <DesktopCalendar
                grid={grid}
                eventsByIso={eventsByIso}
                onEventClick={handleEventClick}
                isCurrentMonth={isCurrentMonth}
                monthLabel={monthLabel}
                openPicker={() => setIsPickerOpen(true)}
                {...desktopNav}
            />

            <MonthYearPickerModal
                key={`${month}-${year}`}
                isOpen={isPickerOpen}
                onClose={() => setIsPickerOpen(false)}
                currentMonth={month}
                currentYear={year}
                onSelect={goToMonth}
            />

            {selectedEvent && (
                <EventModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                    onViewEvent={handleViewEventPage}
                />
            )}
        </div>
    );
}

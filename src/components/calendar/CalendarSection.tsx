'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { IEventLink } from '@/data/events';
import { useCalendarNavigation } from '../../hooks/calendar/UseCalendarNavigation';
import { CalendarCell, ChevronButton, WEEKDAYS } from './CalendarSectionComponents';
import { MonthYearPickerModal } from './MonthYearPickerModal';
import EventModal from './EventModal';

type CalendarSectionProps = {
    events: IEventLink[];
};

export function CalendarSection({ events }: CalendarSectionProps) {
    const router = useRouter();
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

    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<IEventLink | null>(null);

    const eventsByIso = useMemo(() => {
        const firstDate = grid[0]?.date;
        const lastDate = grid[grid.length - 1]?.date;
        if (!firstDate || !lastDate) return new Map<string, IEventLink[]>();

        const firstISO = firstDate.toISOString().slice(0, 10);
        const lastISO = lastDate.toISOString().slice(0, 10);

        const map = new Map<string, IEventLink[]>();
        for (const evt of events) {
            if (typeof evt.date === 'string' && evt.date >= firstISO && evt.date <= lastISO) {
                if (!map.has(evt.date)) map.set(evt.date, []);
                map.get(evt.date)!.push(evt);
            }
        }
        return map;
    }, [events, grid]);

    const handleEventClick = useCallback((event: IEventLink) => {
        setSelectedEvent(event);
    }, []);

    const handleViewEventPage = useCallback(() => {
        if (selectedEvent?.href) {
            router.push(selectedEvent.href);
        }
    }, [selectedEvent, router]);

    const handleCloseModal = useCallback(() => {
        setSelectedEvent(null);
    }, []);

    const handleMonthYearSelect = useCallback(
        (newMonth: number, newYear: number) => goToMonth(newMonth, newYear),
        [goToMonth],
    );

    const today = new Date();

    return (
        <div className="max-w-6xl w-full mx-auto px-2 relative z-10 mt-8">
            {/* Header */}
            <div className="mb-6 text-white font-roboto tracking-normal">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-10">
                    {/* Navigation Controls */}
                    <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 w-70">
                        <div className="flex-shrink-0">
                            <ChevronButton
                                direction="left"
                                onClick={goToPrevMonth}
                                label="Previous Month"
                            />
                        </div>

                        {/* Clickable Month/Year Label */}
                        <div className="flex-1 flex justify-center">
                            <button
                                onClick={() => setIsPickerOpen(true)}
                                className="group w-[200px] flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200">
                                <span className="text-lg sm:text-xl font-semibold whitespace-nowrap">
                                    {monthLabel} {year}
                                </span>
                                <svg
                                    className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-shrink-0">
                            <ChevronButton
                                direction="right"
                                onClick={goToNextMonth}
                                label="Next Month"
                            />
                        </div>
                    </div>
                    {/* Go to Today Button */}
                    {!isCurrentMonth && (
                        <button
                            onClick={goToToday}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span className="hidden xs:inline">Go to</span> Today
                        </button>
                    )}
                </div>
            </div>

            {/* Scrollable container for small screens */}
            <div className="overflow-x-auto pb-4 -mx-2 px-2">
                <div className="min-w-[600px]">
                    {/* Weekday labels */}
                    <div className="grid grid-cols-7 gap-1  text-white mb-4 sm:mb-6 font-roboto text-xs font-medium uppercase opacity-60">
                        {WEEKDAYS.map((d) => (
                            <div
                                key={d}
                                className="text-center">
                                {d}
                            </div>
                        ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-1 ">
                        {grid.map((cell, idx) => (
                            <CalendarCell
                                key={`${cell.iso}-${idx}`}
                                date={cell.date}
                                iso={cell.iso}
                                inCurrentMonth={cell.inCurrentMonth}
                                isToday={cell.date.toDateString() === today.toDateString()}
                                events={eventsByIso.get(cell.iso) || []}
                                onEventClick={handleEventClick}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Month/Year Picker Modal */}
            <MonthYearPickerModal
                key={`${month}-${year}`}
                isOpen={isPickerOpen}
                onClose={() => setIsPickerOpen(false)}
                currentMonth={month}
                currentYear={year}
                onSelect={handleMonthYearSelect}
            />

            {/* Event Details Modal */}
            {selectedEvent && (
                <EventModal
                    event={selectedEvent}
                    onClose={handleCloseModal}
                    onViewEvent={handleViewEventPage}
                />
            )}
        </div>
    );
}

export default CalendarSection;

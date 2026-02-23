import { IEventLink } from '@/data/events';
import { useMemo, useState, useCallback } from 'react';

type DayCell = {
    date: Date;
    inCurrentMonth: boolean;
    iso: string;
};

export const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const;

type CalendarCellProps = {
    date: Date;
    iso: string;
    inCurrentMonth: boolean;
    isToday: boolean;
    events: IEventLink[];
    onEventClick: (event: IEventLink) => void;
};

type ChevronButtonProps = {
    direction: 'left' | 'right';
    onClick: () => void;
    label: string;
};

export const getMonthGrid = (year: number, monthIndexZeroBased: number): DayCell[] => {
    const firstOfMonth = new Date(year, monthIndexZeroBased, 1);
    const lastOfMonth = new Date(year, monthIndexZeroBased + 1, 0);

    // Monday-start calendar: convert JS getDay() (0 = Sun) to 0 = Mon
    const jsWeekday = firstOfMonth.getDay();
    const mondayStartIndex = (jsWeekday + 6) % 7; // 0..6 with 0=Mon

    const daysInMonth = lastOfMonth.getDate();

    const grid: DayCell[] = [];

    // Days from previous month to fill the first row
    for (let i = 0; i < mondayStartIndex; i++) {
        const date = new Date(year, monthIndexZeroBased, -(mondayStartIndex - 1 - i));
        const iso = date.toISOString().slice(0, 10);
        grid.push({ date, inCurrentMonth: false, iso });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, monthIndexZeroBased, day);
        const iso = date.toISOString().slice(0, 10);
        grid.push({ date, inCurrentMonth: true, iso });
    }

    // Fill out the rest of the grid to 4x7 = 28 cells
    while (grid.length < 28) {
        const last = grid[grid.length - 1].date;
        const date = new Date(last);
        date.setDate(last.getDate() + 1);
        const iso = date.toISOString().slice(0, 10);
        grid.push({ date, inCurrentMonth: false, iso });
    }

    return grid;
};

export function CalendarCell({
    date,
    inCurrentMonth,
    isToday,
    events,
    onEventClick,
}: CalendarCellProps) {
    const hasEvents = events.length > 0;

    return (
        <div
            className={`
                relative rounded-xl backdrop-blur-md
                min-h-[36px] sm:min-h-[48px] md:min-h-[64px] lg:min-h-[80px]
                p-0.5 sm:p-1 md:p-1 
                ${isToday ? 'ring-1 ring-white' : ''}
            `}>
            <div
                className={`
                    mb-3 md:mb-4
                    text-xs sm:text-sm md:text-base lg:text-lg
                    font-medium font-roboto text-center
                    ${inCurrentMonth ? 'text-white' : 'text-white/40'}
                `}>
                {date.getDate().toString().padStart(2, '0')}
            </div>
            <div className={`space-y-2  ${hasEvents ? 'rounded-lg p-1 ' : ''}`}>
                {events.map((evt) => (
                    <div
                        key={evt.title}
                        className="p-2 cursor-pointer rounded-lg transition-colors group  bg-[#D4D4D4]/10 hover:bg-white/10"
                        onClick={() => onEventClick(evt)}>
                        <div
                            className="text-white text-xs font-medium leading-tight truncate max-w-full"
                            title={evt.title}>
                            {evt.title}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ChevronButton({ direction, onClick, label }: ChevronButtonProps) {
    const points = direction === 'left' ? '13,4 7,10 13,16' : '7,4 13,10 7,16';

    return (
        <button
            aria-label={label}
            onClick={onClick}
            className="px-1 py-0.5 rounded hover:bg-white/10 transition-colors flex items-center justify-center"
            type="button">
            <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none">
                <polyline
                    points={points}
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
}
type MobileProps = {
    monthLabel: string;
    year: number;
    displayedDays: any[];
    maxWeekIndex: number;
    mobileWeekIndex: number;
    setMobileWeekIndex: (i: number) => void;
    isCurrentWeek: boolean;
    goToToday: () => void;
    handlePrevWeek: () => void;
    handleNextWeek: () => void;
    eventsByIso: Map<string, IEventLink[]>;
    onEventClick: (event: IEventLink) => void;
    openPicker: () => void;
};

export function MobileCalendar({
    monthLabel,
    year,
    displayedDays,
    maxWeekIndex,
    mobileWeekIndex,
    setMobileWeekIndex,
    isCurrentWeek,
    goToToday,
    handlePrevWeek,
    handleNextWeek,
    eventsByIso,
    onEventClick,
    openPicker,
}: MobileProps) {
    const today = new Date();

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 min-[715px]:hidden">
                <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 w-70">
                    <div className="flex-shrink-0">
                        <ChevronButton
                            direction="left"
                            onClick={handlePrevWeek}
                            label="Previous Week"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 items-center">
                        <div className="flex-1 flex justify-center">
                            <button
                                onClick={openPicker}
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

                        <div
                            className="flex items-center gap-1.5"
                            aria-label="Week in month">
                            {Array.from({ length: maxWeekIndex + 1 }, (_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setMobileWeekIndex(i)}
                                    aria-label={`Week ${i + 1}`}
                                    aria-current={mobileWeekIndex === i ? 'true' : undefined}
                                    className={`h-2 rounded-full transition-all ${
                                        mobileWeekIndex === i
                                            ? 'w-5 bg-blue-400'
                                            : 'w-2 bg-white/30 hover:bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex-shrink-0">
                        <ChevronButton
                            direction="right"
                            onClick={handleNextWeek}
                            label="Next Week"
                        />
                    </div>
                </div>

                {!isCurrentWeek && (
                    <button
                        onClick={() => {
                            goToToday();
                            setMobileWeekIndex(Math.floor((today.getDate() - 1) / 7));
                        }}
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

            {/* days */}
            <div className="space-y-3 min-[715px]:hidden">
                {(() => {
                    const daysWithEvents = displayedDays.filter((cell) => {
                        const dayEvents = eventsByIso.get(cell.iso) || [];
                        return dayEvents.length > 0;
                    });

                    if (daysWithEvents.length === 0) {
                        return (
                            <div className="flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 p-6 shadow-sm">
                                <div className="text-center text-white/70">
                                    <svg
                                        className="w-8 h-8 mx-auto mb-2 text-white/50"
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
                                    <div className="text-sm font-medium">No events this week</div>
                                </div>
                            </div>
                        );
                    }

                    return daysWithEvents.map((cell) => {
                        const dayEvents = eventsByIso.get(cell.iso) || [];

                        const weekday = cell.date
                            .toLocaleDateString('en-US', { weekday: 'short' })
                            .toUpperCase();

                        const isToday = cell.date.toDateString() === today.toDateString();

                        return (
                            <div
                                key={cell.iso}
                                className="flex gap-3 rounded-2xl bg-white/5 border border-white/10 p-3 shadow-sm">
                                <div className="flex flex-col items-center w-14 text-white">
                                    <span className="text-[11px] font-semibold tracking-wide text-white/70">
                                        {weekday}
                                    </span>
                                    <span
                                        className={`text-2xl font-bold ${
                                            isToday ? 'text-blue-300' : ''
                                        }`}>
                                        {cell.date.getDate()}
                                    </span>
                                </div>

                                <div className="flex-1 space-y-2">
                                    {dayEvents.map((evt) => (
                                        <button
                                            key={evt.title}
                                            onClick={() => onEventClick(evt)}
                                            className="w-full text-left rounded-xl bg-[#D4D4D4]/10 hover:bg-white/10 transition-colors px-3 py-2">
                                            <div className="text-sm font-semibold text-white leading-snug">
                                                {evt.title}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    });
                })()}
            </div>
        </>
    );
}

type DesktopProps = {
    grid: any[];
    eventsByIso: Map<string, IEventLink[]>;
    onEventClick: (event: IEventLink) => void;
    year: number;
    isCurrentMonth: boolean;
    monthLabel: string;
    openPicker: () => void;
    handlePrevMonth: () => void;
    handleNextMonth: () => void;
    handleGoToToday: () => void;
};

export function DesktopCalendar({
    grid,
    eventsByIso,
    onEventClick,
    year,
    openPicker,
    handlePrevMonth,
    handleNextMonth,
    handleGoToToday,
    monthLabel,
    isCurrentMonth,
}: DesktopProps) {
    const today = new Date();

    return (
        <>
            <div className="hidden min-[715px]:flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-10">
                <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 w-70">
                    <div className="flex-shrink-0">
                        <ChevronButton
                            direction="left"
                            onClick={handlePrevMonth}
                            label="Previous Month"
                        />
                    </div>
                    <div className="flex-1 flex justify-center">
                        <button
                            onClick={openPicker}
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
                            onClick={handleNextMonth}
                            label="Next Month"
                        />
                    </div>
                </div>
                {!isCurrentMonth && (
                    <button
                        onClick={handleGoToToday}
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

            <div className="overflow-x-auto pb-4 -mx-2 px-2 hidden sm:block">
                <div className="min-w-[600px]">
                    {/* Weekday labels */}
                    <div className="grid grid-cols-7 gap-1 text-white mb-4 sm:mb-6 font-roboto text-xs font-medium uppercase opacity-60">
                        {WEEKDAYS.map((d) => (
                            <div
                                key={d}
                                className="text-center">
                                {d}
                            </div>
                        ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {grid.map((cell, idx) => (
                            <CalendarCell
                                key={`${cell.iso}-${idx}`}
                                date={cell.date}
                                iso={cell.iso}
                                inCurrentMonth={cell.inCurrentMonth}
                                isToday={cell.date.toDateString() === today.toDateString()}
                                events={eventsByIso.get(cell.iso) || []}
                                onEventClick={onEventClick}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

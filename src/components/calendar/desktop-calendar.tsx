import { IEventLink } from '@/data/events';
import { ChevronButton } from './calendar-section-components';
import { WEEKDAYS } from './calendar-section-components';
import { CalendarCell } from './calendar-section-components';

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

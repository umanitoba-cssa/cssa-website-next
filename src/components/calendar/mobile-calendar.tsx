import { IEventLink } from '@/data/events';
import { ChevronButton } from './calendar-section-components';

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

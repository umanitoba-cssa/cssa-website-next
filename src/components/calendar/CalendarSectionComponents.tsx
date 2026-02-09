import { IEventLink } from '@/data/events';

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

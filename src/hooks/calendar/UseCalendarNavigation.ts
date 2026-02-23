import { useState, useMemo, useCallback } from 'react';
import { getMonthGrid } from '../../components/calendar/CalendarSectionComponents';

const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export function useCalendarNavigation() {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());

    const grid = useMemo(() => getMonthGrid(year, month), [year, month]);
    const monthLabel = MONTH_NAMES[month];

    const goToPrevMonth = useCallback(() => {
        if (month === 0) {
            setMonth(11);
            setYear((y) => y - 1);
        } else {
            setMonth((m) => m - 1);
        }
    }, [month]);

    const goToNextMonth = useCallback(() => {
        if (month === 11) {
            setMonth(0);
            setYear((y) => y + 1);
        } else {
            setMonth((m) => m + 1);
        }
    }, [month]);

    const goToToday = useCallback(() => {
        const now = new Date();
        setYear(now.getFullYear());
        setMonth(now.getMonth());
    }, []);

    const goToMonth = useCallback((newMonth: number, newYear: number) => {
        setMonth(newMonth);
        setYear(newYear);
    }, []);

    const isCurrentMonth = month === today.getMonth() && year === today.getFullYear();

    return {
        year,
        month,
        grid,
        monthLabel,
        isCurrentMonth,
        goToPrevMonth,
        goToNextMonth,
        goToToday,
        goToMonth,
    };
}

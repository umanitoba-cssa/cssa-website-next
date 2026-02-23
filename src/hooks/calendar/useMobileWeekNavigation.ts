import { useMemo, useState, useCallback } from 'react';

type Cell = {
    date: Date;
    iso: string;
    inCurrentMonth: boolean;
};

export function useMobileWeekNavigation(
    grid: Cell[],
    isCurrentMonth: boolean,
    month: number,
    year: number,
    goToPrevMonth: () => void,
    goToNextMonth: () => void,
) {
    const today = new Date();

    const [mobileWeekIndex, setMobileWeekIndex] = useState(() =>
        Math.floor((today.getDate() - 1) / 7),
    );

    const currentMonthDays = useMemo(() => grid.filter((cell) => cell.inCurrentMonth), [grid]);

    const maxWeekIndex = Math.max(0, Math.ceil(currentMonthDays.length / 7) - 1);

    const displayedDays = currentMonthDays.slice(mobileWeekIndex * 7, (mobileWeekIndex + 1) * 7);

    const todayIso = today.toISOString().slice(0, 10);

    const isCurrentWeek = isCurrentMonth && displayedDays.some((cell) => cell.iso === todayIso);

    const handlePrevWeek = useCallback(() => {
        if (mobileWeekIndex <= 0) {
            const prevMonth = month === 0 ? 11 : month - 1;
            const prevYear = month === 0 ? year - 1 : year;
            const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
            const lastWeekPrev = Math.max(0, Math.ceil(daysInPrevMonth / 7) - 1);

            goToPrevMonth();
            setMobileWeekIndex(lastWeekPrev);
        } else {
            setMobileWeekIndex((i) => i - 1);
        }
    }, [mobileWeekIndex, month, year, goToPrevMonth]);

    const handleNextWeek = useCallback(() => {
        if (mobileWeekIndex >= maxWeekIndex) {
            goToNextMonth();
            setMobileWeekIndex(0);
        } else {
            setMobileWeekIndex((i) => i + 1);
        }
    }, [mobileWeekIndex, maxWeekIndex, goToNextMonth]);

    return {
        mobileWeekIndex,
        setMobileWeekIndex,
        displayedDays,
        maxWeekIndex,
        isCurrentWeek,
        handlePrevWeek,
        handleNextWeek,
    };
}

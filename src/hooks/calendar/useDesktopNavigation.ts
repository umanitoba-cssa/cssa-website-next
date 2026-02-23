import { useCallback } from 'react';

export function useDesktopNavigation(
    month: number,
    year: number,
    goToPrevMonth: () => void,
    goToNextMonth: () => void,
    goToToday: () => void,
) {
    const handlePrevMonth = useCallback(() => {
        goToPrevMonth();
    }, [goToPrevMonth]);

    const handleNextMonth = useCallback(() => {
        goToNextMonth();
    }, [goToNextMonth]);

    const handleGoToToday = useCallback(() => {
        goToToday();
    }, [goToToday]);

    return {
        month,
        year,
        handlePrevMonth,
        handleNextMonth,
        handleGoToToday,
    };
}

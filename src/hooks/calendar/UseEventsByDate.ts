import { useMemo } from 'react';
import { IEventLink } from '@/data/events';

export function useEventsByDate(events: IEventLink[], grid: { date: Date; iso: string }[]) {
    return useMemo(() => {
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
}

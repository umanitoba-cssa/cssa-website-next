import { useMemo } from 'react';
import { IEventLink } from '@/data/events';

export function useEventsByDate(events: IEventLink[], grid: { date: Date; iso: string }[]) {
    return useMemo(() => {
        const firstDate = grid[0]?.date;
        const lastDate = grid[grid.length - 1]?.date;
        if (!firstDate || !lastDate) return new Map<string, IEventLink[]>();

        const map = new Map<string, IEventLink[]>();

        for (const evt of events) {
            if (!evt.date) continue;

            if (evt.date >= firstDate && evt.date <= lastDate) {
                const iso = evt.date.toISOString().slice(0, 10);

                if (!map.has(iso)) map.set(iso, []);
                map.get(iso)!.push(evt);
            }
        }

        return map;
    }, [events, grid]);
}

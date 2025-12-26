export interface IEventLink {
    title: string;
    description: string;
    href: string;
    internal?: boolean;
    linkText?: string;

    // A Mandatory  date would be needed to implement the calendar (in the format YYYY-MM-DD).
    date: string;
}

const goosiesDescription = 'Annual award show for the Department of Computer Science';

export const RecentEvents: Map<string, IEventLink> = new Map([
    [
        'game-jam-2025',
        {
            title: 'Game Jam 2025',
            description: 'Compete to build a game with the theme "Evolution"',
            href: 'events/game-jam-2025',
            internal: true,
            linkText: 'See Page →',
            date: '2025-11-12',
        },
    ],
    [
        'capture-the-flag-2025',
        {
            title: 'Capture The Flag 2025',
            description:
                'Compete with a team in cybersecurity challenges with the theme "Murder Mystery"',
            href: 'events/capture-the-flag-2025',
            internal: true,
            linkText: 'View Photos →',
            date: '2025-11-11',
        },
    ],
    [
        'goosies-2024',
        {
            title: 'Goosies 2024',
            description: goosiesDescription,
            href: 'events/goosies-2024',
            internal: true,
            linkText: 'View Photos →',
            date: '2025-11-13',
        },
    ],
    [
        'bonfire-2024',
        {
            title: 'Bonfire 2024',
            description: 'Hang around the campfire with the CSSA',
            href: 'events/bonfire-2024',
            internal: true,
            linkText: 'View Photos →',
            date: '2025-12-26',
        },
    ],
]);

export const OlderEvents: Map<string, IEventLink> = new Map([
    [
        'game-jam-2024',
        {
            title: 'Game Jam 2024',
            description: 'Compete with a team to build a game with the theme "Under Pressure"',
            href: 'events/game-jam-2024',
            internal: true,
            linkText: 'See Page →',
            date: '2024-11-26',
        },
    ],
    [
        'goosies-2023',
        {
            title: 'Goosies 2023',
            description: goosiesDescription,
            href: 'events/goosies-2023',
            internal: true,
            linkText: 'View Photos →',
            date: '2025-12-26',
        },
    ],
]);

export const allEventsArray: IEventLink[] = [
    ...Array.from(RecentEvents.entries()).map(([id, e]) => ({ ...e, id, date: e.date! })),
    ...Array.from(OlderEvents.entries()).map(([id, e]) => ({ ...e, id, date: e.date! })),
];

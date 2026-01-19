interface IEventLink {
    title: string;
    description: string;
    href: string;
    internal?: boolean;
    linkText?: string;
}
export interface ICalendarEventLink {
    title: string;
    description: string;
    href: string;
    internal?: boolean;
    linkText?: string;
    date: string;
}

const goosiesDescription = 'Annual award show for the Department of Computer Science';

export const RecentEvents: Map<string, IEventLink> = new Map([
    [
        'capture-the-flag-2026',
        {
            title: 'Capture The Flag 2026',
            description: 'Compete with a team in cybersecurity challenges',
            href: 'events/capture-the-flag-2026',
            internal: true,
            linkText: 'See Page →',
        },
    ],
    [
        'game-jam-2025',
        {
            title: 'Game Jam 2025',
            description: 'Compete to build a game with the theme "Evolution"',
            href: 'events/game-jam-2025',
            internal: true,
            linkText: 'See Page →',
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

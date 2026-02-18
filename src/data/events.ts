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

export interface IUpcomingEvent {
    title: string;
    date: string;
    description: string;
    image: string;
    link?: string;
    linkText?: string;
}

const AllUpcomingEvents: IUpcomingEvent[] = [
    {
        title: 'CSSA Bonfire',
        date: 'September 13th 2025',
        description:
            "Join us for a cozy evening of s'mores, socializing, and fun at the annual CSSA Bonfire! Meet fellow CS students and enjoy the warmth of the fire.",
        image: '/img/teasers/community.jpg',
        link: '/events/bonfire',
        linkText: 'Learn More',
    },
    {
        title: 'CSSA Bonfire',
        date: 'September 13th 2026',
        description:
            "JoinJoinJoinJoinJoinJoinJoinJoinJoinJoinJoinJoinJoinJoinJoinJoinJoinJoinvJoin us for a cozy evening of s'mores, socializing, and fun at the annual CSSA Bonfire! Meet fellow CS students and enjoy the warmth of the fire.",
        image: '/img/teasers/community.jpg',
        link: '/events/bonfire',
        linkText: 'Learn More',
    },
    {
        title: 'Game Jam 2026',
        date: 'November 11th 2026',
        description:
            'Put your game development skills to the test! Compete in teams to create a game from scratch in just 48 hours. Prizes, food, and fun await!',
        image: '/img/teasers/resources.jpg',
        link: '/events/game-jam',
        linkText: 'Learn More',
    },
    {
        title: 'Research Showcase',
        date: 'January 7th 2027',
        description:
            'Discover the cutting-edge research happening right here in the CS department. Connect with professors and graduate students to learn about their work.',
        image: '/img/teasers/advocacy.jpg',
        link: '/resources/researchers',
        linkText: 'Learn More',
    },
];

export const UPCOMING_EVENTS: IUpcomingEvent[] = AllUpcomingEvents.filter((event) => {
    return new Date(event.date.replace(/(\d+)(st|nd|rd|th)/, '$1')) > new Date();
}).sort((a, b) => {
    // sort by time
    return (
        new Date(a.date.replace(/(\d+)(st|nd|rd|th)/, '$1')).getTime() -
        new Date(b.date.replace(/(\d+)(st|nd|rd|th)/, '$1')).getTime()
    );
});

export interface IEventLink {
    title: string;
    description: string;
    href: string;
    internal?: boolean;
    linkText?: string;
    date?: string;
    image?: string;
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
            image: '/img/capture-the-flag/2026photos/IMG_1320.JPG',
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
            image: '/img/game-jam/2025/gj_banner.svg',
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
            image: '/img/goosies/2024photos/ccdr 2025-04-25 192550.801.jpeg',
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
            image: '/img/bonfire/2024photos/IMG_1753.jpeg',
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
            image: '/img/capture-the-flag/2025photos/IMG_0818.jpeg',
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
            image: '/img/game-jam/2024/banner.svg',
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
            image: '/img/backgrounds/home.jpg',
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
        title: 'Case Competition',
        date: 'March 21, 2026',
        description:
            'Love problem-solving? Join us for a case competition where teams of five compete to solve a technical challenge.',
        image: '/img/case-competition/banner-case-comp.png',
        link: '/events/case-competition-2026',
        linkText: 'Learn More',
    },
];

export const UpcomingEvents: IUpcomingEvent[] = AllUpcomingEvents.filter((event) => {
    return new Date(event.date.replace(/(\d+)(st|nd|rd|th)/, '$1')) > new Date();
}).sort((a, b) => {
    // sort by time
    return (
        new Date(a.date.replace(/(\d+)(st|nd|rd|th)/, '$1')).getTime() -
        new Date(b.date.replace(/(\d+)(st|nd|rd|th)/, '$1')).getTime()
    );
});

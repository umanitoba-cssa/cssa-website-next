export interface IEventLink {
    title: string;
    description: string;
    href: string;
    internal?: boolean;
    linkText?: string;
    date?: Date;
    image?: string;
}

const goosiesDescription = 'Annual award show for the Department of Computer Science';

export const RecentEvents: Map<string, IEventLink> = new Map([
    [
        'case-competition-2026',
        {
            title: 'Design & Craft Sprint',
            date: new Date('March 21, 2026'),
            description: 'Teams of five compete to solve a technical challenge.',
            href: '/events/case-competition-2026',
            internal: true,
            linkText: 'See Page →',
            image: '/img/case-competition/banner.png',
        },
    ],
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
        'goosies-2025',
        {
            title: 'Goosies 2025',
            description: goosiesDescription,
            href: 'events/goosies-2025',
            internal: true,
            linkText: 'View Photos →',
            image: '/img/goosies/2025photos/ccdr 2025-04-25 192550.801.jpeg',
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
        'goosies-2024',
        {
            title: 'Goosies 2024',
            description: goosiesDescription,
            href: 'events/goosies-2024',
            internal: true,
            linkText: 'See page →',
            image: '/img/backgrounds/home.jpg',
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

const AllUpcomingEvents: Map<string, IEventLink> = new Map([
    [
        'general-meeting-bonfire-2026',
        {
            title: 'Summer General Meeting & Bonfire',
            date: new Date('July 13, 2026'),
            description: 'Pending official description.',
            href: '/events/general-meeting-bonfire-2026',
            linkText: 'Learn More',
            image: '/img/bonfire/2024photos/IMG_1670.jpeg', // pending official image
        },
    ],
]);

export const UpcomingEvents: IEventLink[] = (() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return Array.from(AllUpcomingEvents.values())
        .filter(
            (event): event is IEventLink & { date: Date } =>
                event.date !== undefined && event.date >= today,
        )
        .sort((a, b) => a.date.getTime() - b.date.getTime());
})();

interface IEventLink {
    title: string;
    description: string;
    href: string;
    internal?: boolean;
    linkText?: string;
}

const goosiesDescription = 'Annual award show for the Department of Computer Science'

export const RecentEvents: IEventLink[] = [
    {
        title: 'Game Jam 2025',
        description:
            'Compete to build a game with the theme "Evolution"',
        href: 'events/game-jam-2025',
        internal: true,
        linkText: 'See Page →'
    },
    {
        title: 'Capture The Flag 2025',
        description:
            'Compete with a team in cybersecurity challenges with the theme "Murder Mystery"',
        href: 'events/capture-the-flag-2025',
        internal: true,
        linkText: 'View Photos →'
    },
    {
        title: 'Goosies 2024',
        description: goosiesDescription,
        href: 'events/goosies-2024',
        internal: true,
        linkText: 'View Photos →'
    },
    {
        title: 'Bonfire 2024',
        description:
            'Hang around the campfire with the CSSA',
        href: 'events/bonfire-2024',
        internal: true,
        linkText: 'View Photos →'
    },
]

export const OlderEvents: IEventLink[] = [
    {
        title: 'Game Jam 2024',
        description:
            'Compete with a team to build a game with the theme "Under Pressure"',
        href: 'events/game-jam-2024',
        internal: true,
        linkText: 'See Page →'
    },
    {
        title: 'Goosies 2023',
        description: goosiesDescription,
        href: 'events/goosies-2023',
        internal: true,
        linkText: 'View Photos →'
    },
]

interface IEventLink {
    title: string;
    description: string;
    href: string;
    internal?: boolean;
    linkText?: string;
}

export const RecentEvents: IEventLink[] = [
    {
        title: 'Game Jam 2025',
        description:
            'Compete to build a game with the theme "Evolution"',
        href: 'gamejam',
        internal: true,
        linkText: 'See Page →'
    },
    {
        title: 'Capture The Flag 2025',
        description:
            'Compete with a team in cybersecurity challenges',
        href: 'events/capturetheflag2025',
        internal: true,
        linkText: 'View Photos →'
    },
    {
        title: 'Goosies  2024',
        description:
            'Annual award show for the Department of Computer Science',
        href: 'events/goosies2024',
        internal: true,
        linkText: 'View Photos →'
    },
    {
        title: 'Bonfire 2024',
        description:
            'Hang around the campfire with the CSSA',
        href: 'events/bonfire2024',
        internal: true,
        linkText: 'View Photos →'
    },
]

export const OlderEvents: IEventLink[] = [
    {
        title: 'Game Jam 2024',
        description:
            'Compete with a team to build a game',
        href: 'events/gamejam2024',
        internal: true,
        linkText: 'See Page →'
    },
    {
        title: 'Goosies  2023',
        description:
            'Annual award show for the Department of Computer Science',
        href: 'events/goosies2023',
        internal: true,
        linkText: 'View Photos →'
    },
]

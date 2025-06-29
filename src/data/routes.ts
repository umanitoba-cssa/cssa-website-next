interface IRoute {
    title: string;
    href: string;
    image: string;
    showInNavbar?: boolean;
}

export const Routes: IRoute[] = [
    {
        title: 'Home',
        href: '/',
        image: "/img/backgrounds/home.jpg",
        showInNavbar: true
    },
    {
        title: 'Team',
        href: '/team',
        image: "/img/backgrounds/home.jpg",
        showInNavbar: true
    },
    {
        title: 'Resources',
        href: '/resources',
        image: "/img/backgrounds/home.jpg",
        showInNavbar: true
    },
    {
        title: 'Guides',
        href: '/resources/guides',
        image: "/img/backgrounds/resources.png",
        showInNavbar: false
    },
    {
        title: 'Lounge',
        href: '/lounge',
        image: "/img/backgrounds/home.jpg",
        showInNavbar: true
    },
    {
        title: 'Sponsor Us',
        href: '/sponsor',
        image: "/img/backgrounds/home.jpg",
        showInNavbar: true
    },
    {
        title: 'Contact',
        href: '/contact',
        image: "/img/backgrounds/home.jpg",
        showInNavbar: true
    },
    {
        title: '',
        href: '/Goosies',
        image: "/img/backgrounds/home.jpg"
    },
    {
        title: '',
        href: '/Email',
        image: "/img/backgrounds/home.jpg"
    },
    {
        title: '',
        href: '/MovieNight',
        image: "/img/backgrounds/home.jpg"
    }
]
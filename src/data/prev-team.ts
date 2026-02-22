import { IProfile } from './team';

export const PrevExecsProfiles = [
    {
        name: 'Okiki Fasanmi',
        group: 'Exec',
        position: 'Vice President',
        image: '/img/team/prevExecs/okiki.png',
        year: '2024 - 2025',
    },
    {
        name: 'Tofunmi Layi-Babatunde',
        group: 'Exec',
        position: 'Director of Advocacy',
        image: '/img/team/prevExecs/tofunmi.png',
        year: '2024 - 2025',
    },
    {
        name: 'Edwin Duong',
        group: 'Exec',
        position: 'Director of Internal Affairs',
        image: '/img/team/vacant.png',
        year: '2024 - 2025',
    },
    {
        name: 'Travis Friesen',
        group: 'Exec',
        position: 'Director of Promotions',
        image: '/img/team/execs/travis.JPG',
        year: '2024 - 2025',
    },
    {
        name: 'Chinu Chandaria',
        group: 'Exec',
        position: 'Director of Events',
        image: '/img/team/prevExecs/chinu.png',
        year: '2024 - 2025',
    },
    {
        name: 'Ginelle Temull',
        group: 'Exec',
        position: 'Director of Finance',
        image: '/img/team/prevExecs/ginelle.png',
        year: '2024 - 2025',
    },
    {
        name: 'KC del Moro',
        group: 'Exec',
        position: 'Assistant Director of Promotions',
        image: '/img/team/execs/kc.JPG',
        year: '2024 - 2025',
    },
];

export const filterByYear = (profile: IProfile[], year: string) => {
    return profile.filter((exec) => exec.year === year);
};

export const years = ['2024 - 2025'];

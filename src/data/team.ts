export interface IProfile {
    name: string;
    pronouns?: string;
    group: string;
    position: string;
    image: string;
    image_silly?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
    website?: string;
    discord?: string;
    description?: string;
    goals?: string;
    interests_hobbies?: string;
    year?: string;
}

/** Each property must be present in at least one of the members, otherwise, this will cause an error.
 *   You can assign an empty string to the property, if no team member has that property.
 *   There's code that ensures that such a property won't be rendered visually.
 **/
export const ExecProfiles = [
    {
        name: 'Ryann',
        pronouns: 'He/Him',
        group: 'Exec',
        position: 'President',
        image: '/img/team/execs/ryann.jpg',
        image_silly: '/img/team/execs/ryann-silly.jpg',
        goals: "Reach students who don't know about CSSA yet, help them find their way into the club, and leave the club in a stronger position for the future.",
        interests_hobbies:
            'Very into music — plays piano and acoustic guitar, composes music, and spends a lot of time listening to it.',
        year: '2026 - 2027',
    },
    {
        name: 'Sheikh Adeeb',
        pronouns: 'He/Him',
        group: 'Exec',
        position: 'Vice President',
        image: '/img/team/execs/adeeb.jpg',
        image_silly: '/img/team/execs/adeeb-silly.jpg',
        goals: 'Make CSSA feel more inclusive and less intimidating, especially for students who might not know where they fit in or how to get involved.',
        interests_hobbies:
            'Big football/soccer fan and has been playing and watching since he was 7. \
        Also really likes Joji and Bojack Horseman.',
        year: '2026 - 2027',
        website: 'https://sheikhadeeb.com/',
        github: 'https://github.com/SheikhAdeeb',
        linkedin: 'https://www.linkedin.com/in/sheikh-adeeb',
    },
    {
        name: 'Miah Tayen',
        pronouns: 'He/Him',
        group: 'Exec',
        position: 'Director of Internal Affairs',
        image: '/img/team/execs/miah.jpg',
        image_silly: '/img/team/execs/miah-silly.jpg',
        goals: "Make things easier for the exec team by having better systems in place, whether that's Discord tools, documentation, or scheduling.",
        interests_hobbies:
            'Likes running, organizing basically everything, tinkering with Neovim, and getting into homelabbing. Uses Obsidian for pretty much everything.',
        year: '2026 - 2027',
    },
    {
        name: 'Godsjasmine Okoror',
        pronouns: 'She/Her',
        group: 'Exec',
        position: 'Director of Lounge Affairs',
        image: '/img/team/execs/jasmine.jpg',
        image_silly: '/img/team/execs/jasmine-silly.jpg',
        goals: 'Make the CS Lounge a more welcoming and organized place where students can relax, meet people, and feel like they belong.',
        interests_hobbies:
            'Interested in making the CS Lounge a friendly place where people can relax and connect with each other.',
        year: '2026 - 2027',
    },
    {
        name: 'Moulik Bhatia',
        pronouns: 'He/Him',
        group: 'Exec',
        position: 'Director of Promotions',
        image: '/img/team/execs/moulik.jpg',
        image_silly: '/img/team/execs/moulik-silly.jpg',
        goals: "Get CSSA in front of as many students as possible, especially people who are new to the club. If people know what's going on and actually show up to our events, I'll consider that a win.",
        interests_hobbies:
            'Really into hip-hop/R&B kendrick Lamar, frank ocean , tyler the creator, vinyl and physical media. \
        Huge video game fan, especially Metal Gear Solid, Resident Evil, the Souls games. \
        Also likes comic books spider-man and batman.',
        year: '2026 - 2027',
    },
    {
        name: 'Dhairya Patel',
        pronouns: 'He/Him',
        group: 'Exec',
        position: 'Director of Finance',
        image: '/img/team/execs/dhairya.jpg',
        image_silly: '/img/team/execs/dhairya-silly.jpg',
        goals: 'Build connections with people in industry and improve the financial documentation and processes that CSSA uses.',
        interests_hobbies: 'Likes sci-fi and horror movies. Also likes pizza.',
        year: '2026 - 2027',
    },
    {
        name: 'Aidan McLeod',
        pronouns: 'He/Him',
        group: 'Exec',
        position: 'Director of Technology',
        image: '/img/team/execs/aidan.jpg',
        image_silly: '/img/team/execs/aidan-silly.jpg',
        goals: 'Improve the CSSA tech projects and the infrastructure behind them, while running the tech committee and giving students opportunities to learn and work on projects.',
        interests_hobbies:
            'Likes cycling, karate, jazz, physics, gaming, and homelabbing. \
        Says he likes to learn and yap about his many interests and projects.',
        year: '2026 - 2027',
        website: 'https://aidanmcleod.ca/',
        github: 'https://github.com/ACM02',
        linkedin: 'https://www.linkedin.com/in/aidan-c-mcleod',
    },
    {
        name: 'Michelle',
        pronouns: 'She/Her',
        group: 'Exec',
        position: 'Director of Events',
        image: '/img/team/execs/michelle.jpg',
        image_silly: '/img/team/execs/michelle-silly.jpg',
        goals: 'Help organize and run events that bring CS students together and give them more opportunities to socialize and get involved with CSSA.',
        interests_hobbies:
            'Likes going to the gym, trying new food places, and being social. Big Drake fan, has climbed Machu Picchu, and loves playing basketball despite being really bad at it.',
        year: '2026 - 2027',
    },
    {
        name: 'Nishchay Kathuria',
        pronouns: 'He/Him',
        group: 'Exec',
        position: 'Director of Student Affairs',
        image: '/img/team/execs/nishchay.jpg',
        image_silly: '/img/team/execs/nishchay-silly.jpg',
        goals: 'Make CSSA feel more approachable and connected. \
        I want students to feel comfortable coming to us with questions, ideas, or just to meet people.',
        interests_hobbies:
            'Likes building things, breaking them, and figuring out how to fix them. \
        Also into cooking, the NBA, new music, and geopolitics.',
        year: '2026 - 2027',
    },
    {
        name: 'Edith',
        pronouns: 'She/Her',
        group: 'Exec',
        position: 'Director of Advocacy',
        image: '/img/team/execs/edith.jpg',
        image_silly: '/img/team/execs/edith-silly.jpg',
        goals: 'Represent CS students to the department and help make CSSA spaces more welcoming and inclusive.',
        interests_hobbies:
            'Likes discovering new music, watching horror movies, and meeting new people.',
        year: '2026 - 2027',
        website: 'https://edith.mom/',
        github: 'https://github.com/ediffs',
        linkedin: 'https://www.linkedin.com/in/edith-hohner/',
    },
];

export const PromotionsProfiles = [];

export const EventsProfiles = [];

export const TechnologyProfiles = [];

export const AdvocacyProfiles = [];

export const StudentResourcesProfiles = [];

export const LoungeProfiles = [];

export const MerchProfiles = [];

export const filterByYear = (profile: IProfile[], year: string) => {
    return profile.filter((exec) => exec.year === year);
};

export const years = ['2026 - 2027'];
export const FinanceProfiles = [];

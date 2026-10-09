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
        name: 'Ryann Pastolero',
        pronouns: 'He/Him',
        group: 'Exec',
        position: 'President',
        image: '/img/team/execs/ryann.jpg',
        image_silly: '/img/team/execs/ryann-silly.jpg',
        goals: 'I hope to make connections with new students who are unaware of the club yet and to show them the path into the club! Furthermore, to set up the club for a stronger future in connections and governance.',
        interests_hobbies:
            'In my free time out of tech time, I like to play my piano and acoustic guitar. I really enjoy music composition!',
        year: '2026 - 2027',
    },
    {
        name: 'Sheikh Adeeb',
        pronouns: 'He/Him',
        group: 'Exec',
        position: 'Vice President',
        image: '/img/team/execs/adeeb.jpg',
        image_silly: '/img/team/execs/adeeb-silly.jpg',
        goals: 'I have a ton of plans for this year, but the most important one is making CSSA feel more inclusive. I felt pretty intimidated during my first year(s) and I hope to help others not feel the same.',
        interests_hobbies:
            "I love (obsess over) soccer, I have been watching/playing football ⚽️ since I was 7. I've been a Joji fan since before he was Joji. I love Bojack Horseman, the show and NOT the character.",
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
        goals: "I hope to create a more intuitive system so all the other execs have the tools necessary  to do their job whether that's though a discord meetings bot, clear documentation or scheduling!",
        interests_hobbies:
            " I enjoy running, breaking my Neovim config and ORGANIZING (you don't want to ask me how), the latter of which some might consider an obsession. \n Since this is unsolicited, I use Obsidian for everything* while Notion for Scheduling. I am a retired Weeb, Freiren is Beyond Good 🥁 (if you know you know), and currently getting myself into homelabbing. I would not suggest it in this economy :(",
        year: '2026 - 2027',
    },
    {
        name: 'Godsjasmine Okoror',
        pronouns: 'She/Her',
        group: 'Exec',
        position: 'Director of Lounge Affairs',
        image: '/img/team/execs/jasmine.jpg',
        image_silly: '/img/team/execs/jasmine-silly.jpg',
        goals: 'I hope to make the CS Lounge a more welcoming, organized and inclusive space where students can relax, connect with others and feel like they belong.',
        interests_hobbies:
            'Aside from academics  and all ,  I love listening to music, singing, eating homemade food and overall just hanging out with my friends. Oh yesss I like to yap too. Iykyk.',
        year: '2026 - 2027',
    },
    {
        name: 'Moulik Bhatia',
        pronouns: 'He/Him',
        group: 'Exec',
        position: 'Director of Promotions',
        image: '/img/team/execs/moulik.jpg',
        image_silly: '/img/team/execs/moulik-silly.jpg',
        goals: "I want to make CSSA a household name (well club) for as many students as possible, especially people who are new to the club. If people know the club's current happenings and actually show up to our events, I'll consider that a win.",
        interests_hobbies:
            'I am REALLY into hip-hop/R&B music including Kendrick Lamar, Frank Ocean and Tyler the creator. I also collect vinyl and physical media! 📼 \
        Huge video game nerd, especially Metal Gear Solid, Resident Evil, the Souls games. \n I LOVE comic books favourites being : Ultimate Spider-Man 🕷️ and Absolute Batman.',
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
        interests_hobbies:
            'Apart from academics, I like watching sci-fi and horror movies. Oh yes, I like pizza.',
        year: '2026 - 2027',
    },
    {
        name: 'Aidan McLeod',
        pronouns: 'He/Him',
        group: 'Exec',
        position: 'Director of Technology',
        image: '/img/team/execs/aidan.jpg',
        image_silly: '/img/team/execs/aidan-silly.jpg',
        goals: 'As director of tech I plan to work on improving existing CSSA tech projects like our website, discord bots, door sensor, and all the infrastructure and documentation that supports them.  I will also run the tech committee to aid in accomplishing these tasks and to provide mentorship and learning opportunities to interested CS students. Lastly, I also hope to bring new initiatives including an upgraded canteen system and an information dashboard to put on the new lounge TV. ',
        interests_hobbies:
            'Some of my interests/hobbies include: Cycling 🚴‍♂️, Karate, playing in a jazz band, home labbing, physics, gaming, and yapping about any of the above.',
        year: '2026 - 2027',
        website: 'https://aidanmcleod.ca/',
        github: 'https://github.com/ACM02',
        linkedin: 'https://www.linkedin.com/in/aidan-c-mcleod',
    },
    {
        name: 'Michelle Okolie',
        pronouns: 'She/Her',
        group: 'Exec',
        position: 'Director of Events',
        image: '/img/team/execs/michelle.jpg',
        image_silly: '/img/team/execs/michelle-silly.jpg',
        goals: 'Help organize and run events that bring CS students together and give them more opportunities to socialize and get involved with CSSA.',
        interests_hobbies:
            'I like going to the gym, trying out new food places, and being social in general. I think drake is probably the greatest artist of our generation. i have climbed machu picchu. i love playing basketball even though i’m really bad at it.',
        year: '2026 - 2027',
    },
    {
        name: 'Nishchay Kathuria',
        pronouns: 'He/Him',
        group: 'Exec',
        position: 'Director of Student Affairs',
        image: '/img/team/execs/nishchay.jpg',
        image_silly: '/img/team/execs/nishchay-silly.jpg',
        goals: 'I want to make CSSA feel more approachable and connected for students. Whether someone has a question, an idea, or just wants to meet more people in CS, I want them to feel like there’s a place for them here.',
        interests_hobbies:
            "I like building things, breaking them, and figuring out how to make them work again. If an idea stays in my head long enough, there's a good chance I'll try turning it into a project. I love cooking, watching the NBA, discovering new music, and keeping up with geopolitics, usually more than I probably need to.",
        year: '2026 - 2027',
    },
    {
        name: 'Edith Hohner',
        pronouns: 'She/Her',
        group: 'Exec',
        position: 'Director of Advocacy',
        image: '/img/team/execs/edith.jpg',
        image_silly: '/img/team/execs/edith-silly.jpg',
        goals: 'I am honoured and excited for this opportunity to represent the CS student body to the department, and to help make our spaces more welcoming and inclusive than before!',
        interests_hobbies:
            'I love listening to new music, reading books, and meeting new people. I spend a lot of my free time watching bad slasher movies (my all time favourite is Scream).',
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

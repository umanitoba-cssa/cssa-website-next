export interface IProfile {
    name: string;
    position: string;
    image: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
    website?: string;
    discord?: string;
    description?: string;
    year?: string;
}

/** Each property must be present in at least one of the members, otherwise, this will cause an error.
 *   You can assign an empty string to the property, if no team member has that property.
 *   There's code that ensures that such a property won't be rendered visually.
 **/
export const ExecProfiles = [
    {
        name: 'Travis Friesen',
        position: 'President',
        image: '/img/team/execs/travis.JPG',
        linkedin: 'https://www.linkedin.com/in/travisfriesen/',
        github: 'https://github.com/travisfriesen',
        website: 'https://travisfriesen.ca',
        description:
            "Hi 👋, My name is Travis and I'm going into my third year at the University of Manitoba. \
            I'm super excited to see what I can accomplish as the President of the CSSA this year. \
            In the past I've been the Director of Technology and Promotions with the CSSA. \
            In my free time I hang out with my cats, tinker with the various computers in my closet, or watch TV Shows.",
        year: '2025/2026',
    },
    {
        name: 'KC del Moro',
        position: 'Vice President',
        image: '/img/team/execs/kc.JPG',
        linkedin: 'https://www.linkedin.com/in/kriza-del-moro-950378301/',
        description:
            "Hii everyone! My name's KC and I'm the Vice President for this year's CSSA 2025-2026 😄 On my free time I love reading \
            webtoons, learning languages, playing games with friends, and cooking! c: As someone who has a passion for leading and \
            someone who values and strives for inclusivity, I decided to take on this role as I found it to align with my aspirations. \
            My goal this year is to lead and come up with initiatives that can help make the CSSA less intimidating for newer students \
            and more inclusive of women and gender minorities—whilst also providing support. Please look forward to our projects for the year!!",
        year: '2025/2026',
    },
    {
        name: 'Timmy',
        position: 'Director of Internal Affairs',
        image: '/img/team/execs/timmy.JPG',
        description:
            "Hi! My name is Timmy! \
            I'm the director of Internal Affairs for the following school year. \
            I spend most of my time with friends, or mostly playing games. \
            Many of my interests are in various research fields here at the UofM. \
            I also enjoy participating in various events held here, such as devhacks and capture the flag competitions!",
        year: '2025/2026',
    },
    {
        name: 'Edith',
        position: 'Director of Lounge Affairs',
        image: '/img/team/execs/edith.JPG',
        linkedin: 'https://www.linkedin.com/in/edith-hohner-300658331/',
        github: 'https://github.com/ediffs',
        description:
            "Hi I'm Edith, the Director of Lounge Affairs for the CSSA! \
        I'm currently in my second year of the CS-Math Joint Honours program. \
        Outside of school, my hobbies include game dev, reading, and chatting with friends. \
        I'm excited for this opportunity to work on making the lounge more accessible and a safer space for everyone!",
        year: '2025/2026',
    },
    {
        name: 'Matthew Andico',
        position: 'Director of Promotions',
        image: '/img/team/execs/matthew.JPG',
        linkedin: 'https://www.linkedin.com/in/matthew-andico',
        description:
            "Hi everyone! My name is Matthew and I’m the 2025-2026 CSSA Director of Promotions! \
        I’m currently a fourth year in Computer Science student minoring in Psychology. \
        I started being involved with the CS community in second year, participating in events held by the CSSA, \
        WICS(and volunteering in their outreach workshops), and .devClub. There, I’ve met so many new people to \
        talk and learn things from. After being on the Promotions Committee last year as a councillor, I’ve \
        thoroughly enjoyed taking photos during events and creating social media post designs. This experience has \
        taught me what needs to be improved on for this year, so stay tuned to our socials for that! \
        Outside of academics, I enjoy photography, listening to music, playing games and sports with friends, \
        and cooking. I also love going out to get food or matcha with friends! As for games, I'm a big fan of the \
        Pokémon, Animal Crossing, and Fire Emblem games. If you see me at our events, in the lounge, or just around \
        campus, feel free to say hi and have a chat with me 😄",
        year: '2025/2026',
    },
    {
        name: 'Ethan Ganas',
        position: 'Director of Finance',
        image: '/img/team/execs/ethan.JPG',
        linkedin: 'https://www.linkedin.com/in/ethan-ganas-7262b0248/',
        github: 'https://www.github.com/noobCode',
        description:
            "Hi! My name is Ethan, and I'm the 2025/2026 Umanitoba CSSA Finance Director. \
            I'm a second year CS student who loves reading and learning about cool new technologies. \
            I spend my free time cathcing up with friends, gaming and working out. \
            I'm also a big movie fan, and enjoys cathcing movies at the theatres. \
            At the University of Manitoba, students studying CS have a lot of opportunities to learn and grow outside of the classroom and I hope the CSSA can make a big impact in that area this year. \
            I'm excited to get started on all the interesting things the CSSA has planned this year and I am really looking forward to seeing you all there! ",
        year: '2025/2026',
    },
    {
        name: 'Ara Santos',
        position: 'Director of Technology',
        image: '/img/team/execs/ara.JPG',
        linkedin: 'https://www.linkedin.com/in/ara-nicole-santos/',
        github: 'https://github.com/arasantos',
        description:
            "Hi everyone! I'm Ara, CSSA's Director of Technology. I'm in my 5th year, majoring in CS and minoring in Psych. \
            I'm also in CO-OP, although I've already finished my last one this summer! I'm really happy to be a part of the \
            CSSA team this year, as I love getting involved in the community. Outside of university, I enjoy watching sci-fi \
            movies, playing games, and listening to music <3 Anyway, if you see me out there, feel free to say hi!! I love \
            talking to people!",
        year: '2025/2026',
    },
    {
        name: 'Lindsay',
        position: 'Director of Events',
        image: '/img/team/execs/linds.JPG',
        description:
            "Hi, I'm Lindsay (most people call me Linds)! \
            I'm currently taking fourth and third year CS classes; and am also getting a Stats and Math minor. \
            I spend most of my time writing and drawing outside of CS, usually pursuing projects with extensive lore and world-building. \
            I also really like horror games, especially the more unconventional ones. \
            In fact, I generally like playing small weird video games that play with the medium. \
            I also really like cooking and baking various things! \
            I've been in the CSSA community ever since my second year, and I'd like to improve it further by getting more students involved through events.",
        year: '2025/2026',
    },
    {
        name: 'Sheikh Adeeb',
        position: 'Director of Student Affairs',
        image: '/img/team/execs/adeeb.JPG',
        linkedin: 'https://www.linkedin.com/in/sheikh-adeeb/',
        discord: 'https://discordapp.com/users/448053433132384266',
        description:
            "Hello! I'm Adeeb, a Bangladeshi second-year Computer Science-Statistics Joint Honours student. \
            I'm also minoring in Psychology, mostly so I can psychoanalyze myself after every coding breakdown. \
            \n\nI've been using computers for as long as I can remember. \
            It started as a way for me to play video games but then the internet happened, and along with raging over Rocket League, I dove deep into the rabbit hole of how the internet works. \
            Now, I dream of a future where I get paid to stare at a screen all day. \
            \n\nWhen I'm not fighting for my life in academia, I'm all about soccer. \
            I'm always down to play, watch or host soccer games. \
            And in case it's relevant to you, I'm a huge Real Madrid fan and I wholeheartedly pledge my allegiance to the greatest of all time, Cristiano Ronaldo.",
        year: '2025/2026',
    },
    {
        name: 'Richard Shalchi',
        position: 'Director of Advocacy',
        image: '/img/team/execs/richard.JPG',
        linkedin: 'https://www.linkedin.com/in/richardshalchi',
        description:
            "Hello! My name is Richard and I am a fourth (… but really third) year student in Computer Science minoring in Political Studies! \
            After being on the advocacy committee for the past two years I found that the change made in the department has been inadequate, so I thought I would try my hand at being the CSSA Director of Advocacy! \
            When I am not trying to still comprehend how pointers in C work, you can find me at the gym, online shopping, learning new languages, doing anything music related, or watching videos on YouTube about the most random topics ever. \
            \n\nI hope to turn the department into a more welcoming space for all, whether it be the in the lounge, in classroom spaces, or on online spaces such as the Discord server. \
            Advocacy has always been important to me. \
            I'm so excited to meet everybody this upcoming year and make our department more welcoming, inclusive, and united. \
            Feel free to shoot me a message at any time if you have got any feedback or ideas, because advocacy is never a one-person job!",
        year: '2025/2026',
    },
    {
        name: 'Tofunmi Layi-Babatunde',
        position: 'Director of Advocacy',
        image: '/img/team/prevExecs/tofunmi.png',
        year: '2024/2025',
    },
    {
        name: 'Edwin Duong',
        position: 'Director of Internal Affairs',
        image: '/img/team/vacant.png',
        year: '2024/2025',
    },
    {
        name: 'Chinu Chandaria',
        position: 'Director of Events',
        image: '/img/team/prevExecs/chinu.png',
        year: '2024/2025',
    },
    {
        name: 'Ginelle Temull',
        position: 'Director of Finance',
        image: '/img/team/prevExecs/ginelle.png',
        year: '2024/2025',
    },
];

export const PromotionsProfiles = [
    {
        name: 'Muhammad Faisal',
        position: 'Councillor',
        image: '/img/team/promotionsCouncillors/muhammad.jpeg',
        year: '2025/2026',
    },
    {
        name: 'Edrielle Mateo',
        position: 'Councillor',
        image: '/img/team/merchCouncillors/edrielle.jpeg', //img common to merchCommitte folder
        linkedin: 'https://www.linkedin.com/in/edrielle-mateo-565029320',
        year: '2025/2026',
    },
];

export const EventsProfiles = [
    {
        name: 'Jae Seol',
        position: 'Councillor',
        image: '/img/team/eventsCouncillors/jae.jpeg',
        year: '2025/2026',
    },
    {
        name: 'Moulik Bhatia',
        position: 'Councillor',
        image: '/img/team/eventsCouncillors/moulik.jpeg',
        year: '2025/2026',
    },
    {
        name: 'Owen Preteau',
        position: 'Councillor',
        image: '/img/team/eventsCouncillors/owen.jpg',
        linkedin: 'https://www.linkedin.com/in/owen-preteau-a8b674276/',
        description:
            "Hello, my name is Owen, and I'm a second year Comp-Sci & Stats student 😎. I love listening to music, and watching TV series.  This is my first year getting involved with the CSSA, and I look forward to meeting lots of new people!",
        year: '2025/2026',
    },
];

export const TechnologyProfiles = [
    {
        name: 'Aryan Vekariya',
        position: 'Councillor',
        image: '/img/team/techCouncillors/aryan.webp',
        linkedin: 'https://www.linkedin.com/in/aryan-vekariya-b66663262/',
        github: 'https://github.com/Aryan0826',
        description:
            "Hi! I’m Aryan, and I'm a third year Comp-Sci Student. I enjoy exploring how things work behind the scenes, whether it’s building small projects, contributing to team applications, or learning new tools and frameworks. I love problem-solving, working with others, and taking on challenges that help me grow as a developer. Outside of coding, you’ll usually find me hanging out with friends, playing games, or experimenting with tech just for fun. I’m excited to be part of the Tech Committee this year and to help support the projects that make our community stronger!",
        year: '2025/2026',
    },
    {
        name: 'Aidan McLeod',
        position: 'Councillor',
        image: '/img/team/vacant.png',
        year: '2025/2026',
    },
    {
        name: 'Iya Monterola',
        position: 'Councillor',
        image: '/img/team/vacant.png',
        year: '2025/2026',
    },
    {
        name: 'Connor Langan',
        position: 'Councillor',
        image: '/img/team/techCouncillors/connor-langan.jpg',
        linkedin: 'https://www.linkedin.com/in/connor-langan-98b84b244/',
        github: 'https://github.com/cjlangan',
        description:
            "Hello 👋, I'm in my 4th year of CS Honours + Co-op. I love volleyball, where I play weekly on a WMVL team as a left side hitter. In my free time, other than coding and sharing tools on GitHub and participating hackathons, I like to hang out with friends with shared interests, such as computer science, hockey, baseball, and more (Go Jets! Go Jays!). One thing about me is that I'm obsessed with terminal environments; you'll always find me coding on Linux with Neovim (btw btw). I aspire to become a skilled Software Engineer, and I believe that the CSSA is a great place to help fulfill that!",
        year: '2025/2026',
    },
    {
        name: 'Andre Lisandro Cruz Ibarra',
        position: 'Councillor',
        image: '/img/team/vacant.png',
        year: '2025/2026',
    },
    {
        name: 'Fopefoluwa Ikufisile',
        position: 'Councillor',
        image: '/img/team/techCouncillors/fopefoluwa.jpg',
        linkedin: 'https://www.linkedin.com/in/fopefoluwa-ikufisile-0a5881296/',
        github: 'https://github.com/FopefoluwaIkufisile',
        description:
            'Hi! My name is Fope, and I’m a first-year Computer Science student. I’ve always loved being around computers and exploring how they work, which naturally led me to study Computer Science. I enjoy learning about new technologies, designing, and building creative projects. In my free time, I play FC 26, Call of Duty: Warzone, and hang out with friends. I’m passionate about growing as a developer and contributing to projects that make a real impact. I’m really excited about the opportunities ahead and can’t wait to keep learning, creating, and connecting with others in the tech community.',
        year: '2025/2026',
    },
    {
        name: 'James Park',
        position: 'Councillor',
        image: '/img/team/techCouncillors/james-park.jpg',
        linkedin: 'https://www.linkedin.com/in/jamespark123/',
        github: 'https://github.com/KannaKim',
        website: 'https://kannakim.blog/',
        description:
            'Hi, my name is James Park. I’m a fourth-year Computer Science student at the University of Manitoba. I enjoy being part of the CSSA Tech Committee, where I get to collaborate with other students and work on projects that bring our tech community together. I’m passionate about technology and even more about the people behind it.',
        year: '2025/2026',
    },
];

export const AdvocacyProfiles = [
    {
        name: 'Mohid',
        position: 'Councillor',
        image: '/img/team/advocacyCouncillors/mohid.jpg',
        year: '2025/2026',
    },
    {
        name: 'Swastik Dash',
        position: 'Councillor',
        image: '/img/team/advocacyCouncillors/swastik.jpg',
        linkedin: 'https://www.linkedin.com/in/swastikdash2/',
        year: '2025/2026',
    },
    {
        name: 'Bradley Barrientos',
        position: 'Councillor',
        image: '/img/team/vacant.png',
        linkedin: 'https://www.linkedin.com/in/bradleybarrientos/',
        description:
            "Hello! My name is Bradley and I am a third year Computer Science student and this is my first year on the Advocacy Committee. I like reading manhwa, playing games, playing volleyball/badminton, and going to the gym. I dislike writing proofs and traffic. I'm excited to work with the team this year and hopefully better the CS experience for everyone!",
        year: '2025/2026',
    },
];

export const StudentResourcesProfiles = [
    {
        name: 'Anthony Campbell',
        position: 'Councillor',
        image: '/img/team/vacant.png',
        year: '2025/2026',
    },
    {
        name: 'Mohammad Mujahidul Islam ',
        position: 'Councillor',
        image: '/img/team/studentResourcesCouncillors/mohammad.jpeg',
        year: '2025/2026',
    },
    {
        name: 'Arpan Christian',
        position: 'Councillor',
        image: '/img/team/studentResourcesCouncillors/arpan.jpg',
        linkedin: 'https://www.linkedin.com/in/arpan-christian-25072005t315/',
        github: 'https://github.com/Arpanchristian2507',
        description:
            'Hi! 👋 I’m Arpan, a Computer Science student passionate about helping my peers make the most of their university journey. As a councillor on the Student Resources Committee, I work to make academic resources, co-op information, and student support more accessible 💡. I enjoy collaborating with others, listening to student concerns, and finding creative ways to enhance our university experience 🤝. I’m always eager to learn, grow, and make a positive impact within the U of M community! 🌱',
        year: '2025/2026',
    },
];

export const LoungeProfiles = [
    {
        name: 'Jatinder Sahota',
        position: 'Lounge Supervisor',
        image: '/img/team/vacant.png',
        year: '2025/2026',
    },
    {
        name: 'Jason Hong',
        position: 'Lounge Supervisor',
        image: '/img/team/vacant.png',
        year: '2025/2026',
    },
    {
        name: 'Chibuikem (Daniel) Ariguzo',
        position: 'Lounge Supervisor',
        image: '/img/team/vacant.png',
        year: '2025/2026',
    },
    {
        name: 'Dexter Sigurdson',
        position: 'Lounge Supervisor',
        image: '/img/team/vacant.png',
        year: '2025/2026',
    },
    {
        name: 'Aidan McLeod',
        position: 'Lounge Supervisor',
        image: '/img/team/vacant.png',
        year: '2025/2026',
    },
    {
        name: 'Oleksandr Zenkov',
        position: 'Lounge Supervisor',
        image: '/img/team/vacant.png',
        year: '2025/2026',
    },
    {
        name: 'Ryann Pastolero',
        position: 'Lounge Supervisor',
        image: '/img/team/vacant.png',
        year: '2025/2026',
    },
    {
        name: 'Miah Tayen',
        position: 'Lounge Supervisor',
        image: '/img/team/vacant.png',
        year: '2025/2026',
    },
    {
        name: 'Keira Pasveer',
        position: 'Lounge Supervisor',
        image: '/img/team/vacant.png',
        year: '2025/2026',
    },
    {
        name: 'Fawaz Bin Saleem',
        position: 'Lounge Supervisor',
        image: '/img/team/vacant.png',
        year: '2025/2026',
    },
];

export const MerchProfiles = [
    {
        name: 'Edrielle Mateo',
        position: 'Councillor',
        image: '/img/team/merchCouncillors/edrielle.jpeg',
        linkedin: 'https://www.linkedin.com/in/edrielle-mateo-565029320',
        year: '2025/2026',
    },
];

export const filterByYear = (profile: IProfile[], year: string) => {
    return profile.filter((exec) => exec.year === year);
};

export const years = ['2024/2025', '2025/2026'];
export const FinanceProfiles = [];

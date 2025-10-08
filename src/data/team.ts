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
}

/** Each property must be present in at least one of the members, otherwise, this will cause an error. 
*   You can assign an empty string to the property, if no team member has that property.
*   There's code that ensures that such a property won't be rendered visually.
**/
export const ExecProfiles = [
    {
        name: "Travis Friesen",
        position: "President",
        image: "/img/team/execs/travis.JPG",
        linkedin: "https://www.linkedin.com/in/travisfriesen/",
        github: "https://github.com/travisfriesen",
        website: "https://travisfriesen.ca",
        description:
            "Hi 👋, My name is Travis and I'm going into my third year at the University of Manitoba. \
            I'm super excited to see what I can accomplish as the President of the CSSA this year. \
            In the past I've been the Director of Technology and Promotions with the CSSA. \
            In my free time I hang out with my cats, tinker with the various computers in my closet, or watch TV Shows.",
    },
    {
        name: "KC del Moro",
        position: "Vice President",
        image: "/img/team/execs/kc.JPG",
        linkedin: "https://www.linkedin.com/in/kriza-del-moro-950378301/",
        description:
            "Hii everyone! My name's KC and I'm the Vice President for this year's CSSA 2025-2026 😄 On my free time I love reading \
            webtoons, learning languages, playing games with friends, and cooking! c: As someone who has a passion for leading and \
            someone who values and strives for inclusivity, I decided to take on this role as I found it to align with my aspirations. \
            My goal this year is to lead and come up with initiatives that can help make the CSSA less intimidating for newer students \
            and more inclusive of women and gender minorities—whilst also providing support. Please look forward to our projects for the year!!",
    },
    {
        name: "Timmy",
        position: "Director of Internal Affairs",
        image: "/img/team/execs/timmy.JPG",
        description:
            "Hi! My name is Timmy! \
            I'm the director of Internal Affairs for the following school year. \
            I spend most of my time with friends, or mostly playing games. \
            Many of my interests are in various research fields here at the UofM. \
            I also enjoy participating in various events held here, such as devhacks and capture the flag competitions!"
    },
    {
        name: "Edith",
        position: "Director of Lounge Affairs",
        image: "/img/team/execs/edith.JPG",
        linkedin: "https://www.linkedin.com/in/edith-hohner-300658331/",
        github: "https://github.com/ediffs",
        description: "Hi I'm Edith, the Director of Lounge Affairs for the CSSA! \
        I'm currently in my second year of the CS-Math Joint Honours program. \
        Outside of school, my hobbies include game dev, reading, and chatting with friends. \
        I'm excited for this opportunity to work on making the lounge more accessible and a safer space for everyone!",
    },
    {
        name: "Matthew Andico",
        position: "Director of Promotions",
        image: "/img/team/execs/matthew.JPG",
        linkedin: "https://www.linkedin.com/in/matthew-andico",
        description: "Hi everyone! My name is Matthew and I’m the 2025-2026 CSSA Director of Promotions! \
        I’m currently a fourth year in Computer Science student minoring in Psychology. \
        I started being involved with the CS community in second year, participating in events held by the CSSA, \
        WICS(and volunteering in their outreach workshops), and .devClub. There, I’ve met so many new people to \
        talk and learn things from. After being on the Promotions Committee last year as a councillor, I’ve \
        thoroughly enjoyed taking photos during events and creating social media post designs. This experience has \
        taught me what needs to be improved on for this year, so stay tuned to our socials for that! \
        Outside of academics, I enjoy photography, listening to music, playing games and sports with friends, \
        and cooking. I also love going out to get food or matcha with friends! As for games, I'm a big fan of the \
        Pokémon, Animal Crossing, and Fire Emblem games. If you see me at our events, in the lounge, or just around \
        campus, feel free to say hi and have a chat with me 😄"
    },
    {
        name: "Ethan Ganas",
        position: "Director of Finance",
        image: "/img/team/execs/ethan.JPG",
        linkedin: "https://www.linkedin.com/in/ethan-ganas-7262b0248/",
        github: "https://www.github.com/noobCode",
        description:
            "Hi! My name is Ethan, and I'm the 2025/2026 Umanitoba CSSA Finance Director. \
            I'm a second year CS student who loves reading and learning about cool new technologies. \
            I spend my free time cathcing up with friends, gaming and working out. \
            I'm also a big movie fan, and enjoys cathcing movies at the theatres. \
            At the University of Manitoba, students studying CS have a lot of opportunities to learn and grow outside of the classroom and I hope the CSSA can make a big impact in that area this year. \
            I'm excited to get started on all the interesting things the CSSA has planned this year and I am really looking forward to seeing you all there! "
    },
    {
        name: "Ara Santos",
        position: "Director of Technology",
        image: "/img/team/execs/ara.JPG",
        linkedin: "https://www.linkedin.com/in/ara-nicole-santos/",
        github: "https://github.com/arasantos",
        description:
            "Hi everyone! I'm Ara, CSSA's Director of Technology. I'm in my 5th year, majoring in CS and minoring in Psych. \
            I'm also in CO-OP, although I've already finished my last one this summer! I'm really happy to be a part of the \
            CSSA team this year, as I love getting involved in the community. Outside of university, I enjoy watching sci-fi \
            movies, playing games, and listening to music <3 Anyway, if you see me out there, feel free to say hi!! I love \
            talking to people!"
    },
    {
        name: "Lindsay",
        position: "Director of Events",
        image: "/img/team/execs/linds.JPG",
        description:
            "Hi, I'm Lindsay (most people call me Linds)! \
            I'm currently taking fourth and third year CS classes; and am also getting a Stats and Math minor. \
            I spend most of my time writing and drawing outside of CS, usually pursuing projects with extensive lore and world-building. \
            I also really like horror games, especially the more unconventional ones. \
            In fact, I generally like playing small weird video games that play with the medium. \
            I also really like cooking and baking various things! \
            I've been in the CSSA community ever since my second year, and I'd like to improve it further by getting more students involved through events."
    },
    {
        name: "Sheikh Adeeb",
        position: "Director of Student Affairs",
        image: "/img/team/execs/adeeb.JPG",
        linkedin: "https://www.linkedin.com/in/sheikh-adeeb/",
        discord: "https://discordapp.com/users/448053433132384266",
        description:
            "Hello! I'm Adeeb, a Bangladeshi second-year Computer Science-Statistics Joint Honours student. \
            I'm also minoring in Psychology, mostly so I can psychoanalyze myself after every coding breakdown. \
            \n\nI've been using computers for as long as I can remember. \
            It started as a way for me to play video games but then the internet happened, and along with raging over Rocket League, I dove deep into the rabbit hole of how the internet works. \
            Now, I dream of a future where I get paid to stare at a screen all day. \
            \n\nWhen I'm not fighting for my life in academia, I'm all about soccer. \
            I'm always down to play, watch or host soccer games. \
            And in case it's relevant to you, I'm a huge Real Madrid fan and I wholeheartedly pledge my allegiance to the greatest of all time, Cristiano Ronaldo.",
    },
    {
        name: "Richard Shalchi",
        position: "Director of Advocacy",
        image: "/img/team/execs/richard.JPG",
        linkedin: "https://www.linkedin.com/in/richardshalchi",
        description:
            "Hello! My name is Richard and I am a fourth (… but really third) year student in Computer Science minoring in Political Studies! \
            After being on the advocacy committee for the past two years I found that the change made in the department has been inadequate, so I thought I would try my hand at being the CSSA Director of Advocacy! \
            When I am not trying to still comprehend how pointers in C work, you can find me at the gym, online shopping, learning new languages, doing anything music related, or watching videos on YouTube about the most random topics ever. \
            \n\nI hope to turn the department into a more welcoming space for all, whether it be the in the lounge, in classroom spaces, or on online spaces such as the Discord server. \
            Advocacy has always been important to me. \
            I'm so excited to meet everybody this upcoming year and make our department more welcoming, inclusive, and united. \
            Feel free to shoot me a message at any time if you have got any feedback or ideas, because advocacy is never a one-person job!",
    },
];

export const PromotionsProfiles = [
    {
        name: "Muhammad Faisal",
        position: "Councillor",
        image: "/img/team/promotionsCouncillors/muhammad.jpeg"
    },
];

export const EventsProfiles = [
    {
        name: "Jae Seol",
        position: "Councillor",
        image: "/img/team/eventsCouncillors/jae.jpeg"
    },
    {
        name: "Moulik Bhatia",
        position: "Councillor",
        image: "/img/team/eventsCouncillors/moulik.jpeg"
    },
];

export const TechnologyProfiles = [
    {
        name: "Aryan Vekariya",
        position: "Councillor",
        image: "/img/team/techCouncillors/aryan.webp"
    },
    {
        name: "Aidan McLeod",
        position: "Councillor",
        image: "/img/team/vacant.png"
    },
    {
        name: "Iya Monterola",
        position: "Councillor",
        image: "/img/team/vacant.png"
    },
    {
        name: "Connor Langan",
        position: "Councillor",
        image: "/img/team/vacant.png"
    },
    {
        name: "Andre Lisandro Cruz Ibarra",
        position: "Councillor",
        image: "/img/team/vacant.png"
    },
];

export const AdvocacyProfiles = [
    {
        name: "Mohid",
        position: "Councillor",
        image: "/img/team/advocacyCouncillors/mohid.jpg"
    },
];

export const StudentResourcesProfiles = [
    {
        name: "Anthony Campbell",
        position: "Councillor",
        image: "/img/team/vacant.png"
    },
    {
        name: "Mohammad Mujahidul Islam ",
        position: "Councillor",
        image: "/img/team/studentResourcesCouncillors/mohammad.jpeg"
    },
];

export const LoungeProfiles = [
    {
        name: "Jatinder Sahota",
        position: "Lounge Supervisor",
        image: "/img/team/vacant.png"
    },
    {
        name: "Jason Hong",
        position: "Lounge Supervisor",
        image: "/img/team/vacant.png"
    },
    {
        name: "Chibuikem (Daniel) Ariguzo",
        position: "Lounge Supervisor",
        image: "/img/team/vacant.png"
    },
    {
        name: "Dexter Sigurdson",
        position: "Lounge Supervisor",
        image: "/img/team/vacant.png"
    },
    {
        name: "Aidan McLeod",
        position: "Lounge Supervisor",
        image: "/img/team/vacant.png"
    },
    {
        name: "Oleksandr Zenkov",
        position: "Lounge Supervisor",
        image: "/img/team/vacant.png"
    },
    {
        name: "Ryann Pastolero",
        position: "Lounge Supervisor",
        image: "/img/team/vacant.png"
    },
    {
        name: "Miah Tayen",
        position: "Lounge Supervisor",
        image: "/img/team/vacant.png"
    },
    {
        name: "Keira Pasveer",
        position: "Lounge Supervisor",
        image: "/img/team/vacant.png"
    },
    {
        name: "Fawaz Bin Saleem",
        position: "Lounge Supervisor",
        image: "/img/team/vacant.png"
    },
];

export const MerchProfiles = [];

export const FinanceProfiles = [];

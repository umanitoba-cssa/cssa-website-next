interface IProfile {
    name: string;
    position: string;
    image: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
    website?: string;
    discord?: string;
}
/** Each property must be present in at least one of the members, otherwise, this will cause an error. 
*   You can assign an empty string to the property, if no team member has that property.
*   There's code that ensures that such a property doesn't be rendered visually.
**/
export const ExecProfiles = [
    {
        name: "Travis Friesen",
        position: "President",
        image: "/img/team/vacant.png",
        linkedin: "https://www.linkedin.com/in/travisfriesen/",
        github: "https://github.com/travisfriesen",
        website: "https://travisfriesen.ca",
        discord: "",
    },
    {
        name: "Okiki Fasanmi",
        position: "Vice President",
        image: "/img/team/vacant.png",
        linkedin: "https://www.linkedin.com/in/okikiola-fasanmi-b264a6203/",
    },
    {
        name: "Edith",
        position: "Director of Lounge Affairs",
        image: "/img/team/vacant.png",
    },
    {
        name: "Sheikh Adeeb",
        position: "Director of Student Affairs",
        image: "/img/team/vacant.png",
    },
    {
        name: "Richard Shalchi",
        position: "Director of Advocacy",
        image: "/img/team/vacant.png",
    },
    {
        name: "Timmy",
        position: "Director of Internal Affairs",
        image: "/img/team/vacant.png",
    },
    {
        name: "Ara Santos",
        position: "Director of Technology",
        image: "/img/team/vacant.png",
    },
    {
        name: "Lindsay",
        position: "Director of Events",
        image: "/img/team/vacant.png",
    },
    {
        name: "Ethan Ganas",
        position: "Director of Finance",
        image: "/img/team/vacant.png",
    },
    {
        name: "KC del Moro",
        position: "Director of Promotions",
        image: "/img/team/vacant.png",
        linkedin: "https://www.linkedin.com/in/kriza-del-moro-950378301/",
    },
];

import { Play } from "next/font/google"
import {IVideoData} from "../api/youtube"

interface IResourceLink {
    title: string
    description: string
    href: string
}

export const ResourceLinks: IResourceLink[] = [
    {
        title: "Science Co-op Info",
        description: "Information about the Science Co-op program and contact information for the Co-op coordinators.",
        href: "https://umanitoba.ca/science/programs-of-study/co-op"
    },
    {
        title: "Computer Science Co-op Info",
        description: "Information about applying to Computer Science Co-op program.",
        href: "https://sci.umanitoba.ca/co-op/prospective-students/apply-to-science-co-op/computer-science-student-application-process/"
    },
    {
        title: "Contact a Science Academic Advisor",
        description: "Schedule an appointment with an academic advisor to ask your program-related questions.",
        href: "https://sci.umanitoba.ca/academicadvising/"
    },
    {
        title: "Academic Calendar",
        description: "General guidance about courses, programs, admission, registration, and more.",
        href: "https://umanitoba.ca/student/records/academiccalendar.html"
    },
    {
        title: "UM Achieve",
        description: "Check your degree progress and path towards graduation.",
        href: "https://umachieve.umanitoba.ca/"
    }
]

export const CSSALinks: IResourceLink[] = [
    {
        title: "CS Discord TOU",
        description: "The terms of use of the Computer Science Lounge Discord.",
        href: "https://github.com/umanitoba-cssa/CS-Discord-TOU/blob/master/CSDiscord-TermsOfUse.md"
    },
    {
        title: "CSSA Branding Guidelines",
        description: "The Branding guidelines for all CSSA resources.",
        href: "docs/internalDesignDocument.pdf"
    }
]

interface IPlaylistCollection {
    category: string
    playlists: IPlaylist[]
}

export interface IPlaylist {
    title: string
    author: string
    playlistId: string
    videos?: IVideoData[]
}


export const PlaylistCollections: IPlaylistCollection[] = [
    {
        category: "COMP 3430: Operating Systems",
        playlists: [
            {
                title: "Textbook Summaries",
                author: "Franklin Bristow",
                playlistId: "PLGqzRfI3gmjer-nt31-WNRF7Ys8NWv-zb",
            },
            {
                title: "Summer 2023 Lectures",
                author: "Franklin Bristow",
                playlistId: "PLGqzRfI3gmjf_8T0xnF-3T04qg18d0KyH",
            }
        ]
    },
    {
        category: "COMP 3350: Software Engineering 1",
        playlists: [
            {
                title: "Winter 2023 Lectures",
                author: "Franklin Bristow",
                playlistId: "PLGqzRfI3gmjefEIH8egFN9X7FHThyMl5B",
            }
        ]
    },
    {
        category: "COMP 3490: Computer Graphics 1",
        playlists: [
            {
                title: "Unit 0: Introduction",
                author: "James Young",
                playlistId: "PLqVt3VSe1-ZZuPSXWmD6i6WCiKhwvkwnB",
            },
            {
                title: "Unit 1: Math",
                author: "James Young",
                playlistId: "PLqVt3VSe1-ZaoGphYC5YQcrew2Koueypw",
            },
            {
                title: "Unit 2: Primitives",
                author: "James Young",
                playlistId: "PLqVt3VSe1-ZYNcrHBbQXm-csdqm0GXy1m",
            },
            {
                title: "Unit 3: Drawing Primitives",
                author: "James Young",
                playlistId: "PLqVt3VSe1-ZaRMWPc_XHvhEQ59F3Gq_4C",
            },
            {
                title: "Unit 4: Transformations",
                author: "James Young",
                playlistId: "PLqVt3VSe1-ZZvTMvM2qS9_IDCIY2Gl1hU",
            },
            {
                title: "Unit 5: 3D",
                author: "James Young",
                playlistId: "PLqVt3VSe1-ZaHojzwYEM0rlXqQpatYA5r",
            },
            {
                title: "Unit 6: Visibility",
                author: "James Young",
                playlistId: "PLqVt3VSe1-ZaluWKsUGRzk9UUrMpMgh2t",
            },
            {
                title: "Unit 7: Interactivity",
                author: "James Young",
                playlistId: "PLqVt3VSe1-ZbJptmnsLFXx6gnqNeGfMco",
            },
            {
                title: "Unit 8: Animation",
                author: "James Young",
                playlistId: "PLqVt3VSe1-ZZjX-cdIluzQVhr73aJuN34",
            },
            {
                title: "Unit 9: Shading",
                author: "James Young",
                playlistId: "PLqVt3VSe1-ZburMezbglEp3ufrhoYqnt6",
            }
        ]
    },
    {
        category: "Other Tools and Skills",
        playlists: [
            {
                title: "The Missing Semester",
                author: "MIT",
                playlistId: "PLyzOVJj3bHQuloKGG59rS43e29ro7I57J",
            }
        ]
    }
]

export const MeetingArchivesID = "PLjtETQ6Sz_uDkMLKzvYZ-zJBJmYdH98VW"

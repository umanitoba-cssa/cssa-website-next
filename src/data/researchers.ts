export interface IResearcher { // researcher properties
    fullName: string;
    email: string;
    image: string;
    googleScholarLink: string; // link to google scholar
    lab?: ILab; 
    researchInterests: string[];
    researchTopic: string; // current research topic
    acceptingStudents: boolean;
    minStudentRequirements: string[];
}

export interface ILab {
  name: string;
  website?: string;
  description: string;
}

export const ResearcherProfiles: IResearcher[] = [
  {
    fullName: "Dr. Jane Smith",
    email: "me@you.us",
    image: "/img/team/travis.png",
    googleScholarLink: "https://google.ca",
    lab: {
      name: "HCI Lab",
      website: "hci.cs.umanitoba.ca",
      description: "HCI lol",
    },
    researchInterests: ["Human Computer Interaction","Science Science Too Long to fit all onto one line like omg that's so sad"],
    researchTopic: "Something something super good but is just too long to fit here but I want to see the dots show up lol",
    acceptingStudents: true,
    minStudentRequirements: ["GPA 5+"]
  },
    {
    fullName: "Dr. Jane Smith",
    email: "me@you.us",
    image: "/img/team/travis.png",
    googleScholarLink: "https://google.ca",
    lab: {
      name: "HCI Lab",
      website: "hci.cs.umanitoba.ca",
      description: "HCI lol",
    },
    researchInterests: ["Human Computer Interaction","Science Science Too Long to fit all onto one line like omg that's so sad"],
    researchTopic: "Something something super good but is just too long to fit here but I want to see the dots show up lol",
    acceptingStudents: true,
    minStudentRequirements: ["GPA 5+"]
  },
    {
    fullName: "Dr. Jane Smith",
    email: "me@you.us",
    image: "/img/team/travis.png",
    googleScholarLink: "https://google.ca",
    // lab: {
    //   name: "HCI Lab",
    //   website: "hci.cs.umanitoba.ca",
    //   description: "HCI lol",
    // },
    researchInterests: ["Human Computer Interaction","Science Science Too Long to fit all onto one line like omg that's so sad"],
    researchTopic: "Something something super good but is just too long to fit here but I want to see the dots show up lol",
    acceptingStudents: true,
    minStudentRequirements: ["GPA 5+"]
  }
]
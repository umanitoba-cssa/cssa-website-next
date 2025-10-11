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
    image: "/img/team/vacant.png",
    googleScholarLink: "https://google.ca",
    lab: {
      name: "HCI Lab",
      website: "hci.cs.umanitoba.ca",
      description: "HCI lol",
    },
    researchInterests: ["This","That which is far too wide to fit on the screen all at once!"],
    researchTopic: "Some long text that might also not fit on the screen if I'm being honest!",
    acceptingStudents: true,
    minStudentRequirements: ["GPA 5+"]
  }
]
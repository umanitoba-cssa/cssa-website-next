export interface ILab {
  name: string;
  website?: string;
  description: string;
}

const dataScienceLab: ILab = 
{
    name: "Data Science, Database & Data Mining Lab",
    website: "dataScienceLab.com",
    description: "Research within the lab focuses on data science, databases and data mining. Over the past decade, NSERC/Science USRA and UMVPRI/UMSU URA winners have conducted summer projects under academic supervision of Dr. Leung on the topics of efficient and effective management of, knowledge discovery from, as well as analysis of, various types of data."
}

const coreAILab: ILab = 
{
    name: "CORE AI Lab",
    website: "dataScienceLab.com",
    description: "Computer vision, Optimization, Responsibility, Artificial Intelligence"
}

export interface IResearcher { // researcher properties
    id: number,
    fullName: string;
    email: string;
    image: string;
    googleScholarLink?: string; // link to google scholar
    lab?: ILab; 
    researchInterests: string[];
    acceptingStudents: boolean;
    minStudentRequirements: string[];
}

// If the researcher doesn't have requirements, put the following under minStudentRequirements
const noRequirements: string = "This prof doesn't have any explicitly stated requirements. Try sending them an email."

export const ResearchersInfo = [
  {
    fullName: "Dr. Carson Leung",
    email: "Carson.Leung@UManitoba.ca",
    image: "/img/researchers/carson-leung.jpg",
    googleScholarLink: "https://scholar.google.ca/citations?hl=en&user=NJaW9s0AAAAJ",
    lab: dataScienceLab,
    researchInterests: ["Generative AI, ML, computer vision, optimization"],
    acceptingStudents: true,
    minStudentRequirements: ["Applicants must meet the minimum requirements for NSERC/Science USRA or UMVPRI/UMSU URA.", "Good interpersonal skills.", "Curious learner with a passion for data science."],
  },
  {
    fullName: "Sadaf Salehkalaibar",
    email: "sadaf.s86@gmail.com",
    image: "/img/researchers/sadaf-salehkalaibar.jpg",
    lab: coreAILab,
    researchInterests: ["Generative AI, ML, computer vision, optimization"],
    acceptingStudents: true,
    minStudentRequirements: [noRequirements],
  },
];


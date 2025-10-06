export interface IResearcher { // researcher properties
    fullName: string;
    email: string;
    image: string;
    googleScholarLink: string; // link to google scholar
    labName: string;
    labWebsite?: string;    // optional link to lab website
    labDescription: string;
    researchInterests: string[];
    researchTopic: string; // current research topic
    acceptingStudents: boolean;
    minStudentRequirements: string[];
}

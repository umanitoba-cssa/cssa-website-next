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
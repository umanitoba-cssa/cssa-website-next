interface ITeasers {
  section: string;
  title: string;
  description: string;
  href?: string;
  src: string;
  linkText?: string;
}

export const Teasers: ITeasers[] = [
  {
    section: "What we do",
    title: "Advocacy",
    description:
      "The CSSA is the official voice of computer science students at the University of Manitoba. We advocate for the interests and concerns of computer science students to the Department of Computer Science, the Faculty of Science, and the university administration. We work to ensure that computer science students havea high-quality education and a positive academic experience. We strive to improve the field by promoting diversity, inclusion, and equity in computing.",
    src: "/img/teasers/advocacy.jpg",
  },
  {
    section: "What we do",

    title: "Community",
    description:
      "We are a community of computer science students who love technology and learning. We help students connect with each other and the industry. We celebrate the diversity and achievements of our community. We also organize events and activities for computer science students to network, where they can build relationships that last beyond their university career. Come join us and visit the computer science lounge!",
    src: "/img/teasers/community.jpg",
  },
  {
    section: "What we do",
    title: "Support",
    description:
      "Through representation, resources, and opportunities, the CSSA will empower the computer science student community to enhance their academic journey and theircareers in the field of computing. We help computer science students with theiracademic challenges and questions, and also help students with their careerplans and choices. We have resources and people who can assist students with their needs and interests.",
    src: "/img/teasers/support.jpg",
  },
  {
    section: "How we Support",
    title: "Student Guides",
    description:
      "The CSSA has compiled a collection of guides to help computer science students navigate their academic journey and prepare for their careers. These guides cover a range of topics from getting started with computer science to finding internships and jobs.",
    src: "/img/teasers/guides.png",
    href: "/resources/guides",
    linkText: "Browse Guides →",
  },
  {
    section: "How we Support",
    title: "Researchers",
    description:
      "We have compiled a collection of the University of Manitoba's Department of Computer Science researchers, including details on their labs, research interests, student researcher requirements, and contact information.",
    src: "/img/teasers/resources.jpg",
    href: "/resources/researchers",
    linkText: "Browse researchers →",
  },
];

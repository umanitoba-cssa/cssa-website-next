export interface ILab {
    name: string;
    website?: string;
    description: string;
}

const dataScienceLab: ILab = {
    name: 'Data Science, Database & Data Mining Lab',
    website: 'https://sites.google.com/site/dblabuofm/',
    description:
        'Research within the lab focuses on data science, databases and data mining. Over the past decade, NSERC/Science USRA and UMVPRI/UMSU URA winners have conducted summer projects under academic supervision of Dr. Leung on the topics of efficient and effective management of, knowledge discovery from, as well as analysis of, various types of data.',
};

const coreAILab: ILab = {
    name: 'CORE AI Lab',
    website: 'https://home.cs.umanitoba.ca/~coreai/',
    description: 'Computer vision, Optimization, Responsibility, Artificial Intelligence',
};

const hciLab: ILab = {
    name: 'Human-Computer Interaction (HCI) Lab',
    website: 'https://hci.cs.umanitoba.ca/',
    description:
        'Students and professors working in the lab are committed to exploring new and innovative research areas in human-computer interaction. The UofM HCI Lab is a positive, supportive space dedicated to diversity and inclusion. Please see our Lab Guidelines for student expectations and our full policy. \n\nWe are currently carrying out research in a number of a different fields including: Computer Science Education, Creativity Support, Human-AI Interaction, Human-Computer Interaction, Human-Robot Interaction, Older Adults & Technology, Older Adults & Caregiver Proxy Use, Online Communities Robots and Gender Social Robotics, Domestic Robotics, Software Learnability Technologies for Kids, Virtual Worlds & Virtual World Building. \n\nThe University of Manitoba HCI Laboratory is also able to provide usability testing services. If you are are currently considering putting your software through some usability testing, you should consider our testing services. Please contact us for more information.',
};

const clamLab: ILab = {
    name: 'Computational Linguistics at Manitoba (CLAM) Lab',
    website: 'https://clam.cs.umanitoba.ca/',
    description:
        'The Computational Linguistics at Manitoba (CLAM) lab advances research at the confluence of AI and the computational social sciences. We develop tools and resources to test linguistic theories, language processing systems that help digital humanists make sense of unstructured text collections, and interactive language technologies supporting the work of writers, translators, and other knowledge workers.',
};

const gadaLab: ILab = {
    name: 'Geometric, Approximation & Distributed Algorithms (GADA) Lab',
    website: 'https://home.cs.umanitoba.ca/~gada/',
    description: 'Research in Theoretical Computer Science.',
};

const triLab: ILab = {
    name: 'Three-way Reasoning and Intelligence Lab (TriLab)',
    description:
        'TriLab explores intelligent reasoning and decision-making through the lens of three-way decision theory and granular computing. Our research spans data analytics, machine learning, rough sets, and conflict analysis, emphasizing models and systems that reason with uncertainty and structured granularity. At TriLab, we encourage curiosity, experimentation, and the courage to explore new ideas — guiding students and researchers to try as they navigate multiple paths of thought.',
};

const hiPeNetLab: ILab = {
    name: 'High Performance Networking (HiPe-Net) Lab',
    description:
        'Advancing the foundations of communication and security for next-generation networks.',
};

const compFinanceLab: ILab = {
    name: 'Computational Finance Lab',
    website: 'https://home.cs.umanitoba.ca/~tulsi/',
    description:
        'This lab is located right next to the elevators (on either side) on 5th floor of E2-EITC, where we do research in an area mostly foreign to CS students.',
};

const sqmLab: ILab = {
    name: 'Software Quality and Maintenance (SQM) Research Lab',
    website: 'https://shaifulc.github.io/SQMResearchLab/SQMResearchLab.html',
    description:
        'SQM Research Lab is committed to assisting software practitioners in developing energy-efficient (green computing), bug-free, and maintainable software. We also create tools to push the boundaries of software engineering research. Our research is funded by the Natural Sciences and Engineering Research Council of Canada (NSERC) and the University of Manitoba.',
};

export interface IResearcher {
    // researcher properties
    id: number;
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
export const noRequirements: string =
    "This prof doesn't have any explicitly stated requirements. Try sending them an email or seeing if their lab's website has information on student researcher requirements.";

export const ResearchersInfo = [
    {
        fullName: 'Dr. Carson Leung',
        email: 'Carson.Leung@UManitoba.ca',
        image: '/img/researchers/carson-leung.jpg',
        googleScholarLink: 'https://scholar.google.ca/citations?hl=en&user=NJaW9s0AAAAJ',
        lab: dataScienceLab,
        researchInterests: [
            "Dr. Leung's research interests are in areas of data science, databases and data mining.",
            'These include efficient and effective management and storage of a wide variety of data, big data analytics and mining (e.g., design and implementation of data mining/AI/machine learning algorithms to discover knowledge like popular patterns, anomalies, clusters, prediction), data visualization and visual analytics.',
            'These also include real-world data science applications (e.g., bioinformatics, health informatics, environmental analytics, social network analysis, sports analytics, transportation analytics).',
            'Over the past decade, NSERC/Science USRA and UMVPRI/UMSU URA winners have conducted summer projects under academic supervision of Dr. Leung on these research topics.',
        ],
        acceptingStudents: true,
        minStudentRequirements: [
            'Applicants must meet the minimum requirements for NSERC/Science USRA or UMVPRI/UMSU URA.',
            'Good interpersonal skills.',
            'Curious learner with a passion for data science.',
        ],
    },
    {
        fullName: 'Sadaf Salehkalaibar',
        email: 'sadaf.s86@gmail.com',
        image: '/img/researchers/sadaf-salehkalaibar.jpg',
        lab: coreAILab,
        googleScholarLink: 'https://scholar.google.com/citations?user=aPV4dVkAAAAJ',
        researchInterests: [
            'Generative AI.',
            'Machine Learning.',
            'Computer Vision.',
            'Optimization.',
        ],
        acceptingStudents: true,
        minStudentRequirements: [noRequirements],
    },
    {
        fullName: 'Celine Latulipe',
        email: 'celine.latulipe@umanitoba.ca',
        image: '/img/researchers/celine-latulipe.jpg',
        lab: hciLab,
        googleScholarLink: 'https://scholar.google.com/citations?user=LdGogroAAAAJ&hl=en',
        researchInterests: [
            'I work mostly in the area of aging and technology, but I also do some research in CS education and in Creativity Support. Projects that intermix those boundaries are also good.',
        ],
        acceptingStudents: true,
        minStudentRequirements: [
            'I am looking for students who have diverse backgrounds and interests. If you have a connection to a community of older adults from your cultural background, that could lead to interesting projects.',
            'Having taken and done well in an HCI course is a strong positive.',
            'Web development skills are often handy as a lot of my work focuses on how older adults and the network of people who support them (close others) use online systems and accounts. So web-based prototyping is common in my group.',
            'I am increasingly interested in the issues surrounding digital legacy and digital off-boarding - how do older adults stop using online systems and what happens to their digital assets when they die?',
        ],
    },
    {
        fullName: 'Houda El Mimouni',
        email: 'houda.elmimouni@umanitoba.ca',
        image: '/img/researchers/houda-elmimouni.jpg',
        lab: hciLab,
        googleScholarLink: 'https://scholar.google.com/citations?user=cWECFC4AAAAJ&hl=en',
        researchInterests: [
            'Social robots.',
            'Social media and activism.',
            'Human values.',
            'Human AI interaction.',
        ],
        acceptingStudents: true,
        minStudentRequirements: [
            'Having taken and done well in Comp 3020 and Comp 4020 is a strong positive.',
            'Interest in Human Computer Interaction, Human Robot Interaction, Social Computing.',
        ],
    },
    {
        fullName: 'Tristan Miller',
        email: 'Tristan.Miller@umanitoba.ca',
        image: '/img/researchers/tristan-miller.jpg',
        lab: clamLab,
        googleScholarLink: 'https://scholar.google.com/citations?user=XAfWDQUAAAAJ',
        researchInterests: [
            'Computational humour, with a focus on validation of linguistic theories of humour, translation of humour, and classification of aggressive humour.',
            'Historical born-digital corpora, with a focus on constructing and analyzing structured, annotated text corpora from Usenet or other pre-Web archives.',
            'Indigenous language technology, with a focus on developing digital resources for text processing, writing, typesetting, and language revitalization.',
        ],
        acceptingStudents: true,
        minStudentRequirements: [
            'Since my work is highly interdisciplinary, prospective research assistants should ideally demonstrate academic knowledge of and/or enthusiasm for subjects outside of computer science.',
            "I'm particularly interested in CS students who may be minoring in (or who already have a degree in) linguistics, literary studies, Indigenous languages, cognitive science, history, or library/information science.",
        ],
    },
    {
        fullName: 'Avery Miller',
        email: 'avery.miller@umanitoba.ca',
        image: '/img/researchers/vacant-vertical.png', //No consent
        lab: gadaLab,
        googleScholarLink: 'https://scholar.google.com/citations?user=BvvdwvIAAAAJ&hl=en',
        researchInterests: [
            'Theory of computing in networks, mainly in two ways: (1) communication networks where nodes send information across links to solve a task, or, (2) mobile entities moving around inside a network to solve a task.',
        ],
        acceptingStudents: false, //Not yet decided.
        minStudentRequirements: [
            'As many courses as possible from: MATH 1240/2070/3370, COMP 2080/3030/3170.',
            'You should enjoy working on the toughest proof-based questions in those courses, and this usually means you are scoring A+ (or at least an A) in them.',
        ],
    },
    {
        fullName: 'Mengjun Hu',
        email: 'mengjun.hu@umanitoba.ca',
        image: '/img/researchers/mengjun-hu.jpg',
        lab: triLab,
        googleScholarLink: 'https://scholar.google.com/citations?hl=en&user=yTjcJbYAAAAJ',
        researchInterests: [
            'Three-way decisions.',
            'Conflict Analysis.',
            'Granular Computing.',
            'Explainable AI.',
            'Rough Sets.',
            'Fuzzy Sets.',
        ],
        acceptingStudents: true,
        minStudentRequirements: [
            'At TriLab, we welcome curious and motivated students ready to explore three-way reasoning, intelligence, and granular computing.',
            'Programming skills and prior research experience are a plus but not required.',
            'What matters most is enthusiasm, a willingness to learn, and a spirit to try.',
        ],
    },
    {
        fullName: 'James Young',
        email: 'young@cs.umanitoba.ca',
        image: '/img/researchers/james-young.jpg',
        lab: hciLab,
        googleScholarLink:
            'https://scholar.google.com/citations?hl=ja&user=fTpGmI8AAAAJ&view_op=list_works&sortby=pubdate',
        researchInterests: ['Domestic Robots.', 'Robot Dialog.', 'Children and Robots.'],
        acceptingStudents: true,
        minStudentRequirements: [
            'Primary requirement is GPA and enthusiasm.',
            'I will post a procedure soon, check my website.',
        ],
    },
    {
        fullName: 'Andrea Bunt',
        email: 'Andrea.Bunt@umanitoba.ca',
        image: '/img/researchers/andrea-bunt.jpg',
        lab: hciLab,
        googleScholarLink: 'https://scholar.google.ca/citations?user=NoBlw7EAAAAJ&hl=en',
        researchInterests: [
            'Explainable AI.',
            'Technologies for kids and families.',
            'Online Communities.',
            'Software Learnability.',
        ],
        acceptingStudents: true,
        minStudentRequirements: [
            'Strong GPA (e.g., 3.5 and higher).',
            'Good Communication Skills.',
            'Enthusiasm for research and learning new things.',
            'HCI courses are an asset but not a requirement.',
        ],
    },
    {
        fullName: 'Sogand Sadrhaghighi',
        email: 'Sogand.Sadrhaghighi@umanitoba.ca',
        image: '/img/researchers/sogand-sadrhaghighi.jpg',
        lab: hiPeNetLab,
        googleScholarLink: 'https://scholar.google.ca/citations?hl=en&user=qS-sNPwAAAAJ',
        researchInterests: [
            'My research centers on networked systems, with a particular focus on large-scale data center networks, the infrastructure behind AI applications such as ChatGPT, and cloud platforms such as Microsoft Azure.',
            'Specifically, I aim to design faster, more efficient, and more reliable networks capable of meeting the demands of modern AI workloads, such as accelerating AI training.',
            'In addition, I develop network monitoring systems using programmable network hardware (e.g., switches) to detect network performance issues, such as packet drops, and to strengthen network security.',
            'Finally, I explore how AI can improve network operations (e.g., through traffic pattern prediction) and enhance network security via proactive and intelligent threat detection and mitigation.',
        ],
        acceptingStudents: true,
        minStudentRequirements: [
            'The key requirement for joining the lab is enthusiasm and curiosity. I am seeking motivated students who are eager to learn and contribute to ongoing projects.',
            'Strong coding skills are essential, as much of the work involves implementing systems and evaluating algorithms in both simulators and a real-world testbed.',
            'While prior knowledge of networking concepts and network security is beneficial, it is not required; you will have the chance to build these skills as you go.',
        ],
    },
    {
        fullName: 'Stephane Durocher',
        email: 'stephane.durocher@umanitoba.ca',
        image: '/img/researchers/stephane-durocher.jpg',
        lab: gadaLab,
        googleScholarLink: 'https://scholar.google.ca/citations?user=rixCVNoAAAAJ&hl=en',
        researchInterests: [
            'My research is in computational geometry, data structures, geometric optimization, and discrete algorithms.',
            'My recent work includes theoretical results in geometric covering, local geometric routing, range searching, polygon reconstruction, graph drawing, online algorithms, geometric models for wireless communication, kinetic data structures, geometric depth measures, and facility location.',
            'I am also interested graph theory, computational complexity, combinatorial algorithms, combinatorial geometry, and discrete mathematics.',
        ],
        acceptingStudents: true,
        minStudentRequirements: [
            'A+ in COMP 2140 and 2080.',
            'Enrolled in or completed COMP 3170 and 3030.',
        ],
    },
    {
        fullName: 'Anurag Murty Naredla',
        email: 'anurag.naredla@umanitoba.ca',
        image: '/img/researchers/anurag-naredla.jpg',
        lab: gadaLab,
        googleScholarLink: 'https://scholar.google.ca/citations?user=xP-JGX0AAAAJ&hl=en',
        researchInterests: [
            'Facility location problems (where to build a factory, how to place a guard in an art gallery).',
        ],
        acceptingStudents: true,
        minStudentRequirements: [
            'Enthusiasm',
            'Design and analysis of algorithms',
            'Mathematical maturity',
        ],
    },
    {
        fullName: 'Ruppa K. Thulasiram',
        email: 'tulsi.thulasiram@umanitoba.ca',
        image: '/img/researchers/ruppa-thulasiram.jpg',
        lab: compFinanceLab,
        googleScholarLink:
            'https://scholar.google.com/citations?user=TGbbksEAAAAJ&hl=en&inst=9587710224044597276&oi=ao',
        researchInterests: [
            'Bridging two historically established, technologically evolving and traditionally different fields (Computing and Finance) by doing research for finding computational intelligence solution to problems in finance.',
        ],
        acceptingStudents: true,
        minStudentRequirements: [
            'Core CS 2nd year courses should have been completed along with couple of Stat & Math courses.',
            'Strong programming skills.',
            'Willing to learn challenging new topic(s) from business and finance.',
        ],
    },
    {
        fullName: 'Shaiful Chowdhury',
        email: 'Shaiful.Chowdhury@umanitoba.ca',
        image: '/img/researchers/shaiful-chowdhury.jpg',
        lab: sqmLab,
        googleScholarLink: 'https://scholar.google.ca/citations?user=DRpyER8AAAAJ&hl=en',
        researchInterests: ['Software Quality', 'Software maintenance', 'Green computing'],
        acceptingStudents: true,
        minStudentRequirements: [noRequirements],
    },
    {
        fullName: 'Daniel Rea',
        email: 'daniel.rea@umanitoba.ca',
        image: '/img/researchers/daniel-rea.jpg',
        lab: hciLab,
        googleScholarLink: 'https://scholar.google.com/citations?user=0wv5PIQAAAAJ&hl=en',
        researchInterests: [
            'We look at human-robot interaction, primarily interfaces for controlling robots, visualizations for people controlling robots, and social interaction via robots.',
            "I'm particularly interested in how interfaces can change how people think and interpret information, and how that can lead to changes in control.",
            'As well, we look at some social robot behaviors that may appear negative (anxiousness, rudeness, etc), and do a lot of video game-inspired research.',
        ],
        acceptingStudents: true,
        minStudentRequirements: [
            "Have strong fundamentals (B+ average or higher, but you can try to convince me if you don't hit that).",
            'HCI background is preferred but not necessary.',
            'No robotics background needed.',
            'Be interested in design, how people think, and how technology can shape those things.',
        ],
    },
];

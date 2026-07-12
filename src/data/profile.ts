export const profile = {
  name: 'Shoaib Ahmed',
  role: 'Full-Stack Developer',
  headline: 'I turn ambitious ideas into fast, intelligent web products.',
  sub: 'MERN · Django · Data Science — currently engineering AI-powered healthcare platforms at Save AI, Moscow.',
  location: 'Moscow, Russia',
  photo: '/shoaib.jpg',
  email: 'shoaibghulam@gmail.com',
  links: {
    github: 'https://github.com/shoaibghulam',
    linkedin: 'https://linkedin.com/in/shoaibghulam',
    upwork: 'https://upwork.com/freelancers/shoaibghulam',
    whatsapp: 'https://wa.me/79847792308',
  },
  stats: [
    { value: '8+', label: 'Years of experience' },
    { value: '30+', label: 'Projects delivered' },
    { value: '4', label: 'Live products in production' },
    { value: '5', label: 'Professional certifications' },
  ],
  about: [
    `I'm a full-stack developer with 8+ years across the whole product surface — pixel-perfect
     React and Next.js frontends, robust Django and Express backends, and the data layer that
     makes products intelligent.`,
    `Today I build AI-powered healthcare software at Save AI — radiology platforms like
     RadioViewAI where machine-learning models help doctors read medical images faster and more
     accurately. In parallel, I'm completing a Master of Data Science at NUST MISIS in Moscow,
     pushing deeper into the analytics and ML side of engineering.`,
  ],
} as const

export const marquee = [
  'React',
  'Next.js',
  'TypeScript',
  'Python',
  'Django',
  'Node.js',
  'Express',
  'MongoDB',
  'MySQL',
  'Tailwind CSS',
  'Redux',
  'AWS',
  'Pandas',
  'Data Science',
  'REST APIs',
  'WordPress',
]

export type Experience = {
  role: string
  company: string
  period: string
  location: string
  points: string[]
  tags: string[]
  current?: boolean
}

export const experience: Experience[] = [
  {
    role: 'MERN Stack Developer',
    company: 'Save AI',
    period: 'Aug 2025 — Present',
    location: 'Moscow, Russia',
    current: true,
    points: [
      'Building RadioViewAI™ — an AI radiology platform improving diagnostic precision for clinicians worldwide.',
      'Integrating machine-learning models into clinical software alongside data scientists and medical experts.',
      'Shipping secure APIs and responsive interfaces for CXRDetectAI, NeuroICH and MammoSightAI.',
      'Owning data security, compliance and performance across large-scale medical datasets.',
    ],
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'AI/ML'],
  },
  {
    role: 'Full-Stack Web Developer',
    company: 'HNH Tech Solution',
    period: 'Oct 2018 — Oct 2023',
    location: 'Karachi, Pakistan',
    points: [
      'Designed and built Django backends and REST APIs for client products across five years.',
      'Converted Figma designs into pixel-perfect HTML, React and Next.js applications.',
      'Owned debugging and long-term maintenance across a diverse project portfolio.',
    ],
    tags: ['Django', 'React', 'Next.js', 'REST APIs'],
  },
  {
    role: 'Freelance Full-Stack Developer',
    company: 'Upwork & Fiverr',
    period: 'Feb 2018 — Present',
    location: 'Remote, worldwide',
    current: true,
    points: [
      'Delivering end-to-end web products for international clients — backends in Django and Express, frontends in React and Next.js.',
      'Specialised builds on Shopify and WordPress/WooCommerce for e-commerce clients.',
    ],
    tags: ['Django', 'Express', 'Shopify', 'WordPress'],
  },
  {
    role: 'Computer Instructor',
    company: 'Gidroshia Institute of IT',
    period: '2012 — 2015',
    location: 'Pakistan',
    points: [
      'Taught HTML, CSS, JavaScript and React fundamentals — where the love for the web began.',
    ],
    tags: ['Teaching', 'HTML/CSS/JS'],
  },
]

export type Education = {
  degree: string
  school: string
  period: string
  location: string
  detail: string
}

export const education: Education[] = [
  {
    degree: 'Master of Data Science',
    school: 'NUST MISIS',
    period: '2024 — Present',
    location: 'Moscow, Russia',
    detail:
      'Advanced study in machine learning, statistics and data engineering — sharpening the intelligence layer of my full-stack work.',
  },
  {
    degree: 'BS Computer Science',
    school: 'Federal Urdu University of Arts, Science & Technology',
    period: '2018 — 2022',
    location: 'Karachi, Pakistan',
    detail:
      'Thesis: a web application connecting Covid patients with vaccination centers and oxygen-cylinder providers.',
  },
]

export type Certification = { title: string; issuer: string; year: string; url: string }

export const certifications: Certification[] = [
  {
    title: 'AWS Cloud Technical Essentials',
    issuer: 'Amazon Web Services',
    year: '2023',
    url: 'https://www.coursera.org/account/accomplishments/verify/AZGBNGGQCDLA',
  },
  {
    title: 'Programming for Everybody (Python)',
    issuer: 'University of Michigan',
    year: '2023',
    url: 'https://www.coursera.org/account/accomplishments/verify/K9QAGF7G2TJE',
  },
  {
    title: 'Using JavaScript and JSON in Django',
    issuer: 'University of Michigan',
    year: '2023',
    url: 'https://coursera.org/verify/7LTPELEGNV9A',
  },
  {
    title: 'Java Programming: Solving Problems with Software',
    issuer: 'Duke University',
    year: '2023',
    url: 'https://coursera.org/verify/QHHJAZENHSHY',
  },
  {
    title: 'Linux & IT Automation',
    issuer: 'LearnQuest',
    year: '2022',
    url: 'https://www.coursera.org/account/accomplishments/verify/B5RVTJGY7CF6',
  },
]

export type Language = { name: string; level: string; pct: number }

export const languages: Language[] = [
  { name: 'Balochi', level: 'Native', pct: 100 },
  { name: 'Urdu', level: 'C2 — Proficient', pct: 95 },
  { name: 'English', level: 'B2 — Independent', pct: 75 },
  { name: 'Hindi', level: 'B2 — Independent', pct: 70 },
  { name: 'Russian', level: 'A2 — Basic', pct: 40 },
]

export type SkillGroup = { title: string; skills: string[] }

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Redux',
      'Tailwind CSS',
      'Material UI',
      'Styled-Components',
      'SASS/SCSS',
      'Bootstrap',
    ],
  },
  {
    title: 'Backend',
    skills: [
      'Python',
      'Django',
      'Django REST Framework',
      'Node.js',
      'Express',
      'MongoDB',
      'MySQL',
      'REST APIs',
      'Git & GitHub',
      'Postman',
    ],
  },
  {
    title: 'Data & Analytics',
    skills: [
      'SQL',
      'Pandas',
      'NumPy',
      'Matplotlib & Seaborn',
      'Exploratory Data Analysis',
      'A/B Testing',
      'KPI & Metrics Analysis',
    ],
  },
  {
    title: 'CMS & E-Commerce',
    skills: ['WordPress', 'WooCommerce', 'Shopify', 'Elementor', 'Divi'],
  },
]

/** Flat list used by the 3D skill galaxy. */
export const galaxySkills = [
  'React',
  'Next.js',
  'TypeScript',
  'Python',
  'Django',
  'Node.js',
  'MongoDB',
  'Express',
  'Data Science',
  'Pandas',
  'AWS',
  'Tailwind',
  'MySQL',
  'Redux',
  'REST APIs',
  'WordPress',
]

export type Project = {
  title: string
  description: string
  tags: string[]
  url: string
  live?: boolean
  highlight?: string
}

export const projects: Project[] = [
  {
    title: 'RadioViewAI™',
    highlight: 'AI Healthcare',
    description:
      'AI-powered radiology platform helping clinicians analyze medical images with higher precision — secure MERN backend, ML model integration, healthcare-grade compliance.',
    tags: ['MERN', 'AI/ML', 'Healthcare'],
    url: 'https://radioview.ai/',
    live: true,
  },
  {
    title: 'LMIA Ltd',
    highlight: 'Data Platform',
    description:
      "React + Tailwind platform with animated landing experience, serving Canada's Employment & Social Development LMIA reports through seamless API integration.",
    tags: ['React', 'Tailwind', 'APIs'],
    url: 'https://lmia.ltd/',
    live: true,
  },
  {
    title: 'Chain Edge',
    highlight: 'Crypto Analytics',
    description:
      'Cryptocurrency analytics tool delivering insight and market data for informed investment decisions, wrapped in a clean, fast interface.',
    tags: ['JavaScript', 'Tailwind', 'Fintech'],
    url: 'https://www.chainedge.io/',
    live: true,
  },
  {
    title: 'Herb X',
    highlight: 'Medical Research',
    description:
      'React research platform where participants verify eligibility for clinical studies on natural remedies — UX built around safety and clarity.',
    tags: ['React', 'APIs', 'Healthcare'],
    url: 'https://herbx1.com/',
    live: true,
  },
  {
    title: 'Binance AI Bot',
    highlight: 'Algorithmic Trading',
    description:
      'Autonomous crypto-trading bot pairing exchange APIs with machine-learning signals to trade around the clock.',
    tags: ['Python', 'AI', 'Trading'],
    url: 'https://github.com/shoaibghulam/BInance-AI-Bot',
  },
  {
    title: 'Covid Oxygen Finder',
    highlight: 'Social Impact',
    description:
      'Final-year thesis project connecting Covid patients with nearby oxygen-cylinder providers and vaccination centers — availability, reservations, life-saving speed.',
    tags: ['Full-Stack', 'Maps', 'Thesis'],
    url: 'https://github.com/shoaibghulam/fyp',
  },
]

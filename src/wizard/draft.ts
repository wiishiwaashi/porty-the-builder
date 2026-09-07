import type {
  ContactData,
  EducationData,
  ExperienceData,
  HeaderData,
  ProjectsData,
  SectionType,
  ThemeConfig,
} from '../types';

export type Draft = {
  theme: ThemeConfig;
  templates: Record<SectionType, string>;
  header: HeaderData;
  education: EducationData;
  experience: ExperienceData;
  projects: ProjectsData;
  contact: ContactData;
};

export const blankDraft: Draft = {
  theme: {
    fontHeading: 'system-ui, sans-serif',
    fontBody: 'system-ui, sans-serif',
    colorPrimary: '#111827',
    colorAccent: '#7c3aed',
    colorBackground: '#ffffff',
    spacingScale: 'normal',
  },
  templates: {
    header: 'centered',
    education: 'compact',
    experience: 'timeline',
    projects: 'grid',
    contact: 'simple',
  },
  header: { name: '', tagline: '', photoUrl: '' },
  education: [],
  experience: [],
  projects: [],
  contact: { email: '', links: [] },
};

export const sampleDraft: Draft = {
  ...blankDraft,
  header: {
    name: 'Jordan Lee',
    tagline: 'Frontend engineer building delightful interfaces',
  },
  education: [
    {
      school: 'State University',
      degree: 'B.S. Computer Science',
      startDate: '2016',
      endDate: '2020',
    },
  ],
  experience: [
    {
      title: 'Senior Frontend Engineer',
      org: 'Acme Co',
      startDate: '2022',
      endDate: 'Present',
      bullets: [
        'Led migration to a component-driven design system',
        'Cut page load time by 40%',
      ],
    },
  ],
  projects: [
    {
      title: 'Portfolio Builder',
      description: 'A wizard-driven portfolio site generator.',
      link: 'https://example.com',
    },
  ],
  contact: {
    email: 'jordan@example.com',
    links: [{ label: 'GitHub', url: 'https://github.com/jordanlee' }],
  },
};

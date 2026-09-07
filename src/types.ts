export type ThemeConfig = {
  fontHeading: string;
  fontBody: string;
  colorPrimary: string;
  colorAccent: string;
  colorBackground: string;
  spacingScale: 'compact' | 'normal' | 'spacious';
};

export type SectionType =
  | 'header'
  | 'education'
  | 'experience'
  | 'projects'
  | 'contact';

export type HeaderData = { name: string; tagline: string; photoUrl?: string };

export type EducationData = {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
}[];

export type ExperienceData = {
  title: string;
  org: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}[];

export type ProjectsData = {
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
}[];

export type ContactData = {
  email: string;
  links: { label: string; url: string }[];
};

export type SectionDataFor<T extends SectionType> = T extends 'header'
  ? HeaderData
  : T extends 'education'
    ? EducationData
    : T extends 'experience'
      ? ExperienceData
      : T extends 'projects'
        ? ProjectsData
        : T extends 'contact'
          ? ContactData
          : never;

export type Section = {
  id: string;
  type: SectionType;
  template: string; // key into LAYOUTS[type]
  data: unknown; // shape depends on `type` — see SectionDataFor<type>
};

export type Portfolio = {
  id: string;
  userId: string;
  username: string; // used for the public URL, e.g. yoursite.com/u/username
  theme: ThemeConfig;
  sectionOrder: string[]; // array of Section.id, defines render order
  sections: Section[];
  published: boolean;
};

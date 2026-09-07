import type {
  ContactData,
  EducationData,
  ExperienceData,
  HeaderData,
  ProjectsData,
} from '../types';

function CenteredHeader({ data: { name, tagline, photoUrl } }: { data: HeaderData }) {
  return (
    <section className="flex flex-col items-center gap-3 py-16 text-center">
      {photoUrl && (
        <img
          src={photoUrl}
          alt={name}
          className="h-24 w-24 rounded-full object-cover"
        />
      )}
      <h1
        className="text-4xl font-semibold"
        style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}
      >
        {name}
      </h1>
      <p className="text-lg opacity-80">{tagline}</p>
    </section>
  );
}

function CompactEducation({ data }: { data: EducationData }) {
  return (
    <section className="mx-auto max-w-2xl py-8">
      <h2
        className="mb-4 text-2xl font-semibold"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Education
      </h2>
      <ul className="flex flex-col gap-2">
        {data.map((edu) => (
          <li key={edu.school} className="flex items-baseline justify-between">
            <span>
              <strong>{edu.school}</strong> — {edu.degree}
            </span>
            <span className="text-sm opacity-60">
              {edu.startDate}–{edu.endDate}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function TimelineExperience({ data }: { data: ExperienceData }) {
  return (
    <section className="mx-auto max-w-2xl py-8">
      <h2
        className="mb-4 text-2xl font-semibold"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Experience
      </h2>
      <ol
        className="flex flex-col gap-6 border-l-2 pl-4"
        style={{ borderColor: 'var(--color-accent)' }}
      >
        {data.map((job) => (
          <li key={`${job.org}-${job.title}`}>
            <div className="flex items-baseline justify-between">
              <strong>
                {job.title} · {job.org}
              </strong>
              <span className="text-sm opacity-60">
                {job.startDate}–{job.endDate}
              </span>
            </div>
            <ul className="list-disc pl-5 text-sm opacity-80">
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ProjectGrid({ data }: { data: ProjectsData }) {
  return (
    <section className="mx-auto max-w-4xl py-8">
      <h2
        className="mb-4 text-2xl font-semibold"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Projects
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((project) => (
          <a
            key={project.title}
            href={project.link ?? '#'}
            className="rounded-lg border p-4 transition hover:shadow-md"
            style={{ borderColor: 'var(--color-accent)' }}
          >
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="mb-2 h-32 w-full rounded object-cover"
              />
            )}
            <h3 className="font-medium">{project.title}</h3>
            <p className="text-sm opacity-80">{project.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function SimpleContact({ data: { email, links } }: { data: ContactData }) {
  return (
    <section className="mx-auto max-w-2xl py-16 text-center">
      <h2
        className="mb-4 text-2xl font-semibold"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Contact
      </h2>
      <p>
        <a
          href={`mailto:${email}`}
          style={{ color: 'var(--color-accent)' }}
        >
          {email}
        </a>
      </p>
      <ul className="mt-2 flex justify-center gap-4">
        {links.map((link) => (
          <li key={link.url}>
            <a href={link.url} style={{ color: 'var(--color-accent)' }}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export const LAYOUTS = {
  header: { centered: CenteredHeader },
  education: { compact: CompactEducation },
  experience: { timeline: TimelineExperience },
  projects: { grid: ProjectGrid },
  contact: { simple: SimpleContact },
} as const;

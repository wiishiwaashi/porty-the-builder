import { useState } from 'react';
import { LAYOUTS } from '../layouts';
import type { SectionType, ThemeConfig } from '../types';
import { blankDraft, sampleDraft, type Draft } from './draft';
import ListEditor from './ListEditor';
import { FONT_STACKS, THEME_PRESETS } from './themePresets';

const SPACING: Record<ThemeConfig['spacingScale'], string> = {
  compact: '0.5rem',
  normal: '1rem',
  spacious: '2rem',
};

function themeStyle(theme: ThemeConfig): React.CSSProperties {
  return {
    ['--font-heading' as string]: theme.fontHeading,
    ['--font-body' as string]: theme.fontBody,
    ['--color-primary' as string]: theme.colorPrimary,
    ['--color-accent' as string]: theme.colorAccent,
    ['--color-background' as string]: theme.colorBackground,
    ['--spacing' as string]: SPACING[theme.spacingScale],
    fontFamily: theme.fontBody,
    backgroundColor: theme.colorBackground,
  };
}

function TemplatePicker({
  type,
  value,
  onChange,
}: {
  type: SectionType;
  value: string;
  onChange: (template: string) => void;
}) {
  const options = Object.keys(LAYOUTS[type]);
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded border px-2 py-1 text-sm"
    >
      {options.map((key) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </select>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="opacity-70">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="rounded border px-2 py-1"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded border px-2 py-1"
        />
      )}
    </label>
  );
}

function SectionCard({
  title,
  type,
  templates,
  onTemplateChange,
  children,
}: {
  title: string;
  type: SectionType;
  templates: Draft['templates'];
  onTemplateChange: (type: SectionType, template: string) => void;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="flex flex-col gap-3 rounded-lg border p-4">
      <legend className="flex w-full items-center justify-between gap-2 px-1 text-sm font-semibold">
        {title}
        <span className="flex items-center gap-1 font-normal">
          <span className="opacity-60">layout:</span>
          <TemplatePicker
            type={type}
            value={templates[type]}
            onChange={(t) => onTemplateChange(type, t)}
          />
        </span>
      </legend>
      {children}
    </fieldset>
  );
}

export default function Wizard() {
  const [draft, setDraft] = useState<Draft>(blankDraft);

  const setTemplate = (type: SectionType, template: string) =>
    setDraft((d) => ({ ...d, templates: { ...d.templates, [type]: template } }));

  const sections: { id: SectionType; type: SectionType; template: string; data: unknown }[] =
    (['header', 'education', 'experience', 'projects', 'contact'] as const).map((type) => ({
      id: type,
      type,
      template: draft.templates[type],
      data: draft[type],
    }));

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col gap-6 overflow-y-auto p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Build your portfolio</h1>
          <button
            type="button"
            onClick={() => setDraft(sampleDraft)}
            className="text-sm underline"
          >
            Load sample data
          </button>
        </div>

        <SectionCard title="Header" type="header" templates={draft.templates} onTemplateChange={setTemplate}>
          <Field label="Name" value={draft.header.name} onChange={(v) => setDraft((d) => ({ ...d, header: { ...d.header, name: v } }))} />
          <Field label="Tagline" value={draft.header.tagline} onChange={(v) => setDraft((d) => ({ ...d, header: { ...d.header, tagline: v } }))} />
          <Field label="Photo URL" value={draft.header.photoUrl ?? ''} onChange={(v) => setDraft((d) => ({ ...d, header: { ...d.header, photoUrl: v } }))} />
        </SectionCard>

        <SectionCard title="Education" type="education" templates={draft.templates} onTemplateChange={setTemplate}>
          <ListEditor
            items={draft.education}
            onChange={(education) => setDraft((d) => ({ ...d, education }))}
            fields={[
              { key: 'school', label: 'School' },
              { key: 'degree', label: 'Degree' },
              { key: 'startDate', label: 'Start' },
              { key: 'endDate', label: 'End' },
            ]}
            emptyItem={{ school: '', degree: '', startDate: '', endDate: '' }}
            addLabel="+ Add school"
          />
        </SectionCard>

        <SectionCard title="Experience" type="experience" templates={draft.templates} onTemplateChange={setTemplate}>
          <div className="flex flex-col gap-3">
            {draft.experience.map((job, i) => (
              <div key={i} className="flex flex-col gap-2 rounded border p-2">
                <div className="flex flex-wrap gap-2">
                  {(['title', 'org', 'startDate', 'endDate'] as const).map((key) => (
                    <input
                      key={key}
                      value={job[key]}
                      placeholder={key}
                      onChange={(e) =>
                        setDraft((d) => {
                          const experience = d.experience.slice();
                          experience[i] = { ...experience[i], [key]: e.target.value };
                          return { ...d, experience };
                        })
                      }
                      className="min-w-24 flex-1 rounded border px-2 py-1 text-sm"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setDraft((d) => ({ ...d, experience: d.experience.filter((_, idx) => idx !== i) }))
                    }
                    className="text-sm opacity-60 hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
                <textarea
                  value={job.bullets.join('\n')}
                  placeholder="One bullet per line"
                  rows={3}
                  onChange={(e) =>
                    setDraft((d) => {
                      const experience = d.experience.slice();
                      experience[i] = { ...experience[i], bullets: e.target.value.split('\n') };
                      return { ...d, experience };
                    })
                  }
                  className="rounded border px-2 py-1 text-sm"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setDraft((d) => ({
                  ...d,
                  experience: [
                    ...d.experience,
                    { title: '', org: '', startDate: '', endDate: '', bullets: [] },
                  ],
                }))
              }
              className="self-start text-sm underline"
            >
              + Add job
            </button>
          </div>
        </SectionCard>

        <SectionCard title="Projects" type="projects" templates={draft.templates} onTemplateChange={setTemplate}>
          <ListEditor
            items={draft.projects}
            onChange={(projects) => setDraft((d) => ({ ...d, projects }))}
            fields={[
              { key: 'title', label: 'Title' },
              { key: 'description', label: 'Description' },
              { key: 'imageUrl', label: 'Image URL' },
              { key: 'link', label: 'Link' },
            ]}
            emptyItem={{ title: '', description: '', imageUrl: '', link: '' }}
            addLabel="+ Add project"
          />
        </SectionCard>

        <SectionCard title="Contact" type="contact" templates={draft.templates} onTemplateChange={setTemplate}>
          <Field label="Email" value={draft.contact.email} onChange={(v) => setDraft((d) => ({ ...d, contact: { ...d.contact, email: v } }))} />
          <ListEditor
            items={draft.contact.links}
            onChange={(links) => setDraft((d) => ({ ...d, contact: { ...d.contact, links } }))}
            fields={[
              { key: 'label', label: 'Label' },
              { key: 'url', label: 'URL' },
            ]}
            emptyItem={{ label: '', url: '' }}
            addLabel="+ Add link"
          />
        </SectionCard>

        <fieldset className="flex flex-col gap-3 rounded-lg border p-4">
          <legend className="px-1 text-sm font-semibold">Theme</legend>

          <div className="flex flex-wrap gap-3">
            {THEME_PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => setDraft((d) => ({ ...d, theme: preset.theme }))}
                className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:border-current"
              >
                <span className="flex gap-1">
                  <span
                    className="h-4 w-4 rounded-full border"
                    style={{ background: preset.theme.colorPrimary }}
                  />
                  <span
                    className="h-4 w-4 rounded-full border"
                    style={{ background: preset.theme.colorAccent }}
                  />
                </span>
                {preset.name}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm">
              Heading font
              <select
                value={draft.theme.fontHeading}
                onChange={(e) => setDraft((d) => ({ ...d, theme: { ...d.theme, fontHeading: e.target.value } }))}
                className="rounded border px-2 py-1"
              >
                {FONT_STACKS.map((f) => (
                  <option key={f.label} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm">
              Body font
              <select
                value={draft.theme.fontBody}
                onChange={(e) => setDraft((d) => ({ ...d, theme: { ...d.theme, fontBody: e.target.value } }))}
                className="rounded border px-2 py-1"
              >
                {FONT_STACKS.map((f) => (
                  <option key={f.label} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm">
              Primary
              <input type="color" value={draft.theme.colorPrimary} onChange={(e) => setDraft((d) => ({ ...d, theme: { ...d.theme, colorPrimary: e.target.value } }))} />
            </label>
            <label className="flex items-center gap-2 text-sm">
              Accent
              <input type="color" value={draft.theme.colorAccent} onChange={(e) => setDraft((d) => ({ ...d, theme: { ...d.theme, colorAccent: e.target.value } }))} />
            </label>
            <label className="flex items-center gap-2 text-sm">
              Background
              <input type="color" value={draft.theme.colorBackground} onChange={(e) => setDraft((d) => ({ ...d, theme: { ...d.theme, colorBackground: e.target.value } }))} />
            </label>
            <label className="flex items-center gap-2 text-sm">
              Spacing
              <select
                value={draft.theme.spacingScale}
                onChange={(e) => setDraft((d) => ({ ...d, theme: { ...d.theme, spacingScale: e.target.value as ThemeConfig['spacingScale'] } }))}
                className="rounded border px-2 py-1"
              >
                <option value="compact">Compact</option>
                <option value="normal">Normal</option>
                <option value="spacious">Spacious</option>
              </select>
            </label>
          </div>
        </fieldset>
      </div>

      <div className="overflow-y-auto border-t lg:border-t-0 lg:border-l">
        <div style={themeStyle(draft.theme)} className="min-h-full">
          {sections.map(({ id, type, template, data }) => {
            const Layout = (LAYOUTS[type] as Record<string, React.ComponentType<{ data: unknown }>>)[template];
            return <Layout key={id} data={data} />;
          })}
        </div>
      </div>
    </div>
  );
}

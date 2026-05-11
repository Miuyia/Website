'use client';

import { useLocale } from '@/components/locale-provider';
import { getResume } from '@/lib/resume';

export function ResumeContent() {
  const { t, locale } = useLocale();
  const resume = getResume(locale);
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <header className="mb-12 pb-8 border-b border-[var(--border)]">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-3">
          {t.resume.eyebrow}
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2">
          {resume.name}
        </h1>
        <p className="text-lg text-[var(--muted)] mb-6">{resume.tagline}</p>
        <p className="text-base leading-relaxed max-w-2xl">{resume.summary}</p>
        <dl className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2 text-sm">
          <div>
            <dt className="font-mono text-xs uppercase text-[var(--muted)] mb-1">
              {t.resume.labels.location}
            </dt>
            <dd>{resume.location}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase text-[var(--muted)] mb-1">
              {t.resume.labels.email}
            </dt>
            <dd>
              <a
                href={`mailto:${resume.email}`}
                className="underline underline-offset-4 decoration-1 hover:decoration-2"
              >
                {resume.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase text-[var(--muted)] mb-1">
              {t.resume.labels.website}
            </dt>
            <dd>
              <a
                href={resume.website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-1 hover:decoration-2"
              >
                {resume.website.replace(/^https?:\/\//, '')}
              </a>
            </dd>
          </div>
        </dl>
      </header>

      <Section title={t.resume.sections.experience}>
        <ul className="space-y-8">
          {resume.experience.map((exp, i) => (
            <li key={i}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-medium">
                  {exp.role} · <span className="text-[var(--muted)]">{exp.company}</span>
                </h3>
                <span className="font-mono text-xs text-[var(--muted)]">
                  {exp.start} — {exp.end}
                </span>
              </div>
              {exp.location && (
                <p className="text-sm text-[var(--muted)] mt-1">{exp.location}</p>
              )}
              <ul className="mt-3 space-y-1.5 list-disc pl-5 text-[var(--foreground)]">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="leading-relaxed">
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t.resume.sections.education}>
        <ul className="space-y-6">
          {resume.education.map((edu, i) => (
            <li key={i}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-medium">
                  {edu.school} · <span className="text-[var(--muted)]">{edu.degree}</span>
                </h3>
                <span className="font-mono text-xs text-[var(--muted)]">
                  {edu.start} — {edu.end}
                </span>
              </div>
              {edu.details && (
                <p className="text-sm text-[var(--muted)] mt-1">{edu.details}</p>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t.resume.sections.skills}>
        <dl className="space-y-4">
          {resume.skills.map(group => (
            <div
              key={group.category}
              className="flex flex-col sm:flex-row sm:gap-6 sm:items-baseline"
            >
              <dt className="font-mono text-xs uppercase text-[var(--muted)] sm:w-40 shrink-0 mb-1 sm:mb-0">
                {group.category}
              </dt>
              <dd className="flex flex-wrap gap-x-3 gap-y-1">
                {group.items.map(item => (
                  <span key={item}>{item}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-5 pb-2 border-b border-[var(--border)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

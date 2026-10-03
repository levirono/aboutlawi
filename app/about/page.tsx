import type { Metadata } from "next";
import { Code2, Database, Server, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Developer profile for John Doe — technical competencies, core stack, and chronological work experience.",
};

const TECH_COMPETENCIES = [
  {
    icon: Code2,
    label: "Languages",
    items: [
      "TypeScript",
      "JavaScript",
      "Go",
      "Python",
      "Rust (learning)",
    ],
  },
  {
    icon: Layers,
    label: "Frameworks & Libraries",
    items: [
      "React 19",
      "Next.js",
      "Node.js",
      "Express",
      "tRPC",
      "Prisma",
      "Drizzle ORM",
    ],
  },
  {
    icon: Database,
    label: "Data & Storage",
    items: [
      "PostgreSQL",
      "Redis",
      "MongoDB",
      "SQLite",
      "Elasticsearch",
    ],
  },
  {
    icon: Server,
    label: "Systems & Infrastructure",
    items: [
      "Docker",
      "Kubernetes",
      "AWS (ECS, S3, CloudFront)",
      "GitHub Actions",
      "Terraform",
    ],
  },
] as const;

const EXPERIENCE_TIMELINE = [
  {
    role: "Senior Software Engineer",
    company: "Acme Corp",
    period: "2023 – Present",
    highlights: [
      "Led architectural redesign of the core API gateway, reducing p99 latency by 60%.",
      "Mentored 5 junior engineers through structured code reviews and weekly 1-on-1s.",
      "Introduced feature-flag-driven deployment to enable zero-downtime releases.",
    ],
  },
  {
    role: "Software Engineer II",
    company: "Startup XYZ",
    period: "2021 – 2023",
    highlights: [
      "Shipped React component library consumed by 3 product squads.",
      "Migrated legacy REST endpoints to tRPC, eliminating an entire class of type-safety bugs.",
      "Owned CI/CD pipeline improvements, cutting build times from 18 min to 6 min.",
    ],
  },
  {
    role: "Software Engineer I",
    company: "Agency ABC",
    period: "2019 – 2021",
    highlights: [
      "Delivered 12+ client projects across fintech, health-tech, and e-commerce verticals.",
      "Built server-side-rendered marketing sites with Next.js and headless CMS.",
    ],
  },
] as const;

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-6xl px-6 py-20">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="mb-20 max-w-2xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          About
        </p>
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Senior Software Engineer Portfolio
        </h1>
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          I&apos;m John — a software engineer based in Nairobi with five years
          of professional experience building production systems. I value clean
          architecture, measurable performance, and collaborative engineering
          culture.
        </p>
      </header>

      {/* ── Core Stack & Proficiencies ───────────────────────────────── */}
      <section aria-labelledby="competencies-heading" className="mb-24">
        <h2
          id="competencies-heading"
          className="mb-10 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Core Stack &amp; Proficiencies
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TECH_COMPETENCIES.map(({ icon: Icon, label, items }) => (
            <div
              key={label}
              className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center gap-2">
                <Icon
                  className="h-4 w-4 text-zinc-400 dark:text-zinc-500"
                  aria-hidden="true"
                />
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {label}
                </h3>
              </div>
              <ul role="list" className="flex flex-col gap-2 list-none">
                {items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Experience Timeline ──────────────────────────────────────── */}
      <section aria-labelledby="experience-heading">
        <h2
          id="experience-heading"
          className="mb-10 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Work Experience
        </h2>

        <ol role="list" className="flex flex-col gap-12 list-none">
          {EXPERIENCE_TIMELINE.map(({ role, company, period, highlights }) => (
            <li
              key={`${company}-${period}`}
              className="relative grid gap-4 border-l border-zinc-200 pl-8 dark:border-zinc-800"
            >
              {/* Timeline dot */}
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"
              />

              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {role}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {company}
                  </p>
                </div>
                <time
                  className="shrink-0 font-mono text-xs text-zinc-400 dark:text-zinc-500"
                  dateTime={period}
                >
                  {period}
                </time>
              </div>

              <ul role="list" className="flex flex-col gap-2 list-none">
                {highlights.map((hl) => (
                  <li
                    key={hl}
                    className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500"
                    />
                    {hl}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
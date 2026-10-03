import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Full project portfolio for John Doe — open-source work, client builds, and personal engineering experiments.",
};

type Project = {
  title: string;
  description: string;
  stack: readonly string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
};

const PROJECTS: readonly Project[] = [
  {
    title: "Distributed Task Scheduler",
    description:
      "Fault-tolerant, horizontally-scalable job scheduling engine supporting 10 000+ concurrent tasks with at-least-once delivery guarantees. Built with Go and backed by Redis Streams.",
    stack: ["Go", "Redis", "PostgreSQL", "Kubernetes", "Prometheus"],
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    title: "Design System Platform",
    description:
      "Component library and token management platform serving 40+ product teams across a Series-C fintech. Includes automated visual regression CI via Chromatic.",
    stack: ["TypeScript", "React", "Storybook", "Chromatic", "Turborepo"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    title: "Real-time Collaboration API",
    description:
      "WebSocket-backed collaborative editing backend with operational transformation, presence indicators, and end-to-end conflict resolution logic.",
    stack: ["Node.js", "WebSocket", "CRDTs", "AWS ECS", "DynamoDB"],
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    title: "CLI Dev Toolkit",
    description:
      "Extensible command-line toolkit for automating repetitive project scaffolding, code generation, and deployment workflows across a monorepo.",
    stack: ["Go", "Cobra", "Viper"],
    githubUrl: "https://github.com",
  },
  {
    title: "Open Metrics Dashboard",
    description:
      "Server-rendered analytics dashboard pulling from the GitHub API to surface contribution heatmaps, PR cycle times, and code churn metrics.",
    stack: ["Next.js", "TypeScript", "shadcn/ui", "Recharts"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "WASM Image Processor",
    description:
      "Client-side image transformation pipeline compiled to WebAssembly — resize, crop, and convert without a round-trip to any server.",
    stack: ["Rust", "WebAssembly", "React"],
    githubUrl: "https://github.com",
  },
] as const;

function TechTag({ label }: { label: string }) {
  return (
    <span className="rounded-md border border-zinc-200 bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
      {label}
    </span>
  );
}

export default function ProjectsPage() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="mb-16 max-w-2xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Projects
        </p>
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Engineering Portfolio
        </h1>
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          A curated selection of production systems, open-source libraries, and
          personal experiments.
        </p>
      </header>

      {/* ── Featured ─────────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="mb-8 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Featured
        </h2>
        <ul
          role="list"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 list-none"
        >
          {featured.map((project) => (
            <li key={project.title}>
              <article className="flex h-full flex-col gap-5 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {project.description}
                  </p>
                </div>

                <ul role="list" className="flex flex-wrap gap-2 list-none">
                  {project.stack.map((tag) => (
                    <li key={tag}>
                      <TechTag label={tag} />
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center gap-3">
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} source on GitHub (opens in new tab)`}
                      >
                        {/* <Github className="h-3.5 w-3.5" aria-hidden="true" /> */}
                        Source
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} live demo (opens in new tab)`}
                      >
                        <ExternalLink
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                        Live
                      </a>
                    </Button>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Other Projects ───────────────────────────────────────────── */}
      <div>
        <h2 className="mb-8 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Other work
        </h2>
        <ul
          role="list"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none"
        >
          {rest.map((project) => (
            <li key={project.title}>
              <article className="flex h-full flex-col gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {project.title}
                  </h3>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source on GitHub`}
                      className="shrink-0 text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-50"
                    >
                      {/* <Github className="h-4 w-4" aria-hidden="true" /> */}
                    </a>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {project.description}
                </p>
                <ul role="list" className="mt-auto flex flex-wrap gap-1.5 list-none">
                  {project.stack.map((tag) => (
                    <li key={tag}>
                      <TechTag label={tag} />
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Senior Software Engineer Portfolio",
  description:
    "John Doe — Senior Software Engineer specialising in React, Next.js, TypeScript, and distributed systems. Available for new opportunities.",
};

const SELECTED_PROJECTS = [
  {
    title: "Distributed Task Scheduler",
    description:
      "A fault-tolerant, horizontally-scalable job scheduling engine supporting 10 000+ concurrent tasks with at-least-once delivery guarantees.",
    stack: ["Go", "Redis", "PostgreSQL", "Kubernetes"],
    href: "/projects",
  },
  {
    title: "Design System Platform",
    description:
      "Component library and token management platform serving 40+ product teams across a Series-C fintech, with automated visual regression CI.",
    stack: ["TypeScript", "React", "Storybook", "Chromatic"],
    href: "/projects",
  },
  {
    title: "Real-time Collaboration API",
    description:
      "WebSocket-backed collaborative editing backend with operational transformation, presence indicators, and end-to-end conflict resolution.",
    stack: ["Node.js", "WebSocket", "CRDTs", "AWS"],
    href: "/projects",
  },
] as const;

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="hero-heading"
        className="mx-auto max-w-6xl px-6 pb-24 pt-20 sm:pt-32"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left column — typography */}
          <div className="flex flex-col gap-6">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              aria-label="Status: available for work"
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500"
                aria-hidden="true"
              />
              Available for new opportunities
            </span>

            <h1
              id="hero-heading"
              className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl lg:text-7xl"
            >
              John Doe
            </h1>

            <p className="text-xl font-medium text-zinc-500 dark:text-zinc-400">
              Senior Software Engineer
            </p>

            <p className="max-w-prose text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              I architect and ship production-grade systems at scale — from
              distributed backends to polished user interfaces. Five years
              building at the intersection of performance, reliability, and
              developer experience.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button asChild>
                <Link href="/contact">
                  Get in touch
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/projects">View all projects</Link>
              </Button>
            </div>
          </div>

          {/* Right column — stat grid */}
          <aside
            aria-label="Career highlights"
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: "Years of experience", value: "5+" },
              { label: "Production systems shipped", value: "30+" },
              { label: "Open-source contributions", value: "120+" },
              { label: "Engineers mentored", value: "15+" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col gap-1 rounded-xl border border-zinc-200 bg-zinc-100 p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="text-3xl font-bold tabular-nums text-zinc-900 dark:text-zinc-50">
                  {value}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {label}
                </span>
              </div>
            ))}
          </aside>
        </div>
      </section>

      {/* ── Divider ─────────────────────────────────────────────────── */}
      <hr className="mx-6 border-zinc-200 dark:border-zinc-800" />

      {/* ── Selected Projects ────────────────────────────────────────── */}
      <section
        aria-labelledby="projects-heading"
        className="mx-auto max-w-6xl px-6 py-24"
      >
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Work
            </p>
            <h2
              id="projects-heading"
              className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              Selected Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 sm:flex"
          >
            All projects
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <ul role="list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SELECTED_PROJECTS.map(({ title, description, stack, href }) => (
            <li key={title}>
              <Link
                href={href}
                className="group flex h-full flex-col gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-6 transition-colors hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {description}
                  </p>
                </div>
                <ul
                  role="list"
                  className="mt-auto flex flex-wrap gap-2 list-none"
                >
                  {stack.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-zinc-200 bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Connect ─────────────────────────────────────────────────── */}
      <section
        aria-labelledby="connect-heading"
        className="border-t border-zinc-200 dark:border-zinc-800"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2
            id="connect-heading"
            className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Let&apos;s connect
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in new tab)"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in new tab)"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact" aria-label="Send an email via contact form">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
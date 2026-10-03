import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import { CtaButtons, Paragraphs } from "@/components/site/blocks";
import { Reveal } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";
import { findPublicProjectBySlug } from "@/server/db/queries/content";
import { slugSchema } from "@/shared/schemas/common";

const paramsSchema = z.object({ slug: slugSchema });

async function loadProject(params: PageProps<"/projects/[slug]">["params"]) {
  const parsed = paramsSchema.safeParse(await params);
  if (!parsed.success) notFound();
  const project = await findPublicProjectBySlug(parsed.data.slug);
  if (!project) notFound();
  return project;
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = await loadProject(params);
  return {
    title: project.title,
    description: project.summary,
    openGraph: project.imageUrl ? { images: [{ url: project.imageUrl }] } : undefined,
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const project = await loadProject(params);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-12 px-6 py-16 sm:py-24">
      <Link
        href="/projects"
        className="group inline-flex items-center gap-1 self-start rounded-md text-sm text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
        Projects
      </Link>

      <Reveal className="flex flex-col gap-6">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{project.title}</h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400">{project.summary}</p>
        {project.tags.length > 0 && (
          <ul role="list" className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Badge>{tag}</Badge>
              </li>
            ))}
          </ul>
        )}
        <CtaButtons
          primary={{ label: project.liveUrl ? "Visit site" : null, href: project.liveUrl }}
          secondary={{ label: project.repoUrl ? "Source code" : null, href: project.repoUrl }}
        />
      </Reveal>

      {project.imageUrl && (
        <Reveal className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
          <Image src={project.imageUrl} alt={project.imageAlt ?? ""} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
        </Reveal>
      )}

      <Paragraphs text={project.body} className="flex flex-col gap-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300" />
    </main>
  );
}

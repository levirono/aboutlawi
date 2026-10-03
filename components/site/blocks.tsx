import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SmartLink } from "@/components/site/smart-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProjectCard as ProjectCardData } from "@/server/db/queries/content";

/* Presentational building blocks shared by every public page. They render only what they are given. */

export function Paragraphs({ text, className }: { text: string | null; className?: string }) {
  if (!text) return null;
  return (
    <div className={className}>
      {text.split(/\n{2,}/).map((paragraph, index) => (
        <p key={index} className="whitespace-pre-line">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export function SectionHeading({ title, subtitle, as = "h2" }: { title: string | null; subtitle?: string | null; as?: "h1" | "h2" }) {
  if (!title && !subtitle) return null;
  const Heading = as;
  return (
    <div className="flex max-w-2xl flex-col gap-3">
      {title && (
        <Heading
          className={
            as === "h1"
              ? "text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
              : "text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
          }
        >
          {title}
        </Heading>
      )}
      {subtitle && <p className="text-lg text-pretty text-zinc-500 dark:text-zinc-400">{subtitle}</p>}
    </div>
  );
}

type Cta = { label: string | null; href: string | null };

export function CtaButtons({ primary, secondary }: { primary: Cta; secondary?: Cta }) {
  const showPrimary = primary.label && primary.href;
  const showSecondary = secondary?.label && secondary.href;
  if (!showPrimary && !showSecondary) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {showPrimary && (
        <Button asChild size="lg" className="group">
          <SmartLink href={primary.href!}>
            {primary.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
          </SmartLink>
        </Button>
      )}
      {showSecondary && (
        <Button asChild size="lg" variant="outline">
          <SmartLink href={secondary.href!}>{secondary.label}</SmartLink>
        </Button>
      )}
    </div>
  );
}

export function SeeAllLink({ label, href }: Cta) {
  if (!label || !href) return null;
  return (
    <SmartLink
      href={href}
      className="group inline-flex items-center gap-1 rounded-md text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-400 dark:hover:text-zinc-50"
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
    </SmartLink>
  );
}

export function ProjectGrid({ projects }: { projects: ProjectCardData[] }) {
  return (
    <ul role="list" className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <Reveal as="li" key={project.id} index={index}>
          <Link
            href={`/projects/${project.slug}`}
            className="group flex flex-col gap-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-zinc-950"
          >
            {project.imageUrl && (
              <div className="relative aspect-video overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
                <Image
                  src={project.imageUrl}
                  alt={project.imageAlt ?? ""}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <h3 className="flex items-center gap-1 text-lg font-semibold">
                {project.title}
                <ArrowUpRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{project.summary}</p>
              {project.tags.length > 0 && (
                <ul role="list" className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <Badge>{tag}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

type SkillData = { id: number; name: string; category: string; description: string | null };

export function SkillChips({ skills }: { skills: SkillData[] }) {
  return (
    <ul role="list" className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <Reveal as="li" key={skill.id} index={index}>
          <span className="inline-block rounded-full border border-zinc-200 px-4 py-2 text-sm dark:border-zinc-800">{skill.name}</span>
        </Reveal>
      ))}
    </ul>
  );
}

export function SkillGroups({ skills }: { skills: SkillData[] }) {
  const groups = new Map<string, SkillData[]>();
  for (const skill of skills) groups.set(skill.category, [...(groups.get(skill.category) ?? []), skill]);

  return (
    <div className="flex flex-col gap-14">
      {[...groups].map(([category, items]) => (
        <Reveal as="section" key={category} className="flex flex-col gap-5">
          <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">{category}</h2>
          <ul role="list" className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((skill) => (
              <li key={skill.id} className="flex flex-col gap-1">
                <span className="font-medium">{skill.name}</span>
                {skill.description && <span className="text-sm text-zinc-500 dark:text-zinc-400">{skill.description}</span>}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}

type AchievementData = {
  id: number;
  title: string;
  issuer: string | null;
  description: string | null;
  achievedOn: string | null;
  url: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
};

const monthYear = new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" });

export function AchievementList({ achievements }: { achievements: AchievementData[] }) {
  return (
    <ol role="list" className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800">
      {achievements.map((achievement, index) => (
        <Reveal as="li" key={achievement.id} index={index} className="flex flex-col gap-4 py-8 sm:flex-row sm:gap-10">
          {achievement.achievedOn && (
            <time dateTime={achievement.achievedOn} className="shrink-0 text-sm tabular-nums text-zinc-500 sm:w-28 dark:text-zinc-400">
              {monthYear.format(new Date(achievement.achievedOn))}
            </time>
          )}
          <div className="flex flex-1 flex-col gap-2">
            <h3 className="text-lg font-semibold">
              {achievement.url ? (
                <SmartLink href={achievement.url} className="rounded-md underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400">
                  {achievement.title}
                </SmartLink>
              ) : (
                achievement.title
              )}
            </h3>
            {achievement.issuer && <p className="text-sm text-zinc-500 dark:text-zinc-400">{achievement.issuer}</p>}
            {achievement.description && <p className="text-zinc-600 dark:text-zinc-300">{achievement.description}</p>}
          </div>
          {achievement.imageUrl && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg sm:w-40">
              <Image src={achievement.imageUrl} alt={achievement.imageAlt ?? ""} fill sizes="160px" className="object-cover" />
            </div>
          )}
        </Reveal>
      ))}
    </ol>
  );
}

type GalleryData = { id: number; title: string | null; caption: string | null; imageUrl: string; imageAlt: string };

export function GalleryGrid({ items, compact = false }: { items: GalleryData[]; compact?: boolean }) {
  return (
    <ul role="list" className={compact ? "grid grid-cols-2 gap-4 lg:grid-cols-4" : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"}>
      {items.map((item, index) => (
        <Reveal as="li" key={item.id} index={index}>
          <figure className="flex flex-col gap-3">
            <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
              <Image
                src={item.imageUrl}
                alt={item.imageAlt}
                fill
                sizes={compact ? "(min-width: 1024px) 25vw, 50vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                className="object-cover transition-transform duration-500 hover:scale-105 motion-reduce:transition-none"
              />
            </div>
            {!compact && (item.title || item.caption) && (
              <figcaption className="flex flex-col gap-1">
                {item.title && <span className="font-medium">{item.title}</span>}
                {item.caption && <span className="text-sm text-zinc-500 dark:text-zinc-400">{item.caption}</span>}
              </figcaption>
            )}
          </figure>
        </Reveal>
      ))}
    </ul>
  );
}

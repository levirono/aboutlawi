import Image from "next/image";
import type { ReactNode } from "react";
import {
  AchievementList,
  CtaButtons,
  GalleryGrid,
  Paragraphs,
  ProjectGrid,
  SectionHeading,
  SeeAllLink,
  SkillChips,
  SkillGroups,
} from "@/components/site/blocks";
import { ContactForm } from "@/components/site/contact-form";
import { ParallaxImage } from "@/components/site/parallax-image";
import { Reveal } from "@/components/site/reveal";
import { SocialLinks } from "@/components/site/social-links";
import {
  listPublicAchievements,
  listPublicGallery,
  listPublicProjects,
  listPublicSkills,
  listPublicSocialLinks,
} from "@/server/db/queries/content";
import { listVisibleSections, type PageSection } from "@/server/db/queries/site";
import type { Page } from "@/shared/constants";

const featured = (section: PageSection) => ({ featuredOnly: true, limit: section.itemLimit ?? undefined });

/** Shell for a content section: generous whitespace, one idea per section. */
function Block({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
      <Reveal className="flex flex-col gap-10">{children}</Reveal>
    </section>
  );
}

function PreviewHeader({ section }: { section: PageSection }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <SectionHeading title={section.title} subtitle={section.subtitle} />
      <SeeAllLink label={section.ctaLabel} href={section.ctaHref} />
    </div>
  );
}

/** The full list for a page's `item_list` section; returns null when the list is empty. */
async function PageItems({ page }: { page: Page }) {
  switch (page) {
    case "projects": {
      const projects = await listPublicProjects();
      return projects.length > 0 ? <ProjectGrid projects={projects} /> : null;
    }
    case "skills": {
      const skills = await listPublicSkills();
      return skills.length > 0 ? <SkillGroups skills={skills} /> : null;
    }
    case "achievements": {
      const achievements = await listPublicAchievements();
      return achievements.length > 0 ? <AchievementList achievements={achievements} /> : null;
    }
    case "gallery": {
      const items = await listPublicGallery();
      return items.length > 0 ? <GalleryGrid items={items} /> : null;
    }
    default:
      return null;
  }
}

async function SectionView({ section, items }: { section: PageSection; items: ReactNode }) {
  switch (section.type) {
    case "hero":
      return (
        <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-16 pt-12 sm:pb-24 sm:pt-20 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-8">
            {section.title && (
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">{section.title}</h1>
            )}
            <Paragraphs text={section.body} className="flex max-w-xl flex-col gap-4 text-lg text-zinc-500 dark:text-zinc-400" />
            <CtaButtons
              primary={{ label: section.ctaLabel, href: section.ctaHref }}
              secondary={{ label: section.secondaryCtaLabel, href: section.secondaryCtaHref }}
            />
          </Reveal>
          {section.imageUrl && <ParallaxImage src={section.imageUrl} alt={section.imageAlt ?? ""} className="aspect-4/5 w-full sm:aspect-square" />}
        </section>
      );

    case "page_header":
      return (
        <section className="mx-auto w-full max-w-6xl px-6 pb-4 pt-16 sm:pt-24">
          <Reveal>
            <SectionHeading as="h1" title={section.title} subtitle={section.subtitle} />
          </Reveal>
        </section>
      );

    case "rich_text": {
      if (!section.title && !section.body && !section.imageUrl) return null;
      return (
        <Block>
          <div className={section.imageUrl ? "grid items-start gap-12 lg:grid-cols-5" : "flex flex-col"}>
            <div className="flex flex-col gap-6 lg:col-span-3">
              <SectionHeading title={section.title} subtitle={section.subtitle} />
              <Paragraphs text={section.body} className="flex max-w-2xl flex-col gap-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300" />
            </div>
            {section.imageUrl && (
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl lg:col-span-2">
                <Image src={section.imageUrl} alt={section.imageAlt ?? ""} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            )}
          </div>
        </Block>
      );
    }

    case "featured_projects": {
      const projects = await listPublicProjects(featured(section));
      if (projects.length === 0) return null;
      return (
        <Block>
          <PreviewHeader section={section} />
          <ProjectGrid projects={projects} />
        </Block>
      );
    }

    case "skills_summary": {
      const skills = await listPublicSkills(featured(section));
      if (skills.length === 0) return null;
      return (
        <Block>
          <PreviewHeader section={section} />
          <SkillChips skills={skills} />
        </Block>
      );
    }

    case "achievements_highlights": {
      const achievements = await listPublicAchievements(featured(section));
      if (achievements.length === 0) return null;
      return (
        <Block>
          <PreviewHeader section={section} />
          <AchievementList achievements={achievements} />
        </Block>
      );
    }

    case "gallery_preview": {
      const items = await listPublicGallery(featured(section));
      if (items.length === 0) return null;
      return (
        <Block>
          <PreviewHeader section={section} />
          <GalleryGrid items={items} compact />
        </Block>
      );
    }

    case "contact_cta":
      if (!section.title && !section.body) return null;
      return (
        <Block>
          <div className="flex flex-col items-start gap-8 rounded-2xl border border-zinc-200 p-8 sm:p-14 dark:border-zinc-800">
            <SectionHeading title={section.title} subtitle={section.subtitle} />
            <Paragraphs text={section.body} className="flex max-w-xl flex-col gap-4 text-zinc-500 dark:text-zinc-400" />
            <CtaButtons primary={{ label: section.ctaLabel, href: section.ctaHref }} />
          </div>
        </Block>
      );

    case "contact_form":
      return (
        <Block id="contact-form">
          <SectionHeading title={section.title} subtitle={section.subtitle} />
          <div className="max-w-2xl">
            <ContactForm />
          </div>
        </Block>
      );

    case "social_links": {
      const links = await listPublicSocialLinks();
      if (links.length === 0) return null;
      return (
        <Block>
          <SectionHeading title={section.title} subtitle={section.subtitle} />
          <SocialLinks links={links} variant="list" />
        </Block>
      );
    }

    case "item_list":
      return items ? <section className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">{items}</section> : null;

    case "empty_state":
      // Only shown when the page's list is empty.
      return items || !section.title ? null : (
        <section className="mx-auto w-full max-w-6xl px-6 py-24">
          <p className="text-center text-zinc-500 dark:text-zinc-400">{section.title}</p>
        </section>
      );
  }
}

/** Renders a public page entirely from its admin-managed, ordered, visible sections. */
export async function SitePage({ page }: { page: Page }) {
  const sections = await listVisibleSections(page);
  const needsItems = sections.some((section) => section.type === "item_list" || section.type === "empty_state");
  const items = needsItems ? await PageItems({ page }) : null;

  return (
    <main className="flex flex-1 flex-col">
      {sections.map((section) => (
        <SectionView key={section.id} section={section} items={items} />
      ))}
    </main>
  );
}

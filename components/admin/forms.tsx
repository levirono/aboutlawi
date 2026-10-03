"use client";

import { ResourceForm, type FieldConfig } from "@/components/admin/resource-form";
import type { Achievement, GalleryItem, Project, Skill, SocialLink } from "@/server/db/queries/content";
import type { PageMeta, PageSection, SiteSettings } from "@/server/db/queries/site";
import {
  createAchievementAction,
  createGalleryItemAction,
  createProjectAction,
  createSectionAction,
  createSkillAction,
  createSocialLinkAction,
  updateAchievementAction,
  updateGalleryItemAction,
  updateProjectAction,
  updateSectionAction,
  updateSkillAction,
  updateSocialLinkAction,
} from "@/server/actions/content";
import { savePageMetaAction, saveSiteSettingsAction } from "@/server/actions/settings";
import {
  PAGE_LABELS,
  PAGES,
  SECTION_TYPE_LABELS,
  SECTION_TYPES,
  SOCIAL_ICON_LABELS,
  SOCIAL_ICONS,
  type Page,
} from "@/shared/constants";
import {
  achievementCreateSchema,
  achievementUpdateSchema,
  galleryCreateSchema,
  galleryUpdateSchema,
  pageMetaSchema,
  projectCreateSchema,
  projectUpdateSchema,
  sectionCreateSchema,
  sectionUpdateSchema,
  siteSettingsSchema,
  skillCreateSchema,
  skillUpdateSchema,
  socialLinkCreateSchema,
  socialLinkUpdateSchema,
} from "@/shared/schemas/content";
import type { z } from "zod";

/** Database nulls become empty inputs; the shared schemas turn empty strings back into nulls. */
const text = (value: string | null | undefined): string => value ?? "";

const options = <T extends string>(values: readonly T[], labels: Record<T, string>) =>
  values.map((value) => ({ value, label: labels[value] }));

const visibleField = { name: "visible", label: "Visible on the site", kind: "switch" } as const;
const featuredField = { name: "featured", label: "Featured on the home page", kind: "switch" } as const;

const imageFields = (savedPublicId: string | null) =>
  [
    { name: "imageUrl", publicIdName: "imagePublicId", label: "Image", kind: "image", savedPublicId },
    { name: "imageAlt", label: "Image alt text", kind: "text", description: "Describe the image for screen readers." },
  ] as const;

/* ─── Projects ──────────────────────────────────────────────────────────── */

type ProjectValues = z.input<typeof projectCreateSchema>;

export function ProjectForm({ project }: { project?: Project }) {
  const fields: FieldConfig<ProjectValues>[] = [
    { name: "title", label: "Title", kind: "text" },
    { name: "slug", label: "Slug", kind: "text", description: "Used in the URL: /projects/your-slug" },
    { name: "summary", label: "Summary", kind: "textarea", rows: 3 },
    { name: "body", label: "Details", kind: "textarea", rows: 10, description: "Blank lines start new paragraphs." },
    ...imageFields(project?.imagePublicId ?? null),
    { name: "repoUrl", label: "Repository URL", kind: "url" },
    { name: "liveUrl", label: "Live URL", kind: "url" },
    { name: "tags", label: "Tags", kind: "text", description: "Comma separated, e.g. Next.js, Postgres" },
    featuredField,
    visibleField,
  ];
  const values: ProjectValues = {
    title: text(project?.title),
    slug: text(project?.slug),
    summary: text(project?.summary),
    body: text(project?.body),
    imageUrl: text(project?.imageUrl),
    imagePublicId: text(project?.imagePublicId),
    imageAlt: text(project?.imageAlt),
    repoUrl: text(project?.repoUrl),
    liveUrl: text(project?.liveUrl),
    tags: project?.tags.join(", ") ?? "",
    featured: project?.featured ?? false,
    visible: project?.visible ?? true,
  };
  return project ? (
    <ResourceForm schema={projectUpdateSchema} action={updateProjectAction} defaultValues={{ ...values, id: project.id }} fields={fields} submitLabel="Save project" />
  ) : (
    <ResourceForm schema={projectCreateSchema} action={createProjectAction} defaultValues={values} fields={fields} submitLabel="Create project" redirectTo="/admin/projects" />
  );
}

/* ─── Skills ────────────────────────────────────────────────────────────── */

type SkillValues = z.input<typeof skillCreateSchema>;

export function SkillForm({ skill }: { skill?: Skill }) {
  const fields: FieldConfig<SkillValues>[] = [
    { name: "name", label: "Name", kind: "text" },
    { name: "category", label: "Category", kind: "text", description: "Skills are grouped by category, e.g. Frontend." },
    { name: "description", label: "Description", kind: "textarea", rows: 3 },
    featuredField,
    visibleField,
  ];
  const values: SkillValues = {
    name: text(skill?.name),
    category: text(skill?.category),
    description: text(skill?.description),
    featured: skill?.featured ?? false,
    visible: skill?.visible ?? true,
  };
  return skill ? (
    <ResourceForm schema={skillUpdateSchema} action={updateSkillAction} defaultValues={{ ...values, id: skill.id }} fields={fields} submitLabel="Save skill" />
  ) : (
    <ResourceForm schema={skillCreateSchema} action={createSkillAction} defaultValues={values} fields={fields} submitLabel="Create skill" redirectTo="/admin/skills" />
  );
}

/* ─── Achievements ──────────────────────────────────────────────────────── */

type AchievementValues = z.input<typeof achievementCreateSchema>;

export function AchievementForm({ achievement }: { achievement?: Achievement }) {
  const fields: FieldConfig<AchievementValues>[] = [
    { name: "title", label: "Title", kind: "text" },
    { name: "issuer", label: "Issuer", kind: "text" },
    { name: "achievedOn", label: "Date", kind: "date" },
    { name: "description", label: "Description", kind: "textarea", rows: 4 },
    { name: "url", label: "Link", kind: "url", description: "Certificate or announcement URL." },
    ...imageFields(achievement?.imagePublicId ?? null),
    featuredField,
    visibleField,
  ];
  const values: AchievementValues = {
    title: text(achievement?.title),
    issuer: text(achievement?.issuer),
    achievedOn: text(achievement?.achievedOn),
    description: text(achievement?.description),
    url: text(achievement?.url),
    imageUrl: text(achievement?.imageUrl),
    imagePublicId: text(achievement?.imagePublicId),
    imageAlt: text(achievement?.imageAlt),
    featured: achievement?.featured ?? false,
    visible: achievement?.visible ?? true,
  };
  return achievement ? (
    <ResourceForm schema={achievementUpdateSchema} action={updateAchievementAction} defaultValues={{ ...values, id: achievement.id }} fields={fields} submitLabel="Save achievement" />
  ) : (
    <ResourceForm schema={achievementCreateSchema} action={createAchievementAction} defaultValues={values} fields={fields} submitLabel="Create achievement" redirectTo="/admin/achievements" />
  );
}

/* ─── Gallery ───────────────────────────────────────────────────────────── */

type GalleryValues = z.input<typeof galleryCreateSchema>;

export function GalleryItemForm({ item }: { item?: GalleryItem }) {
  const fields: FieldConfig<GalleryValues>[] = [
    ...imageFields(item?.imagePublicId ?? null),
    { name: "title", label: "Title", kind: "text" },
    { name: "caption", label: "Caption", kind: "textarea", rows: 3 },
    featuredField,
    visibleField,
  ];
  const values: GalleryValues = {
    imageUrl: text(item?.imageUrl),
    imagePublicId: text(item?.imagePublicId),
    imageAlt: text(item?.imageAlt),
    title: text(item?.title),
    caption: text(item?.caption),
    featured: item?.featured ?? false,
    visible: item?.visible ?? true,
  };
  return item ? (
    <ResourceForm schema={galleryUpdateSchema} action={updateGalleryItemAction} defaultValues={{ ...values, id: item.id }} fields={fields} submitLabel="Save image" />
  ) : (
    <ResourceForm schema={galleryCreateSchema} action={createGalleryItemAction} defaultValues={values} fields={fields} submitLabel="Add image" redirectTo="/admin/gallery" />
  );
}

/* ─── Social links ──────────────────────────────────────────────────────── */

type SocialLinkValues = z.input<typeof socialLinkCreateSchema>;

export function SocialLinkForm({ link }: { link?: SocialLink }) {
  const fields: FieldConfig<SocialLinkValues>[] = [
    { name: "label", label: "Label", kind: "text" },
    { name: "url", label: "URL", kind: "url", description: "For WhatsApp Business use https://wa.me/<number>." },
    { name: "icon", label: "Icon", kind: "select", options: options(SOCIAL_ICONS, SOCIAL_ICON_LABELS) },
    { name: "showInHeader", label: "Show in the header", kind: "switch" },
    visibleField,
  ];
  const values: SocialLinkValues = {
    label: text(link?.label),
    url: text(link?.url),
    icon: link?.icon ?? "other",
    showInHeader: link?.showInHeader ?? false,
    visible: link?.visible ?? true,
  };
  return link ? (
    <ResourceForm schema={socialLinkUpdateSchema} action={updateSocialLinkAction} defaultValues={{ ...values, id: link.id }} fields={fields} submitLabel="Save link" />
  ) : (
    <ResourceForm schema={socialLinkCreateSchema} action={createSocialLinkAction} defaultValues={values} fields={fields} submitLabel="Create link" redirectTo="/admin/social-links" />
  );
}

/* ─── Page sections ─────────────────────────────────────────────────────── */

type SectionValues = z.input<typeof sectionCreateSchema>;

export function SectionForm({ section, page }: { section?: PageSection; page?: Page }) {
  const fields: FieldConfig<SectionValues>[] = [
    { name: "page", label: "Page", kind: "select", options: options(PAGES, PAGE_LABELS) },
    { name: "type", label: "Section type", kind: "select", options: options(SECTION_TYPES, SECTION_TYPE_LABELS) },
    { name: "key", label: "Key", kind: "text", description: "Unique per page, e.g. hero or contact-cta." },
    { name: "title", label: "Title / headline", kind: "text" },
    { name: "subtitle", label: "Subtitle", kind: "textarea", rows: 2 },
    { name: "body", label: "Body text", kind: "textarea", rows: 8, description: "Blank lines start new paragraphs." },
    ...imageFields(section?.imagePublicId ?? null),
    { name: "ctaLabel", label: "Button label", kind: "text" },
    { name: "ctaHref", label: "Button link", kind: "text", placeholder: "/projects or https://…" },
    { name: "secondaryCtaLabel", label: "Second button label", kind: "text" },
    { name: "secondaryCtaHref", label: "Second button link", kind: "text" },
    { name: "itemLimit", label: "Items to show", kind: "number", min: 1, max: 48, description: "For previews. Leave blank to show all." },
    visibleField,
  ];
  const values: SectionValues = {
    page: section?.page ?? page ?? "home",
    type: section?.type ?? "rich_text",
    key: text(section?.key),
    title: text(section?.title),
    subtitle: text(section?.subtitle),
    body: text(section?.body),
    imageUrl: text(section?.imageUrl),
    imagePublicId: text(section?.imagePublicId),
    imageAlt: text(section?.imageAlt),
    ctaLabel: text(section?.ctaLabel),
    ctaHref: text(section?.ctaHref),
    secondaryCtaLabel: text(section?.secondaryCtaLabel),
    secondaryCtaHref: text(section?.secondaryCtaHref),
    itemLimit: section?.itemLimit ?? null,
    visible: section?.visible ?? true,
  };
  return section ? (
    <ResourceForm schema={sectionUpdateSchema} action={updateSectionAction} defaultValues={{ ...values, id: section.id }} fields={fields} submitLabel="Save section" />
  ) : (
    <ResourceForm schema={sectionCreateSchema} action={createSectionAction} defaultValues={values} fields={fields} submitLabel="Create section" redirectTo={`/admin/sections?page=${values.page}`} />
  );
}

/* ─── Settings ──────────────────────────────────────────────────────────── */

type SettingsValues = z.input<typeof siteSettingsSchema>;

export function SiteSettingsForm({ settings }: { settings: SiteSettings | null }) {
  const fields: FieldConfig<SettingsValues>[] = [
    { name: "siteName", label: "Site name", kind: "text", description: "Shown in the header, footer and browser tab." },
    { name: "ownerName", label: "Your name", kind: "text" },
    { name: "seoTitle", label: "Default SEO title", kind: "text" },
    { name: "seoDescription", label: "Default SEO description", kind: "textarea", rows: 3 },
    { name: "imageUrl", publicIdName: "imagePublicId", label: "Social share image", kind: "image", savedPublicId: settings?.ogImagePublicId ?? null },
  ];
  const values: SettingsValues = {
    siteName: text(settings?.siteName),
    ownerName: text(settings?.ownerName),
    seoTitle: text(settings?.seoTitle),
    seoDescription: text(settings?.seoDescription),
    imageUrl: text(settings?.ogImageUrl),
    imagePublicId: text(settings?.ogImagePublicId),
  };
  return <ResourceForm schema={siteSettingsSchema} action={saveSiteSettingsAction} defaultValues={values} fields={fields} submitLabel="Save settings" />;
}

type PageMetaValues = z.input<typeof pageMetaSchema>;

const pageMetaFields: FieldConfig<PageMetaValues>[] = [
  { name: "title", label: "SEO title", kind: "text" },
  { name: "description", label: "SEO description", kind: "textarea", rows: 2 },
];

export function PageMetaForm({ page, meta }: { page: Page; meta: PageMeta | null }) {
  const values: PageMetaValues = { page, title: text(meta?.title), description: text(meta?.description) };
  return (
    <ResourceForm schema={pageMetaSchema} action={savePageMetaAction} defaultValues={values} fields={pageMetaFields} submitLabel={`Save ${PAGE_LABELS[page]} SEO`} idPrefix={`meta-${page}`} />
  );
}

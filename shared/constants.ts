/**
 * Enumerations shared by the database schema, Zod schemas and admin forms.
 * Defined once here so the client and server can never disagree.
 */

export const PAGES = ["home", "projects", "skills", "achievements", "gallery", "about", "contact"] as const;
export type Page = (typeof PAGES)[number];

export const PAGE_LABELS: Record<Page, string> = {
  home: "Home",
  projects: "Projects",
  skills: "Skills",
  achievements: "Achievements",
  gallery: "Gallery",
  about: "About",
  contact: "Contact",
};

export const PAGE_PATHS: Record<Page, string> = {
  home: "/",
  projects: "/projects",
  skills: "/skills",
  achievements: "/achievements",
  gallery: "/gallery",
  about: "/about",
  contact: "/contact",
};

export const SECTION_TYPES = [
  "hero",
  "page_header",
  "rich_text",
  "featured_projects",
  "skills_summary",
  "achievements_highlights",
  "gallery_preview",
  "contact_cta",
  "contact_form",
  "social_links",
  "item_list",
  "empty_state",
] as const;
export type SectionType = (typeof SECTION_TYPES)[number];

export const SECTION_TYPE_LABELS: Record<SectionType, string> = {
  hero: "Hero",
  page_header: "Page heading",
  rich_text: "Text block",
  featured_projects: "Featured projects",
  skills_summary: "Skills summary",
  achievements_highlights: "Achievement highlights",
  gallery_preview: "Gallery preview",
  contact_cta: "Contact call to action",
  contact_form: "Contact form",
  social_links: "Social links",
  item_list: "Item list (page content)",
  empty_state: "Empty-state text",
};

export const SOCIAL_ICONS = ["github", "linkedin", "whatsapp", "twitter", "email", "website", "other"] as const;
export type SocialIcon = (typeof SOCIAL_ICONS)[number];

export const SOCIAL_ICON_LABELS: Record<SocialIcon, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  whatsapp: "WhatsApp",
  twitter: "X / Twitter",
  email: "Email",
  website: "Website",
  other: "Other",
};

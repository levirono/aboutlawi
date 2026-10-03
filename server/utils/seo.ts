import "server-only";
import type { Metadata } from "next";
import { getPageMeta, getSiteSettings } from "@/server/db/queries/site";
import type { Page } from "@/shared/constants";

/** Site-wide defaults (title template, description, share image) from site_settings. */
export async function siteMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  if (!settings) return {};
  const images = settings.ogImageUrl ? [{ url: settings.ogImageUrl }] : undefined;
  return {
    title: { default: settings.seoTitle ?? settings.siteName, template: `%s · ${settings.siteName}` },
    description: settings.seoDescription ?? undefined,
    openGraph: { siteName: settings.siteName, type: "website", images },
  };
}

/** Per-page title and description from page_meta; missing values fall back to the site defaults. */
export async function pageMetadata(page: Page, overrides: Metadata = {}): Promise<Metadata> {
  const meta = await getPageMeta(page);
  const base: Metadata = {};
  if (meta?.title) base.title = page === "home" ? { absolute: meta.title } : meta.title;
  if (meta?.description) base.description = meta.description;
  return { ...base, ...overrides };
}

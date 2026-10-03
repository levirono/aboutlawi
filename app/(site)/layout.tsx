import type { Metadata } from "next";
import { connection } from "next/server";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { listPublicSocialLinks } from "@/server/db/queries/content";
import { getSiteSettings } from "@/server/db/queries/site";
import { siteMetadata } from "@/server/utils/seo";

export function generateMetadata(): Promise<Metadata> {
  return siteMetadata();
}

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  // All public content is read from the database at request time.
  await connection();
  const [settings, socialLinks] = await Promise.all([getSiteSettings(), listPublicSocialLinks()]);

  return (
    <>
      <SiteHeader siteName={settings?.siteName ?? null} socialLinks={socialLinks} />
      {children}
      <SiteFooter siteName={settings?.siteName ?? null} socialLinks={socialLinks} />
    </>
  );
}

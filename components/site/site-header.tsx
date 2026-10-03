import Link from "next/link";
import { NavLinks } from "@/components/site/nav-links";
import { SocialLinks } from "@/components/site/social-links";
import type { PublicSocialLink } from "@/server/db/queries/content";

type SiteHeaderProps = { siteName: string | null; socialLinks: PublicSocialLink[] };

export function SiteHeader({ siteName, socialLinks }: SiteHeaderProps) {
  const headerLinks = socialLinks.filter((link) => link.showInHeader);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-zinc-50/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-3 md:flex-row md:items-center md:justify-between md:gap-8 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {siteName ? (
            <Link
              href="/"
              className="rounded-md text-sm font-semibold tracking-tight text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-50"
            >
              {siteName}
            </Link>
          ) : (
            <span />
          )}
          <SocialLinks links={headerLinks} className="md:hidden" />
        </div>
        <div className="flex items-center gap-6">
          <NavLinks />
          <SocialLinks links={headerLinks} className="hidden md:flex" />
        </div>
      </div>
    </header>
  );
}

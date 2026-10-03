import Link from "next/link";
import { NAV_LINKS } from "@/components/site/navigation";
import { SocialLinks } from "@/components/site/social-links";
import type { PublicSocialLink } from "@/server/db/queries/content";

type SiteFooterProps = { siteName: string | null; socialLinks: PublicSocialLink[] };

/** Footer layout and copy are defined in code, as the prompt allows. Links come from the DB. */
export function SiteFooter({ siteName, socialLinks }: SiteFooterProps) {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <nav aria-label="Footer">
          <ul role="list" className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="rounded-md text-sm text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <SocialLinks links={socialLinks} className="-ml-2" />
      </div>
      <p className="mx-auto max-w-6xl px-6 pb-10 text-xs text-zinc-400 dark:text-zinc-500">
        © {new Date().getFullYear()} {siteName}
      </p>
    </footer>
  );
}

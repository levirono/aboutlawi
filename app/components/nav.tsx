import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Site-wide navigation — RSC safe (no client state needed).
 * Active-link highlighting is handled via CSS :where() without JS.
 */
export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-zinc-50/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          aria-label="John Doe — home"
        >
          jd<span className="text-zinc-400 dark:text-zinc-500">.dev</span>
        </Link>

        <ul
          role="list"
          className="flex items-center gap-6 list-none"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900",
                  "dark:text-zinc-400 dark:hover:text-zinc-50"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

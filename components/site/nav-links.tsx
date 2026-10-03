"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/components/site/navigation";
import { cn } from "@/lib/utils";

/** Leaf client component: only needed to highlight the active route. Scrolls horizontally on small screens. */
export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="-mx-2 overflow-x-auto">
      <ul role="list" className="flex items-center gap-1 px-2">
        {NAV_LINKS.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block whitespace-nowrap rounded-md px-2 py-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-400 dark:hover:text-zinc-50",
                  active && "text-zinc-900 dark:text-zinc-50",
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  Cog,
  FolderKanban,
  Images,
  LayoutDashboard,
  LayoutList,
  Link2,
  Mail,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/sections", label: "Page sections", icon: LayoutList },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/skills", label: "Skills", icon: Wrench },
  { href: "/admin/achievements", label: "Achievements", icon: Award },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/social-links", label: "Social links", icon: Link2 },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/settings", label: "Settings & SEO", icon: Cog },
];

/** Admin navigation. Defined in code, as the prompt allows for navigation. */
export function AdminNav({ unreadMessages }: { unreadMessages: number }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin" className="flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
      {LINKS.map(({ href, label, icon: Icon }) => {
        const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
              active && "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
            {href === "/admin/messages" && unreadMessages > 0 && (
              <span className="ml-auto rounded-full bg-zinc-900 px-2 py-0.5 text-xs text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
                {unreadMessages}
                <span className="sr-only"> unread</span>
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

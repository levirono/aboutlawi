import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { AdminNav } from "@/components/admin/admin-nav";
import { LogoutButton } from "@/components/admin/logout-button";
import { getDashboardSummary } from "@/server/db/queries/dashboard";
import { requireAdminPage } from "@/server/utils/auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const session = await requireAdminPage();
  const { counts } = await getDashboardSummary();

  return (
    <div className="flex min-h-dvh flex-col md:flex-row">
      <aside className="flex flex-col gap-6 border-b border-zinc-200 p-4 md:w-64 md:shrink-0 md:border-b-0 md:border-r dark:border-zinc-800">
        <div className="flex items-center justify-between gap-2 px-3">
          <Link href="/admin" className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Admin
          </Link>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            View site
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
        <AdminNav unreadMessages={counts.unreadMessages} />
        <div className="mt-auto hidden flex-col gap-2 px-3 md:flex">
          <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{session.email}</p>
          <LogoutButton />
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-end border-b border-zinc-200 px-4 py-2 md:hidden dark:border-zinc-800">
          <LogoutButton />
        </div>
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-8 sm:py-12">{children}</main>
      </div>
    </div>
  );
}

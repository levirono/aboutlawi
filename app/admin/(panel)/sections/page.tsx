import Link from "next/link";
import { z } from "zod";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ResourceList } from "@/components/admin/resource-list";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { deleteSectionAction } from "@/server/actions/content";
import { listSections } from "@/server/db/queries/site";
import { PAGE_LABELS, PAGES, SECTION_TYPE_LABELS } from "@/shared/constants";

const querySchema = z.object({ page: z.enum(PAGES).catch("home") });

export default async function AdminSectionsPage({ searchParams }: PageProps<"/admin/sections">) {
  const { page } = querySchema.parse(await searchParams);
  const sections = await listSections(page);

  return (
    <>
      <AdminPageHeader
        title="Page sections"
        description="Every block of copy on the public pages. Reorder, hide or edit them here; empty fields are hidden on the site."
        newHref={`/admin/sections/new?page=${page}`}
        newLabel="New section"
      />

      <nav aria-label="Pages" className="mb-6 flex flex-wrap gap-2">
        {PAGES.map((value) => (
          <Link
            key={value}
            href={`/admin/sections?page=${value}`}
            aria-current={value === page ? "page" : undefined}
            className={cn(
              "rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-50",
              value === page && "border-zinc-900 bg-zinc-900 text-zinc-50 hover:text-zinc-50 dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:text-zinc-900",
            )}
          >
            {PAGE_LABELS[value]}
          </Link>
        ))}
      </nav>

      <ResourceList
        resource="pageSections"
        headers={["Section", "Type"]}
        deleteAction={deleteSectionAction}
        emptyText="This page has no sections yet."
        rows={sections.map((section) => ({
          id: section.id,
          visible: section.visible,
          label: section.title ?? section.key,
          editHref: `/admin/sections/${section.id}`,
          cells: [
            <span key="title" className="flex flex-col">
              <span className="font-medium">{section.title ?? section.key}</span>
              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{section.key}</span>
            </span>,
            <Badge key="type">{SECTION_TYPE_LABELS[section.type]}</Badge>,
          ],
        }))}
      />
    </>
  );
}

import type { ReactNode } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type AdminPageHeaderProps = {
  title: string;
  description?: string;
  newHref?: string;
  newLabel?: string;
  actions?: ReactNode;
};

export function AdminPageHeader({ title, description, newHref, newLabel = "Add new", actions }: AdminPageHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{title}</h1>
        {description && <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>}
      </div>
      <div className="flex items-center gap-2">
        {actions}
        {newHref && (
          <Button asChild>
            <Link href={newHref}>
              <Plus className="h-4 w-4" aria-hidden="true" />
              {newLabel}
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}

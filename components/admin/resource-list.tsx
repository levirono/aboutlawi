"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { ArrowDown, ArrowUp, Pencil } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { deleteProjectAction } from "@/server/actions/content";
import { reorderAction, setVisibilityAction } from "@/server/actions/listing";
import type { ListingResource } from "@/server/db/queries/listing";
import { useActionError } from "@/shared/hooks/use-action-error";

export type ResourceRow = {
  id: number;
  visible: boolean;
  label: string;
  editHref: string;
  /** Pre-rendered cells (Server Components can pass rendered nodes to this Client Component). */
  cells: ReactNode[];
};

type ResourceListProps = {
  resource: ListingResource;
  headers: string[];
  rows: ResourceRow[];
  deleteAction: typeof deleteProjectAction;
  emptyText: string;
};

/** Shared admin table: edit, show/hide, reorder and delete for any listing resource. */
export function ResourceList({ resource, headers, rows, deleteAction, emptyText }: ResourceListProps) {
  const router = useRouter();
  const onError = useActionError();
  const [order, setOrder] = useState(() => rows.map((row) => row.id));
  const [syncedRows, setSyncedRows] = useState(rows);

  // Server data changed (after a refresh): adopt its order.
  if (syncedRows !== rows) {
    setSyncedRows(rows);
    setOrder(rows.map((row) => row.id));
  }

  const visibility = useAction(setVisibilityAction, { onSuccess: () => router.refresh(), onError });
  const reorder = useAction(reorderAction, {
    onSuccess: () => router.refresh(),
    onError: (args) => {
      setOrder(rows.map((row) => row.id));
      onError(args);
    },
  });

  const byId = new Map(rows.map((row) => [row.id, row]));
  const ordered = order.map((id) => byId.get(id)).filter((row): row is ResourceRow => row !== undefined);

  const move = (index: number, offset: -1 | 1) => {
    const next = [...order];
    const target = index + offset;
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
    reorder.execute({ resource, ids: next });
  };

  if (ordered.length === 0) {
    return <p className="py-12 text-center text-sm text-zinc-500 dark:text-zinc-400">{emptyText}</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
          <TableHead>Visible</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ordered.map((row, index) => (
          <TableRow key={row.id}>
            {row.cells.map((cell, cellIndex) => (
              <TableCell key={headers[cellIndex] ?? cellIndex}>{cell}</TableCell>
            ))}
            <TableCell>
              <Switch
                checked={row.visible}
                disabled={visibility.isExecuting}
                aria-label={`Show ${row.label} on the site`}
                onCheckedChange={(visible) => visibility.execute({ resource, id: row.id, visible })}
              />
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-end gap-1">
                <Button variant="ghost" size="icon" aria-label={`Move ${row.label} up`} disabled={index === 0 || reorder.isExecuting} onClick={() => move(index, -1)}>
                  <ArrowUp className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="ghost" size="icon" aria-label={`Move ${row.label} down`} disabled={index === ordered.length - 1 || reorder.isExecuting} onClick={() => move(index, 1)}>
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button asChild variant="ghost" size="icon">
                  <Link href={row.editHref} aria-label={`Edit ${row.label}`}>
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <DeleteButton action={deleteAction} id={row.id} label={row.label} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

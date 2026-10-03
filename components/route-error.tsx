"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export type RouteErrorProps = { error: Error & { digest?: string }; retry: () => void };

/** Shared body for every route's error.tsx boundary. */
export function RouteError({ title, retry, error }: RouteErrorProps & { title: string }) {
  return (
    <div role="alert" className="mx-auto flex max-w-md flex-col items-center gap-6 px-6 py-32 text-center">
      <AlertTriangle className="h-10 w-10 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">{title}</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Something went wrong while loading this page.
          {error.digest && <span className="block pt-1 font-mono text-xs">Reference: {error.digest}</span>}
        </p>
      </div>
      <Button variant="outline" onClick={() => retry()}>
        Try again
      </Button>
    </div>
  );
}

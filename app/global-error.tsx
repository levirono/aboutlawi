"use client";

import { RouteError, type RouteErrorProps } from "@/components/route-error";
import "./globals.css";

/** Replaces the root layout when it fails, so it renders its own document. */
export default function GlobalError(props: RouteErrorProps) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <title>Something went wrong</title>
        <RouteError title="Something went wrong" {...props} />
      </body>
    </html>
  );
}

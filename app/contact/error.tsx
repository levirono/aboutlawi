"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="mx-auto flex max-w-md flex-col items-center gap-6 px-6 py-32 text-center"
    >
      <AlertTriangle
        className="h-10 w-10 text-zinc-400 dark:text-zinc-500"
        aria-hidden="true"
      />
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Failed to load Contact page
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {error.message ?? "An unexpected error occurred. Please try again."}
        </p>
      </div>
      <Button variant="outline" onClick={reset} id="contact-error-reset-btn">
        Try again
      </Button>
    </div>
  );
}

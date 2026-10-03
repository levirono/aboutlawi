"use client";

import { Toaster as Sonner } from "sonner";

function Toaster() {
  return (
    <Sonner
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-900 shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
          description: "text-zinc-500 dark:text-zinc-400",
        },
      }}
    />
  );
}

export { Toaster };

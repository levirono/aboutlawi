import { Skeleton } from "@/components/ui/skeleton";

/**
 * Structural skeleton layout for /about route.
 * Mirrors the About page grid without any content.
 */
export default function AboutLoading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20" aria-busy="true" aria-label="Loading about page">
      {/* Header skeleton */}
      <div className="mb-20 max-w-2xl space-y-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
      </div>

      {/* Competency card skeletons */}
      <div className="mb-24">
        <Skeleton className="mb-10 h-8 w-48" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <Skeleton className="h-4 w-24" />
              {Array.from({ length: 5 }).map((_, j) => (
                <Skeleton key={j} className="h-3 w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Timeline skeletons */}
      <div>
        <Skeleton className="mb-10 h-8 w-40" />
        <div className="flex flex-col gap-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border-l border-zinc-200 pl-8 dark:border-zinc-800 space-y-3">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

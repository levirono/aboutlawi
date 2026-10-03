import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20" aria-busy="true" aria-label="Loading projects">
      {/* Header */}
      <div className="mb-16 max-w-2xl space-y-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-5 w-full" />
      </div>

      {/* Featured grid */}
      <div className="mb-16">
        <Skeleton className="mb-8 h-6 w-24" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-5 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-16 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-md" />
                <Skeleton className="h-5 w-16 rounded-md" />
                <Skeleton className="h-5 w-16 rounded-md" />
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-9 w-20 rounded-md" />
                <Skeleton className="h-9 w-16 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other grid */}
      <div>
        <Skeleton className="mb-8 h-6 w-28" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-10 w-full" />
              <div className="flex gap-1.5">
                <Skeleton className="h-5 w-12 rounded-md" />
                <Skeleton className="h-5 w-12 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

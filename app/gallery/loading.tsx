import { Skeleton } from "@/components/ui/skeleton";

export default function GalleryLoading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20" aria-busy="true" aria-label="Loading gallery">
      <div className="mb-16 max-w-2xl space-y-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-12 w-48" />
        <Skeleton className="h-5 w-full" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <Skeleton className={`w-full ${i % 2 === 0 ? "aspect-video" : "aspect-square"}`} />
            <div className="px-4 py-3">
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

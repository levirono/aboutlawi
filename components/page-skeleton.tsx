import { Skeleton } from "@/components/ui/skeleton";

/** Shared structural skeleton for every route's loading.tsx. */
export function PageSkeleton({ label, variant = "grid" }: { label: string; variant?: "grid" | "list" | "form" | "article" }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20" aria-busy="true" aria-label={label}>
      <div className="mb-16 flex max-w-2xl flex-col gap-4">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-5 w-full" />
      </div>
      {variant === "grid" && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="flex flex-col gap-4">
              <Skeleton className="aspect-video w-full rounded-xl" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      )}
      {variant === "list" && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-14 w-full" />
          ))}
        </div>
      )}
      {variant === "form" && (
        <div className="flex max-w-2xl flex-col gap-6">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      )}
      {variant === "article" && (
        <div className="flex max-w-2xl flex-col gap-4">
          <Skeleton className="aspect-video w-full rounded-xl" />
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-4 w-full" />
          ))}
        </div>
      )}
    </div>
  );
}

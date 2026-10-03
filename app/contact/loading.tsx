import { Skeleton } from "@/components/ui/skeleton";

export default function ContactLoading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20" aria-busy="true" aria-label="Loading contact page">
      <div className="mb-16 max-w-2xl space-y-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-12 w-48" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
        {/* Contact details skeleton */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>

        {/* Form skeleton */}
        <div className="flex flex-col gap-6">
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-32 w-full rounded-md" />
          </div>
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>
    </div>
  );
}

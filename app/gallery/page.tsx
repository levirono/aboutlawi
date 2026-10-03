import type { Metadata } from "next";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Visual workspace gallery — project screenshots, code metrics graphics, and engineering environment captures.",
};

/**
 * Gallery item shapes.
 * Images reference public assets; placeholders use Skeleton while loading.
 */
const GALLERY_ITEMS = [
  {
    id: "gallery-01",
    caption: "Task Scheduler — Kubernetes topology visualisation",
    aspectClass: "aspect-video",
  },
  {
    id: "gallery-02",
    caption: "Design System — component explorer in Storybook",
    aspectClass: "aspect-square",
  },
  {
    id: "gallery-03",
    caption: "Code churn metrics — 90-day rolling average",
    aspectClass: "aspect-video",
  },
  {
    id: "gallery-04",
    caption: "Real-time collaboration — WebSocket flow diagram",
    aspectClass: "aspect-square",
  },
  {
    id: "gallery-05",
    caption: "Terminal workspace — tmux + Neovim engineering setup",
    aspectClass: "aspect-video",
  },
  {
    id: "gallery-06",
    caption: "Open Metrics Dashboard — GitHub contribution heatmap",
    aspectClass: "aspect-square",
  },
  {
    id: "gallery-07",
    caption: "PR cycle-time trend — 6-month improvement trajectory",
    aspectClass: "aspect-video",
  },
  {
    id: "gallery-08",
    caption: "WASM image processor — before/after benchmark output",
    aspectClass: "aspect-square",
  },
] as const;

export default function GalleryPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="mb-16 max-w-2xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Gallery
        </p>
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Visual Workspace
        </h1>
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Screenshots, architecture diagrams, code metrics graphics, and
          engineering environment captures from active projects.
        </p>
      </header>

      {/* ── Responsive CSS Grid ─────────────────────────────────────── */}
      <ul
        role="list"
        aria-label="Project visual captures"
        className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {GALLERY_ITEMS.map(({ id, caption, aspectClass }) => (
          <li key={id}>
            <figure className="flex flex-col gap-2 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
              {/*
               * Skeleton placeholder — geometric grayscale block per spec.
               * Real images would replace this with next/image components.
               */}
              <div
                id={id}
                className={`w-full ${aspectClass}`}
                aria-label={caption}
              >
                <Skeleton className={`h-full w-full rounded-none`} />
              </div>
              <figcaption className="px-4 pb-4 pt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
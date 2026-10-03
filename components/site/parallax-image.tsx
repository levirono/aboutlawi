"use client";

import Image from "next/image";
import { useScrollStep } from "@/components/site/use-scroll-step";
import { cn } from "@/lib/utils";

/** Each step moves the image further down and fades it slightly, so it drifts away as the page scrolls. */
const STEP_CLASSES = [
  "translate-y-0 opacity-100",
  "translate-y-6 opacity-95",
  "translate-y-12 opacity-90",
  "translate-y-18 opacity-80",
  "translate-y-24 opacity-70",
  "translate-y-32 opacity-60",
] as const;

type ParallaxImageProps = { src: string; alt: string; className?: string };

export function ParallaxImage({ src, alt, className }: ParallaxImageProps) {
  const step = useScrollStep(STEP_CLASSES.length - 1);

  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      <div className={cn("absolute inset-0 transition-all duration-300 ease-out motion-reduce:transition-none", STEP_CLASSES[step])}>
        <Image src={src} alt={alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>
    </div>
  );
}

"use client";

import { RouteError, type RouteErrorProps } from "@/components/route-error";

export default function AdminGalleryError(props: RouteErrorProps) {
  return <RouteError title="Could not load gallery" {...props} />;
}

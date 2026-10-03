"use client";

import { RouteError, type RouteErrorProps } from "@/components/route-error";

export default function AdminPageSectionsError(props: RouteErrorProps) {
  return <RouteError title="Could not load page sections" {...props} />;
}

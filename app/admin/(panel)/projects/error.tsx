"use client";

import { RouteError, type RouteErrorProps } from "@/components/route-error";

export default function AdminProjectsError(props: RouteErrorProps) {
  return <RouteError title="Could not load projects" {...props} />;
}

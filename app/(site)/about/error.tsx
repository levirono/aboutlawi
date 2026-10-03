"use client";

import { RouteError, type RouteErrorProps } from "@/components/route-error";

export default function AboutError(props: RouteErrorProps) {
  return <RouteError title="Could not load about" {...props} />;
}

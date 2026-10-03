"use client";

import { RouteError, type RouteErrorProps } from "@/components/route-error";

export default function HomeError(props: RouteErrorProps) {
  return <RouteError title="Could not load this page" {...props} />;
}

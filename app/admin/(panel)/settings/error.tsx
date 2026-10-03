"use client";

import { RouteError, type RouteErrorProps } from "@/components/route-error";

export default function AdminSettingsError(props: RouteErrorProps) {
  return <RouteError title="Could not load settings" {...props} />;
}

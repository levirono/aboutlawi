"use client";

import { RouteError, type RouteErrorProps } from "@/components/route-error";

export default function AdminSkillsError(props: RouteErrorProps) {
  return <RouteError title="Could not load skills" {...props} />;
}

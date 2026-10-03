"use client";

import { RouteError, type RouteErrorProps } from "@/components/route-error";

export default function AdminAchievementsError(props: RouteErrorProps) {
  return <RouteError title="Could not load achievements" {...props} />;
}

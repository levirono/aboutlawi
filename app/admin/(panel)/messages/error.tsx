"use client";

import { RouteError, type RouteErrorProps } from "@/components/route-error";

export default function AdminMessagesError(props: RouteErrorProps) {
  return <RouteError title="Could not load messages" {...props} />;
}

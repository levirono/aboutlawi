"use client";

import { RouteError, type RouteErrorProps } from "@/components/route-error";

export default function ContactError(props: RouteErrorProps) {
  return <RouteError title="Could not load contact" {...props} />;
}

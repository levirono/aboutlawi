"use client";

import { RouteError, type RouteErrorProps } from "@/components/route-error";

export default function AdminSocialLinksError(props: RouteErrorProps) {
  return <RouteError title="Could not load social links" {...props} />;
}

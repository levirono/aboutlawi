import "server-only";
import { notFound } from "next/navigation";
import { idSchema } from "@/shared/schemas/common";

/** Validates a numeric route param with the shared schema; invalid ids render the 404 page. */
export function parseIdParam(value: string): number {
  const result = idSchema.safeParse({ id: value });
  if (!result.success) notFound();
  return result.data.id;
}

import "server-only";
import { headers } from "next/headers";
import { RateLimitError } from "@/server/utils/errors";

type Window = { count: number; resetAt: number };

/**
 * Fixed-window, in-memory limiter. Suitable for a single server instance;
 * counters are not shared across serverless instances.
 */
const windows = new Map<string, Window>();

export type RateLimitRule = { bucket: string; limit: number; windowMs: number };

export const RATE_LIMITS = {
  contact: { bucket: "contact", limit: 5, windowMs: 10 * 60_000 },
  login: { bucket: "login", limit: 5, windowMs: 15 * 60_000 },
} satisfies Record<string, RateLimitRule>;

export async function clientIp(): Promise<string> {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || requestHeaders.get("x-real-ip") || "unknown";
}

/** Counts one hit for `identity` and throws RateLimitError once the rule's limit is exceeded. */
export function assertRateLimit(rule: RateLimitRule, identity: string): void {
  const now = Date.now();
  const key = `${rule.bucket}:${identity}`;
  const current = windows.get(key);

  if (!current || current.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + rule.windowMs });
    if (windows.size > 10_000) sweep(now);
    return;
  }

  current.count += 1;
  if (current.count > rule.limit) throw new RateLimitError();
}

/** Clears a key after a successful action (e.g. a correct login). */
export function resetRateLimit(rule: RateLimitRule, identity: string): void {
  windows.delete(`${rule.bucket}:${identity}`);
}

function sweep(now: number): void {
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key);
  }
}

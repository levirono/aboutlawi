import "server-only";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { env } from "@/server/env";

type Level = "debug" | "info" | "warn" | "error";
type Channel = "app" | "error" | "auth";
export type LogContext = Record<string, unknown>;

const SENSITIVE_KEY = /pass(word)?|hash|token|secret|cookie|authorization|jwt|api[-_]?key/i;

/** Removes secrets from log context, recursively. */
function redact(value: unknown, depth = 0): unknown {
  if (depth > 4 || value === null || typeof value !== "object") return value;
  if (value instanceof Error) return { name: value.name, message: value.message };
  if (Array.isArray(value)) return value.map((item) => redact(item, depth + 1));
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, SENSITIVE_KEY.test(key) ? "[redacted]" : redact(item, depth + 1)]),
  );
}

let directoryReady: Promise<string | undefined> | undefined;

function logDirectory(): Promise<string | undefined> {
  directoryReady ??= (async () => {
    // Runtime-only path: keep it out of build output tracing.
    const directory = path.resolve(/* turbopackIgnore: true */ process.cwd(), env().LOG_DIR);
    try {
      await mkdir(directory, { recursive: true });
      return directory;
    } catch {
      // Read-only filesystems (e.g. serverless) fall back to the console only.
      return undefined;
    }
  })();
  return directoryReady;
}

/** One file per channel per day, e.g. logs/app-2026-10-03.log (rotation by date). */
async function writeLine(channel: Channel, line: string): Promise<void> {
  const directory = await logDirectory();
  if (!directory) return;
  const day = new Date().toISOString().slice(0, 10);
  try {
    await appendFile(path.join(directory, `${channel}-${day}.log`), `${line}\n`, "utf8");
  } catch {
    // Never let logging failures break a request.
  }
}

function log(channel: Channel, level: Level, message: string, context: LogContext = {}): void {
  const entry = { timestamp: new Date().toISOString(), level, message, context: redact(context) };
  const line = JSON.stringify(entry);
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.info(line);

  void writeLine(channel, line);
  if (level === "error" && channel !== "error") void writeLine("error", line);
}

export const logger = {
  info: (message: string, context?: LogContext) => log("app", "info", message, context),
  warn: (message: string, context?: LogContext) => log("app", "warn", message, context),
  error: (message: string, context?: LogContext) => log("error", "error", message, context),
  auth: (message: string, context?: LogContext) => log("auth", "info", message, context),
  authWarn: (message: string, context?: LogContext) => log("auth", "warn", message, context),
};

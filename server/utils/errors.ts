import "server-only";
import type { ApiError, ErrorCode } from "@/shared/api-error";

export type { ApiError };

/** Base class for every error the app throws on purpose. Its message is safe to show users. */
export abstract class AppError extends Error {
  abstract readonly code: ErrorCode;
  abstract readonly status: number;
  readonly field?: string;

  constructor(message: string, field?: string) {
    super(message);
    this.name = new.target.name;
    this.field = field;
  }

  toApiError(): ApiError {
    return { code: this.code, status: this.status, message: this.message, field: this.field };
  }
}

export class ValidationError extends AppError {
  readonly code = "VALIDATION";
  readonly status = 422;
}

export class UnauthorizedError extends AppError {
  readonly code = "UNAUTHORIZED";
  readonly status = 401;
  constructor(message = "Please sign in to continue.") {
    super(message);
  }
}

export class ForbiddenError extends AppError {
  readonly code = "FORBIDDEN";
  readonly status = 403;
  constructor(message = "You do not have access to this resource.") {
    super(message);
  }
}

export class NotFoundError extends AppError {
  readonly code = "NOT_FOUND";
  readonly status = 404;
  constructor(resource = "Item") {
    super(`${resource} not found.`);
  }
}

export class ConflictError extends AppError {
  readonly code = "CONFLICT";
  readonly status = 409;
}

export class RateLimitError extends AppError {
  readonly code = "RATE_LIMITED";
  readonly status = 429;
  constructor(message = "Too many requests. Please wait a few minutes and try again.") {
    super(message);
  }
}

export class InternalError extends AppError {
  readonly code = "INTERNAL";
  readonly status = 500;
  constructor(message = "Something went wrong. Please try again.") {
    super(message);
  }
}

const UNIQUE_VIOLATION = "23505";

/** Walks the `cause` chain (Drizzle wraps driver errors) looking for a Postgres error code. */
function postgresCode(error: unknown): string | undefined {
  let current: unknown = error;
  for (let depth = 0; depth < 5 && current instanceof Error; depth += 1) {
    const code = (current as { code?: unknown }).code;
    if (typeof code === "string") return code;
    current = current.cause;
  }
  return undefined;
}

/** Maps any thrown value to an AppError. Unknown errors become a generic InternalError. */
export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) return error;
  if (postgresCode(error) === UNIQUE_VIOLATION) {
    return new ConflictError("An item with this value already exists.");
  }
  return new InternalError();
}

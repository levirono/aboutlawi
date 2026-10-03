export type ErrorCode =
  | "VALIDATION"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "INTERNAL";

/** Consistent error shape every Server Action returns as `result.serverError`. */
export type ApiError = {
  code: ErrorCode;
  status: number;
  message: string;
  /** Form field the error belongs to, when it can be attributed to one. */
  field?: string;
};

/** Flattened field-level validation errors returned as `result.validationErrors`. */
export type FieldErrors = {
  formErrors: string[];
  fieldErrors: Partial<Record<string, string[]>>;
};

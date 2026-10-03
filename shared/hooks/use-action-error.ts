"use client";

import { useCallback } from "react";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import type { ApiError, FieldErrors } from "@/shared/api-error";

type ActionErrorResult = {
  serverError?: ApiError;
  validationErrors?: FieldErrors;
  thrownError?: Error;
};

/**
 * The one client-side place that turns Server Action errors into form errors and
 * notifications. Pass a form's `setError` to map field errors onto inputs.
 */
export function useActionError<T extends FieldValues>(setError?: UseFormSetError<T>) {
  return useCallback(
    ({ error }: { error: ActionErrorResult }) => {
      const fieldErrors = error.validationErrors?.fieldErrors ?? {};
      let attributed = false;

      if (setError) {
        for (const [field, messages] of Object.entries(fieldErrors)) {
          if (messages?.[0]) {
            setError(field as Path<T>, { type: "server", message: messages[0] });
            attributed = true;
          }
        }
        if (error.serverError?.field) {
          setError(error.serverError.field as Path<T>, { type: "server", message: error.serverError.message });
          attributed = true;
        }
      }

      const message =
        error.serverError?.message ??
        error.validationErrors?.formErrors[0] ??
        (attributed ? "Please fix the highlighted fields." : "Please check the form and try again.");

      if (error.thrownError) toast.error("Network error. Please try again.");
      else toast.error(message);
    },
    [setError],
  );
}

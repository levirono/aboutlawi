"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm, type DefaultValues, type FieldValues, type Path, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import type { SingleInputActionFn } from "next-safe-action/hooks";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { z } from "zod";
import { ImageField } from "@/components/admin/image-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { ApiError, FieldErrors } from "@/shared/api-error";
import { useActionError } from "@/shared/hooks/use-action-error";

type Base<Values> = { name: Path<Values> & string; label: string; description?: string };

/** Declarative field definitions. Forms are the one place content is defined in code. */
export type FieldConfig<Values extends FieldValues> =
  | (Base<Values> & { kind: "text" | "url" | "email" | "date"; placeholder?: string })
  | (Base<Values> & { kind: "textarea"; rows?: number; placeholder?: string })
  | (Base<Values> & { kind: "number"; min?: number; max?: number })
  | (Base<Values> & { kind: "switch" })
  | (Base<Values> & { kind: "select"; options: readonly { value: string; label: string }[] })
  | (Base<Values> & { kind: "image"; publicIdName: Path<Values> & string; savedPublicId: string | null });

type ResourceFormProps<Schema extends z.ZodType<FieldValues, FieldValues>, Data> = {
  schema: Schema;
  action: SingleInputActionFn<ApiError, Schema, FieldErrors, Data>;
  defaultValues: z.input<Schema>;
  fields: FieldConfig<z.input<Schema>>[];
  submitLabel: string;
  /** Prefix for element ids; needed when several forms share a page. */
  idPrefix?: string;
  /** Where to navigate after saving; omitted → stay and refresh. */
  redirectTo?: string;
};

/** Shared admin form: shared Zod schema on the client, the same schema on the server action. */
export function ResourceForm<Schema extends z.ZodType<FieldValues, FieldValues>, Data>({
  schema,
  action,
  defaultValues,
  fields,
  submitLabel,
  redirectTo,
  idPrefix = "field",
}: ResourceFormProps<Schema, Data>) {
  type Values = z.input<Schema>;
  const router = useRouter();
  const form = useForm<Values>({
    resolver: zodResolver(schema as never) as unknown as Resolver<Values>,
    defaultValues: defaultValues as DefaultValues<Values>,
    mode: "onTouched",
  });
  const onError = useActionError(form.setError);

  const { execute, isExecuting } = useAction(action, {
    onSuccess: () => {
      toast.success("Saved.");
      form.reset(form.getValues());
      if (redirectTo) router.push(redirectTo);
      else router.refresh();
    },
    onError,
  });

  // The client validates with the resolver; the raw input is sent so the server parses the same shape.
  const onSubmit = form.handleSubmit(() => execute(form.getValues() as Parameters<typeof execute>[0]));

  return (
    <form onSubmit={onSubmit} noValidate className="flex max-w-2xl flex-col gap-6">
      {fields.map((field) => {
        const id = `${idPrefix}-${field.name}`;
        const error = form.formState.errors[field.name]?.message;
        const errorId = `${id}-error`;
        const describedBy = [field.description ? `${id}-description` : null, error ? errorId : null]
          .filter(Boolean)
          .join(" ") || undefined;

        return (
          <div key={field.name} className="flex flex-col gap-2">
            {field.kind === "switch" ? (
              <div className="flex items-center gap-3">
                <Controller
                  control={form.control}
                  name={field.name}
                  render={({ field: control }) => (
                    <Switch
                      id={id}
                      checked={Boolean(control.value)}
                      onCheckedChange={control.onChange}
                      aria-describedby={describedBy}
                    />
                  )}
                />
                <Label htmlFor={id}>{field.label}</Label>
              </div>
            ) : (
              <Label htmlFor={id}>{field.label}</Label>
            )}

            {field.description && (
              <p id={`${id}-description`} className="text-xs text-zinc-500 dark:text-zinc-400">
                {field.description}
              </p>
            )}

            {(field.kind === "text" || field.kind === "url" || field.kind === "email" || field.kind === "date") && (
              <Input
                id={id}
                type={field.kind}
                placeholder={field.placeholder}
                aria-invalid={Boolean(error)}
                aria-describedby={describedBy}
                {...form.register(field.name)}
              />
            )}

            {field.kind === "textarea" && (
              <Textarea
                id={id}
                rows={field.rows ?? 4}
                placeholder={field.placeholder}
                aria-invalid={Boolean(error)}
                aria-describedby={describedBy}
                {...form.register(field.name)}
              />
            )}

            {field.kind === "number" && (
              <Input
                id={id}
                type="number"
                inputMode="numeric"
                min={field.min}
                max={field.max}
                aria-invalid={Boolean(error)}
                aria-describedby={describedBy}
                {...form.register(field.name, {
                  setValueAs: (value: unknown) => (value === "" || value === null ? null : Number(value)),
                })}
              />
            )}

            {field.kind === "select" && (
              <Controller
                control={form.control}
                name={field.name}
                render={({ field: control }) => (
                  <Select value={String(control.value ?? "")} onValueChange={control.onChange}>
                    <SelectTrigger id={id} aria-invalid={Boolean(error)} aria-describedby={describedBy}>
                      <SelectValue placeholder="Choose…" />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            )}

            {field.kind === "image" && (
              <Controller
                control={form.control}
                name={field.name}
                render={({ field: control }) => {
                  // Set before the URL below changes, so it is current on the re-render that change triggers.
                  const publicId = form.getValues(field.publicIdName) as string;
                  const url = control.value as string;
                  return (
                    <ImageField
                      id={id}
                      value={url && publicId ? { url, publicId } : null}
                      savedPublicId={field.savedPublicId}
                      invalid={Boolean(error)}
                      describedBy={describedBy}
                      onChange={(image) => {
                        const options = { shouldDirty: true, shouldValidate: true };
                        form.setValue(field.publicIdName, (image?.publicId ?? "") as never, options);
                        control.onChange(image?.url ?? "");
                      }}
                    />
                  );
                }}
              />
            )}

            {typeof error === "string" && (
              <p id={errorId} role="alert" className="text-xs text-zinc-600 dark:text-zinc-300">
                {error}
              </p>
            )}
          </div>
        );
      })}

      <Button type="submit" disabled={isExecuting} className="self-start">
        {isExecuting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {isExecuting ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendMessageAction } from "@/server/actions/messages";
import { useActionError } from "@/shared/hooks/use-action-error";
import { contactSchema, type ContactInput } from "@/shared/schemas/contact";

const FIELDS = [
  { name: "name", label: "Name", autoComplete: "name", type: "text" },
  { name: "email", label: "Email", autoComplete: "email", type: "email" },
] as const;

/** Contact form: fields, labels and validation are defined in code; submissions go to the admin inbox. */
export function ContactForm() {
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
    mode: "onTouched",
  });
  const onError = useActionError(form.setError);
  const { execute, isExecuting, hasSucceeded, reset } = useAction(sendMessageAction, {
    onSuccess: () => form.reset(),
    onError,
  });
  const { errors } = form.formState;

  if (hasSucceeded) {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-xl border border-zinc-200 p-8 dark:border-zinc-800">
        <CheckCircle className="h-8 w-8 text-zinc-400" aria-hidden="true" />
        <p className="font-medium">Thanks — your message was sent.</p>
        <Button variant="outline" size="sm" onClick={reset}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(() => execute(form.getValues()))} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.name} className="flex flex-col gap-2">
            <Label htmlFor={`contact-${field.name}`}>{field.label}</Label>
            <Input
              id={`contact-${field.name}`}
              type={field.type}
              autoComplete={field.autoComplete}
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={errors[field.name] ? `contact-${field.name}-error` : undefined}
              {...form.register(field.name)}
            />
            {errors[field.name] && (
              <p id={`contact-${field.name}-error`} role="alert" className="text-xs text-zinc-600 dark:text-zinc-300">
                {errors[field.name]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          {...form.register("message")}
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className="text-xs text-zinc-600 dark:text-zinc-300">
            {errors.message.message}
          </p>
        )}
      </div>
      <Button type="submit" size="lg" disabled={isExecuting} className="self-start">
        {isExecuting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {isExecuting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { contactSchema, type ContactFormValues } from "@/lib/schemas/contact";
import { submitContactForm } from "@/app/contact/actions";
import { cn } from "@/lib/utils";

type SubmitResult = { success: boolean; message: string };

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-xs text-zinc-500 dark:text-zinc-400">
      {message}
    </p>
  );
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  const { execute, result, status } = useAction(submitContactForm);

  const isPending = status === "executing";
  const data = result.data as SubmitResult | undefined;
  const isSuccess = status === "hasSucceeded" && data?.success === true;

  const onSubmit = (values: ContactFormValues) => {
    execute(values);
  };

  if (isSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900"
      >
        <CheckCircle
          className="h-8 w-8 text-zinc-400 dark:text-zinc-500"
          aria-hidden="true"
        />
        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-50">
            Message sent
          </p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {data?.message}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => reset()}
          id="contact-send-another-btn"
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact form"
      className="flex flex-col gap-6"
    >
      {/* Server error */}
      {status === "hasErrored" && result.serverError && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-md border border-zinc-200 bg-zinc-100 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
        >
          {String(result.serverError)}
        </div>
      )}

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-name">Full name</Label>
        <Input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder="Jane Smith"
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          aria-invalid={!!errors.name}
          className={cn(errors.name && "border-zinc-400 dark:border-zinc-600")}
          {...register("name")}
        />
        <span id="contact-name-error">
          <FieldError message={errors.name?.message} />
        </span>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-email">Email address</Label>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder="jane@example.com"
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          aria-invalid={!!errors.email}
          className={cn(errors.email && "border-zinc-400 dark:border-zinc-600")}
          {...register("email")}
        />
        <span id="contact-email-error">
          <FieldError message={errors.email?.message} />
        </span>
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-subject">Subject</Label>
        <Input
          id="contact-subject"
          type="text"
          placeholder="Project enquiry / collaboration / other"
          aria-describedby={
            errors.subject ? "contact-subject-error" : undefined
          }
          aria-invalid={!!errors.subject}
          className={cn(
            errors.subject && "border-zinc-400 dark:border-zinc-600"
          )}
          {...register("subject")}
        />
        <span id="contact-subject-error">
          <FieldError message={errors.subject?.message} />
        </span>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          rows={6}
          placeholder="Tell me about your project or enquiry…"
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          aria-invalid={!!errors.message}
          className={cn(
            errors.message && "border-zinc-400 dark:border-zinc-600"
          )}
          {...register("message")}
        />
        <span id="contact-message-error">
          <FieldError message={errors.message?.message} />
        </span>
      </div>

      <Button
        type="submit"
        disabled={isPending || !isValid}
        id="contact-submit-btn"
        className="self-start"
      >
        {isPending && (
          <Loader2
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        )}
        {isPending ? "Sending\u2026" : "Send message"}
      </Button>
    </form>
  );
}

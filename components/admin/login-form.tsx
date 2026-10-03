"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/server/actions/auth";
import { useActionError } from "@/shared/hooks/use-action-error";
import { loginSchema, type LoginInput } from "@/shared/schemas/auth";

export function LoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });
  const onError = useActionError(form.setError);
  const { execute, isExecuting } = useAction(loginAction, { onError });
  const { errors } = form.formState;

  return (
    <form onSubmit={form.handleSubmit(() => execute(form.getValues()))} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          autoComplete="username"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "login-email-error" : undefined}
          {...form.register("email")}
        />
        {errors.email && (
          <p id="login-email-error" role="alert" className="text-xs text-zinc-600 dark:text-zinc-300">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "login-password-error" : undefined}
          {...form.register("password")}
        />
        {errors.password && (
          <p id="login-password-error" role="alert" className="text-xs text-zinc-600 dark:text-zinc-300">
            {errors.password.message}
          </p>
        )}
      </div>
      <Button type="submit" disabled={isExecuting}>
        {isExecuting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {isExecuting ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}

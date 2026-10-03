"use client";

import { useAction } from "next-safe-action/hooks";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/server/actions/auth";
import { useActionError } from "@/shared/hooks/use-action-error";

export function LogoutButton() {
  const onError = useActionError();
  const { execute, isExecuting } = useAction(logoutAction, { onError });

  return (
    <Button variant="ghost" size="sm" disabled={isExecuting} onClick={() => execute()}>
      <LogOut className="h-4 w-4" aria-hidden="true" />
      Sign out
    </Button>
  );
}

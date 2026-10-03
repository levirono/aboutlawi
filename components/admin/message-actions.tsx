"use client";

import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { Mail, MailOpen } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { deleteMessageAction, setMessageReadAction } from "@/server/actions/messages";
import { useActionError } from "@/shared/hooks/use-action-error";

export function MessageActions({ id, read, label }: { id: number; read: boolean; label: string }) {
  const router = useRouter();
  const onError = useActionError();
  const { execute, isExecuting } = useAction(setMessageReadAction, { onSuccess: () => router.refresh(), onError });

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" disabled={isExecuting} onClick={() => execute({ id, read: !read })}>
        {read ? <Mail className="h-4 w-4" aria-hidden="true" /> : <MailOpen className="h-4 w-4" aria-hidden="true" />}
        {read ? "Mark unread" : "Mark read"}
      </Button>
      <DeleteButton action={deleteMessageAction} id={id} label={label} />
    </div>
  );
}

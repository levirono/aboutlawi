"use client";

import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { deleteMessageAction } from "@/server/actions/messages";
import { useActionError } from "@/shared/hooks/use-action-error";

type DeleteButtonProps = {
  /** Any admin action that takes `{ id }`. */
  action: typeof deleteMessageAction;
  id: number;
  label: string;
  /** Navigate here after deleting (e.g. from an edit page). */
  redirectTo?: string;
};

/** Confirmed delete for any resource. Images are removed from Cloudinary by the server. */
export function DeleteButton({ action, id, label, redirectTo }: DeleteButtonProps) {
  const router = useRouter();
  const onError = useActionError();
  const { execute, isExecuting } = useAction(action, {
    onSuccess: () => {
      toast.success(`Deleted ${label}.`);
      if (redirectTo) router.push(redirectTo);
      else router.refresh();
    },
    onError,
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={`Delete ${label}`} disabled={isExecuting}>
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {label}?</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone. Any attached image is deleted too.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => execute({ id })}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

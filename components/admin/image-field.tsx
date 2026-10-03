"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useAction } from "next-safe-action/hooks";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { discardImageAction, uploadImageAction } from "@/server/actions/images";
import { useActionError } from "@/shared/hooks/use-action-error";
import { IMAGE_MIME_TYPES } from "@/shared/schemas/image";

export type ImageValue = { url: string; publicId: string } | null;

type ImageFieldProps = {
  id: string;
  value: ImageValue;
  /** The image saved on the record; it is only removed from Cloudinary when the form is saved. */
  savedPublicId: string | null;
  onChange: (value: ImageValue) => void;
  invalid?: boolean;
  describedBy?: string;
};

/** Uploads through the server (signed) and reports the Cloudinary URL + public id to the form. */
export function ImageField({ id, value, savedPublicId, onChange, invalid, describedBy }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pendingFile, setPendingFile] = useState<string | null>(null);
  const onError = useActionError();
  const discard = useAction(discardImageAction);

  /** Removes an upload from this editing session that is being replaced or cleared. */
  const discardUnsaved = (current: ImageValue) => {
    if (current && current.publicId !== savedPublicId) discard.execute({ publicId: current.publicId });
  };

  const upload = useAction(uploadImageAction, {
    onSuccess: ({ data }) => {
      discardUnsaved(value);
      onChange({ url: data.url, publicId: data.publicId });
      toast.success("Image uploaded.");
    },
    onError,
    onSettled: () => {
      setPendingFile(null);
      if (inputRef.current) inputRef.current.value = "";
    },
  });

  const onFileSelected = (file: File | undefined) => {
    if (!file) return;
    setPendingFile(file.name);
    upload.execute({ file });
  };

  return (
    <div className="flex flex-col gap-3">
      {value && (
        <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <Image src={value.url} alt="" fill sizes="384px" className="object-cover" />
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <Input
          ref={inputRef}
          id={id}
          type="file"
          accept={IMAGE_MIME_TYPES.join(",")}
          className="sr-only"
          aria-invalid={invalid}
          aria-describedby={describedBy}
          onChange={(event) => onFileSelected(event.target.files?.[0])}
        />
        <Button type="button" variant="outline" size="sm" disabled={upload.isExecuting} onClick={() => inputRef.current?.click()}>
          {upload.isExecuting ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <ImagePlus className="h-4 w-4" aria-hidden="true" />
          )}
          {upload.isExecuting ? `Uploading ${pendingFile ?? ""}` : value ? "Replace image" : "Upload image"}
        </Button>
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={upload.isExecuting}
            onClick={() => {
              discardUnsaved(value);
              onChange(null);
            }}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}

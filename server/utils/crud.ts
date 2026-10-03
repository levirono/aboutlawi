import "server-only";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { nextPosition, type ListingResource } from "@/server/db/queries/listing";
import { deleteImage, deleteReplacedImage } from "@/server/utils/cloudinary";
import { NotFoundError } from "@/server/utils/errors";
import { adminAction } from "@/server/utils/safe-action";

type Row = { id: number; imagePublicId?: string | null };
type WithPosition<T> = T & { position: number };

type CrudConfig<
  CreateSchema extends z.ZodType<object>,
  UpdateSchema extends z.ZodType<{ id: number }>,
  TRow extends Row,
> = {
  /** Used in action names, logs and "not found" messages, e.g. "Project". */
  label: string;
  resource: ListingResource;
  createSchema: CreateSchema;
  updateSchema: UpdateSchema;
  find: (id: number) => Promise<TRow | null>;
  create: (values: WithPosition<z.output<CreateSchema>>) => Promise<TRow>;
  update: (id: number, values: Omit<z.output<UpdateSchema>, "id">) => Promise<TRow | null>;
  remove: (id: number) => Promise<TRow | null>;
};

/** Revalidates every page so both the public site and the admin reflect a change. */
export function revalidateSite(): void {
  revalidatePath("/", "layout");
}

const deleteInput = z.object({ id: z.number().int().positive() });

/**
 * Builds create / update / delete Server Actions for one admin resource:
 * shared-schema validation, server-side auth, Cloudinary cleanup on image
 * replace/delete, and revalidation. Errors propagate to the action client.
 */
export function crudActions<
  CreateSchema extends z.ZodType<object>,
  UpdateSchema extends z.ZodType<{ id: number }>,
  TRow extends Row,
>(config: CrudConfig<CreateSchema, UpdateSchema, TRow>) {
  const name = config.label.toLowerCase().replace(/\s+/g, "-");

  const create = adminAction
    .metadata({ actionName: `${name}.create` })
    .inputSchema(config.createSchema)
    .action(async ({ parsedInput }) => {
      const position = await nextPosition(config.resource);
      const row = await config.create({ ...(parsedInput as z.output<CreateSchema>), position });
      revalidateSite();
      return { id: row.id };
    });

  const update = adminAction
    .metadata({ actionName: `${name}.update` })
    .inputSchema(config.updateSchema)
    .action(async ({ parsedInput }) => {
      const { id, ...values } = parsedInput as z.output<UpdateSchema>;
      const previous = await config.find(id);
      if (!previous) throw new NotFoundError(config.label);
      const row = await config.update(id, values);
      if (!row) throw new NotFoundError(config.label);
      await deleteReplacedImage(previous.imagePublicId ?? null, row.imagePublicId ?? null);
      revalidateSite();
      return { id: row.id };
    });

  const remove = adminAction
    .metadata({ actionName: `${name}.delete` })
    .inputSchema(deleteInput)
    .action(async ({ parsedInput }) => {
      const row = await config.remove(parsedInput.id);
      if (!row) throw new NotFoundError(config.label);
      if (row.imagePublicId) await deleteImage(row.imagePublicId);
      revalidateSite();
      return { id: row.id };
    });

  return { create, update, remove };
}

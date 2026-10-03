import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/admin/delete-button";
import { GalleryItemForm } from "@/components/admin/forms";
import { AdminPageHeader } from "@/components/admin/page-header";
import { deleteGalleryItemAction } from "@/server/actions/content";
import { findGalleryItem } from "@/server/db/queries/content";
import { parseIdParam } from "@/server/utils/params";

export default async function EditImagePage({ params }: PageProps<"/admin/gallery/[id]">) {
  const item = await findGalleryItem(parseIdParam((await params).id));
  if (!item) notFound();

  return (
    <>
      <AdminPageHeader
        title={`Edit ${item.imageAlt}`}
        actions={<DeleteButton action={deleteGalleryItemAction} id={item.id} label={item.imageAlt} redirectTo="/admin/gallery" />}
      />
      <GalleryItemForm item={item} />
    </>
  );
}

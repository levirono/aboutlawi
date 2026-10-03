import Image from "next/image";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ResourceList } from "@/components/admin/resource-list";
import { Badge } from "@/components/ui/badge";
import { deleteGalleryItemAction } from "@/server/actions/content";
import { listGallery } from "@/server/db/queries/content";

export default async function AdminGalleryPage() {
  const items = await listGallery();

  return (
    <>
      <AdminPageHeader title="Gallery" description="Images are stored in Cloudinary; deleting an item deletes its image." newHref="/admin/gallery/new" newLabel="Add image" />
      <ResourceList
        resource="galleryItems"
        headers={["Image", "Title"]}
        deleteAction={deleteGalleryItemAction}
        emptyText="No images yet."
        rows={items.map((item) => ({
          id: item.id,
          visible: item.visible,
          label: item.title ?? item.imageAlt,
          editHref: `/admin/gallery/${item.id}`,
          cells: [
            <span key="image" className="relative block h-12 w-20 overflow-hidden rounded-md">
              <Image src={item.imageUrl} alt={item.imageAlt} fill sizes="80px" className="object-cover" />
            </span>,
            <span key="title" className="flex items-center gap-2 font-medium">
              {item.title ?? item.imageAlt}
              {item.featured && <Badge variant="outline">Featured</Badge>}
            </span>,
          ],
        }))}
      />
    </>
  );
}

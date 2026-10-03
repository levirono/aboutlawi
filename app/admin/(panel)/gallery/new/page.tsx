import { GalleryItemForm } from "@/components/admin/forms";
import { AdminPageHeader } from "@/components/admin/page-header";

export default function NewImagePage() {
  return (
    <>
      <AdminPageHeader title="New image" />
      <GalleryItemForm />
    </>
  );
}

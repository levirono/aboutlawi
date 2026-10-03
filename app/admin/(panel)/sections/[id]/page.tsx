import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/admin/delete-button";
import { SectionForm } from "@/components/admin/forms";
import { AdminPageHeader } from "@/components/admin/page-header";
import { deleteSectionAction } from "@/server/actions/content";
import { findSection } from "@/server/db/queries/site";
import { parseIdParam } from "@/server/utils/params";
import { PAGE_LABELS, SECTION_TYPE_LABELS } from "@/shared/constants";

export default async function EditSectionPage({ params }: PageProps<"/admin/sections/[id]">) {
  const section = await findSection(parseIdParam((await params).id));
  if (!section) notFound();
  const label = section.title ?? section.key;

  return (
    <>
      <AdminPageHeader
        title={`Edit ${label}`}
        description={`${PAGE_LABELS[section.page]} page · ${SECTION_TYPE_LABELS[section.type]}`}
        actions={<DeleteButton action={deleteSectionAction} id={section.id} label={label} redirectTo={`/admin/sections?page=${section.page}`} />}
      />
      <SectionForm section={section} />
    </>
  );
}

import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/admin/delete-button";
import { SocialLinkForm } from "@/components/admin/forms";
import { AdminPageHeader } from "@/components/admin/page-header";
import { deleteSocialLinkAction } from "@/server/actions/content";
import { findSocialLink } from "@/server/db/queries/content";
import { parseIdParam } from "@/server/utils/params";

export default async function EditSocialLinkPage({ params }: PageProps<"/admin/social-links/[id]">) {
  const link = await findSocialLink(parseIdParam((await params).id));
  if (!link) notFound();

  return (
    <>
      <AdminPageHeader
        title={`Edit ${link.label}`}
        actions={<DeleteButton action={deleteSocialLinkAction} id={link.id} label={link.label} redirectTo="/admin/social-links" />}
      />
      <SocialLinkForm link={link} />
    </>
  );
}
